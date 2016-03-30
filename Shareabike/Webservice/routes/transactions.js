/*
Kaysarov
Mis à jours : 23/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var math = require('mathjs');



/* GET /transactions listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idtransaction, dom_transaction, client_transaction, location, "+
        "date_transaction, montant, bonus, nature_transaction, justification, auteur, "+
        "nom_client, nom FROM transactions "+
        "INNER JOIN clients ON transactions.client_transaction = clients.idclient "+
        "LEFT JOIN admins ON transactions.auteur = admins.idadmin "+
        "ORDER BY date_transaction DESC";
        client.query(sql, function (err, transactions_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(transactions_get.rows);            
        });
    });
});

/* GET /transactions/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

        var sql =  "SELECT idtransaction, dom_transaction, client_transaction, location, "+
        "date_transaction, montant, bonus, nature_transaction, justification, auteur, "+
        "nom_client, nom FROM transactions "+
        "INNER JOIN clients ON transactions.client_transaction = clients.idclient "+
        "LEFT JOIN admins ON transactions.auteur = admins.idadmin "+
        "WHERE idtransaction=($1)";

            client.query(sql, [id], function (err, transactionsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(transactionsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});

/* GET /transactions/idclient */
router.get('/client/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

        var sql =  "SELECT idtransaction, dom_transaction, client_transaction, location, "+
        "date_transaction, montant, bonus, nature_transaction, justification, auteur, "+
        "nom_client, nom FROM transactions "+
        "INNER JOIN clients ON transactions.client_transaction = clients.idclient "+
        "LEFT JOIN admins ON transactions.auteur = admins.idadmin "+
        "WHERE client_transaction=($1)";

            client.query(sql, [id], function (err, transactionsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(transactionsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* POST /transactions  Ajouter une transaction manuelle et mettre à jour le solde de l'utilisateur */
router.post('/', function(req, res, next) {
    var modifpar = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
    var date = new Date();
    var montant = req.body.montant;
    if(montant != 0) montant = math.round(req.body.montant, 2);
    if (modifpar != undefined) {
        var nature_transaction = true;
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO transactions " +
        "(dom_transaction, client_transaction, location, "+
        "montant, bonus, nature_transaction, justification, auteur) "+
        "values($1, $2, $3, $4, $5, $6, $7, $8)";
        var data_post = [
            req.body.dom_transaction, 
            req.body.client_transaction, 
            req.body.location, 
            montant, 
            req.body.bonus, 
            nature_transaction, 
            req.body.justification, 
            modifpar];

        client.query(sql, data_post, function (err, transaction_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }

            var sql2 = "UPDATE clients SET "+ 
            "solde_montant=(solde_montant + $2), solde_bonus=(solde_bonus + $3), solde_date=($4) "+
            "WHERE idclient=($1)";
            var data_post2 = [
            req.body.client_transaction, 
            montant, 
            req.body.bonus, 
            date];

            client.query(sql2, data_post2, function (err, transaction_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }                 
                done();
                return res.json(transaction_post.rows);            
            }); 
        });
            
    });
    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };
});



// Returne router
module.exports = router;



/*
Testes unitaires PostMan:
OK
11/12/2015

https://localhost:80/api/expl/transactions get
[
    {
        "idtransaction": 1,
        "dom_transaction": "test",
        "client_transaction": 5,
        "location": 1,
        "date_transaction": "2015-12-22T13:20:00.000Z",
        "montant": "-7",
        "bonus": 2,
        "nature_transaction": true,
        "justification": "enregistrement de location 1 pour client 5",
        "auteur": 23,
        "nom_client": "Toulemonde",
        "nom": "Testeur"
    },
    {
        "idtransaction": 2,
        "dom_transaction": "test",
        "client_transaction": 5,
        "location": 2,
        "date_transaction": "2015-12-22T08:16:00.000Z",
        "montant": "-1.5",
        "bonus": 0,
        "nature_transaction": false,
        "justification": "enregistrement automatique",
        "auteur": null,
        "nom_client": "Toulemonde",
        "nom": null
    }
]

https://localhost:80/api/expl/transactions/1 get
[
    {
        "idtransaction": 1,
        "dom_transaction": "test",
        "client_transaction": 5,
        "location": 1,
        "date_transaction": "2015-12-22T13:20:00.000Z",
        "montant": "-7",
        "bonus": 2,
        "nature_transaction": true,
        "justification": "enregistrement de location 1 pour client 5",
        "auteur": 23,
        "nom_client": "Toulemonde",
        "nom": "Testeur"
    }
]


https://localhost:80/api/expl/transactions  post

[
    {
        "idtransaction": 1,
        "dom_transaction": "test",
        "client_transaction": 5,
        "location": 1,
        "date_transaction": "2015-12-22T13:20:00.000Z",
        "montant": "-7",
        "bonus": 2,
        "nature_transaction": true,
        "justification": "enregistrement de location 1 pour client 5",
        "auteur": 23,
    }
]


*/