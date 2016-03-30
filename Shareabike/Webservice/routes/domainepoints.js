// 10/12/2015 module desactivé
var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var replaceall = require('replaceall'); 

router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM domainepoints ORDER BY idpoint ASC";
        client.query(sql, function (err, domainepoints_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(domainepoints_get.rows);            
        });
    });
});



router.post('/:id', function(req, res, next) {

     pg.connect(databaseURL, function(err, client, done) {
 
        var sql = "INSERT INTO domainepoints " +
        "(dom_point, point) values($1, $2)";
        var data_post = [
            req.params.id, 
            req.body.point];


        client.query(sql, data_post, function (err, domainepoints_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM domainepoints WHERE dom_point=($1) ORDER BY idpoint ASC", [req.body.dom_point], function (err, domaines_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(domainepoints_post.rows);            
            }); 
        });
            
    });

});


/* GET /domainepoints/iddomaine */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM domainepoints  WHERE dom_point=($1) ORDER BY idpoint ASC", [id], function (err, domainepointsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done(); 
                return res.json(domainepointsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* PUT /domainepoints/iddomaine */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM domainepoints  WHERE dom_point=($1) ORDER BY idpoint ASC", [id], function (err, points){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                
                log.info('row=' + points.rows.length );
                var zone = '(';
                for (var i = 0; i < points.rows.length; i++){
                    zone=zone +'('+ points.rows[i].point.x + ',' + points.rows[i].point.y + ')';
                    if (i==points.rows.length-1) {
                        zone=zone +')';
                    } else {
                        zone=zone +',';
                    }
                }
                log.info('zone=' + zone);
                var sql ="UPDATE domaines SET zone_domaine=($1) WHERE iddomaine=($2)";
                var data_put = [zone,id];

                client.query(sql, data_put, function (err, points){
                    if (err) {
                        res.status(400);
                        log.info(err);
                        return res.json({"status": 400, "message": err});
                    }
                    done(); 
                    return res.json(points.rows);
                });            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* DELETE /domaines/:iddomaine */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM domainepoints WHERE dom_point=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM domainepoints ORDER BY idpoint ASC", function (err, cb){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(cb.rows);            
            }); 
        });
            
    });
});


// Returne router
module.exports = router;