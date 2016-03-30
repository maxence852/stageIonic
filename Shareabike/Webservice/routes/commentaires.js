/*
Kaysarov
Mis à jours : 20/12/2015

*/

var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../config');
var log = require('../lib/log')(module);
var databaseURL = config.get('db');
var jwt = require('jwt-simple');
var secret = require('../config/secret');



/* GET /commentaires listing. jointure expediteur */ 
router.get('/', function(req, res, next) {
    //connexion à PostgreSQL
    pg.connect(databaseURL, function(err, client, done) {
        // SQL Query
        var sql =  "SELECT idcommentaire, dom_commentaire, post_admin, post_par, post_pour, "+
        "commentaire, date_post, desact_commentaire, nom AS expediteur_admin, nom_client AS expediteur_client "+
        "FROM commentaires  "+ 
        "LEFT JOIN admins ON commentaires.post_admin = admins.idadmin "+ 
        "LEFT JOIN clients ON commentaires.post_par = clients.idclient "+
        "ORDER BY date_post DESC";
        client.query(sql, function (err, commentaires_get){
        // Erreurs
            if (err) return next(err);
            done();
            return res.json(commentaires_get.rows);            
        });
    });
});


/* POST /commentaires */
router.post('/', function(req, res, next) {
  var id = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').iss;
  var dom = jwt.decode(req.headers['x-access-token'], secret.secretToken, 'HS512').dmn;

    if (id != undefined) {
     pg.connect(databaseURL, function(err, client, done) {

        var sql = "INSERT INTO commentaires " +
        "(dom_commentaire, post_admin, post_pour, commentaire) "+
        "values($1, $2, $3, $4)";
        var data_post = [
            dom, 
            id, 
            req.body.post_pour, 
            req.body.commentaire];


        client.query(sql, data_post, function (err, commentaires_post){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM commentaires WHERE commentaire=($1)", [req.body.commentaire], function (err, commentaires_post){

                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(commentaires_post.rows);            
            }); 
        });
            
    });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "Accès non autorisé"});
    }
});


/* GET /commentaires/id */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            client.query("SELECT * FROM commentaires  WHERE idcommentaire=($1)", [id], function (err, commentairesid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(commentairesid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});


/* GET /commentaires/pourclient/idclient */
router.get('/pourclient/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql =  "SELECT idcommentaire, dom_commentaire, post_admin, post_par, post_pour, "+
            "commentaire, date_post, desact_commentaire, nom AS expediteur_admin, nom_client AS expediteur_client "+
            "FROM commentaires  "+ 
            "LEFT JOIN admins ON commentaires.post_admin = admins.idadmin "+ 
            "LEFT JOIN clients ON commentaires.post_par = clients.idclient "+
            "WHERE post_pour=($1)  ORDER BY date_post DESC"; 
               client.query(sql, [id], function (err, commentairesid_get){
                if (err) {
                    res.status(401);
                    return res.json({"status": 401, "message": err});
                }
                done();
                return res.json(commentairesid_get.rows);            
            });
        });
    } else {
        res.status(400);
        return res.json({"status": 400, "message": "id undefined"});
    }
});



/* PUT /commentaires/:id */
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (id != undefined) {
        pg.connect(databaseURL, function(err, client, done) {

            var sql = "UPDATE commentaires SET desact_commentaire=($1) WHERE idcommentaire=($2)";
            var data_post = [
            req.body.desact_commentaire, id];

            client.query(sql, data_post, function (err, commentaires_put){

                if (err) {
                    res.status(400);
                    log.info(err);
                    return res.json({"status": 400, "message": err});
                }
                client.query("SELECT * FROM commentaires  WHERE idcommentaire=($1)", [id], function (err, commentaires_put){

                    if (err) {
                        res.status(401);
                        log.info(err);
                        return res.json({"status": 401, "message": err});
                    } 
                    done();
                    return res.json(commentaires_put.rows);            
                }); 
            });
        });

    } else {
        res.status(401);
        log.info(err);
        return res.json({"status": 401, "message": "id undefined"});
    }
});



/* DELETE /commentaires/:id */
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(databaseURL, function(err, client, done) {

        client.query("DELETE FROM commentaires WHERE idcommentaire=($1)", [id], function (err, cb){

            if (err) {
                res.status(400);
                log.info(err);
                return res.json({"status": 400, "message": err});
            }
            client.query("SELECT * FROM commentaires WHERE idcommentaire=($1)", [id], function (err, cb){

                if (err) {
                    res.status(401);
                    log.info(err);
                    return res.json({"status": 401, "message": err});
                } 
                done();
                return res.json(cb.rows);            
            }); 
        });
            
    });
});


// Returne router
module.exports = router;



/*
Testes unitaires PostMan:
OK
11/12/2015

https://localhost:80/api/expl/commentaires get
[
    {
        "idcommentaire": 5,
        "dom_commentaire": null,
        "post_admin": 1,
        "post_par": null,
        "post_pour": 5,
        "commentaire": "ok",
        "date_post": "2015-12-20T10:59:15.404Z",
        "desact_commentaire": false,
        "expediteur_admin": "UMONS",
        "expediteur_client": null
    },
    {
        "idcommentaire": 4,
        "dom_commentaire": "mons",
        "post_admin": 2,
        "post_par": null,
        "post_pour": 1,
        "commentaire": "bravo!",
        "date_post": "2015-12-20T10:30:15.775Z",
        "desact_commentaire": false,
        "expediteur_admin": "Ville de Mons",
        "expediteur_client": null
    },
    {
        "idcommentaire": 1,
        "dom_commentaire": null,
        "post_admin": null,
        "post_par": 1,
        "post_pour": 5,
        "commentaire": "super!",
        "date_post": "2015-12-20T10:27:01.930Z",
        "desact_commentaire": false,
        "expediteur_admin": null,
        "expediteur_client": "Test"
    }
]


https://localhost:80/api/expl/commentaires/1 get
[
    {
        "idcommentaire": 1,
        "post_admin": null,
        "post_par": 1,
        "post_pour": 5,
        "commentaire": "super!",
        "date_post": "2015-12-20T10:27:01.930Z",
        "dom_commentaire": null,
        "desact_commentaire": false
    }
]


https://localhost:80/api/expl/commentaires post
[
    {
        "idcommentaire": 1,
        "post_admin": null,
        "post_par": 1,
        "post_pour": 5,
        "commentaire": "super!",
        "date_post": "2015-12-20T10:27:01.930Z",
        "dom_commentaire": null,
        "desact_commentaire": false
    }
]



https://localhost:80/api/expl/commentaires/pourclient/1
[
    {
        "idcommentaire": 4,
        "dom_commentaire": "mons",
        "post_admin": 2,
        "post_par": null,
        "post_pour": 1,
        "commentaire": "bravo!",
        "date_post": "2015-12-20T10:30:15.775Z",
        "desact_commentaire": false,
        "expediteur_admin": "Ville de Mons",
        "expediteur_client": null
    }
]

https://localhost:80/api/expl/commentaires/2 delete
[]




*/