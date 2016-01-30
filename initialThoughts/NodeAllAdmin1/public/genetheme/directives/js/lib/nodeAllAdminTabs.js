angular.module('nodeAllAdmin').directive("nodeAllAdminTabs",['$compile', 'communcationService', function($compile, communcationService) {
    return {
        templateUrl : '/genetheme/directives/html/lib/nodeAllAdminTabs.html',
         scope: {
            },
        controller: function ($scope) {
            $scope.$on('handleBroadcast', function (event, args) {
                console.log('--------I am in the TABSSSSSSSSSSSSSS---controller-----------');
                if(angular.isObject(args)) { 
                  if(args.to === "Tabs") {
                    console.dir('-------------------YES IT IS FOR TABS----------------------------');    
                    console.dir(args);
                  }
                }   
                console.dir('-----------------------------------------------');
            }); 
            $scope.selectedTabIndex = 0;
            $scope.selectedTabClick = function(index) {
                console.dir('------------selectedTabClick-----------------------------------');
                console.dir(index);
                $scope.selectedTabIndex =  index;
                console.dir('----------------------------selectedTabClick-------------------');
            };  
            $scope.tabs = [
                { number: 0, title:'Dynamic Title 1', content: 'Dynamic Title 1', type: 0},
                { number: 1, title:'Dynamic Title 2', content: 'Dynamic Title 2', type: 0},
                { number: 2, title:'Dynamic Title 3', type: 1, dynamicContent: '<ace-editor id="tab_44_546666"></ace-editor>'},
            ];
            var compileTabs = function(tabIndex) {
              console.log('I am in the compileTabs');
              if(tabIndex) {
                    console.log('I am in the tab index and index is ' + tabIndex);
                    console.dir($scope.tabs[tabIndex]);
                    var ele = $compile($scope.tabs[tabIndex].dynamicContent)($scope);
                    console.log(ele);
                    console.log('#content' + $scope.tabs[tabIndex].number);
                    console.log('----------------------------------------------');
                    console.dir(document.querySelector('#content' + $scope.tabs[tabIndex].number));
                    console.log('----------------------------------------------');
                    angular.element(document.querySelector('#content' + $scope.tabs[tabIndex].number)).append(ele);
              } else {
                  for (i = 0; i < $scope.tabs.length; i++) {
                    if($scope.tabs[i].type) {
                      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^TAB TYPE^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                      var ele = $compile($scope.tabs[i].dynamicContent)($scope);
                      console.log(ele);
                      angular.element(document.querySelector('#content' + i)).append(ele);
                      console.dir(document.querySelector('#content' + i));
                    }      
                  }
                }      
            };
            var compileTabsAsync = function(tabIndex) {
                $scope.$evalAsync(function() {
                  angular.element(document).ready(function() {
                    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^evalAsync^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                    compileTabs(tabIndex); 
                  });  
                }); 
            }; 
            compileTabsAsync();
            $scope.firstCtrl = function() 
            {
              console.log('I am in the firstCtrl');
              var obj = { number: 34, title:'Dynamic Title 555', type: 1, dynamicContent: '<ace-editor id="tab_3_88888"></ace-editor>'};
              $currentTabIndex = $scope.tabs.push(obj);
              console.dir($scope.tabs);
              compileTabsAsync($currentTabIndex - 1);
            }
        }
    }
}]);