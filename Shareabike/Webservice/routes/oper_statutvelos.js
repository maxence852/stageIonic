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



/* GET /statutvelos listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM statutvelos ORDER BY idstatutvelo ASC";
        client.query(sql, function (err, statutvelos_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(statutvelos_get.rows);            
        });
    });
});




// Returne router
module.exports = router;



/*
Testes unitaires PostMan:
OK
26/12/2015

https://localhost:80/api/oper/statutvelos get

[
    {
        "idstatutvelo": 1,
        "nom_statut_fr": "disponible",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 2,
        "nom_statut_fr": "location",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 3,
        "nom_statut_fr": "réservé",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 4,
        "nom_statut_fr": "distribution",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 5,
        "nom_statut_fr": "en panne",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 6,
        "nom_statut_fr": "en entretient",
        "nom_statut_en": null
    },
    {
        "idstatutvelo": 7,
        "nom_statut_fr": "volé",
        "nom_statut_en": null
    }
]



*/