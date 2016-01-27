angular.module('nodeAllAdmin').factory('communcationService', function($rootScope) {
    var communcationService = {};
    //console.dir('@@@@@@@@@@@@communcationService-----------------------------');
    communcationService.message = '';
    communcationService.databaseType = '';

    communcationService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    communcationService.broadcastItem = function() {
        //console.log('I am in the mySharedService -- broadcastItem');
        var message2 = {type: 'channel', action: 'create', data: { name: "hot", id: 0}};
        //console.dir(message2);
        $rootScope.$broadcast('handleBroadcast', message2);
    };
    return communcationService;
});