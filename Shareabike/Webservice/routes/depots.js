/*
Kaysarov
Mis à jours : 14/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');



/* GET /depots listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM depots ORDER BY dom_depot ASC";
        client.query(sql, function (err, depots_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(depots_get.rows);            
        });
    });
});


/* POST /depots */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO depots " +
        "(dom_depot, adresse, tel, capacite_camion, "+
        "capacite_velo, position_depot) values($1, $2, $3, $4, $5, $6)";
        var data_post = [
            req.body.dom_depot,
            req.body.adresse,
            req.body.tel,
            req.body.capacite_camion,
            req.body.capacite_velo,
            req.body.position_depot];

        client.query(sql, data_post, function (err, depots_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM depots ORDER BY iddepot ASC", function (err, depots_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(depots_post.rows);            
            }); 
        });
            
    });
});


/* GET /depots/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM depots  WHERE iddepot=($1)", [id], function (err, depotsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(depotsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* PUT /depots/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE depots SET dom_depot=($1), adresse=($2), "+
            "tel=($3), capacite_camion=($4), capacite_velo=($5), "+
            "position_depot=($6)  WHERE iddepot=($7)";
            var data_post = [
            req.body.dom_depot,
            req.body.adresse,
            req.body.tel,
            req.body.capacite_camion,
            req.body.capacite_velo,
            req.body.position_depot,
            id];

            client.query(sql, data_post, function (err, depots_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM depots  WHERE iddepot=($1)", [id], function (err, depots_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(depots_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});



/* PUT /depots/:id Mettre à jour la position de depot */
router.put('/point/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE depots SET "+
            "position_depot=($1) WHERE iddepot=($2)";
            var data_post = [req.body.position_depot, id];

            client.query(sql, data_post, function (err, depot_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM depots  WHERE iddepot=($1)", [id], function (err, depot_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(depot_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };
});




/* DELETE /depots/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM depots WHERE iddepot=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM depots ORDER BY iddepot ASC", function (err, cb){

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

https://localhost:80/api/expl/depots get
[
    {
        "iddepot": 3,
        "capacite_camion": 2,
        "capacite_velo": 100,
        "position_depot": null,
        "adresse": "Rue de la Liberté 4, 7033 Guesmes",
        "tel": "065333333",
        "dom_depot": "test"
    }
]


https://localhost:80/api/expl/depots/3 get
[
    {
        "iddepot": 3,
        "capacite_camion": 2,
        "capacite_velo": 100,
        "position_depot": null,
        "adresse": "Rue de la Liberté 4, 7033 Guesmes",
        "tel": "065333333",
        "dom_depot": "test"
    }
]


https://localhost:80/api/expl/depots post
[
    {
        "iddepot": 3,
        "capacite_camion": 2,
        "capacite_velo": 100,
        "position_depot": null,
        "adresse": "Rue de la Liberté 4, 7033 Guesmes",
        "tel": "065333333",
        "dom_depot": "test"
    }
]

https://localhost:80/api/expl/depots/3 put

[
    {
        "iddepot": 3,
        "capacite_camion": 1,
        "capacite_velo": 100,
        "position_depot": null,
        "adresse": "Rue de la Liberté 4, 7033 Guesmes",
        "tel": "065333333",
        "dom_depot": "test"
    }
]


https://localhost:80/api/expl/depots/3 delete
[]


*/