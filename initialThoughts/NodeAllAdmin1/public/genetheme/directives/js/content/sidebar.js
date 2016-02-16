angular.module('nodeAllAdmin').directive("sidebar",['$compile', 'communcationService', '$uibModal','hotkeys', function($compile, communcationService,$uibModal, hotkeys) {
    return {
        templateUrl : '/genetheme/directives/html/content/sidebar.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the sidebar');

            $scope.clicker = function() {
                console.log('I am in the clicker');
            };

            var level1Expand = true;
            var level2Expand = true;
            $scope.separator = "$%$$^";

            $scope.animationsEnabled = true;
            
            $scope.addMainTab = function() {
                console.dir('-----------------addMainTab-------------------------');                
                $scope.sendRequest("Tabs", "addMainTab");
            };  
            $scope.connectionRefreshClick = function(connectionId) {
                console.dir('------connectionRefreshClick----------------------------');
                console.dir(connectionId);
                var connName = $scope.getSchemaParameter(connectionId, "connection");
                console.dir(connName);
                $scope.sendRequest("sidebar","loadConnectionsChildren", connName);
            };
            $scope.getSchemaParameter = function(parameter, schemaType) {
                console.dir('-----------------------------getSchemaParameter-----------------------------------------------------------------------------');

                var paramArr = parameter.split($scope.separator);
                if(schemaType === 'connection') {
                    for (var i=0; i<paramArr.length;i++){
                        console.dir(paramArr[i]);
                        if(paramArr[i] === 'C') {
                            i++;
                            console.dir('--------------------------------------------It matched C-------------------------------------------------------------------------');
                            console.dir(paramArr[i]);
                            return paramArr[i];
                        }
                    }
                }
                if(schemaType === 'table') {
                    for (var i=0; i<paramArr.length;i++){
                        if(paramArr[i] === 'T') {
                            console.dir('--------------------------------------------It matched T-------------------------------------------------------------------------');
                            i++;
                            console.dir(paramArr[i]);
                            return paramArr[i];
                        }
                    }
                }
                if(schemaType === 'db') {
                    for (var i=0; i<paramArr.length;i++){
                        if(paramArr[i] === 'DB') {
                            console.dir('--------------------------------------------It matched T-------------------------------------------------------------------------');
                            i++;
                            console.dir(paramArr[i]);
                            return paramArr[i];
                        }
                    }
                }
            };  
            $scope.addConfigTab = function() {
                console.dir('-----------------addConfigTab-------------------------');                
                $scope.sendRequest("Tabs", "addConfigTab");
            };  
            $scope.endClick = function(id) {
                console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzI am in the clicker');
                // console.log(id);
                // console.dir(id.split($scope.separator));
                // var obj = {"from": "sidebar", "data": id, "to": "Grid", "action": "select"};
                var connName = $scope.getSchemaParameter(id, "connection");
                var tableName = $scope.getSchemaParameter(id, "table");
                var dbName = $scope.getSchemaParameter(id, "db");

                $scope.sendRequest("Grid", "select", connName, dbName, tableName);
                // var obj = {"from": "sidebar", "data": id, "to": "Grid", "action": "select", "TabId": communcationService.selectedTabId};
                // communcationService.prepForBroadcast(obj);

                // var modalInstance = $uibModal.open({
                //   templateUrl: './genetheme/directives/html/content/modalContent.html',
                //   controller: 'modalContentCtrl',
                // });  
                // modalInstance.result.then(function (selectedItem) {
                //   $scope.selected = selectedItem;
                //   console.dir('--------------------------------THIS IS THE MODAL------------------------------------------------------');
                //   console.dir(selectedItem);
                //   console.dir('--------------------------------THIS IS THE MODAL------------------------------------------------------');
                // }, function () {
                  
                // });
                // $dialog.dialog({}).open('/genetheme/directives/html/content/modalContent.html');  

            };  

            $scope.Level1Click = function() {
              console.log('222222222222222222222222I am in the clicker');
              level1Expand = !level1Expand;
            };
            $scope.currentTpl = '/realtionalTpl.html';
            // $scope.currentTpl ='/main.html';
            $scope.schemaSearch = "";
            

            // var schemaJsonData = [{"name":"Connection","id":"SCH_C_myConnection","ip":"127.0.0.1","children":[{"name":"informationDB","id":"SCH_C_myConnection_DB_informationDB","children":[{"name":"Tables","id":"SCH_C_myConnection_DB_informationDB_TH","children":[{"name":"table1","id":"SCH_C_myConnection_DB_informationDB_T_tabe1"},{"name":"table2","id":"SCH_C_myConnection_DB_informationDB_T_tabe2"}]}]},{"name":"exampleDB","id":"SCH_C_myConnection_DB_exampleDB","children":[{"name":"Tables","id":"SCH_C_myConnection_DB_informationDB_TH","children":[]}]}]},{"name":"Connection2222","id":"SCH_C_myConnection222","ip":"127.0.0.12222","children":[{"name":"informationDB","id":"SCH_C_myConnection_DB_informationDB","children":[{"name":"Tables","id":"SCH_C_myConnection_DB_informationDB_TH","children":[{"name":"exampleTable1","id":"SCH_C_myConnection_DB_informationDB_T_exampleTable1"}]}]}]}];
            var schemaJsonData = [{"name":"connection","host":"localhost","id":"SCH_C_connection","user":"root","password":"newpwd","children":[{"name":"information_schema","id":"SCH_C_connection_DB_information_schema","children":[{"name":"Tables","id":"SCH_C_myConnection_DB_informationDB_TH","children":[]}]},{"name":"mysql","id":"SCH_C_connection_DB_mysql","children":[{"name":"Tables","id":"SCH_C_myConnection_DB_informationDB_TH","children":[]}]},{"name":"performance_schema","id":"SCH_C_connection_DB_performance_schema","children":[{"name":"Tables","id":"SCH_C_myConnection_DB_informationDB_TH","children":[]}]},{"name":"timetrack","id":"SCH_C_connection_DB_timetrack","children":[{"name":"Tables","id":"SCH_C_myConnection_DB_informationDB_TH","children":[{"name":"employee","id":"SCH_C_connection_DB_timetrack_T_employee"},{"name":"work","id":"SCH_C_connection_DB_timetrack_T_work"}]}]}]}];
            var managementSchemaJsonData = [{
              "name": "myConnection",
              "id": "SCH_C_myConnection",
              "children": [{
                "name": "informationDB",
                "id": "SCH_C_myConnection_DB_informationDB",
                "children": [{
                    "name": "Tables",
                    "id": "SCH_C_myConnection_DB_informationDB_TH",
                    "children": [{
                        "name": "table1",
                        "id": "SCH_C_myConnection_DB_informationDB_T_tabe1",
                      }, {
                        "name": "table2",
                        "id": "SCH_C_myConnection_DB_informationDB_T_tabe2",
                    }]
                },
                {
                    "name": "view",
                    "id": "SCH_C_myConnection_DB_informationDB_TH",
                    "children": [{
                        "name": "view1",
                        "id": "SCH_C_myConnection_DB_informationDB_T_tabe1",
                      }, {
                        "name": "view2",
                        "id": "SCH_C_myConnection_DB_informationDB_T_tabe2",
                }],
              }]
            }]
            }];
            $scope.sendRequest = function(to,type, connectionName, dbName, tableName) {
                var obj = {"from": "sidebar", "to": to, "action": type, "connectionName" : connectionName, "dbName" : dbName, "tableName" : tableName};
                communcationService.prepForBroadcast(obj);
            };
            $scope.getSchemeData = function(to,type) {

            };  
            $scope.updateConnectionChildren = function(args) {
                console.dir('------------------------updateConnectionChildren---------------------------------------------------------------');
                if($scope.schemaData.length > 0) {
                  for (var connectionIndex in $scope.schemaData) {
                    if($scope.schemaData[connectionIndex].name === args.connectionName) {
                        console.dir('------------------------updateConnectionChildren if loop---------------------------------------------------------------');
                        $scope.schemaData[connectionIndex].children = args.data;
                        console.dir($scope.schemaData);
                        console.dir($scope.schemaData[connectionIndex]);
                    }
                  }
                }  
            };  
            $scope.$on('handleBroadcast', function (event, args) {
                  console.log('--------I am in the GRIDDDDDDDDDDDD---controller-----------');
                  if(angular.isObject(args)) { 
                    if(args.to === "sidebar" && args.action === "loadConnections") {
                          console.dir('-------------------YES IT IS FOR loadConnections----------------------------');    
                          console.dir(args);
                          $scope.schemaData = args.data;
                    } else if(args.to === "sidebar" && args.action === "loadConnectionsChildren") {
                          console.dir('-------------------YES IT IS FOR loadConnectionsChildren----------------------------');    
                          console.dir(args);
                          $scope.updateConnectionChildren(args);
                          // $scope.schemaData = args.data;

                    }
                  }   
                  console.dir('-----------------------------------------------');
            }); 
            hotkeys.add({
                  combo: 'ctrl+g',
                  description: 'This one goes to 11',
                  callback: function() {
                        console.dir('----------------------sidebar directive ctrl+ggggggggggggggggg----------------------------');
                  }
            });
            var onDocumentReady = function(index) {
                $scope.$evalAsync(function() {
                  angular.element(document).ready(function() {
                      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^evalAsync^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                      // $scope.schemaData = $scope.getSchemeData();
                      $scope.sendRequest("sidebar","loadConnections");
                  });  
                }); 
            }; 
            onDocumentReady();

            $scope.schemaData = [];
            $scope.managementData = managementSchemaJsonData;
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

