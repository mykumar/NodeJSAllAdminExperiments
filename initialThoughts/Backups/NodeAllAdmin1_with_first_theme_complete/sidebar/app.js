var myapp = angular.module('myapp', ['ngAnimate', 'ui.bootstrap']);
angular.module('myapp').directive("sidebar",['$compile', function($compile) {
    return {
        templateUrl : './directives/simplified_sidebar.html',
        scope: {
            },
        controller: function ($scope) {
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
            $scope.isString = angular.isString;
            $scope.isNumber = angular.isNumber;
            $scope.isArray = angular.isArray;  
            $scope.isObject =  angular.isObject;

            $scope.keypress = function($event) {
                $scope.lastKey = $event.keyCode
                console.log('I am on the key press');

          };

            // new simplied Menu 
            $scope.showChilds = function(item, item2){
                console.log("THis is the showChilds");
                item.active = !item.active;
                console.log(item);
            };

            $scope.$on('keydown', function( msg, obj ) {
                  console.log('This is the keydown');
            }); 
            $scope.firstCtrl = function() 
            {
              console.log('I am in the firstCtrl');
            }
            $scope.selected = 'None';
            $scope.menuOptions = [
                ['Select', function ($itemScope) {
                    $scope.selected = $itemScope.item.name;
                }],
                null, // Dividier
                ['Remove', function ($itemScope) {
                    $scope.items.splice($itemScope.$index, 1);
                }]
            ];
        }
    }
}]);
angular.module('myapp').directive('focusable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.attr('tabindex', '-1'); // make it focusable
            // console.log('I am at the bengijnng');
            this.findNextHighLight = function(){
              // The code should be like this //////////////////////
              // get key (element.attr('key')) for example: ID-1 
              // remove the ID and spilt on the "-"
              //  check is thier any child, i mean ID-1-1
              // if so, go thier
              // Else check ID-2, if thier go thier
              // Else stay thier  
              // console.log('This is the x function');
              // var elePrefix = document.querySelector('#f-1-1');
              // var anotherElement = angular.element(elePrefix);
              //     console.log(anotherElement);
            }
            element.bind('mousedown', function (event) {
                console.log('This is Mousedown');
                switch (event.which) {
                    case 1:
                        console.log('Left Mouse button pressed.');
                        break;
                    case 2:
                        console.log('Middle Mouse button pressed.');
                        break;
                    case 3:
                        event.preventDefault();
                        console.log('Right Mouse button pressed.');
                        break;
                    default:
                        console.log('You have a strange Mouse!');
                }
            });  
            element.bind('keydown', function (event) {
                var target = event.target;
                var key = event.which;
                console.log('I man on the keydown');
                console.log(element.attr('id'));
                // element.removeAttr( "class" );
                // The code should be like this //////////////////////
                // findNextHighLight()
                //  The code should be like this //////////////////////
                // var elePrefix = document.querySelector('#f-1-188');
                // if(elePrefix){
                //   console.log('we got the another element');
                //   var anotherElement = angular.element(elePrefix);
                //   console.log(anotherElement);
                //   anotherElement.attr('class', 'record-highlight');
                // } else {
                //   console.log('we didnot got it');
                // }
            });
        }
    };
});
// myApp.directive( "contextMenu", function($compile){
//     contextMenu = {};
//     contextMenu.restrict = "AE";
//     contextMenu.link = function( lScope, lElem, lAttr ){
//         lElem.on("contextmenu", function (e) {
//             e.preventDefault(); // default context menu is disabled
//             //  The customized context menu is defined in the main controller. To function the ng-click functions the, contextmenu HTML should be compiled.
//             lElem.append( $compile( lScope[ lAttr.contextMenu ])(lScope) );
//             // The location of the context menu is defined on the click position and the click position is catched by the right click event.
//             $("#contextmenu-node").css("left", e.clientX);
//             $("#contextmenu-node").css("top", e.clientY);            
//         });
//         lElem.on("mouseleave", function(e){
//             console.log("Leaved the div");
//             // on mouse leave, the context menu is removed.
//             if($("#contextmenu-node") )
//                 $("#contextmenu-node").remove();
//         });
//     };
//     return contextMenu;
// });