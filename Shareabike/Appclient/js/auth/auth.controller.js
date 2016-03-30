//Controlleur pour gérer le login

myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {

    $scope.login = function() {

      var username = $scope.user.username,
        password = $scope.user.password;

      if (username !== undefined && password !== undefined) {

        UserAuthFactory.login(username, password).success(function(data) {
          //UserAuthFactory.admin(data.token).success(function() {

              AuthenticationFactory.isLogged = true;
              $window.sessionStorage.token = data.token;
              $window.sessionStorage.velo = data.bike;
              $location.path("/");

          //}).error(function(status) {
          //  alert("Vous n'avez pas le droit d'administrateur!");
          //});

        }).error(function(status) {
          alert('Mot de passe ou Login non valide !');
        });

      } else {
        alert("Erreur d'Authentification");
      }

    };

  }
]);
