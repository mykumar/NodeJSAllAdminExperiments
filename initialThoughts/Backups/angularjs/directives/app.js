var myapp = angular.module('myapp', []);
angular.module('myapp').controller('myCtrl', function($scope) {
    $scope.controllerVar = "I am controller varible";
});    

angular.module('myapp').directive('directiveEvents', function() {
  return {
    scope: {},
    restrict: 'E',
    template:
      'First name: <input type="text" ng-model="fname"><br>' +
      'Last name: <input type="text" ng-model="lname" ng-change="onChange()"><br>' +
      ' {{$parent.scopeIsoDirectiveVar}}' +
      '{{fname + " " + lname}}', 
    controller: function ($scope) {
        $scope.fname = 'fname';
        $scope.lname = 'lname';

        $scope.onChange = function() {
           //alert('change');
           console.log('I am the onChange');
        };
    }
  };
});

angular.module('myapp').directive('scopeFalse', function() {
  return {
    scope: false,
    template: 'SCOPE FLASE DIRECTIVE TEMPLATE OUPUT:: {{scopeFalseDirectiveVar}} <br /> PARENT CONTROLLER VARIABLE IN SCOPE FALSE : {{controllerVar}} ',
    controller: function ($scope) {
        $scope.scopeFalseDirectiveVar = "I am Scope False directive varible";
        $scope.controllerVar = "I am controller varible BUT SETTED IN THE SCOPE FALSE DIRECTIVE";
    }
  };
});
angular.module('myapp').directive('scopeTrue', function() {
  return {
    scope: true,
    template: 'SCOPE TRUE DIRECTIVE TEMPLATE OUPUT:: {{scopeTrueDirectiveVar}} <br /> PARENT CONTROLLER VARIABLE IN SCOPE TRUE : {{controllerVar}} ',
    controller: function ($scope) {
        $scope.scopeTrueDirectiveVar = "I am Scope TRUE directive varible";
        // $scope.controllerVar = "I am controller varible BUT SETTED IN THE SCOPE TRUE DIRECTIVE";
    }
  };
});
angular.module('myapp').directive('scopeIso', function() {
  return {
    scope: {},
    template: 'SCOPE ISO DIRECTIVE TEMPLATE OUPUT:: {{scopeIsoDirectiveVar}} <br /> PARENT CONTROLLER VARIABLE IN SCOPE TRUE : {{controllerVar}} ' +
    '<br /> <br /> <directive-events></directive-events>',
    controller: function ($scope) {
        $scope.scopeIsoDirectiveVar = "I am Scope ISO directive varible";
        // $scope.controllerVar = "I am controller varible BUT SETTED IN THE SCOPE ISOOOOOO DIRECTIVE";
    }
  };
});


