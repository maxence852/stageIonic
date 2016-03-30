var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var secret = require('../config/secret');
//var pg = require('pg');
//var config = require('../config');
var log = require('../lib/log')(module);
//var databaseURL = config.get('db');



router.post('/', function(req, res) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var decoded =jwt.decode(token, secret.secretToken, 'HS512');
  if (token) {

    if (decoded.exp <= Date.now()) { 
        res.status(400);
        return res.json({"status": 400, "message": "Token est expiré" });
    } else {
        //var d = Date.parse(decoded.valid);
        log.info('id:' + decoded.iss + ' exp:' + decoded.exp + ' valid:' + decoded.valid + ' dmn:' + decoded.dmn);        
        return res.sendStatus(200);
    }

  } else {
    return res.sendStatus(401);
  }
   
});



// Returne router
module.exports = router;
