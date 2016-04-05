// AuthenticationFactory verifie le status de l'utilisateur coté client
myApp.factory('AuthenticationFactory', function($window, $http) {

  var auth = {
    isLogged: false,
    userVelo: "abs",
    check: function() {
      if ($window.sessionStorage.token ) {
/*
        $http.post('https://localhost:80/admin').success(function() {
              this.isLogged = true;

          }).error(function(status) {
              this.isLogged = false;
              //delete $window.sessionStorage.token;
              //delete $window.sessionStorage.velo;
         });
  */
        this.isLogged = true;
        this.userVelo = $window.sessionStorage.velo;
      } else {
        this.isLogged = false;
        delete $window.sessionStorage.velo;
      }
    }

  }
  alert("#JeSuisAuthFactoryDébut");
  return auth;
});

//UserAuthFactory: communication avec la page de login sur le serveur et la validation de l'utilisateur. Gére Logout
myApp.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  alert("#JeSuisAuthFactoryMilieu");
  return {
    login: function(username, password) {
      return $http.post('https://vps258804.ovh.net:80/login2', {
        login: username,
        password: password
      });
    },

/*
    admin: function(token) {
      return $http.post('https://localhost:80/admin', {
        access_token: token
      });
    },

*/
    logout: function() {
      if (confirm("Deconnecter?")== true){
        if (AuthenticationFactory.isLogged) {
          AuthenticationFactory.isLogged = false;
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.velo;
          $location.path("/login");
        }
      }
    }
  }
});

//TokenInterceptor met Token dans chaque requête vers le serveur
myApp.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function(response) {
      return response || $q.when(response);
    }

  };


});
