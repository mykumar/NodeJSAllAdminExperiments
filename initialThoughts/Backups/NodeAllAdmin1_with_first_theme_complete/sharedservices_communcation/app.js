var myModule = angular.module('myModule', []);
myModule.factory('mySharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        console.log('I am in the mySharedService -- broadcastItem');
        var message2 = {type: 'channel', action: 'create', data: { name: "hot", id: 0}};
        console.dir(message2);
        $rootScope.$broadcast('handleBroadcast', message2);
    };
    return sharedService;
});
myModule.factory('mySharedService2', ['$rootScope', 'mySharedService', function($rootScope, sharedService) {
    var sharedService2 = {};

    sharedService2.message = '';

    sharedService2.prepForBroadcast = function(msg) {
        console.log('I am in the mysharedservice2');
        sharedService.message = msg;
        sharedService2.message = msg;
        sharedService.broadcastItem();
    };

    return sharedService2;
}]);
myModule.directive('myComponent', function(mySharedService) {
    return {
        restrict: 'E',
        controller: function($scope, $attrs, mySharedService) {
            $scope.$on('handleBroadcast', function (event, args) {
                console.log('--------I am in the myComponent---controller-----------');
                console.dir(args);
                console.dir('-----------------------------------------------');
                $scope.message = 'Directive: ' + mySharedService.message;
            });
        },
        replace: true,
        template: '<input>'
    };
});
function ControllerZero($scope, sharedService) {
    $scope.handleClick = function(msg) {
        sharedService.prepForBroadcast(msg);
    };
    $scope.$on('handleBroadcast', function (event, args) {
        console.log('--------I am in the myComponent---controller-----------');
        console.dir(args);
        console.dir('-----------------------------------------------');
        $scope.message = sharedService.message;
    });
}
function ControllerOne($scope, sharedService) {
    $scope.$on('handleBroadcast', function (event, args) {
        console.log('I am in the ControllerOne --- handleBroadcast');
        console.dir(args);
        console.dir('-----------------------------------------------');
        $scope.message = 'ONE: ' + sharedService.message;
    });
}
function ControllerTwo($scope, sharedService) {
    $scope.$on('handleBroadcast', function (event, args) {
        console.log('I am in the ControllerTwo --- handleBroadcast');
        console.dir(args);
        console.dir('-----------------------------------------------');
        $scope.message = 'TWO: ' + sharedService.message;
    });
}

myModule.controller('ControllerZero', ['$scope', 'mySharedService2',  ControllerZero]);
myModule.controller('ControllerOne', ['$scope', 'mySharedService2',  ControllerOne]);
myModule.controller('ControllerTwo', ['$scope', 'mySharedService2',  ControllerTwo]);
