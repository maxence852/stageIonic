/**
 * Created by maxence on 04/04/2016.
 */
/*
 Kaysarov
 Mis à jours : 10/12/2015

 */

var express = require('express');
var log = require('../lib/log')(module);
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var databaseURL = config.get('db');



/* Récupère l'id de la ville grâce au code postal et au nom de la ville entrée. */
router.get('/:cpville/:nomville', function(req, res, next) {
    pg.connect(databaseURL, function(err, client, done) {

        var sql = "SELECT idville FROM villes WHERE cpville = '"+ req.params.cpville + "' AND nomville = '"+ req.params.nomville+"'";


        client.query(sql, function (err, villes_get){

            if (err) {
                res.status(401);
                log.info(err);
                return res.json({"status": 401, "message": err + " "+sql});
            }
            done();
            return res.json(villes_get.rows);
        });
    });

});

router.post('/', function(req, res, next) {
    pg.connect(databaseURL, function(err, client, done) {

        var sql = "SELECT idville FROM villes WHERE upper(cpville) = upper('"+ req.body.cpville + "') AND upper(nomville) = upper('"+ req.body.nomville+"')";


        client.query(sql, function (err, villes_post){

            if (err) {
                res.status(401);
                log.info(err);
                return res.json({"status": 401, "message": err + " "+sql});
            }
            done();
            return res.json(villes_post.rows);
        });
    });

});
/* POST /villes */
/*
router.post('/', function(req, res, next) {
    pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO villes " +
            "(cpville, nomville, codepays) values($1, $2, $3)";
        var data_post = [
            req.body.cpville,
            req.body.nomville,
            req.body.codepays ];

        client.query(sql, data_post, function (err, villes_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM villes ORDER BY cpville ASC", function (err, villes_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(villes_post.rows);
            });
        });

    });
});
/* get id ville
router.get('/:cpville/:nomville', function(req, res, next) {
    pg.connect(databaseURL, function(err, client, done) {

        var sql = "SELECT id FROM villes " +
            "WHERE cpville = $1 AND nomville = $2";
        var data_post = [
            req.params.cpville,
            req.params.nomville];


            client.query(sql,data_post, function (err, id_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(id_post.rows);
            });
        });


});

/* GET /villes/id
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

/* GET /villes/pays/id
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

/* GET /villes/pays/id
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



/* PUT /villes/:id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE villes SET cpville=($1), nomville=($2), codepays=($3) WHERE idville=($4)";
            var data_post = [
                req.body.cpville,
                req.body.nomville,
                req.body.codepays,
                id ];

            client.query(sql, data_post, function (err, villes_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM villes  WHERE idville=($1)", [id], function (err, villes_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    }
                    done();
                    return res.json(villes_put.rows);
                });
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /villes/:id
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM villes WHERE idville=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM villes ORDER BY cpville ASC", function (err, cb){

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