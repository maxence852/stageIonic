var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');



router.post('/', function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var decoded =jwt.decode(token, secret.secretToken, 'HS512');
  var expl = decoded.iss;

  if (expl) {
      
      console.log('id recuperé: ' + expl);
    if (decoded.exp <= Date.now()) { 
        res.status(400);
        return res.json({"status": 400, "message": "Token est expiré" });
    }
        pg.connect(databaseURL, function(err, client, done) {
          var sql = "SELECT * FROM admins "+ 
          "INNER JOIN typeadmins ON  admins.type_admin = typeadmins.idtype "+
          "WHERE idadmin=($1) AND desact=FALSE";
            client.query(sql, [expl], function (err, user){
                if (err) return res.sendStatus(401);
                done();
                if(user.rows.length != 0){
                    if (user.rows[0].niveau == 1) {
                        log.info('User Access: ' + expl);
                        return res.sendStatus(200);
                    } else {
                        res.status(403);
                        return res.json({"status": 403, "message": "Non Autorisé"});
                    }                  
                }else {
                  res.status(401);
                  return res.json({"status": 401, "message": "Token n'est pas valable!"});
              }            
            });
        });    

  } else {
    return res.sendStatus(401);
  }
   
});



// Returne router
module.exports = router;
