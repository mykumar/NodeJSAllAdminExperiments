var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {

  $scope.json = {
    "connections": [{
      "name": "connection",
      "databases": [{
        "name": "information_schema",
        "tables": [ {
          "name": "employee",
          "columns": [{
            "name": "idemployee"
          }]
        }]
      }]
    },{
      "name": "connection2222",
      "databases": [{
        "name": "information_schema",
        "tables": [ {
          "name": "employee",
          "columns": [{
            "name": "idemployee"
          }]
        }]
      }]
    }]        
  };

  $scope.isArray = angular.isArray;  
  $scope.isObject =  angular.isObject;

});