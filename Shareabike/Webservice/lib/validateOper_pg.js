var jwt = require('jwt-simple');
var secret = require('../config/secret');
var log = require('../lib/log')(module);
var pg = require('pg');
var config = require('../config');



module.exports = function(req, res, next) {
//log.info('Verification token');
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  //if (err) return next(err);

  //Autorisation de l'utilisateur: verifier si'il a le droit d'acces aux ressources
  if (token) {
    try {
      var decoded = jwt.decode(token, secret.secretToken, 'HS512');
      //log.info('Decodage token');
      // Date.now() renvoie le nombre de millisecondes écoulées depuis le 1 er Janvier 1970 00:00:00 UTC.
      if (decoded.exp <= Date.now() ) { 
          res.status(400);
          return res.json({"status": 400, "message": "Token est expiré" });
      }
      if (decoded.valid <= Date.now() ) { 
          res.status(400);
          return res.json({"status": 403, "message": "Licence Non Valide" });
      }
      if(decoded.niveau == 1 ){
        //log.info('id:' + decoded.iss + ' exp:' + decoded.exp + ' valid:' + decoded.valid + ' dmn:' + decoded.dmn);
        log.info('User Access:' + decoded.iss);
        next(); // Après verification passer au middleware suivant
      } else {
        res.status(403);
        return res.json({"status": 403, "message": "Accès Non Autorisé"});        
      }

    } catch (err) {
      res.status(500);
      res.json({"status": 500, "message": "Token Invalide"});
    }
  } else {
    //log.info('Non token');
    res.status(401);
    res.json({"status": 401, "message": "Accès Non Authentifié"});
    return;
  }


};