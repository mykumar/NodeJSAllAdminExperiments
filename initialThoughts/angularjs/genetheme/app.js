var myapp = angular.module('nodeAllAdmin', ['ngAnimate', 'ui.bootstrap', 'ui.ace', 'ui.grid', 'ui.grid.edit']);
angular.module('nodeAllAdmin').controller('mainController', function($scope) {

  console.log('I am in the mainController');

    $scope.myData = [
	    {
	        "firstName": "Cox",
	        "lastName": "Carney",
	        "company": "Enormo",
	        "employed": true
	    },
	    {
	        "firstName": "Lorraine",
	        "lastName": "Wise",
	        "company": "Comveyer",
	        "employed": false
	    },
	    {
	        "firstName": "Nancy",
	        "lastName": "Waters",
	        "company": "Fuelton",
	        "employed": false
	    }
	];
    
});    

