/*
Kaysarov
Mis à jours : 11/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');



/* GET /camions listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idcamion, dom_camion, type_camion, statut_camion, "+
        "date_statut, capacite_camion, gps_camion, desact_camion, immatriculation, "+
        "nom_type_fr, nom_statut_fr, activ_gpscamion FROM camions "+
        "INNER JOIN typecamions ON camions.type_camion = typecamions.idtypecamion "+
        "INNER JOIN statutcamions ON camions.statut_camion = statutcamions.idstatutcamion "+
        "INNER JOIN domaines ON camions.dom_camion = domaines.iddomaine "+
        "ORDER BY idcamion ASC";
        client.query(sql, function (err, camions_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(camions_get.rows);            
        });
    });
});


/* POST /camions */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO camions " +
        "(immatriculation, dom_camion, type_camion, capacite_camion, "+
        "statut_camion, gps_camion) values($1, $2, $3, $4, $5, $6)";
        var data_post = [
            req.body.immatriculation,
            req.body.dom_camion,
            req.body.type_camion,
            req.body.capacite_camion,
            req.body.statut_camion,
            req.body.gps_camion];

        client.query(sql, data_post, function (err, camions_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM camions ORDER BY idcamion ASC", function (err, camions_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(camions_post.rows);            
            }); 
        });
            
    });
});


/* GET /camions/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM camions  WHERE idcamion=($1)", [id], function (err, camionsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(camionsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* PUT /camions/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var date = new Date();
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE camions SET dom_camion=($1), type_camion=($2), "+
            "capacite_camion=($3), statut_camion=($4), gps_camion=($5), "+
            "desact_camion=($6), immatriculation=($7), date_statut=($8)  WHERE idcamion=($9)";
            var data_post = [
            req.body.dom_camion,
            req.body.type_camion,
            req.body.capacite_camion,
            req.body.statut_camion,
            req.body.gps_camion,
            req.body.desact_camion,
            req.body.immatriculation,
            date, id];

            client.query(sql, data_post, function (err, camions_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM camions  WHERE idcamion=($1)", [id], function (err, camions_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(camions_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /camions/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM camions WHERE idcamion=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM camions ORDER BY idcamion ASC", function (err, cb){

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



/*
Testes unitaires PostMan:
OK
11/12/2015

https://localhost:80/api/expl/camions get
[
    {
        "idcamion": 1,
        "dom_camion": "Bike7",
        "type_camion": 2,
        "statut_camion": 2,
        "date_statut": "2015-12-11T22:14:15.641Z",
        "capacite_camion": 25,
        "gps_camion": "0488555555",
        "desact_camion": false,
        "immatriculation": "ABC123",
        "nom_type_fr": "essence",
        "nom_statut_fr": "en dépôt",
        "activ_gpscamion": true
    }
]


https://localhost:80/api/expl/camions/1 get
[
    {
        "idcamion": 1,
        "dom_camion": "Bike7",
        "type_camion": 1,
        "statut_camion": 2,
        "date_statut": "2015-12-11T18:59:08.113Z",
        "capacite_camion": 25,
        "gps_camion": "0488555555",
        "desact_camion": false,
        "immatriculation": "ABC123"
    }
]


https://localhost:80/api/expl/camions post
[
    {
        "idcamion": 1,
        "dom_camion": "Bike7",
        "type_camion": 1,
        "statut_camion": 2,
        "date_statut": "2015-12-11T18:59:08.113Z",
        "capacite_camion": 25,
        "gps_camion": "0488555555",
        "desact_camion": false,
        "immatriculation": "ABC123"
    }
]

https://localhost:80/api/expl/camions/1 put

[
    {
        "idcamion": 1,
        "dom_camion": "Bike7",
        "type_camion": 1,
        "statut_camion": 2,
        "date_statut": "2015-12-11T18:59:08.113Z",
        "capacite_camion": 25,
        "gps_camion": "0488555555",
        "desact_camion": false,
        "immatriculation": "ABC123"
    }
]


https://localhost:80/api/expl/camions/1 delete
[]


*/