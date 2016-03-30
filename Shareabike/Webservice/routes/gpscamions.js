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



/* GET /gpscamions listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idgpscamion, gps, date_position, position, "+
        "dom_camion FROM gpscamions "+
        "INNER JOIN camions ON gpscamions.gps = camions.gps_camion ORDER BY dom_camion ASC";
        client.query(sql, function (err, gpscamions_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(gpscamions_get.rows);            
        });
    });
});


/* POST /gpscamions */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO gpscamions " +
        "(gps, position) values($1, $2)";
        var data_post = [
            req.body.gps,
            req.body.position];

        client.query(sql, data_post, function (err, gpscamions_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM gpscamions ORDER BY idgpscamion ASC", function (err, gpscamions_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(gpscamions_post.rows);            
            }); 
        });
            
    });
});


/* GET /gpscamions/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM gpscamions  WHERE idgpscamion=($1)", [id], function (err, gpscamionsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(gpscamionsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /gpscamions/camion/gps_camion */
router.get('/camion/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM gpscamions  WHERE gps=($1) ORDER BY date_position DESC", [id], function (err, gpsid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(gpsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});



/* PUT /gpscamions/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var date = new Date();
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE gpscamions SET gps=($1), position=($2), date_position=($3) WHERE idgpscamion=($4)";
            var data_post = [
            req.body.gps,
            req.body.position,
            date, id];

            client.query(sql, data_post, function (err, gpscamions_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM gpscamions  WHERE idgpscamion=($1)", [id], function (err, gpscamions_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(gpscamions_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* DELETE /gpscamions/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM gpscamions WHERE idgpscamion=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM gpscamions ORDER BY idgpscamion ASC", function (err, cb){

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

https://localhost:80/api/expl/gpscamions get

[
    {
        "idgpscamion": 1,
        "gps": "0488555555",
        "date_position": "2015-12-11T12:37:28.533Z",
        "position": {
            "x": 50.448542,
            "y": 3.962631
        }
    }
]

https://localhost:80/api/expl/gpscamions/1 get

[
   {
        "idgpscamion": 1,
        "gps": "0488555555",
        "date_position": "2015-12-11T12:37:28.533Z",
        "position": {
            "x": 50.448542,
            "y": 3.962631
        }
    }
]

https://localhost:80/api/expl/gpscamions/camion/0488555555
[
    {
        "idgpscamion": 5,
        "gps": "0488555555",
        "date_position": "2015-12-11T15:19:26.288Z",
        "position": {
            "x": 50.121212,
            "y": 3.56466
        }
    },
    {
        "idgpscamion": 1,
        "gps": "0488555555",
        "date_position": "2015-12-11T12:37:28.533Z",
        "position": {
            "x": 50.448542,
            "y": 3.962631
        }
    }
]


https://localhost:80/api/expl/gpscamions post
[
    {
        "idgpscamion": 1,
        "gps": "0488555555",
        "date_position": "2015-12-11T12:37:28.533Z",
        "position": {
            "x": 50.448542,
            "y": 3.962631
        }
    }
]

https://localhost:80/api/expl/gpscamions/1 put

[
    {
        "idgpscamion": 1,
        "gps": "0488555555",
        "date_position": "2015-12-11T12:40:28.533Z",
        "position": {
            "x": 50.438542,
            "y": 3.972631
        }
    }
]


https://localhost:80/api/expl/gpscamions/1 delete
[]


*/