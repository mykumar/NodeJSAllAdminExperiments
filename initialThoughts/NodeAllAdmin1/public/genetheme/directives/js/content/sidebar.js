angular.module('nodeAllAdmin').directive("sidebar",['$compile', 'communcationService', function($compile, communcationService) {
    return {
        templateUrl : '/genetheme/directives/html/content/sidebar.html',
        scope: {},
        restrict: 'E',
        controller: function ($scope) {
            console.log('I am in the sidebar');
            console.dir('->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->');
            communcationService.prepForBroadcast('This is the sidebar from the communcation service');
            console.dir('->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->->');
            $scope.clicker = function() {
              console.log('I am in the clicker');
            };
            var level1Expand = true;
            var level2Expand = true;
            $scope.endClick = function() {
              console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzI am in the clicker');
            };  
            $scope.Level1Click = function() {
              console.log('222222222222222222222222I am in the clicker');
              level1Expand = !level1Expand;
            };
            $scope.$on('handleBroadcast', function (event, args) {
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@sidebar-------------------sidebar');
                console.dir(args);
                console.dir('-----------------------------------------------');
                console.dir(communcationService.message);
                console.dir('+++++++++++++++++++++++++++++++++++++++++++++++++');
            });



            var schemaJsonData = [{
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

            $scope.schemaData = schemaJsonData;
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

