var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');


/*
router.post('/', function(req, res, next) {
  var info = [];
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
      var decoded = jwt.decode(token, secret.secretToken, 'HS512');
      var login = decoded.iss;
      //connexion à PostgreSQL
      pg.connect(databaseURL, function (err, client, done) {
          // Erreurs
          if (err) return res.sendStatus(401);
          // SQL Query
          var sql =  "SELECT * FROM utilisateurs" + 
          " LEFT JOIN user_niveaux ON  utilisateurs.user_niveau_id = user_niveaux.user_niveau_id "+
          " WHERE login=($1)";
          var query = client.query(sql, [login]);
          // Ajouter dans info
          query.on('row', function(row) {
              info.push(row);
          });
          // Retourner le resultat et fermer la connection
          query.on('end', function() {
              done();
              if(info.length != 0 ){
                  if (info[0].niveau == -1) {
                      return res.sendStatus(200);
                  } else {
                    return res.sendStatus(401);
                  }
              } else {
                return res.sendStatus(401);
              }
          });
      });

  } else {
    return res.sendStatus(401);
  }
   
});
*/

router.post('/', function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
      var decoded = jwt.decode(token, secret.secretToken, 'HS512');
      var login = decoded.iss;

    if (decoded.exp <= Date.now()) { 
        res.status(400);
        return res.json({"status": 400, "message": "Token est expiré" });
    }

      //connexion à PostgreSQL
      pg.connect(databaseURL, function (err, client, done) {

          var sql =  "SELECT * FROM utilisateurs" + 
          " LEFT JOIN user_niveaux ON  utilisateurs.user_niveau_id = user_niveaux.user_niveau_id "+
          " WHERE login=($1)";
          client.query(sql, [login], function (err, user) {
            if (err) return res.sendStatus(401);
              //console.log(user.rows[0].niveau)
              done();  
              if(user.rows.length != 0){
                if (user.rows[0].niveau == -1) {
                    return res.sendStatus(200);
                    //return res.json(user.rows);
                } else {
                    res.status(403);
                    return res.json({"status": 403, "message": "Non Autorisé"});
                }
              } else {
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
