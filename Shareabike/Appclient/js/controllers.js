/*
Kaysarov
Mis à jours : 25/12/2015

*/

var home ={
  urlImage1:"image/bicycle-city-street3.jpg",
  urlImage2:"image/bike_cyti23.jpg",
  urlImage3:"image/bicycleside.png",
  urlImage4:"image/gorod-noch-ulica-doroga.jpg",
  urlImage5:"image/velosiped-boke-ogni.jpg",
  nom: "Faculté Polytechnique de l'Université de Mons. Projet: ShareABike"
};
 
myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
  function($scope, $location, UserAuthFactory) {

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.logout = function () {
      UserAuthFactory.logout();
    }
  }
]);

myApp.controller("HomeCtrl", ['$scope',
  function($scope) {
    $scope.name = home;
  }
]);



myApp.controller("AdminGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.users = [];

    dataFactory.findAdmin().then(function(data) {
      $scope.users = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteAdmin(id).success(function(data) {
          var users = $scope.users;
            for (var userKey in users) {
              if (users[userKey].idadmin == id) {
                $scope.users.splice(userKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }


  }
]);

myApp.controller("LicenceGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.licences = [];

    dataFactory.findLicence().then(function(data) {
      $scope.licences = data.data;
    });
  }
]);

/**/
myApp.controller("AdminPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findPays().then(function(data) {
      $scope.payss = data.data;
      $scope.pays_selection = $scope.payss[0];

    });

    //pays_code = $scope.pays_selection.idpays;
    //ville_cp = $scope.post.cp_ville;
  
    dataFactory.findVille().then(function(data) {
      $scope.villes = data.data;
      $scope.ville_selection = $scope.villes[0];
    });

    dataFactory.findNiveau().then(function(data) {
      $scope.niveaus = data.data;
      $scope.niveau_selection = $scope.niveaus[0];
    });

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];
    });

    $scope.save = function(post) {
      $scope.post.cp = $scope.ville_selection.idville;
      $scope.post.type_admin = $scope.niveau_selection.idtype;
      $scope.post.domaine = $scope.domaine_selection.iddomaine;      
      dataFactory.createAdmin(post).success(function(data) {
          $location.path("/admins");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);



myApp.controller("AdminEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.read(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/admins");
    });

    dataFactory.findVille().then(function(doc) {
      $scope.villes = doc.data;
      for(var i = 0; i < $scope.villes.length; i++){
        if ($scope.villes[i].idville ==  $scope.post.cp) {
          position = i;
          break;
        }
      }
      $scope.ville_selection = $scope.villes[position];
    });
    
    dataFactory.findNiveau().then(function(doc) {
      $scope.niveaus = doc.data;
      for(var i = 0; i < $scope.niveaus.length; i++){
        if ($scope.niveaus[i].idtype ==  $scope.post.type_admin) {
          position = i;
          break;
        }
      }
      $scope.niveau_selection = $scope.niveaus[position];
    });



    $scope.save = function(post) {
      $scope.post.cp = $scope.ville_selection.idville;
      $scope.post.type_admin = $scope.niveau_selection.idtype;
      dataFactory.editAdmin(post).success(function(data) {
        $location.path("/admins");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }

    $scope.save_password = function(post) {
      dataFactory.editAdminPassw(post).success(function(data) {
        //$location.path("/admins");
         alert("Mot de passe est modifié");
      }).error(function(status, data) {
          alert("Erreur de saisie de mot de passe");
      });
    }    

  }
]);

myApp.controller("LicenceEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.read(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/licences");
    });

    dataFactory.findDomaine().then(function(doc1) {
      $scope.domaines = doc1.data;
      for(var i = 0; i < $scope.domaines.length; i++){
        if ($scope.domaines[i].iddomaine ==  $scope.post.domaine) {
          position = i;
          break;
        }
      }
      $scope.domaine_selection = $scope.domaines[position];
    });



    $scope.save = function(post) {
      $scope.post.domaine = $scope.domaine_selection.iddomaine;
      dataFactory.editLicence(post).success(function(data) {
        $location.path("/licences");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);


myApp.controller("NiveauGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.niveaus = [];

    dataFactory.findNiveau().then(function(data) {
      $scope.niveaus = data.data;
      $scope.niveau_selection = $scope.niveaus[0];
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteNiveau(id).success(function(data) {
          var niveaus = $scope.niveaus;
            for (var niveauKey in niveaus) {
              if (niveaus[niveauKey].idtype == id) {
                $scope.niveaus.splice(niveauKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);

/**/
myApp.controller("NiveauPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createNiveau(post).success(function(data) {
          $location.path("/niveau");
       }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("NiveauEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.post = {};
    var id = $routeParams.id;

    dataFactory.readNiveau(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/niveau");
    });

    $scope.save = function(post) {
 
      dataFactory.editNiveau(post).success(function(data) {
        $location.path("/niveau");
      }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Modification desactivée!");
      });
    }
  }
]);

myApp.controller("PaysGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.payss = [];

    dataFactory.findPays().then(function(data) {
      $scope.payss = data.data;
      $scope.pays_selection = $scope.payss[0];
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deletePays(id).success(function(data) {
          var payss = $scope.payss;
            for (var paysKey in payss) {
              if (payss[paysKey].idpays == id) {
                $scope.payss.splice(paysKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);

/**/
myApp.controller("PaysPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createPays(post).success(function(data) {
          $location.path("/pays");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("PaysEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.post = {};
    var id = $routeParams.id;

    dataFactory.readPays(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/pays");
    });

    $scope.save = function(post) {
 
      dataFactory.editPays(post).success(function(data) {
        $location.path("/pays");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);

myApp.controller("VilleGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.villes = [];

    dataFactory.findVille().then(function(data) {
      $scope.villes = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteVille(id).success(function(data) {
          var villes = $scope.villes;
            for (var userKey in users) {
              if (villes[villeKey].idville == id) {
                $scope.villes.splice(villeKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }


  }
]);

/**/
myApp.controller("VillePostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findPays().then(function(data) {
      $scope.payss = data.data;
      $scope.pays_selection = $scope.payss[0];

    });

    $scope.save = function(post) {
      $scope.post.codepays = $scope.pays_selection.idpays;
      dataFactory.createVille(post).success(function(data) {
          $location.path("/villes");
       }).error(function(status, data) {
          alert("Désolé un problème est survenu lors de l'enregistrement");
      });
    }
    
  }
]);


myApp.controller("VilleEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readVille(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/villes");
    });

    dataFactory.findPays().then(function(doc) {
      $scope.payss = doc.data;
      for(var i = 0; i < $scope.payss.length; i++){
        if ($scope.payss[i].idpays ==  $scope.post.codepays) {
          position = i;
          break;
        }
      }
      $scope.pays_selection = $scope.payss[position];
    });
    


    $scope.save = function(post) {
      $scope.post.codepays = $scope.pays_selection.idpays;
      dataFactory.editVille(post).success(function(data) {
        $location.path("/villes");
      }).error(function(status, data) {
          alert("Désolé un problème est survenu lors de l'enregistrement");
      });
    }
  }
]);



myApp.controller("OperEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.findOper().success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/profil");
    });

    dataFactory.findVille_oper().then(function(doc) {
      $scope.villes = doc.data;
      for(var i = 0; i < $scope.villes.length; i++){
        if ($scope.villes[i].idville ==  $scope.post.cp) {
          position = i;
          break;
        }
      }
      $scope.ville_selection = $scope.villes[position];
    });


    $scope.save = function(post) {
      $scope.post.cp = $scope.ville_selection.idville;
      dataFactory.editOper(post).success(function(data) {
        //$location.path("/profil");
        alert("Profil est modifié");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

    $scope.save_passw = function(post) {
      dataFactory.editOperPassw(post).success(function(data) {
        //$location.path("/users");
         alert("Mot de passe est modifié");
      }).error(function(status, data) {
          alert("Erreur de saisie de mot de passe");
      });
    }    

  }
]);

myApp.controller("DomaineGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.domaines = [];

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteDomaine(id).success(function(data) {
          var domaines = $scope.domaines;
            for (var domaineKey in domaines) {
              if (domaines[domaineKey].iddomaine == id) {
                $scope.domaines.splice(domaineKey, 1);
                break;
              }
            }

            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);


/**/
myApp.controller("DomainePostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];

    });

    $scope.save = function(post, id) {
      dataFactory.createDomaine(post).success(function(data) {
        }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
       $location.path("/domaines/zone/" + id);
    }
    
  }
]);


myApp.controller("DomaineEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readDomaine(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/domaines");
    });

    $scope.save = function(post) {
      dataFactory.editDomaine(post).success(function(data) {
        $location.path("/domaines");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("DomaineCarteCtrl", ['$scope', '$routeParams', 'dataFactory',
  function($scope, $routeParams, dataFactory, uiGmapGoogleMapApi) {
    $scope.post = {};
    var id = $routeParams.id;
    //var id = 'Bike7';
    $scope.center={latitude: 50.454678, longitude: 3.9518525}; 
    $scope.map = {draggable: true, zoom: 14};

    dataFactory.readDomaine(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {});

    dataFactory.centerDomaine(id).success(function(data) {
      $scope.center={latitude: data[0].point.x, longitude: data[0].point.y}; 
      $scope.marker = {id: 0, 
        coords:{latitude: data[0].point.x, longitude: data[0].point.y}, 
        options: {draggable: false, title: 'UMONS', animation: 1}};
    }).error(function(status, data) {});

    $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
    };
       

    $scope.polygone = {
            id: 1,
            path: [],
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: '#7AB800',
                opacity: 0.35
            }
    };

    dataFactory.readDomainepoint(id).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polygone.path.push(point_domaine);
      }
    }).error(function(status, data) {});        

  }
]);

myApp.controller('DomaineZoneCtrl', ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory, uiGmapGoogleMapApi) {
  //var id = 'Bike7';
  var id = $routeParams.id;
  $scope.post={};
  $scope.map= {center: {latitude: 50.454678, longitude: 3.9518525}, draggable: true, zoom: 14}; 
  
        // map options
        $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
    dataFactory.readDomaine(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      //$location.path("/maps");
    });

  $scope.drawingManagerOptions = {
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
    },
      polygonOptions: {
              zIndex: 1,
              editable: true,
              strokeColor: '#FFFFFF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#7AB800',
              fillOpacity: 0.35
    },

  };

  $scope.drawingManagerEvents = {
    polygoncomplete: function(drawingManager, eventName, scope, args) {
      var polygon = args[0];
      var path = polygon.getPath();
        var coords = [];
        for (var i = 0 ; i < path.length ; i++) {
          coords.push({
            latitude: path.getAt(i).lat(),
            longitude: path.getAt(i).lng()
          });
        }
       
        if (confirm("Enregistrer la zone pour: " + id +'?')== true) {
          var nouveaux_points='(';
          for (var j = 0; j < coords.length; j++) {
            nouveaux_points += '('+ coords[j].latitude + ',' + coords[j].longitude + ')';
            if(j!=coords.length-1){
              nouveaux_points += ',';
            } else {
              nouveaux_points += ')';
            }
          }

            dataFactory.createDomainepoint(id, nouveaux_points)
            .success(function(data) {
              alert('La zone est enregistrée');
            }).error(function(status, data) {
              alert('Enregistrement est annulé');
            }); 

        }
        coords = [];
      //$location.path("/maps");  
     }
  }

  }
]);


