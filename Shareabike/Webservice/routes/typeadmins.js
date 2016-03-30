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



/* GET /typeadmins listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM typeadmins ORDER BY niveau ASC";
        client.query(sql, function (err, typeadmins_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(typeadmins_get.rows);            
        });
    });
});


/* POST /typeadmins */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO typeadmins " +
        "(niveau, nom_fr, nom_en, nom_nl) values($1, $2, $3, $4)";
        var data_post = [
            req.body.niveau, 
            req.body.nom_fr,
            req.body.nom_en,
            req.body.nom_nl ];

        client.query(sql, data_post, function (err, typeadmins_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM typeadmins ORDER BY niveau ASC", function (err, typeadmins_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(typeadmins_post.rows);            
            }); 
        });
            
    });
});


/* GET /typeadmins/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM typeadmins  WHERE idtype=($1)", [id], function (err, typeadminsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(typeadminsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /typeadmins/:id desactivé 
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE typeadmins SET niveau=($1), nom_fr=($2), nom_en=($3), nom_nl=($4) WHERE idtype=($5)";
            var data_post = [
            req.body.niveau, 
            req.body.nom_fr,
            req.body.nom_en,
            req.body.nom_nl,
            id ];

            client.query(sql, data_post, function (err, typeadmins_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM typeadmins  WHERE idtype=($1)", [id], function (err, typeadmins_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(typeadmins_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});
*/

/* DELETE /typeadmins/:id    desactivé  
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM typeadmins WHERE idtype=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM typeadmins ORDER BY niveau ASC", function (err, cb){

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

*/
// Returne router
module.exports = router;