// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic','ui.router', 'starter.controllers','ngRoute','ngCordova','uiGmapgoogle-maps'])

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //window.alert("Cette application nécessite l'activation des données mobile ou du wifi pour fonctionner");
  });
});
myApp.run(function ($rootScope) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();
      // get me a login modal!
    }
  });

});
myApp.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
  key: 'AIzaSyBAkbW3lDYmzsi-Ww_6Qji_UU11qgyOlPM',
  v: '3.22',
  libraries: 'drawing,geometry,visualization',
  language: 'fr'

  });
});

myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
      data:
      {
        requiredLogin : false
      }
  })

  .state('app.menu1', {
    url: '/menu1',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu1.html',
        controller: 'MapCtrl'
    }
  },

  data:
  {
    requiredLogin: true
  }
  })

  .state('app.menu2', {
    url: '/menu2',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu2.html'
      }
    },
    data: {
      requiredLogin: true
    }
  })

    .state('app.menu3', {
      url: '/menu3',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu3.html',
          controller: 'listeCtrl',
          data: {
            requiredLogin: true
          }
        }
      }
    })


  .state('app.velosId', {
    url: '/liste_velos/:velosId',
    views: {
      'menuContent': {
        templateUrl: 'templates/liste_velos.html',
        controller: 'ListeVeloCtrl',

        data: {
          requiredLogin: true
        }
      }
    }
  })
    .state('app.login_users', {
      url: '/login_users',
      views: {
        'menuContent': {
          templateUrl: 'templates/login_users.html',
          controller: 'LoginCtrlIonic',
          data: {
            requiredLogin: false
          }
        }
      }
    })
    .state('app.register1', {
      url: '/register1',
      views: {
        'menuContent': {
          templateUrl: 'templates/register2.html',
          controller: 'RegisterCtrl',
          data: {
            requiredLogin: false
          }
        }
      }
    })

    .state('app.register2', {
      url: '/register2',
      views: {
        'menuContent': {
          templateUrl: 'templates/register2.html',
          controller: 'RegisterCtrl',
          data: {
            requiredLogin: false
          }
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login_users');
});



  /*.controller('LoginCtrl',function($scope){

  $scope.validate = function(){
    alert('log');
    $state.go('app.menu3');
  }
})*/



//*****affiche une erreur quand je décommente*****

/*myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
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


});*/


