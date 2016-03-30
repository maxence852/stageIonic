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



/* GET /gpsvelos listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idgpsvelo, pucegps, date_position, position, "+ 
        "dom_velo FROM gpsvelos "+
        "INNER JOIN velos ON gpsvelos.pucegps = velos.pucegps_velo ORDER BY dom_velo ASC";
        client.query(sql, function (err, gpsvelos_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(gpsvelos_get.rows);            
        });
    });
});


/* POST /gpsvelos */
router.post('/', function(req, res, next) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO gpsvelos " +
        "(pucegps, position) values($1, $2)";
        var data_post = [
            req.body.pucegps,
            req.body.position];

        client.query(sql, data_post, function (err, gpsvelos_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM gpsvelos ORDER BY idgpsvelo DESC", function (err, gpsvelos_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(gpsvelos_post.rows);            
            }); 
        });
            
    });
});


/* GET /gpsvelos/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM gpsvelos  WHERE idgpsvelo=($1)", [id], function (err, gpsvelosid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(gpsvelosid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /gpsvelos/velo/pucegps */
router.get('/velo/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM gpsvelos  WHERE pucegps=($1) ORDER BY date_position DESC", [id], function (err, gpsid_get){
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



/* PUT /gpsvelos/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var date = new Date();
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE gpsvelos SET pucegps=($1), position=($2), date_position=($3) WHERE idgpsvelo=($4)";
            var data_post = [
            req.body.pucegps,
            req.body.position,
            date, id];

            client.query(sql, data_post, function (err, gpsvelos_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM gpsvelos  WHERE idgpsvelo=($1)", [id], function (err, gpsvelos_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(gpsvelos_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});


/* DELETE /gpsvelos/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM gpsvelos WHERE idgpsvelo=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM gpsvelos ORDER BY idgpsvelo ASC", function (err, cb){

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

https://localhost:80/api/expl/gpsvelos get

[
    {
        "idgpsvelo": 1,
        "pucegps": "0488555555",
        "date_position": "2015-12-16T08:24:16.121Z",
        "position": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        }
    }
]

https://localhost:80/api/expl/gpsvelos/1 get

[
    {
        "idgpsvelo": 1,
        "pucegps": "0488555555",
        "date_position": "2015-12-16T08:24:16.121Z",
        "position": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        }
    }
]

https://localhost:80/api/expl/gpsvelos/velo/0488555555
[
    {
        "idgpsvelo": 1,
        "pucegps": "0488555555",
        "date_position": "2015-12-16T08:24:16.121Z",
        "position": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        }
    },
    {
        "idgpsvelo": 2,
        "pucegps": "0488555555",
        "date_position": "2015-12-15T08:24:16.121Z",
        "position": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        }
    }    
]


https://localhost:80/api/expl/gpsvelos post
[
    {
        "idgpsvelo": 1,
        "pucegps": "0488555555",
        "date_position": "2015-12-16T08:24:16.121Z",
        "position": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        }
    }
]

https://localhost:80/api/expl/gpsvelos/2 put

[
    {
        "idgpsvelo": 2,
        "pucegps": "0488555555",
        "date_position": "2015-12-17T08:24:16.121Z",
        "position": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        }
    }
]


https://localhost:80/api/expl/gpsvelos/2 delete
[]


*/