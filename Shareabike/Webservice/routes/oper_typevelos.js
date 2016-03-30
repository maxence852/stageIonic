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



/* GET /typevelos listing. */ 
router.get('/', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idtypevelo, tarif, dom_typevelo, nom_type_fr, nom_type_en, reservation_possible, "+
        "avertir_sidisponible, deposer_station, descript_type, desact_type, nom_tarif, uri_photovelo FROM typevelos "+
        "INNER JOIN tarifs ON typevelos.tarif = tarifs.idtarif "+
        "WHERE dom_typevelo=($1) AND desact_type=FALSE";
        client.query(sql, [dom], function (err, typevelos_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(typevelos_get.rows);            
        });
    });
});


/* POST /typevelos */
router.post('/', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
     pg.connect(databaseURL, function(err, client, done) {
        var reservation_possible = false; 
        if (req.body.reservation_possible != undefined) reservation_possible =  req.body.reservation_possible;
        var avertir_sidisponible = false; 
        if (req.body.avertir_sidisponible != undefined) avertir_sidisponible =  req.body.avertir_sidisponible;
        var deposer_station = true; 
        if (req.body.deposer_station != undefined) deposer_station =  req.body.deposer_station;       

        var uri_photovelo = '/image/default.png'; 
        if (req.body.uri_photovelo != undefined) uri_photovelo =  req.body.uri_photovelo;

        var sql = "INSERT INTO typevelos " +
        "(tarif, dom_typevelo, nom_type_fr, nom_type_en, reservation_possible, "+
        "avertir_sidisponible, deposer_station, descript_type, uri_photovelo) "+
        "values($1, $2, $3, $4, $5, $6, $7, $8, $9)";

        var data_post = [
            req.body.tarif,
            dom, 
            req.body.nom_type_fr, 
            req.body.nom_type_en, 
            reservation_possible,
            avertir_sidisponible,
            deposer_station,
            req.body.descript_type,
            uri_photovelo];


        client.query(sql, data_post, function (err, typevelos_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM typevelos WHERE dom_typevelo=($1) AND desact_type=FALSE ", [dom], function (err, typevelos_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(typevelos_post.rows);            
            }); 
        });
            
    });

});


/* GET /typevelos/id */
router.get('/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {
            var sql ="SELECT * FROM typevelos  WHERE idtypevelo=($1) AND dom_typevelo=($2) AND desact_type=FALSE";
            client.query(sql, [id, dom], function (err, typevelosid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(typevelosid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});



/* PUT /typevelos/:id  */
router.put('/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE typevelos SET "+
            "nom_type_fr=($2), nom_type_en=($3), reservation_possible=($4), "+
            "avertir_sidisponible=($5), deposer_station=($6), descript_type=($7), "+
            "tarif=($8), uri_photovelo=($9) "+
            "WHERE idtypevelo=($10) AND dom_typevelo=($1) AND desact_type=FALSE";
            var data_post = [
            dom, 
            req.body.nom_type_fr, 
            req.body.nom_type_en, 
            req.body.reservation_possible,
            req.body.avertir_sidisponible,
            req.body.deposer_station,
            req.body.descript_type,
            req.body.tarif,
            req.body.uri_photovelo,
            id];

            client.query(sql, data_post, function (err, typevelos_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM typevelos  WHERE idtypevelo=($1)", [id], function (err, typevelos_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(typevelos_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };

});



/* DELETE /typevelos/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
                var sql = "UPDATE typevelos SET desact_type=TRUE "+
                "WHERE idtypevelo=($1) AND dom_typevelo=($2)";
        client.query(sql, [id, dom], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM typevelos WHERE idtypevelo=($1) AND dom_typevelo=($2) AND desact_type=FALSE", [id, dom], function (err, cb){

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

https://localhost:80/api/oper/typevelos get
[
    {
        "idtypevelo": 1,
        "tarif": 1,
        "dom_typevelo": "test",
        "nom_type_fr": "ville",
        "nom_type_en": null,
        "reservation_possible": false,
        "avertir_sidisponible": false,
        "deposer_station": true,
        "descript_type": "vélo classique",
        "desact_type": false,
        "nom_tarif": "normal"
    }
]

https://localhost:80/api/oper/typevelos/1 get
[
    {
        "idtypevelo": 1,
        "tarif": 1,
        "dom_typevelo": "test",
        "nom_type_fr": "ville",
        "nom_type_en": null,
        "reservation_possible": false,
        "avertir_sidisponible": false,
        "deposer_station": true,
        "descript_type": "vélo classique",
        "desact_type": false,
        "nom_tarif": "normal"
    }
]


https://localhost:80/api/oper/typevelos post
[
    {
        "idtypevelo": 1,
        "tarif": 1,
        "dom_typevelo": "test",
        "nom_type_fr": "ville",
        "nom_type_en": null,
        "reservation_possible": false,
        "avertir_sidisponible": false,
        "deposer_station": true,
        "descript_type": "vélo classique",
        "desact_type": false,
        "nom_tarif": "normal"
    }
]

https://localhost:80/api/oper/typevelos/1 put

[
    {
        "idtypevelo": 1,
        "tarif": 1,
        "dom_typevelo": "test",
        "nom_type_fr": "ville modifié",
        "nom_type_en": null,
        "reservation_possible": false,
        "avertir_sidisponible": false,
        "deposer_station": true,
        "descript_type": "vélo classique",
        "desact_type": false,
        "nom_tarif": "normal"
    }
]


https://localhost:80/api/oper/typevelos/1 delete
[]




*/