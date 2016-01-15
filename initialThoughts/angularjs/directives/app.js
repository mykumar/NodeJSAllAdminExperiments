var myapp = angular.module('myapp', []);
angular.module('myapp').directive('helloWorld', function() {
  return {
    restrict: 'AE',
    template: 'First name: <input type="text" name="fname" onChange="myinput()"><br> Last name: <input type="text" name="lname"><br> {{directiveVar}}',
    controller: function ($scope) {
        $scope.color = '#0080ff';
        $scope.directiveVar = "I am directive varible";
        $scope.myinput = function() {
            console.log('This is the myinput');
        }
    }
  };
});

angular.module('myapp').controller('myCtrl', function($scope) {
    $scope.color = '#ffb399';
    $scope.controllerVar = "I am controller varible";
});    