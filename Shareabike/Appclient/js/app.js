/*
Kaysarov
Mis à jours : 10/12/2015

*/

var myApp = angular.module('ngclient', ['ngRoute', 'uiGmapgoogle-maps']);


myApp.config(function(uiGmapGoogleMapApiProvider) {  
/**/
  uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBAkbW3lDYmzsi-Ww_6Qji_UU11qgyOlPM',
        v: '3.22', 
        libraries: 'drawing,geometry,visualization'
  });
});

myApp.config(function($routeProvider, $httpProvider) { 

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/admins', {
      templateUrl: 'partials/admins.list.html',
      controller: 'AdminGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admins/editer/:id', {
      templateUrl: 'partials/admins.editer.html',
      controller: 'AdminEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admins/ajouter', {
      templateUrl: 'partials/admins.ajouter.html',
      controller: 'AdminPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/licences', {
      templateUrl: 'partials/licences.list.html',
      controller: 'LicenceGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/licences/editer/:id', {
      templateUrl: 'partials/licences.editer.html',
      controller: 'LicenceEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/niveau', {
      templateUrl: 'partials/niveau.list.html',
      controller: 'NiveauGetCtrl',
      access: {
        requiredLogin: true
      }    
    }).when('/niveau/editer/:id', {
      templateUrl: 'partials/niveau.editer.html',
      controller: 'NiveauEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/niveau/ajouter', {
      templateUrl: 'partials/niveau.ajouter.html',
      controller: 'NiveauPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/pays', {
      templateUrl: 'partials/pays.list.html',
      controller: 'PaysGetCtrl',
      access: {
        requiredLogin: true
      }    
    }).when('/pays/editer/:id', {
      templateUrl: 'partials/pays.editer.html',
      controller: 'PaysEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/pays/ajouter', {
      templateUrl: 'partials/pays.ajouter.html',
      controller: 'PaysPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/villes', {
      templateUrl: 'partials/villes.list.html',
      controller: 'VilleGetCtrl',
      access: {
        requiredLogin: true
      }    
    }).when('/villes/editer/:id', {
      templateUrl: 'partials/villes.editer.html',
      controller: 'VilleEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/villes/ajouter', {
      templateUrl: 'partials/villes.ajouter.html',
      controller: 'VillePostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/profil', {
      templateUrl: 'partials/opers.editer.html',
      controller: 'OperEditCtrl',
      access: {
        requiredLogin: true
      }      
    }).when('/domaines', {
      templateUrl: 'partials/domaine.list.html',
      controller: 'DomaineGetCtrl',
      access: {
        requiredLogin: true
      }    
    }).when('/domaines/editer/:id', {
      templateUrl: 'partials/domaine.editer.html',
      controller: 'DomaineEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/domaines/ajouter', {
      templateUrl: 'partials/domaine.ajouter.html',
      controller: 'DomainePostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/domaines/carte/:id', {
      templateUrl: 'partials/domaine.carte.html',
      controller: 'DomaineCarteCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/domaines/zone/:id', {
      templateUrl: 'partials/domaine.zone.html',
      controller: 'DomaineZoneCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/domaines', {
      templateUrl: 'partials/oper_domaine.list.html',
      controller: 'OperDomaineGetCtrl',
      access: {
        requiredLogin: true
      }    
    }).when('/oper/domaines/editer', {
      templateUrl: 'partials/oper_domaine.editer.html',
      controller: 'OperDomaineEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/typecamions', {
      templateUrl: 'partials/typecamions.list.html',
      controller: 'TypecamionGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/typecamions/editer/:id', {
      templateUrl: 'partials/typecamions.editer.html',
      controller: 'TypecamionEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/typecamions/ajouter', {
      templateUrl: 'partials/typecamions.ajouter.html',
      controller: 'TypecamionPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutcamions', {
      templateUrl: 'partials/statutcamions.list.html',
      controller: 'StatutcamionGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutcamions/editer/:id', {
      templateUrl: 'partials/statutcamions.editer.html',
      controller: 'StatutcamionEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutcamions/ajouter', {
      templateUrl: 'partials/statutcamions.ajouter.html',
      controller: 'StatutcamionPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/gpscamions', {
      templateUrl: 'partials/gpscamions.list.html',
      controller: 'GpscamionGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/gpscamions/editer/:id', {
      templateUrl: 'partials/gpscamions.editer.html',
      controller: 'GpscamionEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/gpscamions/ajouter', {
      templateUrl: 'partials/gpscamions.ajouter.html',
      controller: 'GpscamionPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/camions', {
      templateUrl: 'partials/camions.list.html',
      controller: 'CamionGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/camions/editer/:id', {
      templateUrl: 'partials/camions.editer.html',
      controller: 'CamionEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/camions/ajouter', {
      templateUrl: 'partials/camions.ajouter.html',
      controller: 'CamionPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/camions/gps/:id', {
      templateUrl: 'partials/camions.gps.html',
      controller: 'CamionGpsCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/stations', {
      templateUrl: 'partials/stations.list.html',
      controller: 'StationGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/stations/editer/:id', {
      templateUrl: 'partials/stations.editer.html',
      controller: 'StationEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/stations/ajouter', {
      templateUrl: 'partials/stations.ajouter.html',
      controller: 'StationPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/stations/carte/:domaine/:id', {
      templateUrl: 'partials/stations.carte.html',
      controller: 'StationCarteCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/stations/zone/:domaine/:id', {
      templateUrl: 'partials/stations.zone.html',
      controller: 'StationZoneCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/depots', {
      templateUrl: 'partials/depots.list.html',
      controller: 'DepotGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/depots/editer/:id', {
      templateUrl: 'partials/depots.editer.html',
      controller: 'DepotEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/depots/ajouter', {
      templateUrl: 'partials/depots.ajouter.html',
      controller: 'DepotPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/depots/carte/:domaine/:id', {
      templateUrl: 'partials/depots.carte.html',
      controller: 'DepotCarteCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/depots/point/:domaine/:id', {
      templateUrl: 'partials/depots.point.html',
      controller: 'DepotPointCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/tarifs', {
      templateUrl: 'partials/tarifs.list.html',
      controller: 'TarifGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/tarifs/editer/:id', {
      templateUrl: 'partials/tarifs.editer.html',
      controller: 'TarifEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/tarifs/ajouter', {
      templateUrl: 'partials/tarifs.ajouter.html',
      controller: 'TarifPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/tarifs', {
      templateUrl: 'partials/oper_tarifs.list.html',
      controller: 'OperTarifGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/tarifs/editer/:id', {
      templateUrl: 'partials/oper_tarifs.editer.html',
      controller: 'OperTarifEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/tarifs/ajouter', {
      templateUrl: 'partials/oper_tarifs.ajouter.html',
      controller: 'OperTarifPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/typevelos', {
      templateUrl: 'partials/typevelos.list.html',
      controller: 'TypeveloGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/typevelos/editer/:id', {
      templateUrl: 'partials/typevelos.editer.html',
      controller: 'TypeveloEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/typevelos/ajouter', {
      templateUrl: 'partials/typevelos.ajouter.html',
      controller: 'TypeveloPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/typevelos', {
      templateUrl: 'partials/oper_typevelos.list.html',
      controller: 'OperTypeveloGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/typevelos/editer/:id', {
      templateUrl: 'partials/oper_typevelos.editer.html',
      controller: 'OperTypeveloEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/typevelos/ajouter', {
      templateUrl: 'partials/oper_typevelos.ajouter.html',
      controller: 'OperTypeveloPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutvelos', {
      templateUrl: 'partials/statutvelos.list.html',
      controller: 'StatutveloGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutvelos/editer/:id', {
      templateUrl: 'partials/statutvelos.editer.html',
      controller: 'StatutveloEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutvelos/ajouter', {
      templateUrl: 'partials/statutvelos.ajouter.html',
      controller: 'StatutveloPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/velos', {
      templateUrl: 'partials/velos.list.html',
      controller: 'VeloGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/velos/editer/:id', {
      templateUrl: 'partials/velos.editer.html',
      controller: 'VeloEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/velos/ajouter', {
      templateUrl: 'partials/velos.ajouter.html',
      controller: 'VeloPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/velos', {
      templateUrl: 'partials/oper_velos.list.html',
      controller: 'OperVeloGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/velos/editer/:id', {
      templateUrl: 'partials/oper_velos.editer.html',
      controller: 'OperVeloEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/velos/ajouter', {
      templateUrl: 'partials/oper_velos.ajouter.html',
      controller: 'OperVeloPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/velos/carte/:domaine/:id', {
      templateUrl: 'partials/velos.carte.html',
      controller: 'VeloCarteCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/velos/point/:domaine/:id', {
      templateUrl: 'partials/velos.point.html',
      controller: 'VeloPointCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/velos/carte/:domaine/:id', {
      templateUrl: 'partials/oper_velos.carte.html',
      controller: 'OperVeloCarteCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/velos/point/:domaine/:id', {
      templateUrl: 'partials/oper_velos.point.html',
      controller: 'OperVeloPointCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/velos/gps/:id', {
      templateUrl: 'partials/velos.gps.html',
      controller: 'VeloGpsCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/velos/gps/:id', {
      templateUrl: 'partials/oper_velos.gps.html',
      controller: 'OperVeloGpsCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/gpsvelos', {
      templateUrl: 'partials/gpsvelos.list.html',
      controller: 'GpsveloGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/gpsvelos/editer/:id', {
      templateUrl: 'partials/gpsvelos.editer.html',
      controller: 'GpsveloEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/gpsvelos/ajouter', {
      templateUrl: 'partials/gpsvelos.ajouter.html',
      controller: 'GpsveloPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutclients', {
      templateUrl: 'partials/statutclients.list.html',
      controller: 'StatutclientGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutclients/editer/:id', {
      templateUrl: 'partials/statutclients.editer.html',
      controller: 'StatutclientEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/statutclients/ajouter', {
      templateUrl: 'partials/statutclients.ajouter.html',
      controller: 'StatutclientPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/clients', {
      templateUrl: 'partials/clients.list.html',
      controller: 'ClientGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/clients/editer/:id', {
      templateUrl: 'partials/clients.editer.html',
      controller: 'ClientEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/clients/ajouter', {
      templateUrl: 'partials/clients.ajouter.html',
      controller: 'ClientPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/clients', {
      templateUrl: 'partials/oper_clients.list.html',
      controller: 'OperClientGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/clients/editer/:id', {
      templateUrl: 'partials/oper_clients.editer.html',
      controller: 'OperClientEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/clients/ajouter', {
      templateUrl: 'partials/oper_clients.ajouter.html',
      controller: 'OperClientPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/commentaires/:id', {
      templateUrl: 'partials/commentaires.list.html',
      controller: 'CommentaireGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/commentaires/ajouter/:id', {
      templateUrl: 'partials/commentaires.ajouter.html',
      controller: 'CommentairePostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/commentaires/:id', {
      templateUrl: 'partials/oper_commentaires.list.html',
      controller: 'OperCommentaireGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/commentaires/ajouter/:id', {
      templateUrl: 'partials/oper_commentaires.ajouter.html',
      controller: 'OperCommentairePostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/stations', {
      templateUrl: 'partials/oper_stations.list.html',
      controller: 'OperStationGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/stations/editer/:id', {
      templateUrl: 'partials/oper_stations.editer.html',
      controller: 'OperStationEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/stations/ajouter', {
      templateUrl: 'partials/oper_stations.ajouter.html',
      controller: 'OperStationPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/stations/carte/:domaine/:id', {
      templateUrl: 'partials/oper_stations.carte.html',
      controller: 'OperStationCarteCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/stations/zone/:domaine/:id', {
      templateUrl: 'partials/oper_stations.zone.html',
      controller: 'OperStationZoneCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/bonustrajets', {
      templateUrl: 'partials/bonustrajets.list.html',
      controller: 'BonustrajetGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/bonustrajets/editer/:id', {
      templateUrl: 'partials/bonustrajets.editer.html',
      controller: 'BonustrajetEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/bonustrajets/ajouter', {
      templateUrl: 'partials/bonustrajets.ajouter.html',
      controller: 'BonustrajetPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/bonustrajets', {
      templateUrl: 'partials/oper_bonustrajets.list.html',
      controller: 'OperBonustrajetGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/bonustrajets/editer/:id', {
      templateUrl: 'partials/oper_bonustrajets.editer.html',
      controller: 'OperBonustrajetEditCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/bonustrajets/ajouter', {
      templateUrl: 'partials/oper_bonustrajets.ajouter.html',
      controller: 'OperBonustrajetPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/locationfinies', {
      templateUrl: 'partials/locationfinies.list.html',
      controller: 'LocationfinieGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/locationfinies/detail/:id', {
      templateUrl: 'partials/locationfinies.detail.html',
      controller: 'LocationfinieDetailCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/locationencours', {
      templateUrl: 'partials/locationencours.list.html',
      controller: 'LocationencoursGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/locationencours/detail/:id', {
      templateUrl: 'partials/locationencours.detail.html',
      controller: 'LocationencoursDetailCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/locationclients/:id', {
      templateUrl: 'partials/locationclients.list.html',
      controller: 'LocationClientCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/locationvelos/:id', {
      templateUrl: 'partials/locationvelos.list.html',
      controller: 'LocationVeloCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/locationfinies', {
      templateUrl: 'partials/oper_locationfinies.list.html',
      controller: 'OperLocationfinieGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/locationfinies/detail/:id', {
      templateUrl: 'partials/oper_locationfinies.detail.html',
      controller: 'OperLocationfinieDetailCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/locationencours', {
      templateUrl: 'partials/oper_locationencours.list.html',
      controller: 'OperLocationencoursGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/locationencours/detail/:id', {
      templateUrl: 'partials/oper_locationencours.detail.html',
      controller: 'OperLocationencoursDetailCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/locationclients/:id', {
      templateUrl: 'partials/oper_locationclients.list.html',
      controller: 'OperLocationClientCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/locationvelos/:id', {
      templateUrl: 'partials/oper_locationvelos.list.html',
      controller: 'OperLocationVeloCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/transactions', {
      templateUrl: 'partials/transactions.list.html',
      controller: 'TransactionGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/transactions/detail/:id', {
      templateUrl: 'partials/transactions.detail.html',
      controller: 'TransactionDetailCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/transactions/ajouter', {
      templateUrl: 'partials/transactions.ajouter.html',
      controller: 'TransactionPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/transactionclients/:id', {
      templateUrl: 'partials/transactionclients.list.html',
      controller: 'TransactionClientCtrl',
      access: {
        requiredLogin: true
      }      
    }).when('/oper/transactions', {
      templateUrl: 'partials/oper_transactions.list.html',
      controller: 'OperTransactionGetCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/transactions/detail/:id', {
      templateUrl: 'partials/oper_transactions.detail.html',
      controller: 'OperTransactionDetailCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/transactions/ajouter', {
      templateUrl: 'partials/oper_transactions.ajouter.html',
      controller: 'OperTransactionPostCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/oper/transactionclients/:id', {
      templateUrl: 'partials/oper_transactionclients.list.html',
      controller: 'OperTransactionClientCtrl',
      access: {
        requiredLogin: true
      } 
    }).when('/rapports', {
      templateUrl: 'partials/rapports.list.html',
      controller: 'RapportCtrl',
      access: {
        requiredLogin: true
      }    
    }).when('/oper/rapports', {
      templateUrl: 'partials/oper_rapports.list.html',
      controller: 'OperRapportCtrl',
      access: {
        requiredLogin: true
      }   
    }).otherwise({
      redirectTo: '/login'
    });


});



myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // quand la page est mis à jour, verifier si l'utilisateur est toujours connecté
  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      //if ($window.sessionStorage.token) alert("Votre session a expiré!");
      $location.path("/login");
    } else {
      // verifier si user object existe si non faire amener
      //if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      //if (!AuthenticationFactory.userVelo) 
      AuthenticationFactory.userVelo = $window.sessionStorage.velo;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.velo = AuthenticationFactory.userVelo;
    // si l'utilisateur est connecté le deriger vers la page d'accueil
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });


});
