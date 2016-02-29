angular.module('nodeAllAdmin').directive('mainDlg',['$compile', 'communcationService', function($compile, communcationService) {
  return {
    // require: 'ui.ace',
    scope: {},
    // restrict: 'E',
    templateUrl: '/genetheme/directives/html/lib/mainDlg.html',
    link: function (scope, element, attrs) {
         console.log('This is the link+++++++++++++++++++++++++++++++++++++++++++++++++++++');   
         console.dir(element[0].id);
         scope.fromTheParentID = element[0].id;
         // scope.tabIndex = element[0].tabIndex;
    },
    controller: function ($scope) {
        $scope.check = function() {
            console.dir('---------------check---------------');
            console.dir($scope.fromTheParentID);
        }
    }
  }
}]);