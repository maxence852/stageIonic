/**
 * Created by maxence on 24/03/2016.
 */

myApp.factory('dataFactory', function($http) {

  var urlBase = "https://vps258804.ovh.net:80/api";
  return {
    /*users*/
    readusers: function(id) {
      return $http.get(urlBase + '/login_users/' + id);
    },
    read: function(id) {
      return $http.get(urlBase + '/expl/admins/' + id);
    },

    findAdmin: function() {
      return $http.get(urlBase + '/expl/admins');
    },

    deleteAdmin: function(id) {
      return $http.delete(urlBase + '/expl/admins/' + id);
    },

    createAdmin: function(post) {
      return $http.post(urlBase + '/expl/admins',{
        'nom': post.nom,
        'adresse': post.adresse,
        'cp': post.cp,
        'tel': post.tel,
        'gsm': post.gsm,
        'login': post.login,
        'password': post.password,
        'password_repet': post.password_repet,
        'type_admin': post.type_admin,
        'domaine': post.domaine,
        'num_licence': post.num_licence,
        'date_valid': post.date_valid
      });
    },

    editAdmin: function(post) {
      return $http.put(urlBase + '/expl/admins/' + post.idadmin, {
        'nom': post.nom,
        'adresse': post.adresse,
        'cp': post.cp,
        'tel': post.tel,
        'gsm': post.gsm,
        'login': post.login,
        'type_admin': post.type_admin,
        'desact': post.desact
      });
    },

    findLicence: function() {
      return $http.get(urlBase + '/expl/licences');
    },

    editLicence: function(post) {
      return $http.put(urlBase + '/expl/licences/' + post.idadmin, {
        'domaine': post.domaine,
        'num_licence': post.num_licence,
        'date_valid': post.date_valid
      });
    },

    editAdminPassw: function(post) {
      return $http.put(urlBase + '/expl/admins/password/' + post.idadmin, {
        'password': post.password,
        'password_repet': post.password_repet
      });
    },

    readNiveau: function(id) {
      return $http.get(urlBase + '/expl/typeadmins/' + id);
    },

    findNiveau: function() {
      return $http.get(urlBase + '/expl/typeadmins');
    },

    deleteNiveau: function(id) {
      return $http.delete(urlBase + '/expl/typeadmins/' + id);
    },

    createNiveau: function(post) {
      return $http.post(urlBase + '/expl/typeadmins',{
        'niveau': post.niveau,
        'nom_fr': post.nom_fr
      });
    },

    editNiveau: function(post) {
      return $http.put(urlBase + '/expl/typeadmins/' + post.idtype, {
        'niveau': post.niveau,
        'nom_fr': post.nom_fr
      });
    },

    readPays: function(id) {
      return $http.get(urlBase + '/expl/pays/' + id);
    },

    findPays: function() {
      return $http.get(urlBase + '/expl/pays');
    },

    deletePays: function(id) {
      return $http.delete(urlBase + '/expl/pays/' + id);
    },

    createPays: function(post) {
      return $http.post(urlBase + '/expl/pays',{
        'idpays': post.idpays,
        'nom_fr': post.nom_fr
      });
    },

    editPays: function(post) {
      return $http.put(urlBase + '/expl/pays/' + post.idpays, {
        'idpays': post.idpays,
        'nom_fr': post.nom_fr
      });
    },

    readVille: function(id) {
      return $http.get(urlBase + '/expl/villes/' + id);
    },

    readCpville: function(cpays, cp) {
      return $http.get(urlBase + '/expl/villes/' + cpays + '/' + cp);
    },

    findVille: function() {
      return $http.get(urlBase + '/expl/villes');
    },

    findVille_oper: function() {
      return $http.get(urlBase + '/oper/villes');
    },

    deleteVille: function(id) {
      return $http.delete(urlBase + '/expl/villes/' + id);
    },

    createVille: function(post) {
      return $http.post(urlBase + '/expl/villes',{
        'cpville': post.cpville,
        'nomville': post.nomville,
        'codepays': post.codepays
      });
    },

    editVille: function(post) {
      return $http.put(urlBase + '/expl/villes/' + post.idville, {
        'cpville': post.cpville,
        'nomville': post.nomville,
        'codepays': post.codepays
      });
    },
    /*operateur*/
    findOper: function() {
      return $http.get(urlBase + '/oper/admins');
    },

    editOper: function(post) {
      return $http.put(urlBase + '/oper/admins', {
        'nom': post.nom,
        'adresse': post.adresse,
        'cp': post.cp,
        'tel': post.tel,
        'gsm': post.gsm,
        'login': post.login,
      });
    },

    editOperPassw: function(post) {
      return $http.put(urlBase + '/oper/admins/pass/word', {
        'password': post.password,
        'password_repet': post.password_repet
      });
    },
    /*domaines*/
    readDomaine: function(id) {
      return $http.get(urlBase + '/expl/domaines/' + id);
    },

    findDomaine: function() {
      return $http.get(urlBase + '/expl/domaines');
    },

    deleteDomaine: function(id) {
      return $http.delete(urlBase + '/expl/domaines/' + id);
    },

    createDomaine: function(post) {
      return $http.post(urlBase + '/expl/domaines',{
        'iddomaine': post.iddomaine,
        'zone_domaine': post.zone_domaine,
        'tel_service': post.tel_service,
        'activ_ecadenas': post.activ_ecadenas,
        'activ_pucegps': post.activ_pucegps,
        'activ_gpscamion': post.activ_gpscamion,
        'descript_domaine': post.descript_domaine
      });
    },

    editDomaine: function(post) {
      return $http.put(urlBase + '/expl/domaines/' + post.iddomaine, {
        'zone_domaine': post.zone_domaine,
        'tel_service': post.tel_service,
        'activ_ecadenas': post.activ_ecadenas,
        'activ_pucegps': post.activ_pucegps,
        'activ_gpscamion': post.activ_gpscamion,
        'descript_domaine': post.descript_domaine,
        'desact_domaine': post.desact_domaine
      });
    },
    centerDomaine: function(id) {
      return $http.get(urlBase + '/expl/domaines/center/' + id);
    },
    readDomainepoint: function(id) {
      return $http.get(urlBase + '/expl/domaines/polygone/' + id);
    },
    createDomainepoint: function(id, points) {
      return $http.put(urlBase + '/expl/domaines/polygone/' + id,{'zone_domaine': points});
    },
    /*domaineOper*/
    findDomaineOper: function() {
      return $http.get(urlBase + '/oper/domaines');
    },
    centerDomaineOper: function() {
      return $http.get(urlBase + '/oper/domaines/center');
    },
    readDomainepointOper: function() {
      return $http.get(urlBase + '/oper/domaines/polygone');
    },
    editDomaineOper: function(post) {
      return $http.put(urlBase + '/oper/domaines', {
        'tel_service': post.tel_service,
        'descript_domaine': post.descript_domaine
      });
    },
    /*camions*/
    readTypecamion: function(id) {
      return $http.get(urlBase + '/expl/typecamions/' + id);
    },

    findTypecamion: function() {
      return $http.get(urlBase + '/expl/typecamions');
    },

    deleteTypecamion: function(id) {
      return $http.delete(urlBase + '/expl/typecamions/' + id);
    },

    createTypecamion: function(post) {
      return $http.post(urlBase + '/expl/typecamions',{
        'idtypecamion': post.idtypecamion,
        'nom_type_fr': post.nom_type_fr
      });
    },

    editTypecamion: function(post) {
      return $http.put(urlBase + '/expl/typecamions/' + post.idtypecamion, {
        'idtypecamion': post.idtypecamion,
        'nom_type_fr': post.nom_type_fr
      });
    },
    readStatutcamion: function(id) {
      return $http.get(urlBase + '/expl/statutcamions/' + id);
    },

    findStatutcamion: function() {
      return $http.get(urlBase + '/expl/statutcamions');
    },

    deleteStatutcamion: function(id) {
      return $http.delete(urlBase + '/expl/statutcamions/' + id);
    },

    createStatutcamion: function(post) {
      return $http.post(urlBase + '/expl/statutcamions',{
        'idstatutcamion': post.idstatutcamion,
        'nom_statut_fr': post.nom_statut_fr
      });
    },

    editStatutcamion: function(post) {
      return $http.put(urlBase + '/expl/statutcamions/' + post.idstatutcamion, {
        'idstatutcamion': post.idstatutcamion,
        'nom_statut_fr': post.nom_statut_fr
      });
    },
    readGpscamion: function(id) {
      return $http.get(urlBase + '/expl/gpscamions/' + id);
    },

    readGps: function(id) {
      return $http.get(urlBase + '/expl/gpscamions/camion/' + id);
    },

    findGpscamion: function() {
      return $http.get(urlBase + '/expl/gpscamions');
    },

    deleteGpscamion: function(id) {
      return $http.delete(urlBase + '/expl/gpscamions/' + id);
    },

    createGpscamion: function(post) {
      return $http.post(urlBase + '/expl/gpscamions',{
        'gps': post.gps,
        'position': post.position
      });
    },

    editGpscamion: function(post) {
      return $http.put(urlBase + '/expl/gpscamions/' + post.idgpscamion, {
        'gps': post.gps,
        'position': post.position
      });
    },
    readCamion: function(id) {
      return $http.get(urlBase + '/expl/camions/' + id);
    },

    findCamion: function() {
      return $http.get(urlBase + '/expl/camions');
    },

    deleteCamion: function(id) {
      return $http.delete(urlBase + '/expl/camions/' + id);
    },

    createCamion: function(post) {
      return $http.post(urlBase + '/expl/camions',{
        'immatriculation': post.immatriculation,
        'dom_camion': post.dom_camion,
        'type_camion': post.type_camion,
        'capacite_camion': post.capacite_camion,
        'statut_camion': post.statut_camion,
        'gps_camion': post.gps_camion
      });
    },

    editCamion: function(post) {
      return $http.put(urlBase + '/expl/camions/' + post.idcamion, {
        'immatriculation': post.immatriculation,
        'dom_camion': post.dom_camion,
        'type_camion': post.type_camion,
        'capacite_camion': post.capacite_camion,
        'statut_camion': post.statut_camion,
        'gps_camion': post.gps_camion,
        'desact_camion': post.desact_camion
      });
    },
    /*stations*/
    readStation: function(id) {
      return $http.get(urlBase + '/expl/stations/' + id);
    },

    findStation: function() {
      return $http.get(urlBase + '/expl/stations');
    },

    findStationDomaine: function(id) {
      return $http.get(urlBase + '/expl/stations/domaine/' + id);
    },
    deleteStation: function(id) {
      return $http.delete(urlBase + '/expl/stations/' + id);
    },

    createStation: function(post) {
      return $http.post(urlBase + '/expl/stations',{
        'dom_station': post.dom_station,
        'nom_station': post.nom_station,
        'fixe_virtuelle': post.fixe_virtuelle,
        'zone_station': post.zone_station,
        'capacite_optimum': post.capacite_optimum,
        'limite_vide': post.limite_vide,
        'bonus_ajouter': post.bonus_ajouter,
        'limite_pleine': post.limite_pleine,
        'bonus_enlever': post.bonus_enlever,
        'descript_station': post.descript_station
      });
    },

    editStation: function(post) {
      return $http.put(urlBase + '/expl/stations/' + post.idstation, {
        'dom_station': post.dom_station,
        'nom_station': post.nom_station,
        'fixe_virtuelle': post.fixe_virtuelle,
        'zone_station': post.zone_station,
        'capacite_optimum': post.capacite_optimum,
        'limite_vide': post.limite_vide,
        'bonus_ajouter': post.bonus_ajouter,
        'limite_pleine': post.limite_pleine,
        'bonus_enlever': post.bonus_enlever,
        'descript_station': post.descript_station,
        'desact_station': post.desact_station
      });
    },
    centerStation: function(id) {
      return $http.get(urlBase + '/expl/stations/center/' + id);
    },
    readStationpoint: function(id) {
      return $http.get(urlBase + '/expl/stations/polygone/' + id);
    },
    createStationpoint: function(id, points) {
      return $http.put(urlBase + '/expl/stations/polygone/' + id,{'zone_station': points});
    },
    readStationPolygones:  function(domaine) {
      return $http.get(urlBase + '/expl/stations/polygones/' + domaine);
    },
    /*depots*/
    readDepot: function(id) {
      return $http.get(urlBase + '/expl/depots/' + id);
    },

    findDepot: function() {
      return $http.get(urlBase + '/expl/depots');
    },

    deleteDepot: function(id) {
      return $http.delete(urlBase + '/expl/depots/' + id);
    },

    createDepot: function(post) {
      return $http.post(urlBase + '/expl/depots',{
        'dom_depot': post.dom_depot,
        'adresse': post.adresse,
        'tel': post.tel,
        'capacite_camion': post.capacite_camion,
        'capacite_velo': post.capacite_velo,
        'position_depot': post.position_depot
      });
    },

    editDepot: function(post) {
      return $http.put(urlBase + '/expl/depots/' + post.iddepot, {
        'dom_depot': post.dom_depot,
        'adresse': post.adresse,
        'tel': post.tel,
        'capacite_camion': post.capacite_camion,
        'capacite_velo': post.capacite_velo,
        'position_depot': post.position_depot
      });
    },
    createDepotpoint: function(id, point) {
      return $http.put(urlBase + '/expl/depots/point/' + id,{'position_depot': point});
    },
    /*tarifs*/
    readTarif: function(id) {
      return $http.get(urlBase + '/expl/tarifs/' + id);
    },

    findTarif: function() {
      return $http.get(urlBase + '/expl/tarifs');
    },

    deleteTarif: function(id) {
      return $http.delete(urlBase + '/expl/tarifs/' + id);
    },

    createTarif: function(post) {
      return $http.post(urlBase + '/expl/tarifs',{
        'dom_tarif': post.dom_tarif,
        'nom_tarif':post.nom_tarif,
        'duree_gratuit': post.duree_gratuit,
        'prix_1': post.prix_1,
        'duree_1': post.duree_1,
        'prix_2': post.prix_2,
        'duree_2': post.duree_2,
        'prix_3': post.prix_3,
        'duree_3': post.duree_3,
        'prix_plus': post.prix_plus,
        'prix_reservation': post.prix_reservation,
        'descript_tarif': post.descript_tarif
      });
    },

    editTarif: function(post) {
      return $http.put(urlBase + '/expl/tarifs/' + post.idtarif, {
        'dom_tarif': post.dom_tarif,
        'nom_tarif': post.nom_tarif,
        'duree_gratuit': post.duree_gratuit,
        'prix_1': post.prix_1,
        'duree_1': post.duree_1,
        'prix_2': post.prix_2,
        'duree_2': post.duree_2,
        'prix_3': post.prix_3,
        'duree_3': post.duree_3,
        'prix_plus': post.prix_plus,
        'prix_reservation': post.prix_reservation,
        'descript_tarif': post.descript_tarif,
        'desact_tarif': post.desact_tarif
      });
    },
    /*tarifsOper*/
    readTarifOper: function(id) {
      return $http.get(urlBase + '/oper/tarifs/' + id);
    },

    findTarifOper: function() {
      return $http.get(urlBase + '/oper/tarifs');
    },

    deleteTarifOper: function(id) {
      return $http.delete(urlBase + '/oper/tarifs/' + id);
    },

    createTarifOper: function(post) {
      return $http.post(urlBase + '/oper/tarifs',{
        'nom_tarif':post.nom_tarif,
        'duree_gratuit': post.duree_gratuit,
        'prix_1': post.prix_1,
        'duree_1': post.duree_1,
        'prix_2': post.prix_2,
        'duree_2': post.duree_2,
        'prix_3': post.prix_3,
        'duree_3': post.duree_3,
        'prix_plus': post.prix_plus,
        'prix_reservation': post.prix_reservation,
        'descript_tarif': post.descript_tarif
      });
    },

    editTarifOper: function(post) {
      return $http.put(urlBase + '/oper/tarifs/' + post.idtarif, {
        'nom_tarif': post.nom_tarif,
        'duree_gratuit': post.duree_gratuit,
        'prix_1': post.prix_1,
        'duree_1': post.duree_1,
        'prix_2': post.prix_2,
        'duree_2': post.duree_2,
        'prix_3': post.prix_3,
        'duree_3': post.duree_3,
        'prix_plus': post.prix_plus,
        'prix_reservation': post.prix_reservation,
        'descript_tarif': post.descript_tarif,
      });
    },
    /*velos*/
    readTypevelo: function(id) {
      return $http.get(urlBase + '/expl/typevelos/' + id);
    },

    findTypevelo: function() {
      return $http.get(urlBase + '/expl/typevelos');
    },

    deleteTypevelo: function(id) {
      return $http.delete(urlBase + '/expl/typevelos/' + id);
    },

    createTypevelo: function(post) {
      return $http.post(urlBase + '/expl/typevelos',{
        'tarif': post.tarif,
        'dom_typevelo':post.dom_typevelo,
        'nom_type_fr': post.nom_type_fr,
        'nom_type_en': post.nom_type_en,
        'reservation_possible': post.reservation_possible,
        'avertir_sidisponible': post.avertir_sidisponible,
        'deposer_station': post.deposer_station,
        'descript_type': post.descript_type,
        'uri_photovelo': post.uri_photovelo
      });
    },

    editTypevelo: function(post) {
      return $http.put(urlBase + '/expl/typevelos/' + post.idtypevelo, {
        'tarif': post.tarif,
        'dom_typevelo':post.dom_typevelo,
        'nom_type_fr': post.nom_type_fr,
        'nom_type_en': post.nom_type_en,
        'reservation_possible': post.reservation_possible,
        'avertir_sidisponible': post.avertir_sidisponible,
        'deposer_station': post.deposer_station,
        'descript_type': post.descript_type,
        'desact_type': post.desact_type,
        'uri_photovelo': post.uri_photovelo
      });
    },

    readStatutvelo: function(id) {
      return $http.get(urlBase + '/expl/statutvelos/' + id);
    },

    findStatutvelo: function() {
      return $http.get(urlBase + '/expl/statutvelos');
    },

    deleteStatutvelo: function(id) {
      return $http.delete(urlBase + '/expl/statutvelos/' + id);
    },

    createStatutvelo: function(post) {
      return $http.post(urlBase + '/expl/statutvelos',{
        'idstatutvelo': post.idstatutvelo,
        'nom_statut_fr': post.nom_statut_fr
      });
    },

    editStatutvelo: function(post) {
      return $http.put(urlBase + '/expl/statutvelos/' + post.idstatutvelo, {
        'idstatutvelo': post.idstatutvelo,
        'nom_statut_fr': post.nom_statut_fr
      });
    },


    readVelo: function(id) {
      return $http.get(urlBase + '/expl/velos/' + id);
    },

    readVeloDomaine: function(iddomaine, id) {
      return $http.get(urlBase + '/expl/velos/domaine/' + iddomaine);
    },

    findVelo: function() {
      return $http.get(urlBase + '/expl/velos');
    },

    deleteVelo: function(id) {
      return $http.delete(urlBase + '/expl/velos/' + id);
    },

    createVelo: function(post) {
      return $http.post(urlBase + '/expl/velos', {
        'station_velo': post.station_velo,
        'type_velo': post.type_velo,
        'statut_velo': post.statut_velo,
        'dom_velo': post.dom_velo,
        'tarif_velo': post.tarif_velo,
        'position_velo': post.position_velo,
        'code_cadenas': post.code_cadenas,
        'code_ecadenas': post.code_ecadenas,
        'pucegps_velo': post.pucegps_velo
      });
    },

    editVelo: function(post) {
      return $http.put(urlBase + '/expl/velos/' + post.idvelo, {
        'station_velo': post.station_velo,
        'type_velo': post.type_velo,
        'statut_velo': post.statut_velo,
        'dom_velo': post.dom_velo,
        'tarif_velo': post.tarif_velo,
        'position_velo': post.position_velo,
        'code_cadenas': post.code_cadenas,
        'code_ecadenas': post.code_ecadenas,
        'pucegps_velo': post.pucegps_velo,
        'desact_velo': post.desact_velo
      });
    },

    createVelopoint: function(id, point) {
      return $http.put(urlBase + '/expl/velos/point/' + id,{'position_velo': point});
    },

    readGpsid: function(idvelo) {
      return $http.get(urlBase + '/expl/gpsvelos/velo/' + idvelo);
    },
    readGpsvelo: function(id) {
      return $http.get(urlBase + '/expl/gpsvelos/' + id);
    },

    findGpsvelo: function() {
      return $http.get(urlBase + '/expl/gpsvelos');
    },

    deleteGpsvelo: function(id) {
      return $http.delete(urlBase + '/expl/gpsvelos/' + id);
    },

    createGpsvelo: function(post) {
      return $http.post(urlBase + '/expl/gpsvelos',{
        'pucegps': post.pucegps,
        'position': post.position
      });
    },

    editGpsvelo: function(post) {
      return $http.put(urlBase + '/expl/gpsvelos/' + post.idgpsvelo, {
        'pucegps': post.pucegps,
        'position': post.position
      });
    },
    /*clients*/
    readStatutclient: function(id) {
      return $http.get(urlBase + '/expl/statutclients/' + id);
    },

    findStatutclient: function() {
      return $http.get(urlBase + '/expl/statutclients');
    },

    deleteStatutclient: function(id) {
      return $http.delete(urlBase + '/expl/statutclients/' + id);
    },

    createStatutclient: function(post) {
      return $http.post(urlBase + '/expl/statutclients',{
        'idstatutclient': post.idstatutclient,
        'nom_statut_fr': post.nom_statut_fr
      });
    },

    editStatutclient: function(post) {
      return $http.put(urlBase + '/expl/statutclients/' + post.idstatutclient, {
        'idstatutclient': post.idstatutclient,
        'nom_statut_fr': post.nom_statut_fr
      });
    },

    readClient: function(id) {
      return $http.get(urlBase + '/expl/clients/' + id);
    },

    findClient: function() {
      return $http.get(urlBase + '/expl/clients');
    },

    findClientActif: function() {
      return $http.get(urlBase + '/expl/clients/list/actifs');
    },

    deleteClient: function(id) {
      return $http.delete(urlBase + '/expl/clients/' + id);
    },

    createClient: function(post) {
      return $http.post(urlBase + '/expl/clients',{
        'nom_client': post.nom_client,
        'prenom_client': post.prenom_client,
        'adresse_client': post.adresse_client,
        'cp_client': post.cp_client,
        'gsm_client': post.gsm_client,
        'pin_code': post.pin_code,
        'login_client': post.login_client,
        'password_client': post.password_client,
        'statut_client': post.statut_client,
        'solde_montant': post.solde_montant,
        'solde_bonus': post.solde_bonus
      });
    },

    editClient: function(post) {
      return $http.put(urlBase + '/expl/clients/' + post.idclient, {
        'nom_client': post.nom_client,
        'prenom_client': post.prenom_client,
        'adresse_client': post.adresse_client,
        'cp_client': post.cp_client,
        'gsm_client': post.gsm_client,
        'statut_client': post.statut_client,
        'desact_client': post.desact_client
      });
    },

    readClientCommentaire: function(id) {
      return $http.get(urlBase + '/expl/commentaires/' + id);
    },

    findClientCommentaire: function(id) {
      return $http.get(urlBase + '/expl/commentaires/pourclient/' + id );
    },

    deleteClientCommentaire: function(id) {
      return $http.delete(urlBase + '/expl/commentaires/' + id);
    },
    createClientCommentaire: function(post) {
      return $http.post(urlBase + '/expl/commentaires',{
        'post_pour': post.post_pour,
        'commentaire': post.commentaire
      });
    },
    editClientCommentaire: function(post) {
      return $http.put(urlBase + '/expl/commentaires/' + post.idcommentaire, {
        'desact_commentaire': post.desact_commentaire
      });
    },
    /*clientsOper*/
    findStatutclientOper: function() {
      return $http.get(urlBase + '/oper/statutclients');
    },

    readClientOper: function(id) {
      return $http.get(urlBase + '/oper/clients/' + id);
    },

    findClientOper: function() {
      return $http.get(urlBase + '/oper/clients');
    },

    findClientActifOper: function() {
      return $http.get(urlBase + '/oper/clients/list/actifs');
    },

    deleteClientOper: function(id) {
      return $http.delete(urlBase + '/oper/clients/' + id);
    },

    createClientOper: function(post) {
      return $http.post(urlBase + '/oper/clients',{
        'nom_client': post.nom_client,
        'prenom_client': post.prenom_client,
        'adresse_client': post.adresse_client,
        'cp_client': post.cp_client,
        'gsm_client': post.gsm_client,
        'pin_code': post.pin_code,
        'login_client': post.login_client,
        'password_client': post.password_client,
        'statut_client': post.statut_client,
        'solde_montant': post.solde_montant,
        'solde_bonus': post.solde_bonus
      });
    },

    editClientOper: function(post) {
      return $http.put(urlBase + '/oper/clients/' + post.idclient, {
        'nom_client': post.nom_client,
        'prenom_client': post.prenom_client,
        'adresse_client': post.adresse_client,
        'cp_client': post.cp_client,
        'gsm_client': post.gsm_client,
        'statut_client': post.statut_client
      });
    },

    readClientCommentaireOper: function(id) {
      return $http.get(urlBase + '/oper/commentaires/' + id);
    },

    findClientCommentaireOper: function(id) {
      return $http.get(urlBase + '/oper/commentaires/pourclient/' + id );
    },

    deleteClientCommentaireOper: function(id) {
      return $http.delete(urlBase + '/oper/commentaires/' + id);
    },
    createClientCommentaireOper: function(post) {
      return $http.post(urlBase + '/oper/commentaires',{
        'post_pour': post.post_pour,
        'commentaire': post.commentaire
      });
    },
    /*stationOper*/
    readStationOper: function(id) {
      return $http.get(urlBase + '/oper/stations/' + id);
    },

    findStationOper: function() {
      return $http.get(urlBase + '/oper/stations');
    },

    deleteStationOper: function(id) {
      return $http.delete(urlBase + '/oper/stations/' + id);
    },

    createStationOper: function(post) {
      return $http.post(urlBase + '/oper/stations',{
        'nom_station': post.nom_station,
        'fixe_virtuelle': post.fixe_virtuelle,
        'zone_station': post.zone_station,
        'capacite_optimum': post.capacite_optimum,
        'limite_vide': post.limite_vide,
        'bonus_ajouter': post.bonus_ajouter,
        'limite_pleine': post.limite_pleine,
        'bonus_enlever': post.bonus_enlever,
        'descript_station': post.descript_station
      });
    },

    editStationOper: function(post) {
      return $http.put(urlBase + '/oper/stations/' + post.idstation, {
        'nom_station': post.nom_station,
        'fixe_virtuelle': post.fixe_virtuelle,
        'zone_station': post.zone_station,
        'capacite_optimum': post.capacite_optimum,
        'limite_vide': post.limite_vide,
        'bonus_ajouter': post.bonus_ajouter,
        'limite_pleine': post.limite_pleine,
        'bonus_enlever': post.bonus_enlever,
        'descript_station': post.descript_station
      });
    },
    centerStationOper: function(id) {
      return $http.get(urlBase + '/oper/stations/center/' + id);
    },
    createStationpointOper: function(id, points) {
      return $http.put(urlBase + '/oper/stations/polygone/' + id,{'zone_station': points});
    },
    readStationPolygonesOper:  function(domaine) {
      return $http.get(urlBase + '/oper/stations/polygones/' + domaine);
    },
    /*bonustrajets*/
    readBonustrajet: function(id) {
      return $http.get(urlBase + '/expl/bonustrajets/' + id);
    },

    findBonustrajet: function() {
      return $http.get(urlBase + '/expl/bonustrajets');
    },

    deleteBonustrajet: function(id) {
      return $http.delete(urlBase + '/expl/bonustrajets/' + id);
    },

    createBonustrajet: function(post) {
      return $http.post(urlBase + '/expl/bonustrajets', {
        'dom_bonustrajet': post.dom_bonustrajet,
        'station_depart': post.station_depart,
        'station_arriver': post.station_arriver,
        'date_valable': post.date_valable,
        'montant_bonus': post.montant_bonus
      });
    },

    editBonustrajet: function(post) {
      return $http.put(urlBase + '/expl/bonustrajets/' + post.idbonustrajet, {
        'dom_bonustrajet': post.dom_bonustrajet,
        'station_depart': post.station_depart,
        'station_arriver': post.station_arriver,
        'date_valable': post.date_valable,
        'montant_bonus': post.montant_bonus,
        'desact_bonustrajet': post.desact_bonustrajet
      });
    },
    /*bonustrajetsOper*/
    readBonustrajetOper: function(id) {
      return $http.get(urlBase + '/oper/bonustrajets/' + id);
    },

    findBonustrajetOper: function() {
      return $http.get(urlBase + '/oper/bonustrajets');
    },

    deleteBonustrajetOper: function(id) {
      return $http.delete(urlBase + '/oper/bonustrajets/' + id);
    },

    createBonustrajetOper: function(post) {
      return $http.post(urlBase + '/oper/bonustrajets', {
        'station_depart': post.station_depart,
        'station_arriver': post.station_arriver,
        'date_valable': post.date_valable,
        'montant_bonus': post.montant_bonus
      });
    },

    editBonustrajetOper: function(post) {
      return $http.put(urlBase + '/oper/bonustrajets/' + post.idbonustrajet, {
        'station_depart': post.station_depart,
        'station_arriver': post.station_arriver,
        'date_valable': post.date_valable,
        'montant_bonus': post.montant_bonus
      });
    },
    /*locations*/
    readLocationFinie: function(id) {
      return $http.get(urlBase + '/expl/locations/finies/' + id);
    },

    findLocationFinie: function() {
      return $http.get(urlBase + '/expl/locations/finies');
    },
    readLocationEncours: function(id) {
      return $http.get(urlBase + '/expl/locations/encours/' + id);
    },

    findLocationEncours: function() {
      return $http.get(urlBase + '/expl/locations/encours');
    },

    findLocationClient: function(id) {
      return $http.get(urlBase + '/expl/locations/client/' + id);
    },

    findLocationVelo: function(id) {
      return $http.get(urlBase + '/expl/locations/velo/' + id);
    },
    /*locationsOper*/
    readLocationFinieOper: function(id) {
      return $http.get(urlBase + '/oper/locations/finies/' + id);
    },

    findLocationFinieOper: function() {
      return $http.get(urlBase + '/oper/locations/finies');
    },
    readLocationEncoursOper: function(id) {
      return $http.get(urlBase + '/oper/locations/encours/' + id);
    },

    findLocationEncoursOper: function() {
      return $http.get(urlBase + '/oper/locations/encours');
    },

    findLocationClientOper: function(id) {
      return $http.get(urlBase + '/oper/locations/client/' + id);
    },

    findLocationVeloOper: function(id) {
      return $http.get(urlBase + '/oper/locations/velo/' + id);
    },
    /*transactions*/
    readTransaction: function(id) {
      return $http.get(urlBase + '/expl/transactions/' + id);
    },

    findTransaction: function() {
      return $http.get(urlBase + '/expl/transactions');
    },

    findTransactionClient: function(id) {
      return $http.get(urlBase + '/expl/transactions/client/' + id);
    },

    createTransaction: function(post) {
      return $http.post(urlBase + '/expl/transactions', {
        'dom_transaction': post.dom_transaction,
        'client_transaction': post.client_transaction,
        'location': post.location,
        'montant': post.montant,
        'bonus': post.bonus,
        'justification': post.justification
      });
    },

    findDomaineActif: function() {
      return $http.get(urlBase + '/expl/domaines/list/actifs');
    },
    /*transactionsOper*/
    readTransactionOper: function(id) {
      return $http.get(urlBase + '/oper/transactions/' + id);
    },

    findTransactionOper: function() {
      return $http.get(urlBase + '/oper/transactions');
    },

    findTransactionClientOper: function(id) {
      return $http.get(urlBase + '/oper/transactions/client/' + id);
    },

    createTransactionOper: function(post) {
      return $http.post(urlBase + '/oper/transactions', {
        'client_transaction': post.client_transaction,
        'location': post.location,
        'montant': post.montant,
        'bonus': post.bonus,
        'justification': post.justification
      });
    },
    /*Rapport*/
    Rapport: function(post) {
      return $http.post(urlBase + '/expl/rapports', {
        'domaine': post.domaine,
        'date1': post.date1,
        'date2': post.date2
      });
    },
    /*RapportOper*/
    RapportOper: function(post) {
      return $http.post(urlBase + '/oper/rapports', {
        'date1': post.date1,
        'date2': post.date2
      });
    },
    /*velosOper*/

    readTypeveloOper: function(id) {
      return $http.get(urlBase + '/oper/typevelos/' + id);
    },

    findTypeveloOper: function() {
      return $http.get(urlBase + '/oper/typevelos');
    },

    deleteTypeveloOper: function(id) {
      return $http.delete(urlBase + '/oper/typevelos/' + id);
    },

    createTypeveloOper: function(post) {
      return $http.post(urlBase + '/oper/typevelos',{
        'tarif': post.tarif,
        'nom_type_fr': post.nom_type_fr,
        'nom_type_en': post.nom_type_en,
        'reservation_possible': post.reservation_possible,
        'avertir_sidisponible': post.avertir_sidisponible,
        'deposer_station': post.deposer_station,
        'descript_type': post.descript_type,
        'uri_photovelo': post.uri_photovelo
      });
    },

    editTypeveloOper: function(post) {
      return $http.put(urlBase + '/oper/typevelos/' + post.idtypevelo, {
        'tarif': post.tarif,
        'nom_type_fr': post.nom_type_fr,
        'nom_type_en': post.nom_type_en,
        'reservation_possible': post.reservation_possible,
        'avertir_sidisponible': post.avertir_sidisponible,
        'deposer_station': post.deposer_station,
        'descript_type': post.descript_type,
        'uri_photovelo': post.uri_photovelo
      });
    },

    findStatutveloOper: function() {
      return $http.get(urlBase + '/oper/statutvelos');
    },

    readVeloOper: function(id) {
      return $http.get(urlBase + '/oper/velos/' + id);
    },

    readVeloDomaineOper: function(id) {
      return $http.get(urlBase + '/oper/velos');
    },

    findVeloOper: function() {
      return $http.get(urlBase + '/oper/velos');
    },

    deleteVeloOper: function(id) {
      return $http.delete(urlBase + '/oper/velos/' + id);
    },

    createVeloOper: function(post) {
      return $http.post(urlBase + '/oper/velos', {
        'station_velo': post.station_velo,
        'type_velo': post.type_velo,
        'statut_velo': post.statut_velo,
        'tarif_velo': post.tarif_velo,
        'position_velo': post.position_velo,
        'code_cadenas': post.code_cadenas,
        'code_ecadenas': post.code_ecadenas,
        'pucegps_velo': post.pucegps_velo
      });
    },

    editVeloOper: function(post) {
      return $http.put(urlBase + '/oper/velos/' + post.idvelo, {
        'station_velo': post.station_velo,
        'type_velo': post.type_velo,
        'statut_velo': post.statut_velo,
        'tarif_velo': post.tarif_velo,
        'position_velo': post.position_velo,
        'code_cadenas': post.code_cadenas,
        'code_ecadenas': post.code_ecadenas,
        'pucegps_velo': post.pucegps_velo
      });
    },

    createVelopointOper: function(id, point) {
      return $http.put(urlBase + '/oper/velos/point/' + id,{'position_velo': point});
    },

    readGpsidOper: function(idvelo) {
      return $http.get(urlBase + '/oper/gpsvelos/velo/' + idvelo);
    },
  };
});


