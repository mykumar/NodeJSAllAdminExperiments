angular.module('nodeAllAdmin').directive("sidebar",['$compile', function($compile) {
    return {
        templateUrl : './directives/html/sidebar.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the sidebar');
            $scope.clicker = function() {
              console.log('I am in the clicker');
            }
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

