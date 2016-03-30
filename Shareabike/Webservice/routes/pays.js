/*
Kaysarov
Mis à jours : 10/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');



/* GET /pays listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM pays ORDER BY nom_fr ASC";
        client.query(sql, function (err, pays_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(pays_get.rows);            
        });
    });
});


/* POST /pays */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO pays " +
        "(idpays, nom_en, nom_fr) values($1, $2, $3)";
        var data_post = [
            req.body.idpays, 
            req.body.nom_en,
            req.body.nom_fr ];

        client.query(sql, data_post, function (err, pays_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM pays ORDER BY nom_fr ASC", function (err, pays_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(pays_post.rows);            
            }); 
        });
            
    });
});


/* GET /pays/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM pays  WHERE idpays=($1)", [id], function (err, paysid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(paysid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /pays/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE pays SET nom_en=($1), nom_fr=($2) WHERE idpays=($3)";
            var data_post = [
            req.body.nom_en,
            req.body.nom_fr,
            id ];

            client.query(sql, data_post, function (err, pays_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM pays  WHERE idpays=($1)", [id], function (err, pays_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(pays_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /pays/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM pays WHERE idpays=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM pays ORDER BY nom_fr ASC", function (err, cb){

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