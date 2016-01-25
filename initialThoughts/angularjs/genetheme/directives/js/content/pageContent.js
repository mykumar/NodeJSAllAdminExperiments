angular.module('nodeAllAdmin').directive("pageContent",['$compile', 'communcationService', function($compile, communcationService) {
    return {
        templateUrl : './directives/html/content/pageContent.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the pageContent');
            $scope.clicker = function() {
              console.log('I am in the pageContent clicker');
            }
            $scope.$on('handleBroadcast', function (event, args) {
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@pageContent-------------------pageContent');
                console.dir(args);
                console.dir('-----------------------------------------------');
                console.dir(communcationService.message);
                console.dir('+++++++++++++++++++++++++++++++++++++++++++++++++');
            });
        }
    };
}]);

