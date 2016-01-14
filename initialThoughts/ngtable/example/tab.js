var app = angular.module('myApp', ["ngTable"]);
app.controller('myCtrl', function($scope, NgTableParams) {
    var data = [{name: "Moroni", age: 50} /*,*/];
    $scope.tableParams = new NgTableParams({}, { dataset: data});
});
  
  