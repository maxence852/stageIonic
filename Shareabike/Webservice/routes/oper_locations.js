/*
Kaysarov
Mis à jours : 27/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');
var jwt = require('jwt-simple');
var secret = require('../config/secret');



/* GET /locations listing. */ 
router.get('/finies', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idlocation, dom_location, client_location, velo_location, "+
        "position_debut, station_debut, date_debut, position_fin, station_fin, date_fin, "+
        "round(EXTRACT(EPOCH FROM (date_fin - date_debut))/60) as duree, nom_client FROM locations "+
        "INNER JOIN clients ON locations.client_location = clients.idclient "+
        "WHERE date_fin IS NOT NULL AND dom_location=($1) ORDER BY date_debut DESC";
        client.query(sql, [dom],  function (err, locations_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(locations_get.rows);            
        });
    });
});

/* GET /locations/id */
router.get('/finies/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

        var sql =  "SELECT idlocation, dom_location, client_location, velo_location, "+
        "position_debut, station_debut, date_debut, position_fin, station_fin, date_fin, "+
        "round(EXTRACT(EPOCH FROM (date_fin - date_debut))/60) as duree FROM locations "+
        "WHERE idlocation=($1) AND dom_location=($2) AND date_fin IS NOT NULL";

            client.query(sql, [id, dom], function (err, locationsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(locationsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /locations en cours */ 
router.get('/encours', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idlocation, dom_location, client_location, velo_location, "+
        "position_debut, station_debut, date_debut, position_fin, station_fin, date_fin, nom_client "+
        "FROM locations "+
        "INNER JOIN clients ON locations.client_location = clients.idclient "+
        "WHERE date_fin IS NULL AND dom_location=($1) ORDER BY date_debut DESC";
        client.query(sql, [dom], function (err, locations_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(locations_get.rows);            
        });
    });
});


/* GET /locations/id */
router.get('/encours/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

        var sql =  "SELECT idlocation, dom_location, client_location, velo_location, "+
        "position_debut, station_debut, date_debut, position_fin, station_fin, date_fin "+
        "FROM locations "+
        "WHERE idlocation=($1) AND dom_location=($2) AND date_fin IS NULL";

            client.query(sql, [id, dom], function (err, locationsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(locationsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});



/* GET /locations/id */
router.get('/client/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

        var sql =  "SELECT * FROM locations "+
        "WHERE client_location=($1) AND dom_location=($2) ORDER BY date_debut DESC";

            client.query(sql, [id, dom], function (err, locationsCLIENTid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(locationsCLIENTid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});



/* GET /locations/idvelo */
router.get('/velo/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

        var sql =  "SELECT * FROM locations "+
        "WHERE velo_location=($1) AND dom_location=($2) ORDER BY date_debut DESC";

            client.query(sql, [id, dom], function (err, locationsVELOid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(locationsVELOid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});



// Returne router
module.exports = router;



/*
Testes unitaires PostMan:
OK
27/12/2015

https://localhost:80/api/oper/locations/finies get
[
    {
        "idlocation": 1,
        "dom_location": "test",
        "client_location": 5,
        "velo_location": 1,
        "position_debut": {
            "x": 50.4365114245549,
            "y": 3.92573744058609
        },
        "station_debut": 36,
        "date_debut": "2015-12-22T12:15:00.000Z",
        "position_fin": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        },
        "station_fin": 37,
        "date_fin": "2015-12-22T13:20:00.000Z",
        "duree": 65
    },
    {
        "idlocation": 2,
        "dom_location": "test",
        "client_location": 5,
        "velo_location": 3,
        "position_debut": {
            "x": 50.4365259206974,
            "y": 3.9243346452713
        },
        "station_debut": 37,
        "date_debut": "2015-12-22T08:00:00.000Z",
        "position_fin": {
            "x": 50.4365114245549,
            "y": 3.92573744058609
        },
        "station_fin": 36,
        "date_fin": "2015-12-22T08:15:56.164Z",
        "duree": 16
    }
]


https://localhost:80/api/oper/locations/finies/1 get
[
    {
        "idlocation": 1,
        "dom_location": "test",
        "client_location": 5,
        "velo_location": 1,
        "position_debut": {
            "x": 50.4365114245549,
            "y": 3.92573744058609
        },
        "station_debut": 36,
        "date_debut": "2015-12-22T12:15:00.000Z",
        "position_fin": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        },
        "station_fin": 37,
        "date_fin": "2015-12-22T13:20:00.000Z",
        "duree": 65
    }
]


https://localhost:80/api/oper/locations/encours get

[
    {
        "idlocation": 3,
        "dom_location": "test",
        "client_location": 5,
        "velo_location": 2,
        "position_debut": {
            "x": 50.4365259206974,
            "y": 3.9243346452713
        },
        "station_debut": 37,
        "date_debut": "2015-12-22T13:41:46.509Z",
        "position_fin": null,
        "station_fin": null,
        "date_fin": null
    }
]


https://localhost:80/api/oper/locations/encours/3 get

[
    {
        "idlocation": 3,
        "dom_location": "test",
        "client_location": 5,
        "velo_location": 2,
        "position_debut": {
            "x": 50.4365259206974,
            "y": 3.9243346452713
        },
        "station_debut": 37,
        "date_debut": "2015-12-22T13:41:46.509Z",
        "position_fin": null,
        "station_fin": null,
        "date_fin": null
    }
]


*/