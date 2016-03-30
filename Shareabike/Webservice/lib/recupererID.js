var jwt = require('jwt-simple');
var secret = require('../config/secret');
var log = require('../lib/log')(module);
var pg = require('pg');
var config = require('../config');
var databaseURL = config.get('db');


module.exports = function(req, res) {
log.info('Recuperation token');
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  if (token) {
    try {
      var decoded = jwt.decode(token, secret.secretToken, 'HS512');
      log.info('Decodage token');
      if (decoded.exp <= Date.now()) { 
          res.status(400);
          return res.json({"status": 400, "message": "Token est expiré" });
      } else {
          res.sendStatus(200);
          log.info('Recuperation id: ' + decoded.iss);
          return {id: decoded.iss};
      }

    } catch (err) {
      res.status(500);
      res.json({"status": 500, "message": "Token Invalide"});
    }
  } else {
    log.info('Non token');
    res.status(401);
    res.json({"status": 401, "message": "Accès Non Authentifié"});
    return;
  }


};