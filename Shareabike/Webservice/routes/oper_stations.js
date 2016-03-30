/*
Kaysarov
Mis à jours : 19/12/2015

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
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {
            // SQL Query
            var sql =  "SELECT * FROM stations WHERE dom_station=($1) AND desact_station=FALSE ";
            client.query(sql, [id], function (err, stations_get){
            // Erreurs
                if (err) return next(err);
                done();
                return res.json(stations_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }
});


/* POST /stations */
router.post('/', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
         pg.connect(databaseURL, function(err, client, done) {
            var fixe_virtuelle = false; 
            if (req.body.fixe_virtuelle != undefined) fixe_virtuelle =  req.body.fixe_virtuelle;
            var bonus_ajouter = 0; 
            if (req.body.bonus_ajouter != undefined) bonus_ajouter =  req.body.bonus_ajouter;
            var bonus_enlever = 0; 
            if (req.body.bonus_enlever != undefined) bonus_enlever =  req.body.bonus_enlever;               

            var sql = "INSERT INTO stations " +
            "(dom_station, nom_station, fixe_virtuelle, zone_station, capacite_optimum, "+
            "limite_vide, bonus_ajouter, limite_pleine, bonus_enlever, descript_station ) "+
            "values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

            var data_post = [
                id, 
                req.body.nom_station, 
                fixe_virtuelle,
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
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }

});


/* GET /stations/id */
router.get('/:id', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        var id_station = req.params.id;
        if (id_station != undefined) {
            pg.connect(databaseURL, function(err, client, done) {

                var sql = "SELECT * FROM stations  WHERE dom_station=($1) AND idstation=($2) "+
                "AND desact_station=FALSE ";
                client.query(sql, [id, id_station], function (err, stationsid_get){
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
        };
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }   
});


/* GET /stations/id  Calculer le centre du plygone*/
router.get('/center/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "SELECT point(zone_station)  FROM stations  WHERE idstation=($1)";
            client.query(sql, [id], function (err, zone_get){

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



/* GET /stations/polygones  Transformer les polygones(stations) du domaine en tableau d'objets
[ {
    id: auto_incrementé
    virtuelle: true ou false,
    path:[{latitude: x, longitude: y}]
    }
] */
router.get('/polygones/:id', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    //id = req.params.id;
    //log.info('domaine: ' + id);
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {
            //log.info('connexion');
            var sql = "SELECT zone_station, fixe_virtuelle FROM stations "+
            "WHERE dom_station=($1) AND desact_station=FALSE AND zone_station IS NOT NULL ";
            client.query(sql, [id], function (err, zone_get){

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
                          log.info(zone[i]);
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
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        var id_station = req.params.id;
        if (id_station != undefined) {
            pg.connect(databaseURL, function(err, client, done) {

                var sql = "UPDATE stations SET "+
                "zone_station=($1) WHERE dom_station=($2) AND idstation=($3)";
                var data_post = [req.body.zone_station, id, id_station];

                client.query(sql, data_post, function (err, stations_put){

                    if (err) {
                        res.status(400);
                        log.info(err);
                        return res.json({"status": 400, "message": err});
                    }
                    client.query("SELECT * FROM stations  WHERE idstation=($1)", [id_station], function (err, stations_put){

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
        }
    } else {
        res.status(401);
        return res.json({"status": 401, "message": "Accès non autorisé"});
    }        
});



/* PUT /stations/:id Mettre à jour la station */
router.put('/:id', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        var id_station = req.params.id;
        if (id_station != undefined) {
            pg.connect(databaseURL, function(err, client, done) {

                var sql = "UPDATE stations SET "+
                "nom_station=($1), fixe_virtuelle=($2), zone_station=($3), "+
                "capacite_optimum=($4), limite_vide=($5), bonus_ajouter=($6), limite_pleine=($7), "+
                "bonus_enlever=($8), descript_station=($9) "+
                "WHERE idstation=($10) AND dom_station=($11) AND desact_station=FALSE";
                var data_post = [
                req.body.nom_station, 
                req.body.fixe_virtuelle,
                req.body.zone_station, 
                req.body.capacite_optimum,
                req.body.limite_vide,
                req.body.bonus_ajouter,
                req.body.limite_pleine,
                req.body.bonus_enlever,
                req.body.descript_station,
                id_station, id];

                client.query(sql, data_post, function (err, stations_put){

                    if (err) {
                        res.status(400);
                        log.info(err);
                        return res.json({"status": 400, "message": err});
                    }
                    client.query("SELECT * FROM stations  WHERE idstation=($1)", [id_station], function (err, stations_put){

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
        }
    } else {
        res.status(401);
        return res.json({"status": 401, "message": "Accès non autorisé"});
    }    
});



/* DELETE /stations/:id */
router.delete('/:id', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        var id_station = req.params.id;
        if (id_station != undefined) {
            pg.connect(databaseURL, function(err, client, done) {

                var sql = "UPDATE stations SET desact_station=TRUE "+
                "WHERE idstation=($1) AND dom_station=($2)";
                client.query(sql, [id_station, id], function (err, cb){

                    if (err) {
                        res.status(400);
                        log.info(err);
                        return res.json({"status": 400, "message": err});
                    }
                    var sql1 = "SELECT * FROM stations  WHERE dom_station=($1) AND desact_station=FALSE";
                    client.query(sql1, [id], function (err, cb){

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
        } else {
            res.status(401);
            return res.json({"status": 401, "message": "id undefined"});
        };
    } else {
        res.status(401);
        return res.json({"status": 401, "message": "Accès non autorisé"});
    };                
});


// Returne router
module.exports = router;

/*
Testes unitaires PostMan:
OK
11/12/2015

https://localhost:80/api/oper/stations get
[
    {
        "idstation": 4,
        "dom_station": "mons",
        "nom_station": "parc",
        "fixe_virtuelle": true,
        "rayon": 5,
        "zone_station": "((50.4586105512786,3.95184069871902),
        (50.4586310423467,3.95267754793167),(50.458094856476,3.95337492227554),
        (50.4574971899028,3.95265072584152),(50.4579275105967,3.95151346921921))",
        "capacite_optimum": 15,
        "limite_vide": 4,
        "bonus_ajouter": 1,
        "limite_pleine": 11,
        "bonus_enlever": 2,
        "descript_station": "Parc",
        "desact_station": false
    },
    ...
]


https://localhost:80/api/oper/stations/2 get
[
    {
        "idstation": 2,
        "dom_station": "mons",
        "nom_station": "gare",
        "fixe_virtuelle": true,
        "rayon": 5,
        "zone_station": "((50.4537573333165,3.9427050948143),
        (50.4541262090265,3.94303232431412),(50.454167195039,3.94337028264999),
        (50.4540681454481,3.94364386796951),(50.4537334246064,3.94372969865799),
        (50.4532005987893,3.9432093501091),(50.4530708069762,3.94261389970779),
        (50.4531801053688,3.94233494997025),(50.4533645458338,3.94232422113419))",
        "capacite_optimum": 20,
        "limite_vide": 3,
        "bonus_ajouter": 1,
        "limite_pleine": 17,
        "bonus_enlever": 2,
        "descript_station": "Gare de Mons",
        "desact_station": false
    }
]


https://localhost:80/api/oper/stations post
[
    {
        "idstation": 42,
        "dom_station": "mons",
        "nom_station": "test",
        "fixe_virtuelle": false,
        "rayon": 5,
        "zone_station": null,
        "capacite_optimum": 10,
        "limite_vide": 3,
        "bonus_ajouter": 1,
        "limite_pleine": 7,
        "bonus_enlever": 2,
        "descript_station": "test",
        "desact_station": false
    }
]

https://localhost:80/api/oper/stations/42 put

[
    {
        "idstation": 42,
        "dom_station": "mons",
        "nom_station": "test modifié",
        "fixe_virtuelle": false,
        "rayon": 5,
        "zone_station": null,
        "capacite_optimum": 10,
        "limite_vide": 3,
        "bonus_ajouter": 1,
        "limite_pleine": 7,
        "bonus_enlever": 2,
        "descript_station": "test",
        "desact_station": false
    }
]


https://localhost:80/api/oper/stations/42 delete
[]



Calculer le centre du plygone pour la station 4
https://localhost:80/api/oper/stations/center/4
[
    {
        "point": {
            "x": 50.4581522301202,
            "y": 3.95241147279739
        }
    }
]


Transformer les polygones du domaine d'opérateur en tableau d'objets
https://localhost:80/api/oper/stations/polygones/mons

[
    {
        "id": 1,
        "virtuelle": true,
        "path": [
            {
                "latitude": 50.4586105512786,
                "longitude": 3.95184069871902
            },
            {
                "latitude": 50.4586310423467,
                "longitude": 3.95267754793167
            },
            {
                "latitude": 50.458094856476,
                "longitude": 3.95337492227554
            },
            {
                "latitude": 50.4574971899028,
                "longitude": 3.95265072584152
            },
            {
                "latitude": 50.4579275105967,
                "longitude": 3.95151346921921
            }
        ]
    },
    {
        "id": 2,
        "virtuelle": true,
        "path": [
            {
                "latitude": 50.4537573333165,
                "longitude": 3.9427050948143
            },
            {
                "latitude": 50.4541262090265,
                "longitude": 3.94303232431412
            },
            {
                "latitude": 50.454167195039,
                "longitude": 3.94337028264999
            },
            {
                "latitude": 50.4540681454481,
                "longitude": 3.94364386796951
            },
            {
                "latitude": 50.4537334246064,
                "longitude": 3.94372969865799
            },
            {
                "latitude": 50.4532005987893,
                "longitude": 3.9432093501091
            },
            {
                "latitude": 50.4530708069762,
                "longitude": 3.94261389970779
            },
            {
                "latitude": 50.4531801053688,
                "longitude": 3.94233494997025
            },
            {
                "latitude": 50.4533645458338,
                "longitude": 3.94232422113419
            }
        ]
    },
    {
        "id": 3,
        "virtuelle": false,
        "path": [
            {
                "latitude": 50.4540152050645,
                "longitude": 3.95904377102852
            },
            {
                "latitude": 50.4538990775639,
                "longitude": 3.96027222275734
            },
            {
                "latitude": 50.4536838993828,
                "longitude": 3.96021589636803
            },
            {
                "latitude": 50.453808566226,
                "longitude": 3.95898476243019
            }
        ]
    },
    {
        "id": 4,
        "virtuelle": false,
        "path": [
            {
                "latitude": 50.4486089969013,
                "longitude": 3.94545905292034
            },
            {
                "latitude": 50.4485825236625,
                "longitude": 3.94555695354939
            },
            {
                "latitude": 50.4486346161505,
                "longitude": 3.94558779895306
            },
            {
                "latitude": 50.4486610893602,
                "longitude": 3.94549258053303
            }
        ]
    },
    {
        "id": 5,
        "virtuelle": true,
        "path": [
            {
                "latitude": 50.4521776247113,
                "longitude": 3.95291827619076
            },
            {
                "latitude": 50.4521511534691,
                "longitude": 3.95293168723583
            },
            {
                "latitude": 50.452220320232,
                "longitude": 3.95356468856335
            },
            {
                "latitude": 50.4522519148925,
                "longitude": 3.95355395972729
            }
        ]
    }
]


*/