myApp.controller("OperDomaineGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory, uiGmapGoogleMapApi) {
    $scope.post = {};

    $scope.center={latitude: 50.454678, longitude: 3.9518525}; 
    $scope.map = {draggable: true, zoom: 14};

    dataFactory.findDomaineOper().success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {});

    dataFactory.centerDomaineOper().success(function(data) {
      $scope.center={latitude: data[0].point.x, longitude: data[0].point.y}; 
      $scope.marker = {id: 0, 
        coords:{latitude: data[0].point.x, longitude: data[0].point.y}, 
        options: {draggable: false, title: 'UMONS', animation: 1}};
    }).error(function(status, data) {});

    $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
    };
       

    $scope.polygone = {
            id: 1,
            path: [],
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: '#7AB800',
                opacity: 0.35
            }
    };

    dataFactory.readDomainepointOper().success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polygone.path.push(point_domaine);
      }
    }).error(function(status, data) {});        

  }
]);


myApp.controller("OperDomaineEditCtrl", ['$scope', '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    //$scope.post = {};
    var position = 0;
  

    dataFactory.findDomaineOper().success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("oper/domaines");
    });

    $scope.save = function(post) {
      dataFactory.editDomaineOper(post).success(function(data) {
        $location.path("oper/domaines");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("TypecamionGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.typecamions = [];

    dataFactory.findTypecamion().then(function(data) {
      $scope.typecamions = data.data;
      $scope.typecamion_selection = $scope.typecamions[0];
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteTypecamion(id).success(function(data) {
          var typecamions = $scope.typecamions;
            for (var typecamionKey in typecamions) {
              if (typecamions[typecamionKey].idtypecamion == id) {
                $scope.typecamions.splice(typecamionKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);

/**/
myApp.controller("TypecamionPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createTypecamion(post).success(function(data) {
          $location.path("/typecamions");
       }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("TypecamionEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.post = {};
    var id = $routeParams.id;

    dataFactory.readTypecamion(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/typecamions");
    });

    $scope.save = function(post) {
 
      dataFactory.editTypecamion(post).success(function(data) {
        $location.path("/typecamions");
      }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("StatutcamionGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.statutcamions = [];

    dataFactory.findStatutcamion().then(function(data) {
      $scope.statutcamions = data.data;
      $scope.statutcamion_selection = $scope.statutcamions[0];
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteStatutcamion(id).success(function(data) {
          var statutcamions = $scope.statutcamions;
            for (var statutcamionKey in statutcamions) {
              if (statutcamions[statutcamionKey].idstatutcamion == id) {
                $scope.statutcamions.splice(statutcamionKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);

/**/
myApp.controller("StatutcamionPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createStatutcamion(post).success(function(data) {
          $location.path("/statutcamions");
       }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("StatutcamionEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.post = {};
    var id = $routeParams.id;

    dataFactory.readStatutcamion(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/statutcamions");
    });

    $scope.save = function(post) {
 
      dataFactory.editStatutcamion(post).success(function(data) {
        $location.path("/statutcamions");
      }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("GpscamionGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.gpscamions = [];

    dataFactory.findGpscamion().then(function(data) {
      $scope.gpscamions = data.data;
      $scope.gpscamion_selection = $scope.gpscamions[0];
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteGpscamion(id).success(function(data) {
          var gpscamions = $scope.gpscamions;
            for (var gpscamionKey in gpscamions) {
              if (gpscamions[gpscamionKey].idgpscamion == id) {
                $scope.gpscamions.splice(gpscamionKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);

/**/
myApp.controller("GpscamionPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createGpscamion(post).success(function(data) {
          $location.path("/gpscamions");
       }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);


myApp.controller("GpscamionEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;

    dataFactory.readGpscamion(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/gpscamions");
    });

    $scope.save = function(post) {
 
      dataFactory.editGpscamion(post).success(function(data) {
        $location.path("/gpscamions");
      }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);



myApp.controller("CamionGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.camions = [];

    dataFactory.findCamion().then(function(data) {
      $scope.camions = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteCamion(id).success(function(data) {
          var camions = $scope.camions;
            for (var camionKey in camions) {
              if (camions[camionKey].idcamion == id) {
                $scope.camions.splice(camionKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);


myApp.controller("CamionPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findTypecamion().then(function(data) {
      $scope.typecamions = data.data;
      $scope.typecamion_selection = $scope.typecamions[0];

    });

    dataFactory.findStatutcamion().then(function(data) {
      $scope.statutcamions = data.data;
      $scope.statutcamion_selection = $scope.statutcamions[0];
    });

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];
    });

    $scope.save = function(post) {
      $scope.post.type_camion = $scope.typecamion_selection.idtypecamion;
      $scope.post.statut_camion = $scope.statutcamion_selection.idstatutcamion;
      $scope.post.dom_camion = $scope.domaine_selection.iddomaine;      
      dataFactory.createCamion(post).success(function(data) {
          $location.path("/camions");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);



myApp.controller("CamionEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readCamion(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/camions");
    });

    dataFactory.findTypecamion().then(function(doc) {
      $scope.typecamions = doc.data;
      for(var i = 0; i < $scope.typecamions.length; i++){
        if ($scope.typecamions[i].idtypecamion ==  $scope.post.type_camion) {
          position = i;
          break;
        }
      }
      $scope.typecamion_selection = $scope.typecamions[position];
    });
    
    dataFactory.findStatutcamion().then(function(doc) {
      $scope.statutcamions = doc.data;
      for(var i = 0; i < $scope.statutcamions.length; i++){
        if ($scope.statutcamions[i].idstatutcamion ==  $scope.post.statut_camion) {
          position = i;
          break;
        }
      }
      $scope.statutcamion_selection = $scope.statutcamions[position];
    });

    dataFactory.findDomaine().then(function(doc) {
      $scope.domaines = doc.data;
      for(var i = 0; i < $scope.domaines.length; i++){
        if ($scope.domaines[i].iddomaine ==  $scope.post.dom_camion) {
          position = i;
          break;
        }
      }
      $scope.domaine_selection = $scope.domaines[position];
    });


    $scope.save = function(post) {
      $scope.post.type_camion = $scope.typecamion_selection.idtypecamion;
      $scope.post.statut_camion = $scope.statutcamion_selection.idstatutcamion;
      $scope.post.dom_camion = $scope.domaine_selection.iddomaine; 
      dataFactory.editCamion(post).success(function(data) {
        $location.path("/camions");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);


myApp.controller("CamionGpsCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.gpscamions = [];
    var id = $routeParams.id;

    dataFactory.readGps(id).then(function(data) {
      $scope.gpscamions = data.data;
    });


  }
]);



myApp.controller("StationGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.stations = [];

    dataFactory.findStation().then(function(data) {
      $scope.stations = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteStation(id).success(function(data) {
          var stations = $scope.stations;
            for (var stationKey in stations) {
              if (stations[stationKey].idstation == id) {
                $scope.stations.splice(stationKey, 1);
                break;
              }
            }

            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);


/**/
myApp.controller("StationPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    var stations ={};

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];

    });

    $scope.save = function(post) {
      $scope.post.dom_station = $scope.domaine_selection.iddomaine;
      dataFactory.createStation(post).success(function(data) {
        //var stat = {id: data[0].idstation, dom: date[0].dom_station};
        //stations={id: data[0].idstation, dom: date[0].dom_station};
        var id_station = data[0].idstation;
        var dom =data[0].dom_station;
        alert('La station est enregistrée : '+ id_station + dom);
        alert('Dessinez la zone de la station dans le mode de modification');
        $location.path("/stations");
          //$location.path("/stations/zone/" + dom + '/' + id_station);
        }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
        /*
        var domaine = 
        if(stations.id != 0) {
          $location.path("/stations/zone/" + stations.dom + '/' + stations.id);
        }  else {
          alert('Enregistrement est annulé');
          $location.path("/stations");
        }
        */
    }
  
  }
]);


myApp.controller("StationEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readStation(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/stations");
    });

    $scope.save = function(post) {
      dataFactory.editStation(post).success(function(data) {
        $location.path("/stations");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);


myApp.controller("StationCarteCtrl", ['$scope', '$routeParams', 'dataFactory',
  function($scope, $routeParams, dataFactory, uiGmapGoogleMapApi) {
    $scope.post = {};
    var id = $routeParams.id;
    var dom = $routeParams.domaine;
    $scope.center={latitude: 50.454678, longitude: 3.9518525}; 
    $scope.map = {draggable: true, zoom: 17};

    dataFactory.readStation(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {});

    dataFactory.centerStation(id).success(function(data) {
      $scope.center={latitude: data[0].point.x, longitude: data[0].point.y}; 
      $scope.marker = {id: 0, 
        coords:{latitude: data[0].point.x, longitude: data[0].point.y}, 
        options: {draggable: false, title: 'UMONS', animation: 1}};
    }).error(function(status, data) {
      alert("Le centre de la station n'est pas défine. Modifier la zone ");
    });

    $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
    };

    $scope.polygons = [];

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };


    dataFactory.readStationPolygones(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.45
            }          
        };

        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });        


    dataFactory.readDomainepoint(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone de domaine n'est pas défine ");
    });   

  }
]);

myApp.controller('StationZoneCtrl', ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory, uiGmapGoogleMapApi) {
  var id = $routeParams.id;
  var dom = $routeParams.domaine;
  $scope.post={};
  $scope.map= {center: {latitude: 50.454678, longitude: 3.9518525}, draggable: true, zoom: 14}; 
  
        // map options
        $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };


    dataFactory.readStation(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      //$location.path("/maps");
    });

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };

    $scope.polygons=[];

    dataFactory.readStationPolygones(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.45
            }          
        };
        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });  


    dataFactory.readDomainepoint(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone de domaine n'est pas défine ");
    });  

  $scope.drawingManagerOptions = {
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
    },
      polygonOptions: {
              zIndex: 1,
              editable: true,
              strokeColor: '#FFFFFF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#7AB800',
              fillOpacity: 0.35
    },

  };


  $scope.drawingManagerEvents = {
    polygoncomplete: function(drawingManager, eventName, scope, args) {
      var polygon = args[0];
      var path = polygon.getPath();
        var coords = [];
        for (var i = 0 ; i < path.length ; i++) {
          coords.push({
            latitude: path.getAt(i).lat(),
            longitude: path.getAt(i).lng()
          });
        }
       
        if (confirm("Enregistrer la zone pour: " + id +'?')== true) {
          var nouveaux_points='(';
          for (var j = 0; j < coords.length; j++) {
            nouveaux_points += '('+ coords[j].latitude + ',' + coords[j].longitude + ')';
            if(j!=coords.length-1){
              nouveaux_points += ',';
            } else {
              nouveaux_points += ')';
            }
          }

            dataFactory.createStationpoint(id, nouveaux_points)
            .success(function(data) {
              alert('La zone est enregistrée');
            }).error(function(status, data) {
              alert('Enregistrement est annulé');
            }); 

        }
        coords = [];
      //$location.path("/maps");  
     }
  }

  }
]);



myApp.controller("DepotGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.depots = [];

    dataFactory.findDepot().then(function(data) {
      $scope.depots = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteDepot(id).success(function(data) {
          var depots = $scope.depots;
            for (var depotKey in depots) {
              if (depots[depotKey].iddepot == id) {
                $scope.depots.splice(depotKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("DepotPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];
    });

    $scope.save = function(post) {
      $scope.post.dom_depot = $scope.domaine_selection.iddomaine;      
      dataFactory.createDepot(post).success(function(data) {
          $location.path("/depots");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);

myApp.controller("DepotEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readDepot(id).success(function(data) {
      $scope.post = data[0];
      $scope.post.position_depot = '('+ data[0].position_depot.x + ', ' + data[0].position_depot.y + ')';
    }).error(function(status, data) {
      $location.path("/depots");
    });


    dataFactory.findDomaine().then(function(doc) {
      $scope.domaines = doc.data;
      for(var i = 0; i < $scope.domaines.length; i++){
        if ($scope.domaines[i].iddomaine ==  $scope.post.dom_depot) {
          position = i;
          break;
        }
      }
      $scope.domaine_selection = $scope.domaines[position];
    });


    $scope.save = function(post) {
      $scope.post.dom_depot = $scope.domaine_selection.iddomaine; 
      dataFactory.editDepot(post).success(function(data) {
        $location.path("/depots");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);

myApp.controller("DepotCarteCtrl", ['$scope', '$routeParams', 'dataFactory',
  function($scope, $routeParams, dataFactory, uiGmapGoogleMapApi) {
    $scope.post = {};
    var id = $routeParams.id;
    var dom = $routeParams.domaine;
    $scope.center={latitude: 50.454678, longitude: 3.9518525}; 
    $scope.map = {draggable: true, zoom: 17};

    dataFactory.centerDomaine(dom).success(function(data) {
      $scope.center={latitude: data[0].point.x, longitude: data[0].point.y}; 
    }).error(function(status, data) {
      alert("Le centre du domaine n'est pas défine. Modifier la zone ");
    });


    dataFactory.readDepot(id).success(function(data) {
      $scope.post = data[0];
      $scope.marker = {id: 0, 
        coords:{latitude: data[0].position_depot.x, longitude: data[0].position_depot.y}, 
        options: {draggable: false, title: 'UMONS', animation: 2, }};      
    }).error(function(status, data) {});

    $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
    };


    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };


    dataFactory.readDomainepoint(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone du domaine n'est pas défine ");
    });   

  }
]);

myApp.controller('DepotPointCtrl', ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory, uiGmapGoogleMapApi) {
  var id = $routeParams.id;
  var dom = $routeParams.domaine;
  $scope.post={};
  $scope.map= {center: {latitude: 50.454678, longitude: 3.9518525}, draggable: true, zoom: 14}; 
  
      dataFactory.centerDomaine(dom).success(function(data) {
      $scope.map={center: {latitude: data[0].point.x, longitude: data[0].point.y}, draggable: true, zoom: 15}; 
    }).error(function(status, data) {
      alert("Le centre du domaine n'est pas défine. Modifier la zone ");
    });

        // map options
        $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };

    dataFactory.readDomainepoint(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone du domaine n'est pas défine ");
    });  

  $scope.drawingManagerOptions = {
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER
        ]
    }

  };


    $scope.drawingManagerEvents = {
      markercomplete: function(drawingManager, eventName, scope, args) {
        var marker = args[0];
        //var marker = args[0];
            var lat = marker.getPosition().lat();
            var lon = marker.getPosition().lng();
         
          if (confirm("Enregistrer la position du dépôt : " + id +'?')== true) {
            var nouveau_point='(' + lat + ', ' + lon + ')';

              dataFactory.createDepotpoint(id, nouveau_point)
              .success(function(data) {
                alert('La position du dépôt est enregistrée');
              }).error(function(status, data) {
                alert('Enregistrement est annulé');
              }); 

          }

       }
    }
  }
]);



myApp.controller("TarifGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.tarifs = [];

    dataFactory.findTarif().then(function(data) {
      $scope.tarifs = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteTarif(id).success(function(data) {
          var tarifs = $scope.tarifs;
            for (var tarifKey in tarifs) {
              if (tarifs[tarifKey].idtarif == id) {
                $scope.tarifs.splice(tarifKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("TarifPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];
    });

    $scope.save = function(post) {
      $scope.post.dom_tarif = $scope.domaine_selection.iddomaine;      
      dataFactory.createTarif(post).success(function(data) {
          $location.path("/tarifs");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);

myApp.controller("TarifEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readTarif(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/tarifs");
    });


    $scope.save = function(post) {
      dataFactory.editTarif(post).success(function(data) {
        $location.path("/tarifs");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);




myApp.controller("OperTarifGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.tarifs = [];

    dataFactory.findTarifOper().then(function(data) {
      $scope.tarifs = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteTarifOper(id).success(function(data) {
          var tarifs = $scope.tarifs;
            for (var tarifKey in tarifs) {
              if (tarifs[tarifKey].idtarif == id) {
                $scope.tarifs.splice(tarifKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("OperTarifPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findDomaineOper().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];
    });

    $scope.save = function(post) {
      $scope.post.dom_tarif = $scope.domaine_selection.iddomaine;      
      dataFactory.createTarifOper(post).success(function(data) {
          $location.path("/oper/tarifs");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);

myApp.controller("OperTarifEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readTarifOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/tarifs");
    });


    $scope.save = function(post) {
      dataFactory.editTarifOper(post).success(function(data) {
        $location.path("/oper/tarifs");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);


myApp.controller("TypeveloGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.typevelos = [];

    dataFactory.findTypevelo().then(function(data) {
      $scope.typevelos = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteTypevelo(id).success(function(data) {
          var typevelos = $scope.typevelos;
            for (var typeveloKey in typevelos) {
              if (typevelos[typeveloKey].idtypevelo == id) {
                $scope.typevelos.splice(typeveloKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("TypeveloPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findTarif().then(function(data) {
      $scope.tarifs = data.data;
      $scope.tarif_selection = $scope.tarifs[0];
    });

    $scope.save = function(post) {
      $scope.post.tarif = $scope.tarif_selection.idtarif;        
      $scope.post.dom_typevelo = $scope.tarif_selection.dom_tarif;

      dataFactory.createTypevelo(post).success(function(data) {
          $location.path("/typevelos");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);

myApp.controller("TypeveloEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readTypevelo(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/typevelos");
    });


    dataFactory.findTarif().then(function(doc) {
      $scope.tarifs = doc.data;
      for(var i = 0; i < $scope.tarifs.length; i++){
        if ($scope.tarifs[i].idtarif ==  $scope.post.tarif) {
          position = i;
          break;
        }
      }
      $scope.tarif_selection = $scope.tarifs[position];
    });



    $scope.save = function(post) {
      $scope.post.tarif = $scope.tarif_selection.idtarif;        
      $scope.post.dom_typevelo = $scope.tarif_selection.dom_tarif;

      dataFactory.editTypevelo(post).success(function(data) {
        $location.path("/typevelos");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);




myApp.controller("OperTypeveloGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.typevelos = [];

    dataFactory.findTypeveloOper().then(function(data) {
      $scope.typevelos = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteTypeveloOper(id).success(function(data) {
          var typevelos = $scope.typevelos;
            for (var typeveloKey in typevelos) {
              if (typevelos[typeveloKey].idtypevelo == id) {
                $scope.typevelos.splice(typeveloKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("OperTypeveloPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findTarifOper().then(function(data) {
      $scope.tarifs = data.data;
      $scope.tarif_selection = $scope.tarifs[0];
    });

    $scope.save = function(post) {
      $scope.post.tarif = $scope.tarif_selection.idtarif;        
      $scope.post.dom_typevelo = $scope.tarif_selection.dom_tarif;

      dataFactory.createTypeveloOper(post).success(function(data) {
          $location.path("/oper/typevelos");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);

myApp.controller("OperTypeveloEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readTypeveloOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/typevelos");
    });


    dataFactory.findTarifOper().then(function(doc) {
      $scope.tarifs = doc.data;
      for(var i = 0; i < $scope.tarifs.length; i++){
        if ($scope.tarifs[i].idtarif ==  $scope.post.tarif) {
          position = i;
          break;
        }
      }
      $scope.tarif_selection = $scope.tarifs[position];
    });



    $scope.save = function(post) {
      $scope.post.tarif = $scope.tarif_selection.idtarif;        
      $scope.post.dom_typevelo = $scope.tarif_selection.dom_tarif;

      dataFactory.editTypeveloOper(post).success(function(data) {
        $location.path("/oper/typevelos");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);


myApp.controller("StatutveloGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.statutvelos = [];

    dataFactory.findStatutvelo().then(function(data) {
      $scope.statutvelos = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteStatutvelo(id).success(function(data) {
          var statutvelos = $scope.statutvelos;
            for (var statutveloKey in statutvelos) {
              if (statutvelos[statutveloKey].idstatutvelo == id) {
                $scope.statutvelos.splice(statutveloKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);
/**/
myApp.controller("StatutveloPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createStatutvelo(post).success(function(data) {
          $location.path("/statutvelos");
       }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);

myApp.controller("StatutveloEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.post = {};
    var id = $routeParams.id;

    dataFactory.readStatutvelo(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/statutvelos");
    });

    $scope.save = function(post) {
 
      dataFactory.editStatutvelo(post).success(function(data) {
        $location.path("/statutvelos");
      }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);




myApp.controller("VeloGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.velos = [];

    dataFactory.findVelo().then(function(data) {
      $scope.velos = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteVelo(id).success(function(data) {
          var velos = $scope.velos;
            for (var veloKey in velos) {
              if (velos[veloKey].idvelo == id) {
                $scope.velos.splice(veloKey, 1);
                break;
              }
            }
 
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);
/*verifier: ok ajouter $scope.post = {};*/
myApp.controller("VeloPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.post = {};

    dataFactory.findStation().then(function(data) {
      $scope.stations = data.data;
      $scope.station_selection = $scope.stations[0];
    });

    dataFactory.findTypevelo().then(function(data) {
      $scope.typevelos = data.data;
      $scope.typevelo_selection = $scope.typevelos[0];
    });

    dataFactory.findStatutvelo().then(function(data) {
      $scope.statutvelos = data.data;
      $scope.statutvelo_selection = $scope.statutvelos[0];
    });

    $scope.save = function(post) { 
      $scope.post.station_velo = $scope.station_selection.idstation;
      $scope.post.dom_velo = $scope.station_selection.dom_station;
      $scope.post.type_velo = $scope.typevelo_selection.idtypevelo;
      $scope.post.tarif_velo = $scope.typevelo_selection.tarif;
      $scope.post.statut_velo = $scope.statutvelo_selection.idstatutvelo;
      dataFactory.createVelo(post).success(function(data) {
          $location.path("/velos");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }

  }
]);

myApp.controller("VeloEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    $scope.station_selection = {};
    $scope.typevelo_selection = {};
    $scope.statutvelo_selection = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readVelo(id).success(function(data) {
      $scope.post = data[0];
      $scope.post.position_velo = '('+ data[0].position_velo.x + ', ' + data[0].position_velo.y + ')';
      //$scope.post.position_velo = '('+ $scope.post.position_velo.position_velo.x + ', ' + $scope.post.position_velo.position_velo.y + ')';
    }).error(function(status, data) {
      $location.path("/velos");
    });


    dataFactory.findStation().then(function(doc1) {
      $scope.stations = doc1.data;
      for(var i = 0; i < $scope.stations.length; i++){
        if ($scope.stations[i].idstation ==  $scope.post.station_velo) {
          position = i;
          break;
        }
      }
      $scope.station_selection = $scope.stations[position];
      //$scope.post.station_velo = $scope.stations[position].idstation; 
      //$scope.post.dom_velo = $scope.stations[position].dom_station;
    });


    dataFactory.findTypevelo().then(function(doc2) {
      $scope.typevelos = doc2.data;
      for(var i = 0; i < $scope.typevelos.length; i++){
        if ($scope.typevelos[i].idtypevelo ==  $scope.post.type_velo) {
          position = i;
          break;
        }
      }
      $scope.typevelo_selection = $scope.typevelos[position];
      //$scope.post.type_velo = $scope.typevelos[position].idtypevelo;
      //$scope.post.tarif_velo = $scope.typevelos[position].tarif;
    });

    dataFactory.findStatutvelo().then(function(doc3) {
      $scope.statutvelos = doc3.data;
      for(var i = 0; i < $scope.statutvelos.length; i++){
        if ($scope.statutvelos[i].idstatutvelo ==  $scope.post.statut_velo) {
          position = i;
          break;
        }
      }
      $scope.statutvelo_selection = $scope.statutvelos[position];
      //$scope.post.statut_velo = $scope.statutvelos[position].idstatutvelo;
    });



    $scope.save = function(post) {

      $scope.post.station_velo = $scope.station_selection.idstation; 
      $scope.post.dom_velo = $scope.station_selection.dom_station;
      $scope.post.type_velo = $scope.typevelo_selection.idtypevelo;
      $scope.post.tarif_velo = $scope.typevelo_selection.tarif;
      $scope.post.statut_velo = $scope.statutvelo_selection.idstatutvelo;

      dataFactory.editVelo(post).success(function(data) {
        $location.path("/velos");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);

myApp.controller("VeloCarteCtrl", ['$scope', '$routeParams', 'dataFactory',
  function($scope, $routeParams, dataFactory, uiGmapGoogleMapApi) {
    $scope.post = {};
    var id = $routeParams.id;
    var dom = $routeParams.domaine;
    $scope.center={latitude: 50.454678, longitude: 3.9518525}; 
    $scope.map = {draggable: true, zoom: 14};

    dataFactory.centerDomaine(dom).success(function(data) {
      $scope.center={latitude: data[0].point.x, longitude: data[0].point.y}; 
    }).error(function(status, data) {
      alert("Le centre du domaine n'est pas défine. Modifier la zone ");
    });

    $scope.markers = [];

    dataFactory.readVelo(id).success(function(data) {
      $scope.post = data[0];
      var marker = {id: 0, 
        coords:{latitude: data[0].position_velo.x, longitude: data[0].position_velo.y}, 
        options: {draggable: false, title: 'UMONS', animation: 1, }};
        $scope.markers.push(marker);
    }).error(function(status, data) {});


    dataFactory.readVeloDomaine(dom, id).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var velo_domaine = {
            id: data[i].idvelo, 
            coords:{
              latitude: data[i].position_velo.x, 
              longitude: data[i].position_velo.y
            }, 
            options: {
              draggable: false, 
              title: 'UMONS'
            }
        };      
        if(velo_domaine.id != id) $scope.markers.push(velo_domaine);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });        

    $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
    };

    $scope.polygons = [];

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };


    dataFactory.readStationPolygones(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.35
            }          
        };
        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });        

    dataFactory.readDomainepoint(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone du domaine n'est pas défine ");
    });   

  }
]);

myApp.controller('VeloPointCtrl', ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory, uiGmapGoogleMapApi) {
  var id = $routeParams.id;
  var dom = $routeParams.domaine;
  $scope.post={};
  $scope.map= {center: {latitude: 50.454678, longitude: 3.9518525}, draggable: true, zoom: 14}; 
  
      dataFactory.centerDomaine(dom).success(function(data) {
      $scope.map={center: {latitude: data[0].point.x, longitude: data[0].point.y}, draggable: true, zoom: 15}; 
    }).error(function(status, data) {
      alert("Le centre du domaine n'est pas défine. Modifier la zone ");
    });

        // map options
        $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

    $scope.polygons = [];

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };


    dataFactory.readStationPolygones(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.45
            }          
        };
        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });  


    dataFactory.readDomainepoint(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone du domaine n'est pas défine ");
    });  

  $scope.drawingManagerOptions = {
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER
        ]
    }

  };


    $scope.drawingManagerEvents = {
      markercomplete: function(drawingManager, eventName, scope, args) {
        var marker = args[0];
        //var marker = args[0];
            var lat = marker.getPosition().lat();
            var lon = marker.getPosition().lng();
         
          if (confirm("Enregistrer la position du vélo : " + id +'?')== true) {
            var nouveau_point='(' + lat + ', ' + lon + ')';

              dataFactory.createVelopoint(id, nouveau_point)
              .success(function(data) {
                alert('La position du vélo est enregistrée');
              }).error(function(status, data) {
                alert('Enregistrement est annulé');
              }); 

          }

       }
    }

  }
]);





myApp.controller("OperVeloGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.velos = [];

    dataFactory.findVeloOper().then(function(data) {
      $scope.velos = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteVeloOper(id).success(function(data) {
          var velos = $scope.velos;
            for (var veloKey in velos) {
              if (velos[veloKey].idvelo == id) {
                $scope.velos.splice(veloKey, 1);
                break;
              }
            }
 
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("OperVeloPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.post = {};

    dataFactory.findStationOper().then(function(data) {
      $scope.stations = data.data;
      $scope.station_selection = $scope.stations[0];
    });

    dataFactory.findTypeveloOper().then(function(data) {
      $scope.typevelos = data.data;
      $scope.typevelo_selection = $scope.typevelos[0];
    });

    dataFactory.findStatutveloOper().then(function(data) {
      $scope.statutvelos = data.data;
      $scope.statutvelo_selection = $scope.statutvelos[0];
    });

    $scope.save = function(post) { 
      $scope.post.station_velo = $scope.station_selection.idstation;
      $scope.post.type_velo = $scope.typevelo_selection.idtypevelo;
      $scope.post.tarif_velo = $scope.typevelo_selection.tarif;
      $scope.post.statut_velo = $scope.statutvelo_selection.idstatutvelo;
      dataFactory.createVeloOper(post).success(function(data) {
          $location.path("/oper/velos");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }

  }
]);

myApp.controller("OperVeloEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    $scope.station_selection = {};
    $scope.typevelo_selection = {};
    $scope.statutvelo_selection = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readVeloOper(id).success(function(data) {
      $scope.post = data[0];
      $scope.post.position_velo = '('+ data[0].position_velo.x + ', ' + data[0].position_velo.y + ')';
      
    }).error(function(status, data) {
      $location.path("/oper/velos");
    });


    dataFactory.findStationOper().then(function(doc1) {
      $scope.stations = doc1.data;
      for(var i = 0; i < $scope.stations.length; i++){
        if ($scope.stations[i].idstation ==  $scope.post.station_velo) {
          position = i;
          break;
        }
      }
      $scope.station_selection = $scope.stations[position];
    });


    dataFactory.findTypeveloOper().then(function(doc2) {
      $scope.typevelos = doc2.data;
      for(var i = 0; i < $scope.typevelos.length; i++){
        if ($scope.typevelos[i].idtypevelo ==  $scope.post.type_velo) {
          position = i;
          break;
        }
      }
      $scope.typevelo_selection = $scope.typevelos[position];

    });

    dataFactory.findStatutveloOper().then(function(doc3) {
      $scope.statutvelos = doc3.data;
      for(var i = 0; i < $scope.statutvelos.length; i++){
        if ($scope.statutvelos[i].idstatutvelo ==  $scope.post.statut_velo) {
          position = i;
          break;
        }
      }
      $scope.statutvelo_selection = $scope.statutvelos[position];
    });



    $scope.save = function(post) {

      $scope.post.station_velo = $scope.station_selection.idstation; 
      $scope.post.type_velo = $scope.typevelo_selection.idtypevelo;
      $scope.post.tarif_velo = $scope.typevelo_selection.tarif;
      $scope.post.statut_velo = $scope.statutvelo_selection.idstatutvelo;

      dataFactory.editVeloOper(post).success(function(data) {
        $location.path("/oper/velos");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);

myApp.controller("OperVeloCarteCtrl", ['$scope', '$routeParams', 'dataFactory',
  function($scope, $routeParams, dataFactory, uiGmapGoogleMapApi) {
    $scope.post = {};
    var id = $routeParams.id;
    var dom = $routeParams.domaine;
    $scope.center={latitude: 50.454678, longitude: 3.9518525}; 
    $scope.map = {draggable: true, zoom: 14};

    dataFactory.centerDomaineOper(dom).success(function(data) {
      $scope.center={latitude: data[0].point.x, longitude: data[0].point.y}; 
    }).error(function(status, data) {
      alert("Le centre du domaine n'est pas défine. Modifier la zone ");
    });

    $scope.markers = [];

    dataFactory.readVeloOper(id).success(function(data) {
      $scope.post = data[0];
      var marker = {id: 0, 
        coords:{latitude: data[0].position_velo.x, longitude: data[0].position_velo.y}, 
        options: {draggable: false, title: 'UMONS', animation: 1, }};
        $scope.markers.push(marker);
    }).error(function(status, data) {});


    dataFactory.readVeloDomaineOper(id).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var velo_domaine = {
            id: data[i].idvelo, 
            coords:{
              latitude: data[i].position_velo.x, 
              longitude: data[i].position_velo.y
            }, 
            options: {
              draggable: false, 
              title: 'UMONS'
            }
        };      
        if(velo_domaine.id != id) $scope.markers.push(velo_domaine);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });        

    $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
    };

    $scope.polygons = [];

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };


    dataFactory.readStationPolygonesOper(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';        
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.45
            }          
        };
        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });        

    dataFactory.readDomainepointOper().success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone du domaine n'est pas défine ");
    });   

  }
]);

myApp.controller('OperVeloPointCtrl', ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory, uiGmapGoogleMapApi) {
  var id = $routeParams.id;
  var dom = $routeParams.domaine;
  $scope.post={};
  $scope.map= {center: {latitude: 50.454678, longitude: 3.9518525}, draggable: true, zoom: 14}; 
  
      dataFactory.centerDomaineOper().success(function(data) {
      $scope.map={center: {latitude: data[0].point.x, longitude: data[0].point.y}, draggable: true, zoom: 15}; 
    }).error(function(status, data) {
      alert("Le centre du domaine n'est pas défine. Modifier la zone ");
    });

        // map options
        $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

    $scope.polygons = [];

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };


    dataFactory.readStationPolygonesOper(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.35
            }          
        };
        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });  


    dataFactory.readDomainepointOper().success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone du domaine n'est pas défine ");
    });  

  $scope.drawingManagerOptions = {
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER
        ]
    }

  };


    $scope.drawingManagerEvents = {
      markercomplete: function(drawingManager, eventName, scope, args) {
        var marker = args[0];
        //var marker = args[0];
            var lat = marker.getPosition().lat();
            var lon = marker.getPosition().lng();
         
          if (confirm("Enregistrer la position du vélo : " + id +'?')== true) {
            var nouveau_point='(' + lat + ', ' + lon + ')';

              dataFactory.createVelopointOper(id, nouveau_point)
              .success(function(data) {
                alert('La position du vélo est enregistrée');
              }).error(function(status, data) {
                alert('Enregistrement est annulé');
              }); 

          }

       }
    }

  }
]);



myApp.controller("GpsveloGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.gpsvelos = [];

    dataFactory.findGpsvelo().then(function(data) {
      $scope.gpsvelos = data.data;
      $scope.gpsvelo_selection = $scope.gpsvelos[0];
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteGpsvelo(id).success(function(data) {
          var gpsvelos = $scope.gpsvelos;
            for (var gpsveloKey in gpsvelos) {
              if (gpsvelos[gpsveloKey].idgpsvelo == id) {
                $scope.gpsvelos.splice(gpsveloKey, 1);
                break;
              }
            }
 
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);
/**/
myApp.controller("GpsveloPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createGpsvelo(post).success(function(data) {
          $location.path("/gpsvelos");
       }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);

myApp.controller("GpsveloEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;

    dataFactory.readGpsvelo(id).success(function(data) {
      $scope.post = data[0];
      $scope.post.position = '('+ data[0].position.x + ', ' + data[0].position.y + ')';
    }).error(function(status, data) {
      $location.path("/gpsvelos");
    });

    $scope.save = function(post) {
 
      dataFactory.editGpsvelo(post).success(function(data) {
        $location.path("/gpsvelos");
      }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);



myApp.controller("VeloGpsCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.gpsvelos = [];
    var id = $routeParams.id;

    dataFactory.readGpsid(id).then(function(data) {
      $scope.gpsvelos = data.data;
    });


  }
]);

myApp.controller("OperVeloGpsCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.gpsvelos = [];
    var id = $routeParams.id;

    dataFactory.readGpsidOper(id).then(function(data) {
      $scope.gpsvelos = data.data;
    });


  }
]);



myApp.controller("StatutclientGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.statutclients = [];

    dataFactory.findStatutclient().then(function(data) {
      $scope.statutclients = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteStatutclient(id).success(function(data) {
          var statutclients = $scope.statutclients;
            for (var statutclientKey in statutclients) {
              if (statutclients[statutclientKey].idstatutclient == id) {
                $scope.statutclients.splice(statutclientKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Supprission annulée: Enregistrement est référencé dans d'autre table!");
        });
        }
      }
    }


  }
]);
/**/
myApp.controller("StatutclientPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.save = function(post) {
      dataFactory.createStatutclient(post).success(function(data) {
          $location.path("/statutclients");
       }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);

myApp.controller("StatutclientEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    $scope.post = {};
    var id = $routeParams.id;

    dataFactory.readStatutclient(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/statutvelos");
    });

    $scope.save = function(post) {
 
      dataFactory.editStatutclient(post).success(function(data) {
        $location.path("/statutclients");
      }).error(function(status, data) {
          console.log(status);
          console.log(data);
          alert("Format de données saisies est incorrect");
      });
    }
  }
]);



myApp.controller("ClientGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.clients = [];

    dataFactory.findClient().then(function(data) {
      $scope.clients = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteClient(id).success(function(data) {
          var clients = $scope.clients;
            for (var clientKey in clients) {
              if (clients[clientKey].idclient == id) {
                $scope.clients.splice(clientKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }


  }
]);

myApp.controller("ClientPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

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
          $location.path("/clients");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);

myApp.controller("ClientEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readClient(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/clients");
    });


   dataFactory.findVille().then(function(doc1) {
      $scope.villes = doc1.data;
      for(var i = 0; i < $scope.villes.length; i++){
        if ($scope.villes[i].idville ==  $scope.post.cp_client) {
          position = i;
          break;
        }
      }
      $scope.ville_selection = $scope.villes[position];
    });
    
    dataFactory.findStatutclient().then(function(doc) {
      $scope.statutclients = doc.data;
      for(var i = 0; i < $scope.statutclients.length; i++){
        if ($scope.statutclients[i].idstatutclient ==  $scope.post.statut_client) {
          position = i;
          break;
        }
      }
      $scope.statutclient_selection = $scope.statutclients[position];
    });



    $scope.save = function(post) {
      $scope.post.cp_client = $scope.ville_selection.idville;
      $scope.post.statut_client = $scope.statutclient_selection.idstatutclient;
      dataFactory.editClient(post).success(function(data) {
        $location.path("/clients");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }
 

  }
]);




myApp.controller("OperClientGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.clients = [];

    dataFactory.findClientOper().then(function(data) {
      $scope.clients = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteClientOper(id).success(function(data) {
          var clients = $scope.clients;
            for (var clientKey in clients) {
              if (clients[clientKey].idclient == id) {
                $scope.clients.splice(clientKey, 1);
                break;
              }
            }
            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }


  }
]);

myApp.controller("OperClientPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {

    dataFactory.findVille_oper().then(function(data) {
      $scope.villes = data.data;
      $scope.ville_selection = $scope.villes[0];
    });

    dataFactory.findStatutclientOper().then(function(data) {
      $scope.statutclients = data.data;
      $scope.statutclient_selection = $scope.statutclients[0];
    });


    $scope.save = function(post) {
      $scope.post.cp_client = $scope.ville_selection.idville;
      $scope.post.statut_client = $scope.statutclient_selection.idstatutclient;
     
      dataFactory.createClientOper(post).success(function(data) {
          $location.path("/oper/clients");
       }).error(function(status, data) {
          alert( 'Erreur');
      });
    };

  }
]);

myApp.controller("OperClientEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readClientOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/clients");
    });

    dataFactory.findVille_oper().then(function(doc1) {
      $scope.villes = doc1.data;
      for(var i = 0; i < $scope.villes.length; i++){
        if ($scope.villes[i].idville ==  $scope.post.cp_client) {
          position = i;
          break;
        }
      }
      $scope.ville_selection = $scope.villes[position];
    });
    
    dataFactory.findStatutclientOper().then(function(doc) {
      $scope.statutclients = doc.data;
      for(var i = 0; i < $scope.statutclients.length; i++){
        if ($scope.statutclients[i].idstatutclient ==  $scope.post.statut_client) {
          position = i;
          break;
        }
      }
      $scope.statutclient_selection = $scope.statutclients[position];
    });



    $scope.save = function(post) {
      $scope.post.cp_client = $scope.ville_selection.idville;
      $scope.post.statut_client = $scope.statutclient_selection.idstatutclient;
      dataFactory.editClientOper(post).success(function(data) {
        $location.path("/oper/clients");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }
 

  }
]);




myApp.controller("OperStationGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.stations = [];

    dataFactory.findStationOper().then(function(data) {
      $scope.stations = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteStationOper(id).success(function(data) {
          var stations = $scope.stations;
            for (var stationKey in stations) {
              if (stations[stationKey].idstation == id) {
                $scope.stations.splice(stationKey, 1);
                break;
              }
            }

            //alert("Enregistrement est supprimé");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);
/**/
myApp.controller("OperStationPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    var stations ={};

    $scope.save = function(post) {

      dataFactory.createStationOper(post).success(function(data) {
        //var stat = {id: data[0].idstation, dom: date[0].dom_station};
        //stations={id: data[0].idstation, dom: date[0].dom_station};
        var id_station = data[0].idstation;
        var dom =data[0].dom_station;
        alert('La station est enregistrée : '+ id_station + dom);
        alert('Dessinez la zone de la station dans le mode de modification');
        $location.path("/oper/stations");
          //$location.path("/stations/zone/" + dom + '/' + id_station);
        }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
        /*
        var domaine = 
        if(stations.id != 0) {
          $location.path("/stations/zone/" + stations.dom + '/' + stations.id);
        }  else {
          alert('Enregistrement est annulé');
          $location.path("/stations");
        }
        */
    }
  
  }
]);

myApp.controller("OperStationEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readStationOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/stations");
    });

    $scope.save = function(post) {
      dataFactory.editStationOper(post).success(function(data) {
        $location.path("/oper/stations");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);

myApp.controller("OperStationCarteCtrl", ['$scope', '$routeParams', 'dataFactory',
  function($scope, $routeParams, dataFactory, uiGmapGoogleMapApi) {
    $scope.post = {};
    var id = $routeParams.id;
    var dom = $routeParams.domaine;
    $scope.center={latitude: 50.454678, longitude: 3.9518525}; 
    $scope.map = {draggable: true, zoom: 17};

    dataFactory.readStationOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {});

    dataFactory.centerStationOper(id).success(function(data) {
      $scope.center={latitude: data[0].point.x, longitude: data[0].point.y}; 
      $scope.marker = {id: 0, 
        coords:{latitude: data[0].point.x, longitude: data[0].point.y}, 
        options: {draggable: false, title: 'UMONS', animation: 1}};
    }).error(function(status, data) {
      alert("Le centre de la station n'est pas défine. Modifier la zone ");
    });

    $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
    };

    $scope.polygons = [];

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };


    dataFactory.readStationPolygonesOper(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.45
            }          
        };

        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });        


    dataFactory.readDomainepointOper(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone de domaine n'est pas défine ");
    });   

  }
]);

myApp.controller('OperStationZoneCtrl', ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory, uiGmapGoogleMapApi) {
  var id = $routeParams.id;
  var dom = $routeParams.domaine;
  $scope.post={};
  $scope.map= {center: {latitude: 50.454678, longitude: 3.9518525}, draggable: true, zoom: 14}; 
  
        // map options
        $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };


    dataFactory.readStationOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      //$location.path("/maps");
    });

    $scope.polyline = {
                id: 1,
                path: [],
                stroke: {
                    color: '#FF0000',
                    weight: 3,
                    opacity: 0.6
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: {
                    icon: {
                        path: null
                    },
                    offset: '25px',
                    repeat: '50px'
                }
            };

    $scope.polygons=[];

    dataFactory.readStationPolygonesOper(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var color_station = '#00FF00';
        if (data[i].virtuelle) color_station = '#FF0000';
        var polygone_station = {
            id: data[i].id, 
            path: data[i].path,
            stroke: {
                color: '#FFFFFF',
                weight: 2,
                opacity: 0.8
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            fill: {
                color: color_station,
                opacity: 0.45
            }          
        };
        $scope.polygons.push(polygone_station);
      };      
        
    }).error(function(status, data) {
      alert("Le domaine n'est pas défine");
    });  


    dataFactory.readDomainepointOper(dom).success(function(data) {
      for( var i = 0; i < data.length; i++){
        var point_domaine = {latitude: data[i].x, longitude: data[i].y};
        $scope.polyline.path.push(point_domaine);
      };
      $scope.polyline.path.push({latitude: data[0].x, longitude: data[0].y});
    }).error(function(status, data) {
      alert("La zone de domaine n'est pas défine ");
    });  

  $scope.drawingManagerOptions = {
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
    },
      polygonOptions: {
              zIndex: 1,
              editable: true,
              strokeColor: '#FFFFFF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#7AB800',
              fillOpacity: 0.35
    },

  };


  $scope.drawingManagerEvents = {
    polygoncomplete: function(drawingManager, eventName, scope, args) {
      var polygon = args[0];
      var path = polygon.getPath();
        var coords = [];
        for (var i = 0 ; i < path.length ; i++) {
          coords.push({
            latitude: path.getAt(i).lat(),
            longitude: path.getAt(i).lng()
          });
        }
       
        if (confirm("Enregistrer la zone pour: " + id +'?')== true) {
          var nouveaux_points='(';
          for (var j = 0; j < coords.length; j++) {
            nouveaux_points += '('+ coords[j].latitude + ',' + coords[j].longitude + ')';
            if(j!=coords.length-1){
              nouveaux_points += ',';
            } else {
              nouveaux_points += ')';
            }
          }

            dataFactory.createStationpointOper(id, nouveaux_points)
            .success(function(data) {
              alert('La zone est enregistrée');
            }).error(function(status, data) {
              alert('Enregistrement est annulé');
            }); 

        }
        coords = [];
      //$location.path("/maps");  
     }
  }

  }
]);



myApp.controller("CommentaireGetCtrl", ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.commentaires = [];
    $scope.client = id;

    dataFactory.findClientCommentaire(id).then(function(data) {
      $scope.commentaires = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteClientCommentaire(id).success(function(data) {
          var commentaires = $scope.commentaires;
            for (var commentaireKey in commentaires) {
              if (commentaires[commentaireKey].idcommentaire == id) {
                $scope.commentaires.splice(commentaireKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    },


    $scope.edit = function(post) {
      $scope.post.post_pour=id;
      dataFactory.editClientCommentaire(post).success(function(data) {
        $location.path("/commentaires/" + id);
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);

myApp.controller("CommentairePostCtrl", ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
  var id = $routeParams.id;  

    $scope.save = function(post) {
      $scope.post.post_pour=id;
      dataFactory.createClientCommentaire(post).success(function(data) {
          $location.path("/commentaires/" + id);
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);



myApp.controller("OperCommentaireGetCtrl", ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.commentaires = [];
    $scope.client = id;

    dataFactory.findClientCommentaireOper(id).then(function(data) {
      $scope.commentaires = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?  Vous ne pouvez pas supprimer les commentaires d'un autre opérateur! ")== true) {
        dataFactory.deleteClientCommentaireOper(id).success(function(data) {
          var commentaires = $scope.commentaires;
            for (var commentaireKey in commentaires) {
              if (commentaires[commentaireKey].idcommentaire == id) {
                $scope.commentaires.splice(commentaireKey, 1);
                break;
              }
            }

        }).error(function(status, data) {
          alert("Suppression est annulée! ");
        });
        }
      }
    }
  }
]);

myApp.controller("OperCommentairePostCtrl", ['$scope', '$routeParams', '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
  var id = $routeParams.id;  

    $scope.save = function(post) {
      $scope.post.post_pour=id;
      dataFactory.createClientCommentaireOper(post).success(function(data) {
          $location.path("/oper/commentaires/" + id);
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    };

  }
]);



myApp.controller("BonustrajetGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.bonustrajets = [];

    dataFactory.findBonustrajet().then(function(data) {
      $scope.bonustrajets = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteBonustrajet(id).success(function(data) {
          var bonustrajets = $scope.bonustrajets;
            for (var bonustrajetKey in bonustrajets) {
              if (bonustrajets[bonustrajetKey].idbonustrajet == id) {
                $scope.bonustrajets.splice(bonustrajetKey, 1);
                break;
              }
            }
 
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("BonustrajetPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.post = {};
    //$scope.stations = {};
    $scope.station_selection1 = {};
    $scope.station_selection2 = {};

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];
    });

    dataFactory.findStation().then(function(data) {
      $scope.stations = data.data;
      $scope.station_selection1 = $scope.stations[0];
      $scope.station_selection2 = $scope.stations[0];
    });


    $scope.save = function(post) {
      $scope.post.dom_bonustrajet = $scope.domaine_selection.iddomaine;
      $scope.post.station_depart = $scope.station_selection1.idstation;
      $scope.post.station_arriver = $scope.station_selection2.idstation;
      dataFactory.createBonustrajet(post).success(function(data) {
          $location.path("/bonustrajets");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }

  }

]);

myApp.controller("BonustrajetEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readBonustrajet(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/bonustrajets");
    });

    dataFactory.findDomaine().then(function(doc) {
      $scope.domaines = doc.data;
      for(var i = 0; i < $scope.domaines.length; i++){
        if ($scope.domaines[i].iddomaine ==  $scope.post.dom_bonustrajet) {
          position = i;
          break;
        }
      }
      $scope.domaine_selection = $scope.domaines[position];
    });


    dataFactory.findStation().then(function(doc1) {
      $scope.stations = doc1.data;
      for(var i = 0; i < $scope.stations.length; i++){
        if ($scope.stations[i].idstation ==  $scope.post.station_depart) {
          position = i;
          break;
        }
      }
      $scope.station_selection1 = $scope.stations[position];
      for(var i = 0; i < $scope.stations.length; i++){
        if ($scope.stations[i].idstation ==  $scope.post.station_arriver) {
          position = i;
          break;
        }
      }
      $scope.station_selection2 = $scope.stations[position];
    });




    $scope.save = function(post) {

      $scope.post.dom_bonustrajet = $scope.domaine_selection.iddomaine;
      $scope.post.station_depart = $scope.station_selection1.idstation;
      $scope.post.station_arriver = $scope.station_selection2.idstation;

      dataFactory.editBonustrajet(post).success(function(data) {
        $location.path("/bonustrajets");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);



myApp.controller("OperBonustrajetGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.bonustrajets = [];

    dataFactory.findBonustrajetOper().then(function(data) {
      $scope.bonustrajets = data.data;
    });

    
    $scope.delete = function(id) {
      if (id != undefined) {
        if (confirm("Supprimer?")== true) {
        dataFactory.deleteBonustrajetOper(id).success(function(data) {
          var bonustrajets = $scope.bonustrajets;
            for (var bonustrajetKey in bonustrajets) {
              if (bonustrajets[bonustrajetKey].idbonustrajet == id) {
                $scope.bonustrajets.splice(bonustrajetKey, 1);
                break;
              }
            }
 
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
        }
      }
    }

  }
]);

myApp.controller("OperBonustrajetPostCtrl", ['$scope' , '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.post = {};
    //$scope.stations = {};
    $scope.station_selection1 = {};
    $scope.station_selection2 = {};


    dataFactory.findStationOper().then(function(data) {
      $scope.stations = data.data;
      $scope.station_selection1 = $scope.stations[0];
      $scope.station_selection2 = $scope.stations[0];
    });


    $scope.save = function(post) {
      $scope.post.station_depart = $scope.station_selection1.idstation;
      $scope.post.station_arriver = $scope.station_selection2.idstation;
      dataFactory.createBonustrajetOper(post).success(function(data) {
          $location.path("/oper/bonustrajets");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }

  }
]);

myApp.controller("OperBonustrajetEditCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    //$scope.post = {};
    var id = $routeParams.id;
    var position = 0;
  

    dataFactory.readBonustrajetOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/bonustrajets");
    });


    dataFactory.findStationOper().then(function(doc1) {
      $scope.stations = doc1.data;
      for(var i = 0; i < $scope.stations.length; i++){
        if ($scope.stations[i].idstation ==  $scope.post.station_depart) {
          position = i;
          break;
        }
      }
      $scope.station_selection1 = $scope.stations[position];
      for(var i = 0; i < $scope.stations.length; i++){
        if ($scope.stations[i].idstation ==  $scope.post.station_arriver) {
          position = i;
          break;
        }
      }
      $scope.station_selection2 = $scope.stations[position];
    });




    $scope.save = function(post) {

      $scope.post.station_depart = $scope.station_selection1.idstation;
      $scope.post.station_arriver = $scope.station_selection2.idstation;

      dataFactory.editBonustrajetOper(post).success(function(data) {
        $location.path("/oper/bonustrajets");
      }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }


  }
]);



myApp.controller("LocationfinieGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.locations = [];

    dataFactory.findLocationFinie().then(function(data) {
      $scope.locations = data.data;
    });
 
  }
]);

myApp.controller("LocationencoursGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.locations = [];

    dataFactory.findLocationEncours().then(function(data) {
      $scope.locations = data.data;
    });
 
  }
]);

myApp.controller("LocationfinieDetailCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    var position = 0;
  
    dataFactory.readLocationFinie(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/locationfinies");
    });

  }
]);

myApp.controller("LocationencoursDetailCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    var position = 0;
  
    dataFactory.readLocationEncours(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/locationencours");
    });

  }
]);

myApp.controller("LocationClientCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.locations = [];
    $scope.client = id;

    dataFactory.findLocationClient(id).then(function(data) {
      $scope.locations = data.data;
    });

  }
]);

myApp.controller("LocationVeloCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.locations = [];
    $scope.velo = id;

    dataFactory.findLocationVelo(id).then(function(data) {
      $scope.locations = data.data;
    });

  }
]);




myApp.controller("OperLocationfinieGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.locations = [];

    dataFactory.findLocationFinieOper().then(function(data) {
      $scope.locations = data.data;
    });
 
  }
]);

myApp.controller("OperLocationencoursGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.locations = [];

    dataFactory.findLocationEncoursOper().then(function(data) {
      $scope.locations = data.data;
    });
 
  }
]);

myApp.controller("OperLocationfinieDetailCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    var position = 0;
  
    dataFactory.readLocationFinieOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/locationfinies");
    });

  }
]);

myApp.controller("OperLocationencoursDetailCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    var position = 0;
  
    dataFactory.readLocationEncoursOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/locationencours");
    });

  }
]);

myApp.controller("OperLocationClientCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.locations = [];
    $scope.client = id;

    dataFactory.findLocationClientOper(id).then(function(data) {
      $scope.locations = data.data;
    });

  }
]);

myApp.controller("OperLocationVeloCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.locations = [];
    $scope.velo = id;

    dataFactory.findLocationVeloOper(id).then(function(data) {
      $scope.locations = data.data;
    });

  }
]);




myApp.controller("TransactionClientCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.transactions = [];
    $scope.client = id;

    dataFactory.findTransactionClient(id).then(function(data) {
      $scope.transactions = data.data;
    });

  }
]);

myApp.controller("TransactionGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.transactions = [];

    dataFactory.findTransaction().then(function(data) {
      $scope.transactions = data.data;
    });

  }
]);

myApp.controller("TransactionDetailCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    var position = 0;
  
    dataFactory.readTransaction(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/transactions");
    });

  }
]);

