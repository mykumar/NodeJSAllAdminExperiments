angular.module('nodeAllAdmin').directive('aceEditor',['$compile', 'communcationService', function($compile, communcationService) {
  return {
    // require: 'ui.ace',
    scope: {},
    // restrict: 'E',
    templateUrl: '/genetheme/directives/html/lib/aceEditor.html',
    link: function (scope, element, attrs) {
         console.log('This is the link+++++++++++++++++++++++++++++++++++++++++++++++++++++');   
         console.dir(element[0].id);
         scope.fromTheParentID = element[0].id;
         // scope.tabIndex = element[0].tabIndex;
    },
    controller: function ($scope) {
        $scope.$on('handleBroadcast', function (event, args) {
                console.log('--------I am in the GRIDDDDDDDDDDDD---controller-----------');
                if(angular.isObject(args)) { 
                  if(args.to === "Grid" && args.TabId == $scope.fromTheParentID) {
                      console.dir('-------------------YES IT IS FOR Grid NEW ONE BABY----------------------------');    
                      console.dir(args);
                      console.dir($scope.columnData);
                      $scope.columnData.splice(0,$scope.columnData.length);
                      if(args.data.length > 0) {
                          for (var property in args.data[0]) {
                              var objColumnDefs = {};
                              objColumnDefs['field'] = property;
                              objColumnDefs['displayName'] = property;
                              $scope.columnData.push(objColumnDefs);     
                          } 
                      }
                      console.dir($scope.columnData);
                      $scope.jsonData = args.data;
                  }
                }   
                console.dir('-----------------------------------------------');
        }); 

        $scope.printPassedVar = function() {
            console.log('This is the printPassedVar+++++++++++++++++++++++++++++++++++++++++++++++++++++');   
            console.dir($scope.fromTheParentID);      
            // console.dir($scope.tabIndex);
        };    


        $scope.fname = 'fname';
        $scope.lname = 'lname';

        //see this two links for auto comletion
        // http://plnkr.co/edit/6MVntVmXYUbjR0DI82Cr?p=preview
        // http://stackoverflow.com/questions/15019607/autocompletion-for-ace-editor

        $scope.tmpValue = "This is temp value.Rise of the sun";

        //Below aceoptions is not working
        // $scope.aceOption = {
        //     useWrapMode : true,
        //     showGutter: false,
        //     theme:'twilight',
        //     mode: 'xml',
        //     firstLineNumber: 5,
        //     onLoad: $scope.aceLoaded,
        //     onChange: $scope.aceChanged,
        //     require: ['ace/ext/language_tools'],
        //     advanced: {
        //       enableSnippets: true,
        //       enableBasicAutocompletion: true,
        //       enableLiveAutocompletion: true
        //     }
        // }; 

        $scope.executeSelectedLine = function() {
            // console.log('I am in the executeSelectedLine callback function');
            // console.log($scope);
            // console.log($scope.tmpValue);
            var selectionRange = $scope.editor.getSelectionRange();
            var startLine = selectionRange.start.row;
            var endLine = selectionRange.end.row;
            var content = $scope.editor.session.getTextRange(selectionRange);
            console.log('----------------------------------------------------This is the selected line----------------------------------------------------');
            console.log(content);
            var obj = {"from": "ace-grid", "data": content, "to": "Grid" , "action": "aceQuery"};
            communcationService.prepForBroadcast(obj);
        };

        $scope.aceLoaded = function(_editor) {
                    var _session = _editor.getSession();
                    var _renderer = _editor.renderer;    
                    
                    // Options
                    console.log('I am in the aceLoaded');
                    _editor.$blockScrolling = Infinity
                    _editor.commands.addCommand({
                        name: "executeSelectedLine",
                        exec: $scope.executeSelectedLine,
                        bindKey: {mac: "cmd-x", win: "ctrl-x"}
                    });
                    _editor.commands.on("afterExec", function(e){ 
                        console.log('This is the after executaion');
                        console.log(e.command.name);
                        console.log(e.args);
                        console.log('+++++++++++++++++++++++++++This is the ID+++++++++++++++++++++++++++++++++++++');
                        console.log($scope.id); 
                    });    

                    _session.setUndoManager(new ace.UndoManager());
                    _renderer.setShowGutter(false);  
                    $scope.editor = _editor;
                    _editor.fontSize = 40;

                    // var langTools = ace.require("ace/ext/language_tools");
                    // var wordList =  [  
                    //                    {"word":"hello"}, 
                    //                    {"word":"good morning"},
                    //                    {"word":"suggestions"},
                    //                    {"word":"auto suggest"},
                    //                    {"word":"try this"}
                    //                 ];

                    // var rhymeCompleter = {
                    //     getCompletions: function(editor, session, pos, prefix, callback) {
                    //         if (prefix.length === 0) { callback(null, []); return }
                    //         $.getJSON(jsonUrl, function(wordList) {
                    //             callback(null, wordList.map(function(ea)  {           
                    //                 return {name: ea.word, value: ea.word, meta: "optional text"}
                    //             }));
                    //         })
                    //     }
                    // };

                    // langTools.addCompleter(rhymeCompleter);

                _session.setMode("ace/mode/mysql");
                    // _session.setMode("ace/mode/sql");
                    // _session.setMode("ace/mode/javascript");
                    // _editor.setReadOnly(true);




                $scope.onChange = function() {
                   //alert('change');
                   console.log('I am the onChange');
                };
        }
        $scope.jsonData = [];
        $scope.applyChanges = function(){
            //take the data from the scope modified data arrray , create the update syntax for each and send them one after the other
            //coming to the databases, connection, database type, tablename etc, we can get from the handleBroadcast
        }
        $scope.updateModifiedData = function(rowEntity, colDef, newValue, oldValue){
          //push them to scope modified data arrray 

        }
        // $scope.firstName = "John Smith";  
              // $scope.jsonData = [      {
              //                            "id":12,
              //                            "first-name": "Cox",
              //                            "friends": ["friend0"],
              //                            "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
              //                            "getZip" : function() {return this.address.zip;}
              //                        },
              //                        {
              //                            "id":66664444,
              //                            "first-name": "susie",
              //                            "friends": ["friend0"],
              //                            "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
              //                            "getZip" : function() {return this.address.zip;}
              //                        },
              //                        {
              //                            "id":3322222,
              //                            "first-name": "Jessie",
              //                            "friends": ["friend0"],
              //                            "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
              //                            "getZip" : function() {return this.address.zip;}
              //                        }
              //                    ];

            console.dir($scope.jsonData);                    
              
            $scope.columnData = [];
            $scope.gridOptions = {};
            // $scope.gridOptions.enableSorting= true;
            $scope.gridOptions.columnDefs = $scope.columnData;
            
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
                      console.dir(rowEntity);
                      console.dir(colDef);
                      console.dir(newValue);
                      console.dir(oldValue);
                      console.dir("UPDATE `nodetest`.`employees` SET `" + colDef.field + "` = '"  +  newValue + "' WHERE `id` = " + rowEntity.id);
                      console.dir('---------------------------------------------------');
                  }  
            });

          };

    }
  }
}]);