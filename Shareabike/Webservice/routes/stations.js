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



/* GET /stations listing. */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT * FROM stations ORDER BY dom_station ASC";
        client.query(sql, function (err, stations_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(stations_get.rows);            
        });
    });
});


/* POST /stations */
router.post('/', function(req, res, next) {

     pg.connect(databaseURL, function(err, client, done) {
        var fixe_virtuelle = false; 
        if (req.body.fixe_virtuelle != undefined) fixe_virtuelle =  req.body.fixe_virtuelle;
        var rayon = 5; 
        if (req.body.rayon != undefined) rayon =  req.body.rayon;
        var bonus_ajouter = 0; 
        if (req.body.bonus_ajouter != undefined) bonus_ajouter =  req.body.bonus_ajouter;
        var bonus_enlever = 0; 
        if (req.body.bonus_enlever != undefined) bonus_enlever =  req.body.bonus_enlever;               

        var sql = "INSERT INTO stations " +
        "(dom_station, nom_station, fixe_virtuelle, rayon, zone_station, capacite_optimum, "+
        "limite_vide, bonus_ajouter, limite_pleine, bonus_enlever, descript_station ) "+
        "values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

        var data_post = [
            req.body.dom_station, 
            req.body.nom_station, 
            fixe_virtuelle,
            rayon,
            req.body.zone_station, 
            req.body.capacite_optimum,
            req.body.limite_vide,
            bonus_ajouter,
            req.body.limite_pleine,
            bonus_enlever,
            req.body.descript_station];


        client.query(sql, data_post, function (err, stations_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM stations WHERE nom_station=($1)", [req.body.nom_station], function (err, stations_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(stations_post.rows);            
            }); 
        });
            
    });

});


/* GET /stations/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM stations  WHERE idstation=($1)", [id], function (err, stationsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(stationsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /stations/domaine/iddomaine */
router.get('/domaine/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM stations  WHERE dom_station=($1)", [id], function (err, stationsid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(stationsid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});

/* GET /stations/id  Calculer le centre du plygone*/
router.get('/center/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT point(zone_station)  FROM stations  WHERE idstation=($1)", [id], function (err, zone_get){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                log.info(zone_get.rows);
                return res.json(zone_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /stations/polygone/idstation  Transformer le polygone en tableau [{x: Latitude, y: longitude}] */
router.get('/polygone/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT zone_station  FROM stations  WHERE idstation=($1)", [id], function (err, zone_get){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                var z = zone_get.rows[0].zone_station;
                if (z != null) {
                    var zone =[];
                    var zone_points=[];
                    var point={x: 0, y: 0};
                    var ligne = "";
                    var ligne1="";
                    var ligne2="";
                    for( var i=1; i<z.length-1; i++){
                        if(z[i] == '(') ligne="";
                        if(z[i] != '(' && z[i] != ')') ligne+=z[i];
                        if(z[i] ==')'){
                            //log.info(ligne);
                            zone.push(ligne);
                            i++;
                        };
                    };
                    ligne = "";                
                    for(var i=0; i<zone.length; i++){
                      //log.info(zone[i]);
                      z=zone[i];
                      ligne = ligne1 = ligne2 = "";
                      for(var j=0; j<z.length; j++){
                        ligne+=z[j];
                        if(z[j] == ',') {
                            ligne1=ligne;
                            ligne="";
                        };
                        if(j == z.length-1){
                            ligne2=ligne;
                            point={x: parseFloat(ligne1), y: parseFloat(ligne2)};
                            zone_points.push(point);
                        };
                      };
                    };
                    log.info('lecture polygone: ' + zone_points.length + ' sommets');
                    return res.json(zone_points);
                } else {
                    res.status(400);
                    return res.json({"status": 400, "message": "Zone est nul"});
                }
                            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});



/* GET /stations/polygone/iddomaine  Transformer les polygones du domaine en tableau d'objets
[ {
    id: auto_incrementé
    path:[{latitude: x, longitude: y}]
    }
] */
router.get('/polygones/:dom', function(req, res, next) {
    var dom = req.params.dom;
    if (dom != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT zone_station, fixe_virtuelle  FROM stations  WHERE dom_station=($1) AND zone_station IS NOT NULL" , [dom], function (err, zone_get){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                //log.info('lecture des polygones: ' + zone_get.rows);
                var polygones=[];
                if (zone_get.rows != null) {
                    for( var ii=0; ii<zone_get.rows.length; ii++){
                        var z = zone_get.rows[ii].zone_station;
                        var zone =[];
                        var zone_points={};
                        var id_zone = ii+1;
                        var type_station = zone_get.rows[ii].fixe_virtuelle;
                        var path_zone = [];
                        var point={latitude: 0, longitude: 0};
                        var ligne = "";
                        var ligne1="";
                        var ligne2="";
                        for( var i=1; i<z.length-1; i++){
                            if(z[i] == '(') ligne="";
                            if(z[i] != '(' && z[i] != ')') ligne+=z[i];
                            if(z[i] ==')'){
                                //log.info(ligne);
                                zone.push(ligne);
                                i++;
                            };
                        };
                        ligne = "";                
                        for(var i=0; i<zone.length; i++){
                          //log.info(zone[i]);
                          z=zone[i];
                          ligne = ligne1 = ligne2 = "";
                          for(var j=0; j<z.length; j++){
                            ligne+=z[j];
                            if(z[j] == ',') {
                                ligne1=ligne;
                                ligne="";
                            };
                            if(j == z.length-1){
                                ligne2=ligne;
                                point={latitude: parseFloat(ligne1), longitude: parseFloat(ligne2)};
                                path_zone.push(point);
                            };
                          };
                        };
                        zone_points={ id: id_zone, virtuelle: type_station, path: path_zone}
                        log.info('lecture polygone: ' +  id_zone + '; ' + path_zone.length + ' sommets');
                        polygones.push(zone_points);
                    }
                    return res.json(polygones);
                } else {
                    res.status(400);
                    return res.json({"status": 400, "message": "Pas de stations"});
                }
                            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Domaine inconnu"});
    }
});


/* PUT /stations/:id Mettre à jour la zone de la station */
router.put('/polygone/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE stations SET "+
            "zone_station=($1) WHERE idstation=($2)";
            var data_post = [req.body.zone_station, id];

            client.query(sql, data_post, function (err, stations_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM stations  WHERE idstation=($1)", [id], function (err, stations_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(stations_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };
});



/* PUT /stations/:id Mettre à jour la station */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE stations SET "+
            "dom_station=($1), nom_station=($2), fixe_virtuelle=($3), zone_station=($4), "+
            "capacite_optimum=($5), limite_vide=($6), bonus_ajouter=($7), limite_pleine=($8), "+
            "bonus_enlever=($9), descript_station=($10), desact_station=($11) "+
            "WHERE idstation=($12)";
            var data_post = [
            req.body.dom_station, 
            req.body.nom_station, 
            req.body.fixe_virtuelle,
            req.body.zone_station, 
            req.body.capacite_optimum,
            req.body.limite_vide,
            req.body.bonus_ajouter,
            req.body.limite_pleine,
            req.body.bonus_enlever,
            req.body.descript_station,
            req.body.desact_station,
            id];

            client.query(sql, data_post, function (err, stations_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM stations  WHERE idstation=($1)", [id], function (err, stations_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(stations_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        return res.json({"status": 401, "message": "id undefined"});
    };

});



/* DELETE /stations/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM stations WHERE idstation=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM stations ORDER BY idstation ASC", function (err, cb){

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