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

/* Role operateur 
GET/:id
PUT/:id

*/
//var recupererID = require('../lib/recupererID');

/* GET /admins/id */
router.get('/', function(req, res, next) {
  var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;

    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {
            var sql = "SELECT idadmin, nom, adresse, cp, tel, gsm, login, password "+ 
            "FROM admins  WHERE idadmin=($1) AND desact=FALSE";
            client.query(sql, [id], function (err, adminsid_get){
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
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }
});




/* PUT /admins/:id */
router.put('/', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE admins SET "+
            "nom=($1), adresse=($2), cp=($3), tel=($4), gsm=($5), login=($6) "+
            "WHERE idadmin=($7) AND desact=FALSE";
            var data_post = [
            req.body.nom, 
            req.body.adresse, 
            req.body.cp, 
            req.body.tel, 
            req.body.gsm,
            req.body.login, 
            id ];

            client.query(sql, data_post, function (err, admins_put){

                if (err) {
                    res.status(400);
                    return res.json({"status": 400, "message": err});
                }
                var sql = "SELECT idadmin, nom, adresse, cp, tel, gsm, login, password "+ 
                "FROM admins  WHERE idadmin=($1) AND desact=FALSE";                
                client.query(sql, [id], function (err, admins_put){

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
        return res.json({"status": 401, "message": "Accès non autorisé"});
    }
});

/* PUT /admins/password/:id */
router.put('/pass/word', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
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
                    return res.json({"status": 400, "message": err});
                }
                var sql = "SELECT idadmin, nom, adresse, cp, tel, gsm, login, password "+ 
                "FROM admins  WHERE idadmin=($1) AND desact=FALSE";                  
                client.query(sql, [id], function (err, admin_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(admin_put.rows);            
                }); 
            });
        });
        } else {
        res.status(401);
        return res.json({"status": 401, "message": "password error"});
    };

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "Accès non autorisé"});
    };
});



// Returne router
module.exports = router;