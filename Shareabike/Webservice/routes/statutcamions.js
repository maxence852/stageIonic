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



/* GET /statutcamions listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM statutcamions ORDER BY idstatutcamion ASC";
        client.query(sql, function (err, statutcamions_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(statutcamions_get.rows);            
        });
    });
});


/* POST /statutcamions */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO statutcamions " +
        "(idstatutcamion, nom_statut_fr, nom_statut_en) values($1, $2, $3)";
        var data_post = [
            req.body.idstatutcamion, 
            req.body.nom_statut_fr,
            req.body.nom_statut_en];

        client.query(sql, data_post, function (err, statutcamions_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM statutcamions ORDER BY idstatutcamion ASC", function (err, statutcamions_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(statutcamions_post.rows);            
            }); 
        });
            
    });
});


/* GET /statutcamions/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM statutcamions  WHERE idstatutcamion=($1)", [id], function (err, statutcamionsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(statutcamionsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /statutcamions/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE statutcamions SET idstatutcamion=($1), nom_statut_fr=($2), nom_statut_en=($3) WHERE idstatutcamion=($4)";
            var data_post = [
            req.body.idstatutcamion, 
            req.body.nom_statut_fr,
            req.body.nom_statut_en,
            id ];

            client.query(sql, data_post, function (err, statutcamions_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM statutcamions  WHERE idstatutcamion=($1)", [id], function (err, statutcamions_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(statutcamions_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /statutcamions/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM statutcamions WHERE idstatutcamion=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM statutcamions ORDER BY idstatutcamion ASC", function (err, cb){

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

https://localhost:80/api/expl/statutcamions get

[
    {
        "idstatutcamion": 1,
        "nom_statut_fr": "en redistribution",
        "nom_statut_en": null
    },
    {
        "idstatutcamion": 2,
        "nom_statut_fr": "en dépôt",
        "nom_statut_en": null
    },
    {
        "idstatutcamion": 3,
        "nom_statut_fr": "en entretien",
        "nom_statut_en": null
    }
]

https://localhost:80/api/expl/statutcamions/1 get

[[
    {
        "idstatutcamion": 1,
        "nom_statut_fr": "en redistribution",
        "nom_statut_en": null
    }
]
]


https://localhost:80/api/expl/statutcamions post
[[
    {
        "idstatutcamion": 1,
        "nom_statut_fr": "en redistribution",
        "nom_statut_en": null
    },
    {
        "idstatutcamion": 2,
        "nom_statut_fr": "en dépôt",
        "nom_statut_en": null
    },
    {
        "idstatutcamion": 3,
        "nom_statut_fr": "en entretien",
        "nom_statut_en": null
    },
    {
        "idstatutcamion": 4,
        "nom_statut_fr": "test",
        "nom_statut_en": null
    }
]


https://localhost:80/api/expl/statutcamions/4 put

[[
    {
        "idstatutcamion": 4,
        "nom_statut_fr": "test+",
        "nom_statut_en": null
    }
]
]


https://localhost:80/api/expl/statutcamions/4 delete
[
  [
    {
        "idstatutcamion": 1,
        "nom_statut_fr": "en redistribution",
        "nom_statut_en": null
    },
    {
        "idstatutcamion": 2,
        "nom_statut_fr": "en dépôt",
        "nom_statut_en": null
    },
    {
        "idstatutcamion": 3,
        "nom_statut_fr": "en entretien",
        "nom_statut_en": null
    }
]


*/