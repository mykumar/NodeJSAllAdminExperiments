angular.module('nodeAllAdmin').directive("topNavigation",['$compile', function($compile) {
    return {
        templateUrl : './directives/html/topNavigation.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the topNavigation');
            $scope.clicker = function() {
              console.log('I am in the topNavigation');
            }
        }
    };
}]);