myApp.controller("TransactionPostCtrl", ['$scope', '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.post = {};
    //$scope.stations = {};
    $scope.client_selection = {};

    dataFactory.findDomaine().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];
    });

    dataFactory.findClientActif().then(function(data) {
      $scope.clients = data.data;
      $scope.client_selection = $scope.clients[0];
    });


    $scope.save = function(post) {
      $scope.post.dom_transaction = $scope.domaine_selection.iddomaine;
      $scope.post.client_transaction = $scope.client_selection.idclient;
      dataFactory.createTransaction(post).success(function(data) {
          $location.path("/transactions");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }

  }

]);


myApp.controller("OperTransactionClientCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    $scope.transactions = [];
    $scope.client = id;

    dataFactory.findTransactionClientOper(id).then(function(data) {
      $scope.transactions = data.data;
    });

  }
]);

myApp.controller("OperTransactionGetCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.transactions = [];

    dataFactory.findTransactionOper().then(function(data) {
      $scope.transactions = data.data;
    });

  }
]);

myApp.controller("OperTransactionDetailCtrl", ['$scope', '$routeParams' , '$location', 'dataFactory',
  function($scope, $routeParams, $location, dataFactory) {
    var id = $routeParams.id;
    var position = 0;
  
    dataFactory.readTransactionOper(id).success(function(data) {
      $scope.post = data[0];
    }).error(function(status, data) {
      $location.path("/oper/transactions");
    });

  }
]);

