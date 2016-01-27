angular.module('nodeAllAdmin').directive("footer",['$compile', function($compile) {
    return {
        templateUrl : '/genetheme/directives/html/content/footer.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            //console.log('I am in the footer');
            $scope.clicker = function() {
              //console.log('I am in the footer clicker');
            }
        }
    };
}]);

