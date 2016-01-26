var myapp = angular.module('myapp', ['ngAnimate', 'ui.bootstrap', 'ui.ace']);
angular.module('myapp').directive("nodeAllAdminTabs",['$compile', function($compile) {
    return {
        templateUrl : './directives/nodeAllAdminTabs.html',
         scope: {
            },
        controller: function ($scope) {
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
angular.module('myapp').directive("secondDirective",['$compile', function($compile) {
    return {
        templateUrl : './directives/seconddirective.html',
         scope: {
            },
        controller: function ($scope) {   
            console.log('Hey i am the controloller of the seconddirective');
         } 
    }
}]);  
angular.module('myapp').directive('aceEditor',['$compile', function($compile) {
  return {
    // require: 'ui.ace',
    scope: {},
    // restrict: 'E',
    templateUrl: './directives/aceEditor.html',
    link: function (scope, element, attrs) {
         console.log('This is the link+++++++++++++++++++++++++++++++++++++++++++++++++++++');   
         console.dir(element[0].id);
         scope.id = element[0].id;
    },
    controller: function ($scope) {

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
    }
  }
}]);