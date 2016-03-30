/*
Kaysarov
Mis à jours : 26/12/2015

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
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
        var sql =  "SELECT idbonustrajet, dom_bonustrajet, station_depart, station_arriver, "+
        "date_valable, montant_bonus, s1.nom_station AS nom_station_depart, "+
        "s2.nom_station AS nom_station_arriver FROM bonustrajets "+
        "LEFT JOIN stations s1 ON bonustrajets.station_depart = s1.idstation "+
        "LEFT JOIN stations s2 ON bonustrajets.station_arriver = s2.idstation "+
        "WHERE dom_bonustrajet=($1) AND desact_bonustrajet=FALSE ORDER BY date_valable DESC ";
        client.query(sql, [dom], function (err, bonustrajets_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(bonustrajets_get.rows);            
        });
    });
});


/* POST /bonustrajets */
router.post('/', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO bonustrajets " +
        "(dom_bonustrajet, station_depart, station_arriver, date_valable, montant_bonus)"+
        "values($1, $2, $3, $4, $5)";

        var data_post = [
            dom, 
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
            client.query("SELECT * FROM bonustrajets WHERE dom_bonustrajet=($1) AND desact_bonustrajet=FALSE ", [dom], function (err, bonustrajets_post){

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
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {
            var sql ="SELECT * FROM bonustrajets  WHERE idbonustrajet=($1) "+
            "AND dom_bonustrajet=($2) AND desact_bonustrajet=FALSE";
            client.query(sql, [id, dom], function (err, bonustrajetsid_get){
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
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE bonustrajets SET "+
            "station_depart=($2), station_arriver=($3), date_valable=($4), "+
            "montant_bonus=($5) "+
            "WHERE idbonustrajet=($6) AND dom_bonustrajet=($1) AND desact_bonustrajet=FALSE ";
            var data_post = [
            dom, 
            req.body.station_depart, 
            req.body.station_arriver, 
            req.body.date_valable,
            req.body.montant_bonus,
            id];

            client.query(sql, data_post, function (err, bonustrajets_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM bonustrajets  WHERE idbonustrajet=($1) AND dom_bonustrajet=($2)", [id, dom], function (err, bonustrajets_put){

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
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
            var sql = "UPDATE bonustrajets SET "+
            "desact_bonustrajet=TRUE "+
            "WHERE idbonustrajet=($1) AND dom_bonustrajet=($2) ";
        client.query(sql, [id, dom], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM bonustrajets WHERE idbonustrajet=($1) AND desact_bonustrajet=FALSE ", [id], function (err, cb){

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
26/12/2015

https://localhost:80/api/oper/bonustrajets get
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

https://localhost:80/api/oper/bonustrajets/1 get
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


https://localhost:80/api/oper/bonustrajets post
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

https://localhost:80/api/oper/bonustrajets/1 put

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


https://localhost:80/api/oper/bonustrajets/1 delete
[]




*/