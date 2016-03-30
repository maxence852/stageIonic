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
var jwt = require('jwt-simple');
var secret = require('../config/secret');



/* GET /tarifs listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM tarifs ORDER BY dom_tarif ASC";
        client.query(sql, function (err, tarifs_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(tarifs_get.rows);            
        });
    });
});


/* POST /tarifs */
router.post('/', function(req, res, next) {

     pg.connect(databaseURL, function(err, client, done) {
      

        var sql = "INSERT INTO tarifs " +
        "(dom_tarif, nom_tarif, duree_gratuit, prix_1, duree_1, prix_2, "+
        "duree_2, prix_3, duree_3, prix_plus, prix_reservation, descript_tarif) "+
        "values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";

        var data_post = [
            req.body.dom_tarif, 
            req.body.nom_tarif, 
            req.body.duree_gratuit, 
            req.body.prix_1,
            req.body.duree_1,
            req.body.prix_2,
            req.body.duree_2,
            req.body.prix_3,
            req.body.duree_3,
            req.body.prix_plus,
            req.body.prix_reservation,
            req.body.descript_tarif];


        client.query(sql, data_post, function (err, tarifs_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM tarifs ORDER BY dom_tarif ASC", function (err, tarifs_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(tarifs_post.rows);            
            }); 
        });
            
    });

});


/* GET /tarifs/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM tarifs  WHERE idtarif=($1)", [id], function (err, tarifsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(tarifsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /tarifs/domaine/iddomaine */
router.get('/domaine/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM tarifs  WHERE dom_tarif=($1)", [id], function (err, tarifsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(tarifsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* PUT /tarifs/:id  */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE tarifs SET "+
            "dom_tarif=($1), nom_tarif=($2), duree_gratuit=($3), prix_1=($4), "+
            "duree_1=($5), prix_2=($6), duree_2=($7), prix_3=($8), "+
            "duree_3=($9), prix_plus=($10), prix_reservation=($11), descript_tarif=($12), desact_tarif=($13) "+
            "WHERE idtarif=($14)";
            var data_post = [
            req.body.dom_tarif, 
            req.body.nom_tarif, 
            req.body.duree_gratuit, 
            req.body.prix_1,
            req.body.duree_1,
            req.body.prix_2,
            req.body.duree_2,
            req.body.prix_3,
            req.body.duree_3,
            req.body.prix_plus,
            req.body.prix_reservation,
            req.body.descript_tarif,
            req.body.desact_tarif,
            id];

            client.query(sql, data_post, function (err, tarifs_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM tarifs  WHERE idtarif=($1)", [id], function (err, tarifs_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(tarifs_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };

});



/* DELETE /tarifs/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM tarifs WHERE idtarif=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM tarifs ORDER BY idtarif ASC", function (err, cb){

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

https://localhost:80/api/expl/tarifs get
[
    {
        "idtarif": 6,
        "dom_tarif": "Bike7",
        "nom_tarif": "mobil+",
        "duree_gratuit": 10,
        "prix_1": 0.05,
        "duree_1": 60,
        "prix_2": 0.07,
        "duree_2": 90,
        "prix_3": 0.08,
        "duree_3": 120,
        "prix_plus": 0.1,
        "prix_reservation": 1,
        "descript_tarif": "tarif zoning",
        "desact_tarif": false
    },
    {
        "idtarif": 1,
        "dom_tarif": "test",
        "nom_tarif": "normal",
        "duree_gratuit": 10,
        "prix_1": 0.15,
        "duree_1": 30,
        "prix_2": 0.1,
        "duree_2": 60,
        "prix_3": 0.5,
        "duree_3": 90,
        "prix_plus": 0.3,
        "prix_reservation": 2,
        "descript_tarif": "tarif normal",
        "desact_tarif": false
    },
    {
        "idtarif": 5,
        "dom_tarif": "test",
        "nom_tarif": "tarif+",
        "duree_gratuit": 20,
        "prix_1": 0.05,
        "duree_1": 60,
        "prix_2": 0.1,
        "duree_2": 120,
        "prix_3": 0.15,
        "duree_3": 180,
        "prix_plus": 0.2,
        "prix_reservation": 2,
        "descript_tarif": "tarif croissant",
        "desact_tarif": false
    }
]

https://localhost:80/api/expl/tarifs/6 get
[
    {
        "idtarif": 6,
        "dom_tarif": "Bike7",
        "nom_tarif": "mobil+",
        "duree_gratuit": 10,
        "prix_1": 0.05,
        "duree_1": 60,
        "prix_2": 0.07,
        "duree_2": 90,
        "prix_3": 0.08,
        "duree_3": 120,
        "prix_plus": 0.1,
        "prix_reservation": 1,
        "descript_tarif": "tarif zoning",
        "desact_tarif": false
    }
]


https://localhost:80/api/expl/tarifs post
[
    {
        "idtarif": 6,
        "dom_tarif": "Bike7",
        "nom_tarif": "mobil+",
        "duree_gratuit": 10,
        "prix_1": 0.05,
        "duree_1": 60,
        "prix_2": 0.07,
        "duree_2": 90,
        "prix_3": 0.08,
        "duree_3": 120,
        "prix_plus": 0.1,
        "prix_reservation": 1,
        "descript_tarif": "tarif zoning",
        "desact_tarif": false
    }
]

https://localhost:80/api/expl/tarifs/2 put

[
    {
        "idtarif": 2,
        "dom_tarif": "test",
        "nom_tarif": "normal+",
        "duree_gratuit": 10,
        "prix_1": 0.3,
        "duree_1": 30,
        "prix_2": 0.25,
        "duree_2": 60,
        "prix_3": 0.2,
        "duree_3": 90,
        "prix_plus": 0.15,
        "prix_reservation": 2,
        "descript_tarif": "tarif normal",
        "desact_tarif": false
    }
]


https://localhost:80/api/expl/tarifs/2 delete
[]




*/