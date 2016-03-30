/*
Kaysarov
Mis à jours : 10/12/2015

*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	//res.sendFile('/home/nail/Webservice/views/list_rest.html'); //pour le serveur
  res.sendFile(process.cwd() + '/views/list_rest.html'); // process.cwd() referance le dossier où node a été appelé
  //res.sendFile('./list_rest.html');
});

module.exports = router;