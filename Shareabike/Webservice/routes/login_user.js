/*
Kaysarov
Mis à jours : 10/12/2015

*/

var jwt = require('jwt-simple');
var log = require('../lib/log')(module);
var secret = require('../config/secret');
var pg = require('pg');
var config = require('../config');
var databaseURL = config.get('db');


var auth_user = {

  login: function(req, res) { // Authentification de l'utilisateur: si ok: retourner un token

      var login = req.body.login || '';
      var password = req.body.password || '';

          if (login == '' || password == '' ) {
              log.info(err);
              return res.sendStatus(401);
          } 
    //var user = [];
    
    pg.connect(databaseURL, function(err, client, done) {
        //var access = "false";
        // SQL Query > Select Data
        var sql = "SELECT * FROM clients " +
        "INNER JOIN typeusers ON  clients.type_user = typeusers.idtype "+
        "WHERE login_client=($1) AND password_client = crypt(($2), password_client) AND desact_client=FALSE"
        // "WHERE login_client=($1) AND password_client = crypt(($2), password_client) AND desact=FALSE"
        client.query(sql, [login, password], function (err, authent){
          if (err) return res.sendStatus(401);
          done();
          if (authent.rows.length != 0){

            log.info('Authentification: ' + login);
            // Attribuer le Rôle --> Retourner un Token
            if(authent.rows[0].niveau == 1) return res.json(genToken(authent.rows, 'utilisateur'));

            // 1 ou -1 ? ou autre ? if(authent.rows[0].niveau == 2 ) return res.json(genToken(authent.rows, 'users'));

            else return res.sendStatus(401);

          } else {

            log.info("Tentative erronée pour " + login);
            return res.sendStatus(401);
          }

        });

    });
      
  },

}

// Methodes de creation de Token
function genToken(user, role) {
  var expires = expiresIn(1); // 1 heure
  var date_licence= Date.parse(user[0].date_valid);
  var token = jwt.encode({
    iss: user[0].idclient,
    exp: expires,
    dmn: user[0].domaine,
    valid: date_licence,
    niveau: user[0].niveau
  }, secret.secretToken, 'HS512');

  return {
    token: token,
    bike: role};
}

function expiresIn(numHours) {
  var dateObj = new Date();
  return dateObj.setTime(dateObj.getTime() + numHours * 3600 * 1000);
}

module.exports = auth_user;