/*
Kaysarov
Mis à jours : 20/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');
var jwt = require('jwt-simple');
var secret = require('../config/secret');



/* GET /bonustrajets listing. */ 
router.get('/', function(req, res, next) {

    pg.connect(databaseURL, function(err, client, done) {
        var sql =  "SELECT idbonustrajet, dom_bonustrajet, station_depart, station_arriver, "+
        "date_valable, montant_bonus, desact_bonustrajet, s1.nom_station AS nom_station_depart, "+
        "s2.nom_station AS nom_station_arriver FROM bonustrajets "+
        "LEFT JOIN stations s1 ON bonustrajets.station_depart = s1.idstation "+
        "LEFT JOIN stations s2 ON bonustrajets.station_arriver = s2.idstation "+
        "ORDER BY dom_bonustrajet ASC";
        client.query(sql, function (err, bonustrajets_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(bonustrajets_get.rows);            
        });
    });
});


/* POST /bonustrajets */
router.post('/', function(req, res, next) {

     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO bonustrajets " +
        "(dom_bonustrajet, station_depart, station_arriver, date_valable, montant_bonus)"+
        "values($1, $2, $3, $4, $5)";

        var data_post = [
            req.body.dom_bonustrajet, 
            req.body.station_depart, 
            req.body.station_arriver, 
            req.body.date_valable,
            req.body.montant_bonus];


        client.query(sql, data_post, function (err, bonustrajets_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM bonustrajets ", function (err, bonustrajets_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(bonustrajets_post.rows);            
            }); 
        });
            
    });

});


/* GET /bonustrajets/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM bonustrajets  WHERE idbonustrajet=($1)", [id], function (err, bonustrajetsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(bonustrajetsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /bonustrajets/domaine/iddomaine */
router.get('/domaine/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM bonustrajets  WHERE dom_bonustrajet=($1)", [id], function (err, bonustrajetsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(bonustrajetsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* PUT /bonustrajets/:id  */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE bonustrajets SET "+
            "dom_bonustrajet=($1), station_depart=($2), station_arriver=($3), date_valable=($4), "+
            "montant_bonus=($5), desact_bonustrajet=($6) "+
            "WHERE idbonustrajet=($7)";
            var data_post = [
            req.body.dom_bonustrajet, 
            req.body.station_depart, 
            req.body.station_arriver, 
            req.body.date_valable,
            req.body.montant_bonus,
            req.body.desact_bonustrajet,
            id];

            client.query(sql, data_post, function (err, bonustrajets_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM bonustrajets  WHERE idbonustrajet=($1)", [id], function (err, bonustrajets_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(bonustrajets_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };

});



/* DELETE /bonustrajets/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM bonustrajets WHERE idbonustrajet=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM bonustrajets ORDER BY idbonustrajet ASC", function (err, cb){

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

https://localhost:80/api/expl/bonustrajets get
[
    {
        "idbonustrajet": 1,
        "dom_bonustrajet": "mons",
        "station_depart": 2,
        "station_arriver": 3,
        "date_valable": "2016-01-31T23:00:00.000Z",
        "montant_bonus": 1,
        "nom_station_depart": "gare",
        "nom_station_arriver": "polytech"
    },
    {
        "idbonustrajet": 2,
        "dom_bonustrajet": "mons",
        "station_depart": 43,
        "station_arriver": 2,
        "date_valable": "2016-01-31T23:00:00.000Z",
        "montant_bonus": 1,
        "nom_station_depart": "grand place",
        "nom_station_arriver": "gare"
    }
]

https://localhost:80/api/expl/bonustrajets/1 get
[
    {
        "idbonustrajet": 1,
        "dom_bonustrajet": "mons",
        "station_depart": 2,
        "station_arriver": 3,
        "date_valable": "2016-01-31T23:00:00.000Z",
        "montant_bonus": 1,
        "desact_bonustrajet": false
    }
]


https://localhost:80/api/expl/bonustrajets post
[
    {
        "idbonustrajet": 1,
        "dom_bonustrajet": "mons",
        "station_depart": 2,
        "station_arriver": 3,
        "date_valable": "2016-01-31T23:00:00.000Z",
        "montant_bonus": 1,
        "desact_bonustrajet": false
    }
]

https://localhost:80/api/expl/bonustrajets/1 put

[
    {
        "idbonustrajet": 1,
        "dom_bonustrajet": "mons",
        "station_depart": 2,
        "station_arriver": 3,
        "date_valable": "2016-03-01",
        "montant_bonus": 1,
        "desact_bonustrajet": false
    }
]


https://localhost:80/api/expl/bonustrajets/1 delete
[]




*/