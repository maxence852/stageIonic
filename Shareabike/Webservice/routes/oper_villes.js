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



/* GET /villes listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM villes ORDER BY cpville ASC";
        client.query(sql, function (err, villes_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(villes_get.rows);            
        });
    });
});



/* GET /villes/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM villes  WHERE idville=($1)", [id], function (err, villesid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(villesid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});

/* GET /villes/pays/id */
router.get('/pays/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM villes  WHERE codepays=($1)", [id], function (err, villespays_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(villespays_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});

/* GET /villes/pays/id */
router.get('/:cpays/:id', function(req, res, next) {
    var cpays = req.params.cpays;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM villes  WHERE codepays=($1) AND cpville=($2)", [cpays, id], function (err, villescp_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(villescp_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


// Returne router
module.exports = router;