var app = angular.module('myApp', ['treeControl']);

app.controller('myCtrl', function($scope) {
  // $scope.dataForTheTree =
  // [
  //     { "name" : "Joe", "age" : "21", "children" : [
  //         { "name" : "Smith", "age" : "42", "children" : [] },
  //         { "name" : "Gary", "age" : "21", "children" : [
  //             { "name" : "Jenifer", "age" : "23", "children" : [
  //                 { "name" : "Dani", "age" : "32", "children" : [] },
  //                 { "name" : "Max", "age" : "34", "children" : [] }
  //             ]}
  //         ]}
  //     ]},
  //     { "name" : "Albert", "age" : "33", "children" : [] },
  //     { "name" : "Ron", "age" : "29", "children" : [] }
  // ];

  $scope.dataForTheTree = {
    "connectionName": "connection",
    "connections": [{
      "name": "connection",
      "databases": [{
        "name": "information_schema",
        "tables": [ {
          "name": "employee",
          "columns": [{
            "name": "idemployee"
          }, {
            "name": "name"
          }, {
            "name": "salary"
          }, {
            "name": "age"
          }],
          "indexes": [

          ],
          "foreignKeys": [

          ],
          "triggers": [

          ]
        }
        ],
        "views": [

        ],
        "storedProcedures": [

        ],
        "functions": [

        ]
      }, {
        "name": "mysql",
        "tables": [

        ],
        "views": [

        ],
        "storedProcedures": [

        ],
        "functions": [

        ]
      }, {
        "name": "performance_schema",
        "tables": [

        ],
        "views": [

        ],
        "storedProcedures": [

        ],
        "functions": [

        ]
      }, {
        "name": "timetrack",
        "tables": [{
          "name": "employee",
          "columns": [{
            "name": "idemployee"
          }, {
            "name": "name"
          }, {
            "name": "salary"
          }, {
            "name": "age"
          }],
          "indexes": [

          ],
          "foreignKeys": [

          ],
          "triggers": [

          ]
        }, {
          "name": "work",
          "columns": [{
            "name": "id"
          }, {
            "name": "hours"
          }, {
            "name": "date"
          }, {
            "name": "archived"
          }, {
            "name": "description"
          }],
          "indexes": [

          ],
          "foreignKeys": [

          ],
          "triggers": [

          ]
        }],
        "views": [

        ],
        "storedProcedures": [

        ],
        "functions": [

        ]
      }]
    }]
  };

  $scope.treeOptions = {
    nodeChildren: "databases, connections, tables",
    dirSelectable: true,
    injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
    }
  };
  


});