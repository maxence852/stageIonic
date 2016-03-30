/* AppClient ShareABike v 0.3.0
 * 19/12/2015
 * Nail Kaysarov
 */
//Votre clé d'API google maps:  AIzaSyBAkbW3lDYmzsi-Ww_6Qji_UU11qgyOlPM
 // Chargement des modules
var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var config = require('./config');

//Configuration SSL/TLS
var options = {
   key  : fs.readFileSync(config.get('tls:key')),
   cert : fs.readFileSync(config.get('tls:crt')),
   passphrase:  config.get('tls:pas')
};

app.use(favicon(__dirname + '/image/favicon.png'));
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/image', express.static(__dirname + '/image'));
app.use('/partials', express.static(__dirname + '/partials'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

//_dropdown
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// Configuration du port
var port =  config.get('port');

// Start server
https.createServer(options, app).listen(port, function () {
   console.log('ShareABike. Démarrage: Port '+ port);
});
