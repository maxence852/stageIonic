var jwt = require('jwt-simple');
var validateUser = require('../routes/login_api').validateUser;
var secret = require('../config/secret');
var Utilisateur = require('../models/utilisateur');

module.exports = function(req, res, next) {

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  // Rechercher un utilisateur avec key = login de l'utilisateur
  Utilisateur
      .findOne({login: key})
      .populate('user_niveau_id', 'niveau')
      .exec(function (err, user) {
        if (err) return next(err); 

  //Autorisation de l'utilisateur: verifier si'il a le droit d'acces aux ressources
  if (token || key) {
    try {
      var decoded = jwt.decode(token, secret.secretToken);
      
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token est expiré"
        });
        return;
      }
 
      //var UserObj = { login: '', niveau: ''};
      //var dbUser = validateUser(key, UserObj); 
  
        //if (dbUser) {                   
        if (user) {           // S'il existe: verifier son niveu d'acces

          if ((req.url.indexOf('admin') >= 0 && user.user_niveau_id.niveau == -1) || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/') >= 0)) {
           next(); // Après verification passer au middleware suivant
          } else {
            res.status(403);
            res.json({
              "status": 403,
             "message": "Non Autorisé"
            });
            return;
          }
        } else {
          // Si utilisateur n'existe pas: err 401
          res.status(401);
          res.json({
            "status": 401,
            "message": "Utilisateur inconu"
          });
          return;
        }
      //});

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oups, une erreur!",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Non Autorisé!"
    });
    return;
  }

  });
};