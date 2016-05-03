//Controlleur pour gérer le login

myApp.controller('LoginCtrlIonic', ['$scope','$state', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $state, $window, $location, UserAuthFactory, AuthenticationFactory) {

    $scope.login = function() {

      var username = $scope.login.username;
      var  password = $scope.login.password;

      if (username !== undefined && password !== undefined) {

        UserAuthFactory.login(username, password).success(function(data) {
          //UserAuthFactory.admin(data.token).success(function() {

              AuthenticationFactory.isLogged = true;
              $window.sessionStorage.token = data.token;
              $window.sessionStorage.velo = data.bike;
              //$location.path('/');
              $state.go('app.menu1'); //Pour que cela fonctionne avec Ionic il faut utiliser $state.go et pas $location.path
              alert('#JeSuisAuthController');
        }).error(function(status) {
          alert('Mot de passe ou Login non valide eee !');
        });

      } else {
        alert("Erreur d'Authentification");
      }

    };

  }
]);
