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
            $scope.getActiveTab = function() 
            {
                
            }
            $scope.getTabUniqueNumber = function() {
                console.dir('-----------getTabUniqueNumber-----------------------------');
                while(true) {
                    var d = new Date();

                    var number = d.getTime();
                    console.dir(number);
                    if(!$scope.checkTabNumberExists(number)) {
                        return number;
                    }
                }          
            }; 
            $scope.checkTabNumberExists = function(tabNumber) {
                console.dir('-----------checkTabNumberExists-----------------------------');
                for ( tabIndex =0;tabIndex<$scope.tabs.length;tabIndex++){
                  console.dir(tabIndex);
                  console.dir($scope.tabs[tabIndex]);
                  if($scope.tabs[tabIndex].number == tabNumber) {
                      return true;                  
                  }
                }
                return false;  
            }; 
            $scope.selectedTabIndex = 0;
            $scope.tabs = [];
            $scope.checkTabActive = function(index) {

                console.dir('------------checkTabActive-----------------------------------');
                return $scope.selectedTabIndex == index;
            };
            $scope.setTabActive = function(index) {              
                $scope.selectedTabIndex =  index;  
            };  
            $scope.selectedTabClick = function(index,tabNumber) {
                console.dir('------------selectedTabClick-----------------------------------');
                console.dir(index);
                console.dir(tabNumber);
                communcationService.selectedTabId = tabNumber;
                $scope.selectedTabIndex =  index;

                console.dir('----------------------------selectedTabClick-------------------');
            };
            $scope.isTabsEmpty = function() {
                if($scope.tabs.length > 0){   
                    //this array is not empty 
                    return false;
                }else{
                   //this array is empty
                   return true;
                }
            };
            $scope.getTabContent = function() {
                var tabcontent = { };
                tabcontent.number = $scope.getTabUniqueNumber();
                tabcontent.title = 'Dynamic Title ' + tabcontent.number;
                tabcontent.dynamicContent = '<ace-editor id="' + tabcontent.number + '"></ace-editor>';
                tabcontent.active = true;
                
                return tabcontent;
            };
            $scope.getTabNumber = function(index) {  
                return $scope.tabs[index].number;
            }; 
            $scope.pushNewTab = function() {  
                var obj = $scope.getTabContent();
                var newTabIndex = $scope.tabs.push(obj);
                $scope.selectedTabIndex = $scope.getTabNumber(newTabIndex-1);
                communcationService.selectedTabId = $scope.getTabNumber(newTabIndex-1);
                console.dir('----------------pushNewTab--------------------------------------');
                console.dir($scope.tabs);
                return newTabIndex-1;  
            };
            $scope.compileNewTab = function(tabIndex) {
                var ele = $compile($scope.tabs[tabIndex].dynamicContent)($scope);
                angular.element(document.querySelector('#content' + $scope.tabs[tabIndex].number)).append(ele);
                // console.log('I am in the tab index and index is ' + tabIndex);
                // console.dir($scope.tabs[tabIndex]);
                // var ele = $compile($scope.tabs[tabIndex].dynamicContent)($scope);
                // console.log(ele);
                // console.log('#content' + $scope.tabs[tabIndex].number);
                // console.log('----------------------------------------------');
                // console.dir(document.querySelector('#content' + $scope.tabs[tabIndex].number));
                // console.log('----------------------------------------------');
                // angular.element(document.querySelector('#content' + $scope.tabs[tabIndex].number)).append(ele);
                // console.log('----------------------------------------------');
                // console.dir(document.querySelector('#content' + $scope.tabs[tabIndex].number));
                // console.log('----------------------------------------------');
            };    

            var compileTabs = function(tabIndex) {
              console.log('I am in the compileTabs      ' + tabIndex);
              $scope.compileNewTab(tabIndex);    
            };
            var compileTabsAsync = function(index) {
                if($scope.isTabsEmpty()) {
                    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^EMPTY TABS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                    index = $scope.pushNewTab();
                    
                }
                $scope.$evalAsync(function() {
                  angular.element(document).ready(function() {
                      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^evalAsync^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                      compileTabs(index); 
                  });  
                }); 
            }; 
            compileTabsAsync();
            $scope.firstCtrl = function() 
            {
              console.log('I am in the firstCtrl');
              var newTabIndex = $scope.pushNewTab();
              compileTabsAsync(newTabIndex);
            }
        }
    }
}]);