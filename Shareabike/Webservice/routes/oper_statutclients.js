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



/* GET /statutclients listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM statutclients ORDER BY idstatutclient ASC";
        client.query(sql, function (err, statutclients_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(statutclients_get.rows);            
        });
    });
});




// Returne router
module.exports = router;



/*
Testes unitaires PostMan:
OK
16/12/2015

https://localhost:80/oper/expl/statutclients get

[
    {
        "idstatutclient": 1,
        "nom_statut_fr": "actif",
        "nom_statut_en": null
    },
    {
        "idstatutclient": 2,
        "nom_statut_fr": "en attente",
        "nom_statut_en": null
    },
    {
        "idstatutclient": 3,
        "nom_statut_fr": "suspendu",
        "nom_statut_en": null
    }
]



*/