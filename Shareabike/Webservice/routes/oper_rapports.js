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



router.post('/', function(req, res, next) {
    var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    var date1 = new Date('2000-01-01'); //Format:'AAAA-MM-JJ'
    var date2 = new Date();
    if(req.body.date1)  date1 = new Date(req.body.date1);
    if(req.body.date2)  date2 = new Date(req.body.date2);
    if (dom != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

var sql = "SELECT "+
"(SELECT COUNT(*) FROM stations  WHERE dom_station=($1) AND desact_station=FALSE ) as station_total, "+
"(SELECT COUNT(*) FROM stations  WHERE dom_station=($1) AND desact_station=FALSE AND fixe_virtuelle=FALSE ) as station_fixe, "+
"(SELECT COUNT(*) FROM stations  WHERE dom_station=($1) AND desact_station=FALSE AND fixe_virtuelle=TRUE ) as station_virtuelle, "+
"(SELECT COUNT(DISTINCT client_transaction) FROM transactions  WHERE dom_transaction=($1) ) as client_total, "+ 
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE ) as velo_total, "+
"(SELECT COUNT(DISTINCT type_velo) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE ) as velo_type, "+
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE AND statut_velo=1 ) as velo_disponible, "+
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE AND statut_velo=2 ) as velo_location, "+
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE AND statut_velo=3 ) as velo_reserve, "+
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE AND statut_velo=4 ) as velo_distribution, "+
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE AND statut_velo=5 ) as velo_panne, "+
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE AND statut_velo=6 ) as velo_entretient, "+
"(SELECT COUNT(*) FROM velos  WHERE dom_velo=($1) AND desact_velo=FALSE AND statut_velo=7 ) as velo_vole, "+
"(SELECT COUNT(*) FROM locations  WHERE dom_location=($1) AND date_fin >= ($2) AND date_fin <= ($3)) as location_total, "+
"(SELECT SUM(round(EXTRACT(EPOCH FROM (date_fin - date_debut))/60)) FROM locations  WHERE dom_location=($1) "+
"AND date_fin >= ($2) AND date_fin <= ($3)) as location_duree, "+
"(SELECT COUNT(*) FROM transactions  WHERE dom_transaction=($1) "+ 
"AND date_transaction >= ($2) AND date_transaction <= ($3)) as transaction_total, "+
"(SELECT COUNT(*) FROM transactions  WHERE dom_transaction=($1) "+ 
"AND nature_transaction=FALSE AND date_transaction >= ($2) AND date_transaction <= ($3)) as transaction_automatique, "+
"(SELECT COUNT(*) FROM transactions  WHERE dom_transaction=($1) "+ 
"AND nature_transaction=TRUE AND date_transaction >= ($2) AND date_transaction <= ($3)) as transaction_manuelle, "+
"(SELECT SUM(montant) FROM transactions  WHERE dom_transaction=($1) "+ 
"AND montant>0 AND date_transaction >= ($2) AND date_transaction <= ($3)) as transaction_montant_debit, "+
"(SELECT SUM(montant) FROM transactions  WHERE dom_transaction=($1) "+ 
"AND montant<0 AND date_transaction >= ($2) AND date_transaction <= ($3)) as transaction_montant_credit, "+
"(SELECT SUM(bonus) FROM transactions  WHERE dom_transaction=($1) "+ 
"AND bonus>0 AND date_transaction >= ($2) AND date_transaction <= ($3)) as transaction_bonus_debit, "+
"(SELECT SUM(bonus) FROM transactions  WHERE dom_transaction=($1) "+ 
"AND bonus<0 AND date_transaction >= ($2) AND date_transaction <= ($3)) as transaction_bonus_credit";
            client.query(sql , [dom, date1, date2], function (err, rapport_get){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                    return res.json(rapport_get.rows);
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Domaine inconnu"});
    }
});



// Returne router
module.exports = router;



