angular.module('nodeAllAdmin').directive("topNavigation",['$compile', function($compile) {
    return {
        templateUrl : '/genetheme/directives/html/content/topNavigation.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the topNavigation');
            var body = angular.element(document).find('body');
            
            console.log(body[0].getElementsByClassName('nav-md'));
            console.log(body);

            $scope.clicker = function() {
              console.log('I am in the topNavigation');
            }
        }
    };
}]);


