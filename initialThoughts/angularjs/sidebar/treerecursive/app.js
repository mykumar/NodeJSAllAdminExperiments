var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  var mainSchemaJsonData = [{
      "name": "myConnection",
      "databases": [{
        "name": "informationDB",
        "tables": [{
            "name": "Tables",
            "tables": [{
                "name": "table1",
                "columns": [
                  {"name": "empsalary"},
                  {"name": "abc"},
                  {"name": "def"},
                ]
              }, {
                "name": "table2",
            }]
        }],
        "views": [{
            "name": "views",
            "views": [{
                "name": "views",
              }, {
                "name": "view2",
            }]
        }]
      }, {
        "name": "informationDB",
        "tables": [{
            "name": "Tables",
            "tables": [{
                "name": "table1",
                "columns": [
                  {"name": "empsalary"},
                  {"name": "abc"},
                  {"name": "def"},
                ]
              }, {
                "name": "table2",
            }]
        }],
        "views": [{
            "name": "views",
            "views": [{
                "name": "views",
              }, {
                "name": "view2",
            }]
        }]
      }]
    },{
      "name": "yourConnection",
      "databases": [{
        "name": "empDB",
        "tables": [ {
          "name": "employee",
          "columns": [
            {"name": "empsalary"},
            {"name": "abc"},
            {"name": "def"},
          ]
        }]
      }]
    }];


  // var printObject = function() {
  //   var empobj = {name: "abc", value:"123"};
  //   for ( var key in empobj) {
  //       console.log(key);
  //       console.log(empobj[key]);
  //   }  
  // }
  // printObject();

  this.tempSearchData = [{
      "name": "myConnection",
      "databases": [
          {"name": "informationDB"}
      ]
    },{
      "name": "myConnection"
    }];   

  console.dir(this.tempSearchData);
  this.results = [];    
  this.search = function(mainKey, data) {
    console.log('-------data------------------');
    console.dir(JSON.stringify(data));
      if(angular.isArray(data)) {
          var arr = [];
          for (var i=0; i < data.length; i++){
              if(angular.isObject(data[i])) {
                var object = data[i];
                var obj = {};
                for (var key in object) {
                  if(angular.isArray(object[key])) {
                    mainKey = key;
                    this.search(mainKey,object[key])
                  } else {
                      obj[key] = object[key];                  
                  }
                }  
              }
            arr.push(obj);
            console.dir(JSON.stringify(obj));  
          } 
      }
    this.results = JSON.stringify(arr);
    console.log(this.results);  
  };
  this.search(null,this.tempSearchData);  

  $scope.schemaData = mainSchemaJsonData;
  $scope.isString = angular.isString;
  $scope.isNumber = angular.isNumber;
  $scope.isArray = angular.isArray;  
  $scope.isObject =  angular.isObject;
  $scope.searchKeyword = [];
});