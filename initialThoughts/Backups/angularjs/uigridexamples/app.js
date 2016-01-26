var myapp = angular.module('myApp',  ['ngAnimate', 'ui.grid', 'ui.grid.edit']);
myapp.controller('myCtrl', ['$scope', function ($scope) {
    $scope.firstName = "John Smith";  
    $scope.jsonData = [      {
                               "id":12,
                               "first-name": "Cox",
                               "friends": ["friend0"],
                               "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                               "getZip" : function() {return this.address.zip;}
                           },
                           {
                               "id":66664444,
                               "first-name": "John Smith",
                               "friends": ["friend0"],
                               "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                               "getZip" : function() {return this.address.zip;}
                           },
                           {
                               "id":3322222,
                               "first-name": "simon",
                               "friends": ["friend0"],
                               "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                               "getZip" : function() {return this.address.zip;}
                           }
                       ];

    console.dir($scope.jsonData);                    
    $scope.gridOptions = {
            enableSorting: true,
            columnDefs: [
                  { name:'firstName', field: 'first-name' },
                  { name:'1stFriend', field: 'friends[0]' },
                  { name:'city', field: 'address.city'},
                  { name:'getZip', field: 'getZip()', enableCellEdit:false}
            ],
            data : $scope.jsonData
          };
    $scope.gridOptions.onRegisterApi = function(gridApi) {
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
          //Do your REST call here via $http.get or $http.post
          console.log('I am in the afterCellEdit'); 
          console.dir(rowEntity);
          //Alert to show what info about the edit is available
      });
    };


}]);