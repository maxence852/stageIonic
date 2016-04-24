/**
 * Created by maxence on 05/04/2016.
 */


var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');
var jwt = require('jwt-simple');
var secret = require('../config/secret');

//email validation
var nodemailer = require("nodemailer");
var chromelogger = require('chromelogger');
var cryptoJS = require("crypto-js");
var myLogin = "";
/* GET /clients listing.
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idclient, nom_client, prenom_client, cp_client, adresse_client, "+
            "gsm_client, pin_code, login_client, password_client, statut_client, solde_montant, "+
            "solde_bonus, solde_date, modif_par, date_modif, date_creation, desact_client, "+
            "nom_statut_fr, cpville, nomville, nom FROM clients "+
            "INNER JOIN villes ON  clients.cp_client = villes.idville "+
            "INNER JOIN statutclients ON  clients.statut_client = statutclients.idstatutclient "+
            "INNER JOIN admins ON  clients.modif_par = admins.idadmin "+
            "ORDER BY idclient ASC";
        client.query(sql, function (err, clients_get){
            // Erreurs
            if (err) return next(err);
            done();
            return res.json(clients_get.rows);
        });
    });
});*/


/* GET /clients listing.
router.get('/list/actifs', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idclient, nom_client FROM clients "+
            "WHERE statut_client=1 AND desact_client=FALSE "+
            "ORDER BY idclient ASC";
        client.query(sql, function (err, clients_get){
            // Erreurs
            if (err) return next(err);
            done();
            return res.json(clients_get.rows);
        });
    });
});*/


/* POST /clients */
router.post('/', function(req, res, next) {

            pg.connect(databaseURL, function(err, client, done) {

                /*var sql = "INSERT INTO clients " +
                    "(idclient,nom_client, prenom_client, cp_client, adresse_client, "+
                    "gsm_client, login_client, password_client, statut_client, "+
                    "modif_par, desact_client, type_user) "+
                    "values(50,$2, 'bedon', 5, 'hehehehehehe',"+
                    "'0477895623','maxouuser', '12345678', 1,"+
                    " 1, false, 1)";*/
                var sql = "INSERT INTO clients " +
                    "(login_client, password_client, pseudo_client, prenom_client, nom_client," +
                        "pays_client, codePostal_client, ville_client, adresse_client, numMaison_client, gsm_client,"+
                        "type_user, modif_par, statut_client)"+
                    "values($1, crypt(($2), gen_salt('bf',6)), $3 , $4, $5,"+
                            "$6, $7, $8, $9, $10, $11,"+
                            " 1, 3, 2)";
                myLogin = req.body.login_client;
                var data_post = [
                    req.body.login_client,
                    req.body.password_client,
                    req.body.pseudo_client,
                    req.body.prenom_client,
                    req.body.nom_client,
                    req.body.pays_client,
                    req.body.codePostal_client,
                    req.body.ville_client,
                    req.body.adresse_client,
                    req.body.numMaison_client,
                    req.body.gsm_client
                    //req.body.cp_client,
                    /*req.body.statut_client,
                    req.body.desact_client,
                    req.body.type_user*/
                    ];

                client.query(sql, data_post, function (err, clients_post){

                    if (err) {
                        res.status(400);
                        log.info(err);
                        return res.json({"status": 400, "message": err});
                    }
                    client.query("SELECT * FROM clients ORDER BY idclient ASC", function (err, clients_post){

                        if (err) {
                            res.status(401);
                            return res.json({"status": 401, "message": err});
                        }
                        done();
                        return res.json(clients_post.rows);
                    });
                });

            });
});


//*******Validation E mail*********
//Configuration E mail "source"
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "hotmail",
    auth: {
        user: "maxence.begon@hotmail.com",
        pass: "senbonzakura01"
    }
});

var rand,mailOptions,host,link;
router.use(chromelogger.middleware);

router.get('/send',function(req,res){

    //rand= cryptoJS.MD5(Math.floor((Math.random() * 100) + 54));
    rand= cryptoJS.MD5(myLogin);//crypt tempo le login pour le mail
    host=req.get('host');
    link="https://"+req.get('host')+"/register/verify?id="+rand;
    //link ="https://vps258804.ovh.net/send/verify?id="+rand;
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email ShareABike account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error"+error);
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent"+myLogin);
        }
    });
});
router.get('/verify',function(req,res){

    console.log(req.protocol+":/"+req.get('host'));
    //if((req.protocol+"://"+req.get('host'))==("https://"+host))
    //if((("https://vps258804.ovh.net:80/send/verify?id="+rand))==("https://"+host))
    {

        console.log("Domain is matched. Information is from Authentic email");
        pg.connect(databaseURL, function(err, client, done) {
            var sql = "SELECT login_client, idclient FROM clients "+
                "where statut_client = 2;";
            client.query(sql, function (err, myClient) {

                if (err) return res.sendStatus(401);
                //console.log(user.rows[0].niveau)
                done();
                var found = false;


                for(i=0;i<myClient.rows.length ; i++)
                {
                    rand= cryptoJS.MD5(myClient.rows[i].login_client);

                    if(req.query.id==rand) {

                        var sqlUpdate = "UPDATE clients set " +
                            "statut_client=1 WHERE idClient = " + myClient.rows[i].idclient;

                        client.query(sqlUpdate, function (err, ffff) {


                            if (err) {
                                log.info(err);
                                return res.sendStatus(401);
                            }
                        });
                        found = true;
                        res.end("<h1>Votre compte ShareABike " + myLogin + " a bien été activé</h1>");

                        console.log("email is verified");
                    }

                }
                if(!found){
                    console.log("email is not verified");
                    res.end("<h1>Bad Request</h1>");
                }

            });
        });



    }
    /*
    else
    {
        res.end("<h1>Request is from unknown source</h1>");
    }
*/
});

//test post qui fonctionne avec une autre table #maxence

/* router.post('/', function(req, res, next) {

 pg.connect(databaseURL, function(err, client, done) {
 var sql = "INSERT INTO userclient " +
 "(nom_user_client, prenom_user_client)"+
 "values($1,'testeu')";
 var data_post = [
 req.body.nom_user_client
 ];*/


// Returne router
module.exports = router;

