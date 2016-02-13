angular.module('nodeAllAdmin').directive("pageContent",['$compile', 'communcationService', function($compile, communcationService) {
    return {
        templateUrl : '/genetheme/directives/html/content/pageContent.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the pageContent');
            $scope.clicker = function() {
              console.log('I am in the pageContent clicker');
            }
            $scope.$on('handleBroadcast', function (event, args) {
                // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@sidebar-------------------sidebar');
            });
        }
    };
}]);

