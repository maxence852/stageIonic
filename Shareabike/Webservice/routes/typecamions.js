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



/* GET /typecamions listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM typecamions ORDER BY idtypecamion ASC";
        client.query(sql, function (err, typecamions_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(typecamions_get.rows);            
        });
    });
});


/* POST /typecamions */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO typecamions " +
        "(idtypecamion, nom_type_fr, nom_type_en) values($1, $2, $3)";
        var data_post = [
            req.body.idtypecamion, 
            req.body.nom_type_fr,
            req.body.nom_type_en];

        client.query(sql, data_post, function (err, typecamions_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM typecamions ORDER BY idtypecamion ASC", function (err, typecamions_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(typecamions_post.rows);            
            }); 
        });
            
    });
});


/* GET /typecamions/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM typecamions  WHERE idtypecamion=($1)", [id], function (err, typecamionsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(typecamionsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /typecamions/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE typecamions SET idtypecamion=($1), nom_type_fr=($2), nom_type_en=($3) WHERE idtypecamion=($4)";
            var data_post = [
            req.body.idtypecamion, 
            req.body.nom_type_fr,
            req.body.nom_type_en,
            id ];

            client.query(sql, data_post, function (err, typecamions_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM typecamions  WHERE idtypecamion=($1)", [id], function (err, typecamions_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(typecamions_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /typecamions/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM typecamions WHERE idtypecamion=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM typecamions ORDER BY idtypecamion ASC", function (err, cb){

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

https://localhost:80/api/expl/typecamions get

[
    {
        "idtypecamion": 1,
        "nom_type_fr": "diesel",
        "nom_type_en": null
    },
    {
        "idtypecamion": 2,
        "nom_type_fr": "essence",
        "nom_type_en": null
    },
    {
        "idtypecamion": 3,
        "nom_type_fr": "gaz",
        "nom_type_en": null
    },
    {
        "idtypecamion": 4,
        "nom_type_fr": "électrique",
        "nom_type_en": null
    }
]

https://localhost:80/api/expl/typecamions/1 get

[
    {
        "idtypecamion": 1,
        "nom_type_fr": "diesel",
        "nom_type_en": null
    }
]


https://localhost:80/api/expl/typecamions post
[
    {
        "idtypecamion": 1,
        "nom_type_fr": "diesel",
        "nom_type_en": null
    },
    {
        "idtypecamion": 2,
        "nom_type_fr": "essence",
        "nom_type_en": null
    },
    {
        "idtypecamion": 3,
        "nom_type_fr": "gaz",
        "nom_type_en": null
    },
    {
        "idtypecamion": 4,
        "nom_type_fr": "électrique",
        "nom_type_en": null
    },
    {
        "idtypecamion": 5,
        "nom_type_fr": "hybride",
        "nom_type_en": null
    }
]


https://localhost:80/api/expl/typecamions/5 put

[
    {
        "idtypecamion": 5,
        "nom_type_fr": "hybride+",
        "nom_type_en": null
    }
]


https://localhost:80/api/expl/typecamions/5 delete
[
    {
        "idtypecamion": 1,
        "nom_type_fr": "diesel",
        "nom_type_en": null
    },
    {
        "idtypecamion": 2,
        "nom_type_fr": "essence",
        "nom_type_en": null
    },
    {
        "idtypecamion": 3,
        "nom_type_fr": "gaz",
        "nom_type_en": null
    },
    {
        "idtypecamion": 4,
        "nom_type_fr": "électrique",
        "nom_type_en": null
    }
]


*/