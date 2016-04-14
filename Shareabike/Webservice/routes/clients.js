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
var jwt = require('jwt-simple');
var secret = require('../config/secret');


/* GET /clients listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        /*var sql =  "SELECT idclient, nom_client, prenom_client, cp_client, adresse_client, "+
        "gsm_client, pin_code, login_client, password_client, statut_client, solde_montant, "+
        "solde_bonus, solde_date, modif_par, date_modif, date_creation, desact_client, "+ 
        "nom_statut_fr, cpville, nomville, nom FROM clients "+
        "INNER JOIN villes ON  clients.cp_client = villes.idville "+
        "INNER JOIN statutclients ON  clients.statut_client = statutclients.idstatutclient "+
        "INNER JOIN admins ON  clients.modif_par = admins.idadmin "+
        "ORDER BY idclient ASC";*/

        //modif by Maxence
        var sql =  "SELECT idclient, nom_client, prenom_client, pseudo_client, pays_client, codePostal_client, ville_client, adresse_client, "+
            "numMaison_client, gsm_client, pin_code, login_client, password_client, statut_client, solde_montant, "+
            "solde_bonus, solde_date, modif_par, date_modif, date_creation, desact_client, "+
            "nom_statut_fr, nom FROM clients "+
            "INNER JOIN statutclients ON  clients.statut_client = statutclients.idstatutclient "+
            "INNER JOIN admins ON  clients.modif_par = admins.idadmin "+
            "ORDER BY idclient ASC";
        client.query(sql, function (err, clients_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(clients_get.rows);            
        });
    });
});


/* GET /clients listing. */ 
router.get('/list/actifs', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idclient, nom_client FROM clients "+
        "WHERE statut_client=1 AND desact_client=FALSE "+
        "ORDER BY idclient ASC";
        client.query(sql, function (err, clients_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(clients_get.rows);            
        });
    });
});


