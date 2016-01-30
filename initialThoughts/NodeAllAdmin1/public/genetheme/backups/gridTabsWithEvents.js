angular.module('nodeAllAdmin').directive("nodeAllAdminGridTabs",['$compile', function($compile) {
    return {
        templateUrl : '/genetheme/directives/html/lib/nodeAllAdminGridTabs.html',
         scope: {
            },
        controller: function ($scope) {
            console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG-      nodeAllAdminGridTabs        -GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
            $scope.$on('handleBroadcast', function (event, args) {
              console.log('--------I am in the GRID  TABSSSSSSSSSSSSSS---controller-----------');
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
                console.dir($scope.tabs[index].number);
                $scope.selectedTabIndex =  index;
                console.dir('----------------------------selectedTabClick-------------------');
            };  
            $scope.tabs = [
               { number: 2, title:'Dynamic Title 3', type: 1, dynamicContent: '<div id="gridNumber1" ui-grid="gridOptions" ui-grid-edit class="grid"></div>'},
            ];
            $scope.firstName = "John Smith";  
            $scope.jsonData = [   
                                  {
                                       "id":12,
                                       "first-name": "Cox"
                                  },
                                  {
                                       "id":66664444,
                                       "first-name": "John Smith"
                                  },
                                  {
                                       "id":3322222,
                                       "first-name": "simon"
                                  }
                               ];

            $scope.gridOptions =[{
                  data : {
                              enableSorting: true,
                              columnDefs: [
                                    { name:'firstName', field: 'first-name' },
                                    
                              ],
                              data : $scope.jsonData,
                              onRegisterApi : function(gridApi) {
                                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                                    console.log('I am in the afterCellEdit'); 
                                    console.dir(rowEntity);
                                });
                              }
                          }
            }];        
            console.log('####################################3nodeAllAdminGrid#########################################################');
            console.dir('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');                       
            console.dir($scope.gridOptions[0].data);                       
            console.dir('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');                       
            var compileTabs = function(tabIndex) {
              console.log('I am in the compileTabs');
              if(tabIndex) {
                    console.log('I am in the tab index and index is ' + tabIndex);
                    console.dir($scope.tabs[tabIndex]);
                    var ele = $compile($scope.tabs[tabIndex].dynamicContent)($scope);
                    console.log(ele);
                    console.log('#grid' + $scope.tabs[tabIndex].number);
                    console.log('---------------------GRID+++++++++-------------------------');
                    console.dir(document.querySelector('#grid' + $scope.tabs[tabIndex].number));
                    console.log('------------------------GRID+++++++++----------------------');
                    angular.element(document.querySelector('#grid' + $scope.tabs[tabIndex].number)).append(ele);
              } else {
                  for (i = 0; i < $scope.tabs.length; i++) {
                    if($scope.tabs[i].type) {
                      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^GRID+++++++++TAB TYPE^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                      var ele = $compile($scope.tabs[i].dynamicContent)($scope);
                      console.log(ele);
                      angular.element(document.querySelector('#grid' + $scope.tabs[i].number)).append(ele);
                      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^GRID Important^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                      console.dir(document.querySelector('#grid' + $scope.tabs[i].number));
                    }      
                  }
                }      
            };
            var compileTabsAsync = function(tabIndex) {
                $scope.$evalAsync(function() {
                  angular.element(document).ready(function() {
                    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^GRID+++++++++evalAsync^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                    compileTabs(tabIndex); 
                  });  
                }); 
            };    
            compileTabsAsync();
            $scope.firstCtrl = function() 
            {
              console.log('I am in the firstCtrl');
              var objName = $scope.gridOptions[0].data;
              var tabData = '<div id="gridNumber1" ui-grid="' + objName  + '"' + ' ui-grid-edit class="grid"></div>';
              console.dir('$$$$$$$$$$$$$$$$$$$$$$$$$$COMPILE TABS$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
              
              var obj = { number: 34, title:'Dynamic Title 555', type: 1, dynamicContent: tabData};
              $currentTabIndex = $scope.tabs.push(obj);

              // var obj = { number: 34, title:'Dynamic Title 555', type: 1, dynamicContent: '<div id="gridNumber1" ui-grid="gridOptions.first" ui-grid-edit class="grid"></div>'};
              // $currentTabIndex = $scope.tabs.push(obj);
              console.dir($scope.tabs);
              compileTabsAsync($currentTabIndex - 1);
            }
            
            // $scope.gridOptions.onRegisterApi = function(gridApi) {
            //   //set gridApi on scope
            //   // $scope.gridApi = gridApi;
            //   gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            //       //Do your REST call here via $http.get or $http.post
            //       console.log('I am in the afterCellEdit'); 
            //       console.dir(rowEntity);
            //       //Alert to show what info about the edit is available
            //   });
            // };
        }
    }
}]);