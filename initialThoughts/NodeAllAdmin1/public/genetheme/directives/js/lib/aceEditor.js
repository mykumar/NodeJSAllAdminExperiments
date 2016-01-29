angular.module('nodeAllAdmin').directive('aceEditor',['$compile', function($compile) {
  return {
    // require: 'ui.ace',
    scope: {},
    // restrict: 'E',
    templateUrl: '/genetheme/directives/html/lib/aceEditor.html',
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