/* POST /clients */
router.post('/', function(req, res, next) {
    var modifpar = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
    if (modifpar != undefined) {
    if(req.body.password_client.length >= 8){
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO clients " +
        "(nom_client, prenom_client, cp_client, adresse_client, "+
        "gsm_client, pin_code, login_client, password_client, statut_client, solde_montant, "+
        "solde_bonus, modif_par) "+
        "values($1, $2, $3, $4, $5, crypt(($6), gen_salt('bf',5)), "+
        "$7, crypt(($8), gen_salt('bf',6)), $9, $10, $11, $12)";
        var data_post = [
            req.body.nom_client, 
            req.body.prenom_client, 
            req.body.cp_client, 
            req.body.adresse_client, 
            req.body.gsm_client, 
            req.body.pin_code, 
            req.body.login_client, 
            req.body.password_client, 
            req.body.statut_client,
            req.body.solde_montant, 
            req.body.solde_bonus,
            modifpar];

        client.query(sql, data_post, function (err, clients_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM clients ORDER BY idclient ASC", function (err, clients_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(clients_post.rows);            
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


/* GET /clients/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql =  "SELECT idclient, nom_client, prenom_client, cp_client, adresse_client, "+
            "gsm_client, pin_code, login_client, password_client, statut_client, solde_montant, "+
            "solde_bonus, solde_date, modif_par, date_modif, date_creation, desact_client, "+ 
            "nom_statut_fr, cpville, nomville, nom FROM clients "+
            "INNER JOIN villes ON  clients.cp_client = villes.idville "+
            "INNER JOIN statutclients ON  clients.statut_client = statutclients.idstatutclient "+
            "INNER JOIN admins ON  clients.modif_par = admins.idadmin "+
            "WHERE idclient=($1)";
            client.query(sql, [id], function (err, clientsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(clientsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* PUT /clients/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var date = new Date();
    var modifpar = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
    if (modifpar != undefined || id != undefined) { 
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE clients SET "+
            "nom_client=($1), prenom_client=($2), cp_client=($3), adresse_client=($4), gsm_client=($5), "+
            "statut_client=($6), desact_client=($7), date_modif=($8), modif_par=($9) "+
            "WHERE idclient=($10)";
            var data_post = [
            req.body.nom_client, 
            req.body.prenom_client, 
            req.body.cp_client, 
            req.body.adresse_client, 
            req.body.gsm_client, 
            req.body.statut_client,
            req.body.desact_client,            
            date, modifpar, id];

            client.query(sql, data_post, function (err, clients_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM clients  WHERE idclient=($1)", [id], function (err, clients_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(clients_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    }
});




/* PUT /clients/solde/:idclient */
/*
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) { 
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE clients SET "+
            "solde_montant=($1), solde_bonus=($2), solde_date=($3) "+
            "WHERE idclient=($4)";
            var data_post = [
            req.body.solde_montant, 
            req.body.solde_bonus, 
            req.body.solde_date, 
            id];

            client.query(sql, data_post, function (err, clients_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                var sql2 = "SELECT solde_montant, solde_bonus, solde_date FROM clients  WHERE idclient=($1)";
                client.query(sql2, [id], function (err, clients_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(clients_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    }
});

*/



/* PUT /clients/password/:id */
/*
router.put('/password/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        if(req.body.password == req.body.password_repet && req.body.password.length >= 8){
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE clients SET "+
            "password = crypt(($1), gen_salt('bf',8)) WHERE idclient=($2)";
            var data_post = [
            req.body.password, 
            id ];

            client.query(sql, data_post, function (err, admin_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                };
                client.query("SELECT * FROM clients  WHERE idclient=($1)", [id], function (err, admin_put){

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
*/

/* DELETE /clients/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM clients WHERE idclient=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM clients ORDER BY idclient ASC", function (err, cb){

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

https://localhost:80/api/expl/clients get

[
    {
        "idclient": 1,
        "nom_client": "Test",
        "prenom_client": "t",
        "cp_client": 1,
        "adresse_client": "Rue Test",
        "gsm_client": "0478123456",
        "pin_code": "1234",
        "login_client": "test@client.com",
        "password_client": "12345678",
        "statut_client": 1,
        "solde_montant": null,
        "solde_bonus": null,
        "solde_date": "2015-12-16T21:17:35.790Z",
        "modif_par": 1,
        "date_modif": "2015-12-16T21:17:35.790Z",
        "date_creation": "2015-12-16T21:17:35.790Z",
        "desact_client": false,
        "cpville": "9420",
        "nomville": "Aaigem",
        "nom": "UMONS"
    }
]

https://localhost:80/api/expl/clients/1 get

[
    {
        "idclient": 1,
        "nom_client": "Test",
        "prenom_client": "t",
        "cp_client": 1,
        "adresse_client": "Rue Test",
        "gsm_client": "0478123456",
        "pin_code": "1234",
        "login_client": "test@client.com",
        "password_client": "***********",
        "statut_client": 1,
        "solde_montant": null,
        "solde_bonus": null,
        "solde_date": "2015-12-16T21:17:35.790Z",
        "modif_par": 1,
        "date_modif": "2015-12-16T21:17:35.790Z",
        "date_creation": "2015-12-16T21:17:35.790Z",
        "desact_client": false
    }
]


https://localhost:80/api/expl/clients post
[
    {
        "idclient": 2,
        "nom_client": "Test2",
        "prenom_client": "t",
        "cp_client": 1,
        "adresse_client": "Rue Test",
        "gsm_client": "0478123456",
        "pin_code": "1234",
        "login_client": "test@client.com",
        "password_client": "*************",
        "statut_client": 1,
        "solde_montant": null,
        "solde_bonus": null,
        "solde_date": "2015-12-16T21:17:35.790Z",
        "modif_par": 1,
        "date_modif": "2015-12-16T21:17:35.790Z",
        "date_creation": "2015-12-16T21:17:35.790Z",
        "desact_client": false
    }
]

https://localhost:80/api/expl/clients/2 put

[
    {
        "idclient": 2,
        "nom_client": "Test2 modifié",
        "prenom_client": "t",
        "cp_client": 1,
        "adresse_client": "Rue Test",
        "gsm_client": "0478123456",
        "pin_code": "1234",
        "login_client": "test@client.com",
        "password_client": "*************",
        "statut_client": 1,
        "solde_montant": null,
        "solde_bonus": null,
        "solde_date": "2015-12-16T21:17:35.790Z",
        "modif_par": 1,
        "date_modif": "2015-12-16T21:17:35.790Z",
        "date_creation": "2015-12-16T21:17:35.790Z",
        "desact_client": false
    }
]


https://localhost:80/api/expl/clients/2 delete
[]


*/