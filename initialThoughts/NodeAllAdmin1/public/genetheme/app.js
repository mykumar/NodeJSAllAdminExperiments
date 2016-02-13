var myapp = angular.module('nodeAllAdmin', ['ngAnimate', 
	'ui.bootstrap', 'ui.ace', 'ui.grid', 'ui.grid.edit',
	'oc.lazyLoad', 'ui.router', 'ui.bootstrap', 'cfp.hotkeys']
);

angular.module('nodeAllAdmin').constant("Config", {
    "SIDEBAR": "sidebar"
});
angular.module('nodeAllAdmin').controller('mainController', function($scope, hotkeys) {
	console.log('++++++++++++++++++++++++++++++=I am in the mainController');
	// console.log = function() {};
	// console.dir = function() {};

	hotkeys.add({
		    combo: 'ctrl+up',
		    description: 'This one goes to 11',
		    callback: function() {
		      	console.dir('----------------------mainController---------ctrl+upppp-------------------');

		    }
	});

});    

