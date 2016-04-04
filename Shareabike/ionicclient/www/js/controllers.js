angular.module('starter.controllers', [])

myApp.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
 /* $scope.loginData = {};

  // Create the login modal that we will use later
 $ionicModal.fromTemplateUrl('templates/login_users.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/
})

.controller('listeCtrl', function($scope) {
  $scope.velos = [
    { title: 'velo1', id: 1 },
    { title: 'velo2', id: 2 },
    { title: 'velo3', id: 3 },
    { title: 'velo4', id: 4 },
    { title: 'velo5', id: 5 },
    { title: 'velo6', id: 6 }
  ];
})

.controller('ListeVeloCtrl', function($scope, $stateParams) {
  $scope.velos = [
    {title: 'velo1', id: 1},
    {title: 'velo2', id: 2},
    {title: 'velo3', id: 3},
    {title: 'velo4', id: 4},
    {title: 'velo5', id: 5},
    {title: 'velo6', id: 6}
  ];
})
  myApp.controller('register1Ctrl', function($scope) {

  })

myApp.controller("RegisterCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $state, $location, dataFactory) {

    dataFactory.findVille().then(function(data) {
      $scope.villes = data.data;
      $scope.ville_selection = $scope.villes[0];
    });

    dataFactory.findStatutclient().then(function(data) {
      $scope.statutclients = data.data;
      $scope.statutclient_selection = $scope.statutclients[0];
    });


    $scope.save = function(post) {
      $scope.post.cp_client = $scope.ville_selection.idville;
      $scope.post.statut_client = $scope.statutclient_selection.idstatutclient;

      dataFactory.createClient(post).success(function(data) {
        $state.go('app.login_users');
        //$location.path("/clients");
      }).error(function(status, data) {
        alert("Format de données saisies est incorrect");
      });
    };

  }
]);
