/* Webservice ShareABike v 0.4.2
 * 24/12/2015
 * Nail Kaysarov
 */

// Chargement des modules
var fs = require('fs');
var https = require('https');
var express = require('express'); // framework
var favicon = require('serve-favicon'); // favicon
var bodyParser = require('body-parser'); // parser
var logger = require('morgan'); // logger
var engine = require('ejs-locals');
var path = require('path');
var pg = require('pg');

// Modules propres
var config = require('./config'); // configuration du webservice: port, connexion BD, etc.
var log = require('./lib/log')(module); // Le logging

//Configuration SSL/TLS
var options = {
   key  : fs.readFileSync(config.get('tls:key')),
   cert : fs.readFileSync(config.get('tls:crt')),
   passphrase:  config.get('tls:pas')
};

// Express 4
var app = express();

// Vues 
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


//Distribution de ressources
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // restriction du domaine
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Routes: authentification avec le token
app.all('/api/*', [require('./lib/validateRequest_pg')]);

// Routes: autorisation
app.all('/api/expl/*', [require('./lib/validateExpl_pg')]);
app.all('/api/oper/*', [require('./lib/validateOper_pg')]);

// Routes
app.use('/', require('./routes'));


// Erreurs 404 (Not found)
app.use(function(req, res, next){
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({ 
    	error: 'Not found' 
    });
    return;
});

// Gestionnaire d'erreurs
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({ 
    	error: err.message 
    });
    return;
});

// Configuration du port
var port =  config.get('port');
app.set('port', port);

// Start server
https.createServer(options, app).listen(port, function () {
   console.log('Web Service ShareABike. Démarrage: Port '+ port);
});


