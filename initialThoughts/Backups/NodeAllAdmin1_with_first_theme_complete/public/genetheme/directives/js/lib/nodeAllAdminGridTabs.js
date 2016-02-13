angular.module('nodeAllAdmin').directive("nodeAllAdminGridTabs",['$compile', 'communcationService', function($compile, communcationService) {
    return {
        templateUrl : '/genetheme/directives/html/lib/nodeAllAdminGridTabs.html',
         scope: {
            },
        controller: function ($scope) {
            console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG-nodeAllAdminGridTabs-GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
            $scope.jsonData = [];
            $scope.modifiedJsonData = [];
            $scope.$on('handleBroadcast', function (event, args) {
                console.log('--------I am in the GRIDDDDDDDDDDDD---controller-----------');
                if(angular.isObject(args)) { 
                  if(args.to === "Grid") {
                    console.dir('-------------------YES IT IS FOR Grid----------------------------');    
                    console.dir(args);
                    $scope.jsonData = args.data;
                  }
                }   
                console.dir('-----------------------------------------------');
            }); 
            $scope.tabs = [
               { number: 2, title:'Dynamic Title 3', type: 1, dynamicContent: '<div id="gridNumber1" ui-grid="gridOptions" ui-grid-edit class="grid"></div>'},
            ];
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
              var obj = { number: 34, title:'Dynamic Title 555', type: 1, dynamicContent: '<div id="gridNumber1" ui-grid="gridOptions" ui-grid-edit class="grid"></div>'};
              $currentTabIndex = $scope.tabs.push(obj);
              console.dir($scope.tabs);
              compileTabsAsync($currentTabIndex - 1);
            };
            $scope.apply = function() {
                console.dir('+++++++++++++++++++++++++++++APPLY+++++++++++++++++++++++++++++++++++++++++++++++++++++');           
                console.dir($scope.modifiedJsonData);   
                if($scope.modifiedJsonData.length > 0) {
                  var obj = {"from": "sidebar", "data": $scope.modifiedJsonData, "to": "server", "action": "updateTable"};
                  communcationService.prepForBroadcast(obj);
                }    
            };  
            $scope.getRecordFromActualData = function(id) {
                for (var i=0; i < $scope.jsonData.length; i++){
                    if($scope.jsonData[i].id == id) {
                       return $scope.jsonData[i];
                    }
                }
            };
            $scope.getRecordFromModifiedData = function(id) {
                for (var i=0; i < $scope.modifiedJsonData.length; i++){
                    if($scope.modifiedJsonData[i].id == id) {
                      return $scope.modifiedJsonData[i];
                    }
                }
                return null;
            };  
            $scope.updateModifiedData = function(rowEntity, colDef, newValue, oldValue) {
                // $scope.modifiedJsonData
                actualData = $scope.getRecordFromActualData(rowEntity.id);
                modifiedData = $scope.getRecordFromModifiedData(rowEntity.id);

                console.dir('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.dir(actualData);
                console.dir(modifiedData);
                console.dir('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                
                if(!modifiedData) {
                    // if modifiedData is null 
                    console.dir('**********************************IF*******************************************************');  
                    // actualData[colDef.name] = newValue;
                    delete actualData["$$hashKey"]; 
                    $scope.modifiedJsonData.push(actualData);
                    console.dir(actualData);
                    console.dir($scope.modifiedJsonData);
                    console.dir('**********************************IF*******************************************************');  
                } 
                
                console.dir('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.dir(actualData);
                console.dir('Modified Data');
                console.dir($scope.modifiedJsonData);
                console.dir('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

            };
            console.log('####################################3nodeAllAdminGrid#########################################################');

            $scope.firstName = "John Smith";  
            
            console.dir($scope.jsonData);                    
            $scope.gridOptions = {};
            $scope.gridOptions.enableSorting= true;
            $scope.gridOptions.columnDefs= [
                  // { name:'firstName', field: 'first-name' },
                  // { name:'1stFriend', field: 'friends[0]' },
                  // { name:'city', field: 'address.city'},
                  // { name:'getZip', field: 'getZip()', enableCellEdit:false}
            ];
            $scope.gridOptions.data = 'jsonData';
            $scope.gridOptions.onRegisterApi = function(gridApi) {
              //set gridApi on scope
              // $scope.gridApi = gridApi;
              gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                  console.log('I am in the afterCellEdit'); 
                  if(!(newValue.toUpperCase() === oldValue.toUpperCase())) {
                      console.dir('---------------------------------------------------');
                      $scope.updateModifiedData(rowEntity, colDef, newValue, oldValue);
                      console.dir('---------------------------------------------------');
                  }  
              });
            };
        }
    }
}]);