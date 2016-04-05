/**
 * Created by maxence on 24/03/2016.
 */
myApp.factory('dataFactory2', function($http) {

  //var urlBase = "https://vps258804.ovh.net:80";
  return {
    createUsers: function(post) {
      return $http.post('https://vps258804.ovh.net:80/register',{
        'nom_client2': post.nom_client2,
        'prenom_client2': post.prenom_client2,
        'adresse_client2': post.adresse_client2,
        'cp_client2': post.cp_client2,
        'gsm_client2': post.gsm_client2,
        'login_client2': post.login_client2,
        'password_client2': post.password_client2,
        'statut_client2': post.statut_client2,
        'modif_par2':post.modif_par2,
        'desact_client2':post.desact_client2,
        'type_user2':post.type_user2
      });
    }

};
});
myApp.factory('dataFactory', function($http) {

  var urlBase = "https://vps258804.ovh.net:80/api";
  return {
    /* App ionic */
    /*users*/
    readusers: function(id) {
      return $http.get(urlBase + '/login_users/' + id);
    },

    /*createUsers: function(post) {
      return $http.post(urlBase + '/register',{
        'nom_client': post.nom_client
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
    readVille: function(id) {
      return $http.get(urlBase + '/villes/' + id);
    },

    readCpville: function(cpays, cp) {
      return $http.get(urlBase + '/villes/' + cpays + '/' + cp);
    },

    findVille: function() {
      return $http.get(urlBase + '/villes');
    },


    deleteVille: function(id) {
      return $http.delete(urlBase + '/villes/' + id);
    },

    createVille: function(post) {
      return $http.post(urlBase + '/villes',{
        'cpville': post.cpville,
        'nomville': post.nomville,
        'codepays': post.codepays
      });
    },

    editVille: function(post) {
      return $http.put(urlBase + '/villes/' + post.idville, {
        'cpville': post.cpville,
        'nomville': post.nomville,
        'codepays': post.codepays
      });
    },
/*




    /* plateforme administrative */


    /*clients*/
    /*
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
      return $http.put(urlBase + '/clients/' + post.idclient, {
        'nom_client': post.nom_client,
        'prenom_client': post.prenom_client,
        'adresse_client': post.adresse_client,
        'cp_client': post.cp_client,
        'gsm_client': post.gsm_client,
        'statut_client': post.statut_client,
        'desact_client': post.desact_client
      });
    },
    */


  };
});


