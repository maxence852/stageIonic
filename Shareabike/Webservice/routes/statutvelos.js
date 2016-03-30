/*
Kaysarov
Mis à jours : 15/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');



/* GET /statutvelos listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM statutvelos ORDER BY idstatutvelo ASC";
        client.query(sql, function (err, statutvelos_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(statutvelos_get.rows);            
        });
    });
});


/* POST /statutvelos */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO statutvelos " +
        "(idstatutvelo, nom_statut_fr, nom_statut_en) values($1, $2, $3)";
        var data_post = [
            req.body.idstatutvelo, 
            req.body.nom_statut_fr,
            req.body.nom_statut_en];

        client.query(sql, data_post, function (err, statutvelos_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM statutvelos ORDER BY idstatutvelo ASC", function (err, statutvelos_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(statutvelos_post.rows);            
            }); 
        });
            
    });
});


/* GET /statutvelos/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM statutvelos  WHERE idstatutvelo=($1)", [id], function (err, statutvelosid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(statutvelosid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /statutvelos/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE statutvelos SET idstatutvelo=($1), nom_statut_fr=($2), nom_statut_en=($3) WHERE idstatutvelo=($4)";
            var data_post = [
            req.body.idstatutvelo, 
            req.body.nom_statut_fr,
            req.body.nom_statut_en,
            id ];

            client.query(sql, data_post, function (err, statutvelos_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM statutvelos  WHERE idstatutvelo=($1)", [id], function (err, statutvelos_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(statutvelos_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /statutvelos/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM statutvelos WHERE idstatutvelo=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM statutvelos ORDER BY idstatutvelo ASC", function (err, cb){

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
15/12/2015

https://localhost:80/api/expl/statutvelos get

[
    {
        "idstatutvelo": 1,
        "nom_statut_fr": "disponible",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 2,
        "nom_statut_fr": "location",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 3,
        "nom_statut_fr": "réservé",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 4,
        "nom_statut_fr": "distribution",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 5,
        "nom_statut_fr": "en panne",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 6,
        "nom_statut_fr": "en entretient",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 7,
        "nom_statut_fr": "volé",
        "nom_statut_en": null
    }
]

https://localhost:80/api/expl/statutvelos/1 get

[
    {
        "idstatutvelo": 1,
        "nom_statut_fr": "disponible",
        "nom_statut_en": null
    }
]


https://localhost:80/api/expl/statutvelos post
[
    {
        "idstatutvelo": 8,
        "nom_statut_fr": "test",
        "nom_statut_en": null
    }
]


https://localhost:80/api/expl/statutvelos/8 put

[
    {
        "idstatutvelo": 8,
        "nom_statut_fr": "test modifié",
        "nom_statut_en": null
    }
]


https://localhost:80/api/expl/statutvelos/8 delete
[]


*/