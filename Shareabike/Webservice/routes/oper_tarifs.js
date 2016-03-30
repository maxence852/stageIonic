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



/* GET /tarifs listing. */ 
router.get('/', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {    
        pg.connect(databaseURL, function(err, client, done) {
            // SQL Query
            var sql =  "SELECT * FROM tarifs WHERE dom_tarif=($1) AND desact_tarif=FALSE";
            client.query(sql, [id], function (err, tarifs_get){
            // Erreurs
                if (err) return next(err);
                done();
                return res.json(tarifs_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }        
});


/* POST /tarifs */
router.post('/', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
         pg.connect(databaseURL, function(err, client, done) {
          

            var sql = "INSERT INTO tarifs " +
            "(dom_tarif, nom_tarif, duree_gratuit, prix_1, duree_1, prix_2, "+
            "duree_2, prix_3, duree_3, prix_plus, prix_reservation, descript_tarif) "+
            "values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";

            var data_post = [
                id,
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
                client.query("SELECT * FROM tarifs ", function (err, tarifs_post){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(tarifs_post.rows);            
                }); 
            });
                
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }
});


/* GET /tarifs/id */
router.get('/:id', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;    
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {
            var sql = "SELECT * FROM tarifs  WHERE idtarif=($1) AND dom_tarif=($2) AND desact_tarif=FALSE";
            client.query(sql, [id, dom], function (err, tarifsid_get){
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
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;     
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE tarifs SET "+
            "nom_tarif=($2), duree_gratuit=($3), prix_1=($4), "+
            "duree_1=($5), prix_2=($6), duree_2=($7), prix_3=($8), "+
            "duree_3=($9), prix_plus=($10), prix_reservation=($11), descript_tarif=($12) "+
            "WHERE idtarif=($13) AND dom_tarif=($1) AND desact_tarif=FALSE ";
            var data_post = [
            dom, 
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
            id];

            client.query(sql, data_post, function (err, tarifs_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM tarifs  WHERE idtarif=($1) AND dom_tarif=($2)", [id, dom], function (err, tarifs_put){

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
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    pg.connect(databaseURL, function(err, client, done) {
                var sql = "UPDATE tarifs SET desact_tarif=TRUE "+
                "WHERE idtarif=($1) AND dom_tarif=($2)";
        client.query(sql, [id, dom], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM tarifs WHERE idtarif=($1) AND dom_tarif=($2) AND desact_tarif=FALSE ", [id, dom], function (err, cb){

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

https://localhost:80/api/oper/tarifs get
[
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

https://localhost:80/api/oper/tarifs/5 get
[
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


https://localhost:80/api/oper/tarifs post
[
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

https://localhost:80/api/oper/tarifs/5 put

[
    {
        "idtarif": 5,
        "dom_tarif": "test",
        "nom_tarif": "tarif+modif",
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


https://localhost:80/api/oper/tarifs/5 delete
[]




*/