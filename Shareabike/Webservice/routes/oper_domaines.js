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


/* GET /domaines/id */
router.get('/', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;

    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM domaines  WHERE iddomaine=($1) AND desact_domaine=FALSE", [id], function (err, domainesid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(domainesid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }
});


/* GET /domaines/id  Calculer le centre et l'aire du plygone*/
router.get('/center', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT point(zone_domaine), area(path(zone_domaine))  FROM domaines  WHERE iddomaine=($1)", [id], function (err, zone_get){

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
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }
});


/* GET /domaines/polygone/iddomaine  Transformer le polygone en tableau [{x: Latitude, y: longitude}] */
router.get('/polygone', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT zone_domaine  FROM domaines  WHERE iddomaine=($1)", [id], function (err, zone_get){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                var z = zone_get.rows[0].zone_domaine;
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
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }
});


/* PUT /domaines/ Mettre à jour certaines champs de domaine */
router.put('/', function(req, res, next) {
    var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE domaines SET "+
            "tel_service=($1), descript_domaine=($2) WHERE iddomaine=($3) ";
            var data_post = [
            req.body.tel_service, 
            req.body.descript_domaine,
            id ];

            client.query(sql, data_post, function (err, domaines_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM domaines  WHERE iddomaine=($1) AND desact_domaine=FALSE", [id], function (err, domaines_put){

                    if (err) {
                        res.status(401);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(domaines_put.rows);            
                }); 
            });
        });

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
10/12/2015
https://localhost:80/api/oper/domaines  GET

[
    {
        "iddomaine": "mons",
        "zone_domaine": "((50.4595804520998,3.94799709320068),(50.4610011159923,3.95271778106689),(50.460782555094,3.95666599273682),(50.4599629427302,3.96009922027588),(50.4534601813473,3.96155834197998),(50.4460820167903,3.9516019821167),(50.4456994139195,3.94773960113525),(50.4491973821606,3.93924236297607),(50.4505637057736,3.93924236297607))",
        "tel_service": "065065065",
        "activ_ecadenas": false,
        "activ_pucegps": false,
        "activ_gpscamion": false,
        "descript_domaine": "Prototype ShareABike. Test 2016-2018",
        "desact_domaine": false
    }
]

https://localhost:80/api/oper/domaines/center GET

[
    {
        "point": {
            "x": 50.4540366406564,
            "y": 3.95076274871826
        },
        "area": 0.000221224739860304
    }
]

https://localhost:80/api/oper/domaines/polygone GET
[
    {
        "x": 50.4595804520998,
        "y": 3.94799709320068
    },
    {
        "x": 50.4610011159923,
        "y": 3.95271778106689
    },
    {
        "x": 50.460782555094,
        "y": 3.95666599273682
    },
    {
        "x": 50.4599629427302,
        "y": 3.96009922027588
    },
    {
        "x": 50.4534601813473,
        "y": 3.96155834197998
    },
    {
        "x": 50.4460820167903,
        "y": 3.9516019821167
    },
    {
        "x": 50.4456994139195,
        "y": 3.94773960113525
    },
    {
        "x": 50.4491973821606,
        "y": 3.93924236297607
    },
    {
        "x": 50.4505637057736,
        "y": 3.93924236297607
    }
]

https://localhost:80/api/oper/domaines PUT
tel_service: 065065065
descript_domaine: Prototype ShareABike. Test 2016-2018

[
    {
        "iddomaine": "mons",
        "zone_domaine": "((50.4595804520998,3.94799709320068),(50.4610011159923,3.95271778106689),(50.460782555094,3.95666599273682),(50.4599629427302,3.96009922027588),(50.4534601813473,3.96155834197998),(50.4460820167903,3.9516019821167),(50.4456994139195,3.94773960113525),(50.4491973821606,3.93924236297607),(50.4505637057736,3.93924236297607))",
        "tel_service": "065065065",
        "activ_ecadenas": false,
        "activ_pucegps": false,
        "activ_gpscamion": false,
        "descript_domaine": "Prototype ShareABike. Test 2016-2018",
        "desact_domaine": false
    }
]





*/