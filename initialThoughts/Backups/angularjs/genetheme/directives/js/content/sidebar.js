angular.module('nodeAllAdmin').directive("sidebar",['$compile', 'communcationService', function($compile, communcationService) {
    return {
        templateUrl : './directives/html/content/sidebar.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the sidebar');
            console.dir('->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->');
            communcationService.prepForBroadcast('This is the sidebar from the communcation service');
            console.dir('->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->');
            $scope.clicker = function() {
              console.log('I am in the clicker');
            }
            $scope.$on('handleBroadcast', function (event, args) {
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@sidebar-------------------sidebar');
                console.dir(args);
                console.dir('-----------------------------------------------');
                console.dir(communcationService.message);
                console.dir('+++++++++++++++++++++++++++++++++++++++++++++++++');
            });
        }
    };
}]);

angular.module('nodeAllAdmin').animation('.slide', function() {
  var NG_HIDE_CLASS = 'ng-hide';
  return {
    beforeAddClass: function(element, className, done) {
      if(className === NG_HIDE_CLASS) {
        element.slideUp(done);
      }
    },
    removeClass: function(element, className, done) {
      if(className === NG_HIDE_CLASS) {
        element.hide().slideDown(done);
      }
    }
  }
});

