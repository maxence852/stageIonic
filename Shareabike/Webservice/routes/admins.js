/*
Kaysarov
Mis à jours : 10/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');
var jwt = require('jwt-simple');
var secret = require('../config/secret');


/* GET /admins listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM admins "+
        "INNER JOIN villes ON  admins.cp = villes.idville "+
        "INNER JOIN typeadmins ON  admins.type_admin = typeadmins.idtype "+
        "ORDER BY idadmin ASC";
        client.query(sql, function (err, admins_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(admins_get.rows);            
        });
    });
});

/*desact*/
/* POST /admins */
router.post('/', function(req, res, next) {
    var delivrepar = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
    if (delivrepar != undefined) {
    if(req.body.password == req.body.password_repet && req.body.password.length >= 8){
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO admins " +
        "(nom, adresse, cp, tel, gsm, login, password, type_admin, domaine, num_licence, date_valid, delivre_par) "+
        "values($1, $2, $3, $4, $5, $6, crypt(($7), gen_salt('bf',8)), $8, $9, $10, $11, $12)";
        var data_post = [
            req.body.nom, 
            req.body.adresse, 
            req.body.cp, 
            req.body.tel, 
            req.body.gsm, 
            req.body.login, 
            req.body.password, 
            req.body.type_admin,
            req.body.domaine, 
            req.body.num_licence,
            req.body.date_valid, 
            delivrepar  ];

        client.query(sql, data_post, function (err, admins_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM admins ORDER BY idadmin ASC", function (err, admins_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(admins_post.rows);            
            }); 
        });
            
    });
    }  else {
            res.status(401);
            log.info(err);
            return res.json({"status": 401, "message": "password error"});
    };
    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };
});


/* GET /admins/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM admins  WHERE idadmin=($1)", [id], function (err, adminsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(adminsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});




/* PUT /admins/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE admins SET "+
            "nom=($1), adresse=($2), cp=($3), tel=($4), gsm=($5), login=($6), type_admin=($7), desact=($8) "+
            "WHERE idadmin=($9)";
            var data_post = [
            req.body.nom,
            req.body.adresse, 
            req.body.cp, 
            req.body.tel, 
            req.body.gsm, 
            req.body.login,
            req.body.type_admin,
            req.body.desact,
            id ];

            client.query(sql, data_post, function (err, admins_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM admins  WHERE idadmin=($1)", [id], function (err, admins_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(admins_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

/* PUT /admins/password/:id */
router.put('/password/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        if(req.body.password == req.body.password_repet && req.body.password.length >= 8){
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE admins SET "+
            "password = crypt(($1), gen_salt('bf',8)) WHERE idadmin=($2)";
            var data_post = [
            req.body.password, 
            id ];

            client.query(sql, data_post, function (err, admin_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                };
                client.query("SELECT * FROM admins  WHERE idadmin=($1)", [id], function (err, admin_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(admin_put.rows);            
                }); 
            });
        });
        } else {
            res.status(401);
            log.info(err);
            return res.json({"status": 401, "message": "password error"});
    };

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    };
});


/* DELETE /admins/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM admins WHERE idadmin=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM admins ORDER BY idadmin ASC", function (err, cb){

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


https://localhost:80/api/expl/admins get
[
    {
        "idadmin": 1,
        "nom": "UMONS",
        "adresse": "9, rue de Houdain",
        "cp": 1663,
        "tel": "065374030",
        "gsm": "0488777777",
        "login": "test@shareabike.com",
        "password": "$2a$08$HDbF1FNWew4H2vnoO90qhOgn/xMAZXnCv/Up6Gltva.KIiZQ0.uji",
        "type_admin": 1,
        "desact": false,
        "domaine": null,
        "num_licence": null,
        "date_sign": "2015-11-22T11:00:37.542Z",
        "date_valid": null,
        "delivre_par": null,
        "idville": 1663,
        "cpville": "7000",
        "nomville": "Mons",
        "codepays": "BE",
        "idtype": 1,
        "niveau": "-1",
        "nom_fr": "exploitant",
        "nom_en": null,
        "nom_nl": null
    },
    ...

]

https://localhost:80/api/expl/admins/23 get
[
    {
        "idadmin": 23,
        "nom": "Test@",
        "adresse": "100, rue test",
        "cp": 533,
        "tel": "065656565",
        "gsm": "0488111111",
        "login": "test@test.com",
        "password": "$2a$08$8u.Qxuj1QHXLelVS2t8ReeDn.PDLBSYa097AQ/F2HLoTUxVSOC6gO",
        "type_admin": 1,
        "desact": false,
        "domaine": "Bike7",
        "num_licence": "Test-2016-exp",
        "date_sign": "2015-11-22T11:00:37.542Z",
        "date_valid": "2017-12-31T21:00:00.000Z",
        "delivre_par": 1
    }
]

https://localhost:80/api/expl/admins/23 get  put

[
    {
        "idadmin": 23,
        "nom": "Test@modifié",
        "adresse": "100, rue test",
        "cp": 533,
        "tel": "065656565",
        "gsm": "0488111111",
        "login": "test@test.com",
        "password": "$2a$08$8u.Qxuj1QHXLelVS2t8ReeDn.PDLBSYa097AQ/F2HLoTUxVSOC6gO",
        "type_admin": 1,
        "desact": false,
        "domaine": "Bike7",
        "num_licence": "Test-2016-exp",
        "date_sign": "2015-11-22T11:00:37.542Z",
        "date_valid": "2017-12-31T21:00:00.000Z",
        "delivre_par": 1
    }
]

https://localhost:80/api/expl/admins/23 get  delete

[]




*/