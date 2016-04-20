angular.module('starter.controllers', []);
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
});


myApp.controller("RegisterCtrl", ['$scope' ,'$state', '$location', 'dataFactory2',
  function($scope, $state, $location, dataFactory2) {
    //alert($scope.ville_selection.idville);
    $scope.save = function(post) {

     // $scope.post.cp_client = $scope.ville_selection.idville;
      dataFactory2.createUsers(post).success(function(data) {

        var from,to,subject,text;
        to=$("#inputLog").val();
        alert(to);
        $.get("https://vps258804.ovh.net:80/register/send",{to:to},function(data){
          alert(data);
          if(data=="sent")
          {
            $("#message").empty().html("<p>Email is been sent at "+to+" . Please check inbox !</p>");
          }

        });
        $state.go('app.login_users');
      }).error(function(status, data) {
        alert("Le format de données saisies est incorrect ou vous avez oublié d'activer les données mobile");
      });
    };
  }
]);


//controller de google map
myApp.controller('BrowseCtrl',function($scope,$state, $ionicSideMenuDelegate, $cordovaGeolocation, uiGmapGoogleMapApi)
{
    uiGmapGoogleMapApi.then(function(maps)  //ligne importante car permet de bien charger tout les composants de google map et puis ensuite de faire ce qu'il y a en dessous. Si pas cette ligne erreur de type : google is not defined.
    {
      var options = {timeout: 10000, enableHighAccuracy: true};

      //récupère la position grace au gps du smartphone puis ajoute un marker sur la carte à cette position.
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $state.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);


        //afficher le marker là où l'on se trouve grace aux coordonnées du gps récupérées.
        google.maps.event.addListenerOnce($state.map, 'idle', function () {

          var marker = new google.maps.Marker({
            map: $state.map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });

          var infoWindow = new google.maps.InfoWindow({
            content: "Vous êtes ici"
          });
          //Quand on clic sur la balise celà affiche le msg qu'il y a dans le content. Ds ce cas : "Vous êtes ici"
          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($state.map, marker);
          });


        });
        //Lorsque l'on clic n'importe où sur la carte cela affiche un maker.
        google.maps.event.addListener($state.map, 'click', function(event) {
          placeMarker(event.latLng);
        });

        function placeMarker(location) {
          var marker = new google.maps.Marker({
            position: location,
            map: $state.map

          });
          var infoWindow = new google.maps.InfoWindow({
            content: location.toString()
          });
          //Affiche les coordonnées gps lorsque l'on clic sur un marker.
          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($state.map, marker);
          });
        }
      }, function (error) {
        alert("Could not get location");
      });
    });


});


myApp.controller('register1Ctrl', function($scope) {

});

myApp.controller("PostsCtrl", function($scope, $http) {
  $http.get('data/posts.json').
  success(function(data, status, headers, config) {
    $scope.posts = data;
  });
  error(function(data, status, headers, config) {
    // log error
  });
});