myApp.controller("OperTransactionPostCtrl", ['$scope', '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.post = {};
    //$scope.stations = {};
    $scope.client_selection = {};

    dataFactory.findClientActifOper().then(function(data) {
      $scope.clients = data.data;
      $scope.client_selection = $scope.clients[0];
    });

    $scope.save = function(post) {
      $scope.post.client_transaction = $scope.client_selection.idclient;
      dataFactory.createTransactionOper(post).success(function(data) {
          $location.path("/oper/transactions");
       }).error(function(status, data) {
          alert("Format de données saisies est incorrect");
      });
    }

  }

]);



myApp.controller("RapportCtrl", ['$scope', '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.domaines = [];
    $scope.post = {};
    $scope.rapports = [];
       
    dataFactory.findDomaineActif().then(function(data) {
      $scope.domaines = data.data;
      $scope.domaine_selection = $scope.domaines[0];

    });

    $scope.calculer = function(post) {
      $scope.post.domaine = $scope.domaine_selection.iddomaine;
      dataFactory.Rapport(post).then(function(data) {
          $scope.rapports = data.data; 
      });
    }    

  }
]);

myApp.controller("OperRapportCtrl", ['$scope', '$location', 'dataFactory',
  function($scope, $location, dataFactory) {
    $scope.post = {};
    $scope.rapports = [];

    $scope.calculer = function(post) {
      dataFactory.RapportOper(post).then(function(data) {
          $scope.rapports = data.data; 
      });
    }    

  }
]);