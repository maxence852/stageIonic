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
        var sql =  "SELECT idadmin, nom, nom_fr, domaine, num_licence, "+
        "date_sign, date_valid, delivre_par FROM admins  "+
        //"LEFT OUTER JOIN admins AS a2 ON  a1.idadmin = a2.delivre_par  "+        
        "INNER JOIN typeadmins ON type_admin = typeadmins.idtype "+

       // "LEFT  JOIN `table` as `t2` ON `t2`.`fk_id` = `t1`.`id`"
        "WHERE desact=FALSE ORDER BY idadmin ASC";
        client.query(sql, function (err, admins_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(admins_get.rows);            
        });
    });
});



/* PUT /admins/:id */
router.put('/:id', function(req, res, next) {
	var delivrepar = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
    if (delivrepar != undefined) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE admins SET "+
            "domaine=($1), num_licence=($2), date_valid=($3), delivre_par=($4)"+
            "WHERE idadmin=($5)";
            var data_post = [
            req.body.domaine, 
            req.body.num_licence,
            req.body.date_valid, 
            delivrepar, id];

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
    };
    } else {
        res.status(401);
        return res.json({"status": 401, "message": "token undefined"});
    };

});


// Returne router
module.exports = router;
