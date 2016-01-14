var myapp = angular.module('myapp', ['ngAnimate', 'ui.bootstrap']);
angular.module('myapp').directive("firstDirective",['$compile', function($compile) {
    return {
        templateUrl : './directives/firstdirective.html',
         scope: {
            },
        controller: function ($scope) {
            $scope.tabs = [
                { number: 0, title:'Dynamic Title 1', content: 'Dynamic Title 1', type: 0},
                { number: 1, title:'Dynamic Title 2', content: 'Dynamic Title 2', type: 0},
                { number: 2, title:'Dynamic Title 3', type: 1, dynamicContent: '<second-directive></second-directive>'},
            ];
            var compileTabs = function() {
              console.log('I am in the compileTabs');
              for (i = 0; i < $scope.tabs.length; i++) {
                if($scope.tabs[i].type) {
                    var ele = $compile($scope.tabs[i].dynamicContent)($scope);
                    console.log(ele);
                    angular.element(document.querySelector('#content' + i)).append(ele);
                }      
              }
            };
            $scope.$evalAsync(function() {
              angular.element(document).ready(function() {
                    compileTabs(); 
              });  
            }); 
            $scope.firstCtrl = function() 
            {
              console.log('I am in the firstCtrl');
            }
        }
    }
}]);
   

angular.module('myapp').directive("secondDirective",['$compile', function($compile) {
    return {
        templateUrl : './directives/seconddirective.html',
         scope: {
            },
        controller: function ($scope) {   
            console.log('Hey i am the controloller of the seconddirective');
         } 
    }
}]);  

