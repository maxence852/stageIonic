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
var jwt = require('jwt-simple');
var secret = require('../config/secret');



/* GET /domaines listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM domaines ORDER BY iddomaine ASC";
        client.query(sql, function (err, domaines_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(domaines_get.rows);            
        });
    });
});

/* GET /domaines actifs listing. */ 
router.get('/list/actifs', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT iddomaine FROM domaines WHERE desact_domaine=FALSE ORDER BY iddomaine ASC";
        client.query(sql, function (err, domainesactif_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(domainesactif_get.rows);            
        });
    });
});



/* POST /domaines */
router.post('/', function(req, res, next) {

     pg.connect(databaseURL, function(err, client, done) {
        var activ_ecadenas = false; 
        if (req.body.activ_ecadenas != undefined) activ_ecadenas =  req.body.activ_ecadenas;
        var activ_pucegps = false;
        if (req.body.activ_pucegps != undefined) activ_pucegps =  req.body.activ_pucegps;
        var activ_gpscamion = false;
        if (req.body.activ_gpscamion != undefined) activ_gpscamion =  req.body.activ_gpscamion;

        var sql = "INSERT INTO domaines " +
        "(iddomaine, zone_domaine, tel_service, "+
        "activ_ecadenas, activ_pucegps, activ_gpscamion, descript_domaine) "+
        "values($1, $2, $3, $4, $5, $6, $7)";
        var data_post = [
            req.body.iddomaine, 
            req.body.zone_domaine, 
            req.body.tel_service, 
            activ_ecadenas, 
            activ_pucegps,
            activ_gpscamion,
            req.body.descript_domaine];


        client.query(sql, data_post, function (err, domaines_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM domaines ORDER BY iddomaine ASC", function (err, domaines_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(domaines_post.rows);            
            }); 
        });
            
    });

});


/* GET /domaines/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM domaines  WHERE iddomaine=($1)", [id], function (err, domainesid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(domainesid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /domaines/id  Calculer le centre et l'aire du plygone*/
router.get('/center/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT point(zone_domaine), area(path(zone_domaine))  FROM domaines  WHERE iddomaine=($1)", [id], function (err, zone_get){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                log.info(zone_get.rows);
                return res.json(zone_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /domaines/polygone/iddomaine  Transformer le polygone en tableau [{x: Latitude, y: longitude}] */
router.get('/polygone/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "SELECT zone_domaine  FROM domaines  WHERE iddomaine=($1) AND desact_domaine=FALSE";
            client.query(sql, [id], function (err, zone_get){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                if (zone_get.rows[0] != null) {
                var z = zone_get.rows[0].zone_domaine;
                var zone =[];
                var zone_points=[];
                var point={x: 0, y: 0};
                var ligne = "";
                var ligne1="";
                var ligne2="";
                for( var i=1; i<z.length-1; i++){
                    if(z[i] == '(') ligne="";
                    if(z[i] != '(' && z[i] != ')') ligne+=z[i];
                    if(z[i] ==')'){
                        //log.info(ligne);
                        zone.push(ligne);
                        i++;
                    };
                };
                ligne = "";                
                for(var i=0; i<zone.length; i++){
                  //log.info(zone[i]);
                  z=zone[i];
                  ligne = ligne1 = ligne2 = "";
                  for(var j=0; j<z.length; j++){
                    ligne+=z[j];
                    if(z[j] == ',') {
                        ligne1=ligne;
                        ligne="";
                    };
                    if(j == z.length-1){
                        ligne2=ligne;
                        point={x: parseFloat(ligne1), y: parseFloat(ligne2)};
                        zone_points.push(point);
                    };
                  };
                };
                log.info('lecture polygone: ' + zone_points.length + ' sommets');
                return res.json(zone_points);
                } else {
                    res.status(400);
                    return res.json({"status": 400, "message": "Zone est nul"});
                }                            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});

/* PUT /domaines/:id Mettre à jour la zone du domaine */
router.put('/polygone/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE domaines SET "+
            "zone_domaine=($1) WHERE iddomaine=($2)";
            var data_post = [req.body.zone_domaine, id];

            client.query(sql, data_post, function (err, domaines_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM domaines  WHERE iddomaine=($1)", [id], function (err, domaines_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(domaines_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };
});



/* PUT /domaines/:id Mettre à jour le domaine */
router.put('/:id', function(req, res, next) {
//    var delivrepar = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
//    if (delivrepar != undefined) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE domaines SET "+
            "zone_domaine=($1), tel_service=($2), "+
            "activ_ecadenas=($3), activ_pucegps=($4), activ_gpscamion=($5), descript_domaine=($6), "+
            "desact_domaine=($7) "+
            "WHERE iddomaine=($8)";
            var data_post = [
            req.body.zone_domaine, 
            req.body.tel_service, 
            req.body.activ_ecadenas, 
            req.body.activ_pucegps,
            req.body.activ_gpscamion,
            req.body.descript_domaine,
            req.body.desact_domaine,
            id ];

            client.query(sql, data_post, function (err, domaines_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM domaines  WHERE iddomaine=($1)", [id], function (err, domaines_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(domaines_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };
//    } else {
//        res.status(401);
//        return res.json({"status": 401, "message": "token undefined"});
//    };
});



/* DELETE /domaines/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM domaines WHERE iddomaine=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM domaines ORDER BY iddomaine ASC", function (err, cb){

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