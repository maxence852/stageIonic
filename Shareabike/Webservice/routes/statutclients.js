/*
Kaysarov
Mis à jours : 16/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');



/* GET /statutclients listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM statutclients ORDER BY idstatutclient ASC";
        client.query(sql, function (err, statutclients_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(statutclients_get.rows);            
        });
    });
});


/* POST /statutclients */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO statutclients " +
        "(idstatutclient, nom_statut_fr, nom_statut_en) values($1, $2, $3)";
        var data_post = [
            req.body.idstatutclient, 
            req.body.nom_statut_fr,
            req.body.nom_statut_en];

        client.query(sql, data_post, function (err, statutclients_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM statutclients ORDER BY idstatutclient ASC", function (err, statutclients_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(statutclients_post.rows);            
            }); 
        });
            
    });
});


/* GET /statutclients/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM statutclients  WHERE idstatutclient=($1)", [id], function (err, statutclientsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(statutclientsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /statutclients/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE statutclients SET idstatutclient=($1), nom_statut_fr=($2), nom_statut_en=($3) WHERE idstatutclient=($4)";
            var data_post = [
            req.body.idstatutclient, 
            req.body.nom_statut_fr,
            req.body.nom_statut_en,
            id ];

            client.query(sql, data_post, function (err, statutclients_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM statutclients  WHERE idstatutclient=($1)", [id], function (err, statutclients_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(statutclients_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /statutclients/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM statutclients WHERE idstatutclient=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM statutclients ORDER BY idstatutclient ASC", function (err, cb){

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
16/12/2015

https://localhost:80/api/expl/statutclients get

[
    {
        "idstatutclient": 1,
        "nom_statut_fr": "actif",
        "nom_statut_en": null
    },
    {
        "idstatutclient": 2,
        "nom_statut_fr": "en attente",
        "nom_statut_en": null
    },
    {
        "idstatutclient": 3,
        "nom_statut_fr": "suspendu",
        "nom_statut_en": null
    }
]

https://localhost:80/api/expl/statutclients/1 get

[
    {
        "idstatutclient": 1,
        "nom_statut_fr": "actif",
        "nom_statut_en": null
    }
]


https://localhost:80/api/expl/statutclients post
[
    {
        "idstatutclient": 4,
        "nom_statut_fr": "test",
        "nom_statut_en": null
    }
]

https://localhost:80/api/expl/statutclients/4 put

[
    {
        "idstatutclient": 4,
        "nom_statut_fr": "test modifié",
        "nom_statut_en": null
    }
]


https://localhost:80/api/expl/statutclients/4 delete
[]


*/