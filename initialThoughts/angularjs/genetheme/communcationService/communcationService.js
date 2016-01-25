angular.module('nodeAllAdmin').factory('communcationService', function($rootScope) {
    var sharedService = {};
    console.dir('@@@@@@@@@@@@communcationService-----------------------------');
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