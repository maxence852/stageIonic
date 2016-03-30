/*
 * REpresentational
 * State
 * Transfer
 */
/*
Kaysarov
Mis à jours : 28/12/2015

*/

var express = require('express');
var router = express.Router();
var auth = require('./login_pg');
/*romano*/
var auth2 = require('./login_user');


/* Routes d'acces libre */
router.use('/', require('./list')); 
router.post('/login', auth.login);
router.use('/admin', require('../lib/validateToken'));

/* Routes d'acces libre utilisateur ionic */
//router.use('/login_users', require('./login_users'));


/*romano*/
router.post('/user', auth2.login);

/* Routes d'acces avec Authentification + Autorisation: exploitant */
router.use('/api/expl/pays', require('./pays')); 
router.use('/api/expl/villes', require('./villes')); 
router.use('/api/expl/typeadmins', require('./typeadmins'));
router.use('/api/expl/admins', require('./admins'));
router.use('/api/expl/domaines', require('./domaines'));
router.use('/api/expl/licences', require('./licences'));
router.use('/api/expl/typecamions', require('./typecamions'));
router.use('/api/expl/statutcamions', require('./statutcamions'));
router.use('/api/expl/gpscamions', require('./gpscamions'));
router.use('/api/expl/camions', require('./camions'));
router.use('/api/expl/stations', require('./stations'));
router.use('/api/expl/depots', require('./depots'));
router.use('/api/expl/tarifs', require('./tarifs'));
router.use('/api/expl/typevelos', require('./typevelos'));
router.use('/api/expl/statutvelos', require('./statutvelos'));
router.use('/api/expl/velos', require('./velos'));
router.use('/api/expl/gpsvelos', require('./gpsvelos'));
router.use('/api/expl/statutclients', require('./statutclients'));
router.use('/api/expl/clients', require('./clients'));
router.use('/api/expl/commentaires', require('./commentaires'));
router.use('/api/expl/bonustrajets', require('./bonustrajets'));
router.use('/api/expl/locations', require('./locations'));
router.use('/api/expl/transactions', require('./transactions'));
router.use('/api/expl/rapports', require('./rapports'));

/* Routes d'acces avec Authentification + Autorisation: opérateur */
router.use('/api/oper/villes', require('./oper_villes')); 
router.use('/api/oper/admins', require('./oper_admins'));
router.use('/api/oper/domaines', require('./oper_domaines'));
router.use('/api/oper/stations', require('./oper_stations'));
router.use('/api/oper/tarifs', require('./oper_tarifs'));
router.use('/api/oper/typevelos', require('./oper_typevelos'));
router.use('/api/oper/statutvelos', require('./oper_statutvelos'));
router.use('/api/oper/velos', require('./oper_velos'));
router.use('/api/oper/gpsvelos', require('./oper_gpsvelos'));
router.use('/api/oper/rapports', require('./oper_rapports'));
router.use('/api/oper/transactions', require('./oper_transactions'));
router.use('/api/oper/statutclients', require('./oper_statutclients'));
router.use('/api/oper/clients', require('./oper_clients'));
router.use('/api/oper/commentaires', require('./oper_commentaires'));
router.use('/api/oper/bonustrajets', require('./oper_bonustrajets'));
router.use('/api/oper/locations', require('./oper_locations'));



module.exports = router;
