angular.module('nodeAllAdmin').directive("pageContent",['$compile', function($compile) {
    return {
        templateUrl : './directives/html/pageContent.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the pageContent');
            $scope.clicker = function() {
              console.log('I am in the pageContent clicker');
            }
        }
    };
}]);