/*
Testes unitaires PostMan:
OK
11/12/2015

https://localhost:80/api/expl/stations get
[
    {
        "idstation": 1,
        "dom_station": "Bike7",
        "nom_station": "univer",
        "fixe_virtuelle": true,
        "rayon": 5,
        "zone_station": "((50.4620939053341,3.93031597137451),(50.4623124601726,3.93881320953369),
                        (50.4600722251993,3.94593715667725),(50.4542252584958,3.93683910369873),
                        (50.4538427214682,3.92164707183838),(50.4582143888844,3.92224788665771))",
        "capacite_optimum": 25,
        "limite_vide": 0,
        "bonus_ajouter": 0,
        "limite_pleine": 0,
        "bonus_enlever": 0,
        "descript_station": "zoning Mons",
        "desact_station": false
    }
]


https://localhost:80/api/expl/stations/1 get
[
    {
        "idstation": 1,
        "dom_station": "Bike7",
        "nom_station": "univer",
        "fixe_virtuelle": true,
        "rayon": 5,
        "zone_station": "((50.4620939053341,3.93031597137451),(50.4623124601726,3.93881320953369),
                        (50.4600722251993,3.94593715667725),(50.4542252584958,3.93683910369873),
                        (50.4538427214682,3.92164707183838),(50.4582143888844,3.92224788665771))",
        "capacite_optimum": 25,
        "limite_vide": 0,
        "bonus_ajouter": 0,
        "limite_pleine": 0,
        "bonus_enlever": 0,
        "descript_station": "zoning Mons",
        "desact_station": false
    }
]


https://localhost:80/api/expl/stations post
[
    {
        "idstation": 2,
        "dom_station": "mons",
        "nom_station": "umons",
        "fixe_virtuelle": true,
        "rayon": 5,
        "zone_station": "",
        "capacite_optimum": 25,
        "limite_vide": 0,
        "bonus_ajouter": 0,
        "limite_pleine": 0,
        "bonus_enlever": 0,
        "descript_station": "Mons",
        "desact_station": false
    }
]

https://localhost:80/api/expl/stations/2 put

[
    {
        "idstation": 2,
        "dom_station": "mons",
        "nom_station": "univer",
        "fixe_virtuelle": true,
        "rayon": 5,
        "zone_station": "",
        "capacite_optimum": 25,
        "limite_vide": 0,
        "bonus_ajouter": 0,
        "limite_pleine": 0,
        "bonus_enlever": 0,
        "descript_station": "Mons",
        "desact_station": true
    }
]


https://localhost:80/api/expl/stations/2 delete
[]



Calculer le centre du plygone pour la station 1
https://localhost:80/api/expl/stations/center/1
[
    {
        "point": {
            "x": 50.4584601599257,
            "y": 3.93263339996338
        }
    }
]


Transformer le polygone en tableau pour la station 1
https://localhost:80/api/expl/stations/polygone/1
[
    {
        "x": 50.4620939053341,
        "y": 3.93031597137451
    },
    {
        "x": 50.4623124601726,
        "y": 3.93881320953369
    },
    {
        "x": 50.4600722251993,
        "y": 3.94593715667725
    },
    {
        "x": 50.4542252584958,
        "y": 3.93683910369873
    },
    {
        "x": 50.4538427214682,
        "y": 3.92164707183838
    },
    {
        "x": 50.4582143888844,
        "y": 3.92224788665771
    }
]

Transformer les polygones du domaine 'test' en tableau d'objets
https://localhost:80/api/expl/stations/polygones/test

[
    {
        "id": 1,
        "path": [
            {
                "latitude": 50.4318433482728,
                "longitude": 3.92485097050667
            },
            {
                "latitude": 50.4318091771503,
                "longitude": 3.92502263188362
            },
            {
                "latitude": 50.4317647546542,
                "longitude": 3.92499580979347
            },
            {
                "latitude": 50.4318040514798,
                "longitude": 3.92478659749031
            }
        ]
    },
    {
        "id": 2,
        "path": [
            {
                "latitude": 50.4374419536192,
                "longitude": 3.92469137907028
            },
            {
                "latitude": 50.4370456139565,
                "longitude": 3.9261719584465
            },
            {
                "latitude": 50.4363656787022,
                "longitude": 3.92448216676712
            },
            {
                "latitude": 50.4364135136626,
                "longitude": 3.92427295446396
            },
            {
                "latitude": 50.43651943376,
                "longitude": 3.92419785261154
            }
        ]
    }
]


*/