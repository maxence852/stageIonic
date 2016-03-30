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



/* GET /velos listing. */ 
router.get('/', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idvelo, station_velo, type_velo, statut_velo, date_statut, "+     
        "dom_velo, tarif_velo, uri_photovelo, position_velo, code_cadenas, code_ecadenas, pucegps_velo, "+
        "desact_velo, nom_station, nom_type_fr, nom_statut_fr, activ_ecadenas, activ_pucegps FROM velos "+
        "INNER JOIN stations ON velos.station_velo = stations.idstation "+
        "INNER JOIN typevelos ON velos.type_velo = typevelos.idtypevelo "+
        "INNER JOIN statutvelos ON velos.statut_velo = statutvelos.idstatutvelo "+
        "INNER JOIN domaines ON velos.dom_velo = domaines.iddomaine "+
        "WHERE dom_velo=($1) AND desact_velo=FALSE ORDER BY idvelo ASC";
        client.query(sql, [dom], function (err, velos_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(velos_get.rows);            
        });
    });
});


/* POST /velos */
router.post('/', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO velos " +
        "(station_velo, type_velo, statut_velo, dom_velo, tarif_velo, "+
        "position_velo, code_cadenas, code_ecadenas, pucegps_velo) "+
        "values($1, $2, $3, $4, $5, $6, $7, $8, $9)";
        var data_post = [
            req.body.station_velo,
            req.body.type_velo,
            req.body.statut_velo,
            dom,
            req.body.tarif_velo,
            req.body.position_velo,
            req.body.code_cadenas,
            req.body.code_ecadenas,
            req.body.pucegps_velo];

        client.query(sql, data_post, function (err, velos_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM velos WHERE dom_velo=($1) AND desact_velo=FALSE ORDER BY idvelo ASC", [dom], function (err, velos_post){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(velos_post.rows);            
            }); 
        });
            
    });
});


/* GET /velos/id */
router.get('/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql =  "SELECT idvelo, station_velo, type_velo, statut_velo, date_statut, "+     
            "dom_velo, tarif_velo, uri_photovelo, position_velo, code_cadenas, code_ecadenas, pucegps_velo, "+
            "desact_velo, nom_station, nom_type_fr, nom_statut_fr, activ_ecadenas, activ_pucegps FROM velos "+
            "INNER JOIN stations ON velos.station_velo = stations.idstation "+
            "INNER JOIN typevelos ON velos.type_velo = typevelos.idtypevelo "+
            "INNER JOIN statutvelos ON velos.statut_velo = statutvelos.idstatutvelo "+
            "INNER JOIN domaines ON velos.dom_velo = domaines.iddomaine "+
            "WHERE idvelo=($1) AND dom_velo=($2) AND desact_velo=FALSE";

            client.query(sql, [id, dom], function (err, velosid_get){
                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(velosid_get.rows);            
            });
        });
    } else {
        res.status(400);
        log.info(err);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /velos/:id */
router.put('/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    var date = new Date();
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE velos SET station_velo=($1), type_velo=($2), statut_velo=($3), "+
            "tarif_velo=($5), "+
            "position_velo=($6), code_cadenas=($7), code_ecadenas=($8), "+
            "pucegps_velo=($9), date_statut=($10)  WHERE idvelo=($11) AND dom_velo=($4) ";
            var data_post = [
            req.body.station_velo,
            req.body.type_velo,
            req.body.statut_velo,
            dom,
            req.body.tarif_velo,
            req.body.position_velo,
            req.body.code_cadenas,
            req.body.code_ecadenas,
            req.body.pucegps_velo,
            date, id];

            client.query(sql, data_post, function (err, velos_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM velos  WHERE idvelo=($1) AND dom_velo=($2) AND desact_velo=FALSE", [id, dom], function (err, velos_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(velos_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});




/* PUT /velos/:id Mettre à jour la position de vélo */
router.put('/point/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE velos SET "+
            "position_velo=($1) WHERE idvelo=($2) AND dom_velo=($3) AND desact_velo=FALSE";
            var data_post = [req.body.position_velo, id, dom];

            client.query(sql, data_post, function (err, velo_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM velos  WHERE idvelo=($1) AND dom_velo=($2) AND desact_velo=FALSE", [id, dom], function (err, velo_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(velo_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };
});




/* DELETE /velos/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
            var sql = "UPDATE velos SET "+
            "desact_velo=TRUE WHERE idvelo=($1) AND dom_velo=($2) ";
        client.query(sql, [id, dom], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM velos WHERE idvelo=($1) AND dom_velo=($2) AND desact_velo=FALSE", [id, dom], function (err, cb){

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

https://localhost:80/api/oper/velos get
[
    {
        "idvelo": 1,
        "station_velo": 37,
        "type_velo": 1,
        "statut_velo": 1,
        "date_statut": "2015-12-16T12:37:31.369Z",
        "dom_velo": "test",
        "tarif_velo": 1,
        "uri_photovelo": "/image/bike-city.jpg",
        "position_velo": {
            "x": 50.4368098586177,
            "y": 3.9245867729187
        },
        "code_cadenas": "1234",
        "code_ecadenas": null,
        "pucegps_velo": "0488555555",
        "desact_velo": false,
        "nom_station": "wapi",
        "nom_type_fr": "ville",
        "nom_statut_fr": "disponible",
        "activ_ecadenas": true,
        "activ_pucegps": true
    },....

]


https://localhost:80/api/oper/velos/3 get
[
    {
        "idvelo": 3,
        "station_velo": 36,
        "type_velo": 1,
        "statut_velo": 1,
        "date_statut": "2015-12-16T17:48:37.647Z",
        "dom_velo": "test",
        "tarif_velo": 1,
        "uri_photovelo": "/image/bike-city.jpg",
        "position_velo": {
            "x": 50.4318019157836,
            "y": 3.92491467297077
        },
        "code_cadenas": null,
        "code_ecadenas": null,
        "pucegps_velo": null,
        "desact_velo": false,
        "nom_station": "sos+",
        "nom_type_fr": "ville",
        "nom_statut_fr": "disponible",
        "activ_ecadenas": true,
        "activ_pucegps": true
    }
]

https://localhost:80/api/expl/velos post
[
    {
        "idvelo": 1,
        "station_velo": 36,
        "type_velo": 1,
        "statut_velo": 1,
        "date_statut": "2015-12-15T17:09:40.570Z",
        "dom_velo": "test",
        "tarif_velo": 1,
        "uri_photovelo": "/image/default.jpg",
        "position_velo": null,
        "code_cadenas": "1234",
        "code_ecadenas": null,
        "pucegps_velo": null,
        "desact_velo": false
 
    }
]

https://localhost:80/api/oper/velos/1 put

[
    {
        "idvelo": 1,
        "station_velo": 36,
        "type_velo": 1,
        "statut_velo": 1,
        "date_statut": "2015-12-15T17:09:40.570Z",
        "dom_velo": "test",
        "tarif_velo": 1,
        "position_velo": null,
        "code_cadenas": "1234",
        "code_ecadenas": null,
        "pucegps_velo": null,
        "desact_velo": false
 
    }
]


https://localhost:80/api/oper/velos/3 delete
[]


*/