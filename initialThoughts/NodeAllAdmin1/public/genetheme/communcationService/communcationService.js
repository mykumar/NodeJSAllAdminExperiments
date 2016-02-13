angular.module('nodeAllAdmin').factory('communcationService', function($rootScope,$http) {
    var communcationService = {};
    console.dir('@@@@@@@@@@@@communcationService-----------------------------');
    communcationService.message = '';
    communcationService.databaseType = '';
    communcationService.selectedTabId = 0;
    communcationService.sendRequest = function(requestUrl) {
        // You should return $http's result
        // $http will return a promise
        return $http({
          method: 'GET',
          url: requestUrl 
        }).then(
            function successCallback(response) {
                console.dir('This is the response');
                console.dir(response);
                return response.data;
            }, function errorCallback(response) {
                console.dir('This is the error');
                console.dir(response);
                return response;
            }
        );
    };
    communcationService.broadcastItem = function(obj) {
        $rootScope.$broadcast('handleBroadcast', obj);
    };
    communcationService.communcationMysql = function(obj) {
        if(obj)
        {
            if(obj.action) {
                if(obj.action === "loadMetaSchema") {
                    console.dir(" @@@@@@@@@@@@@@@@@@@@@@@@@This is the select action @@@@@@@@@@@@@@@@@@@@@@@@@");
                    console.dir(obj);
                    var url = 'http://localhost:5000/sendSchemaJson';
                    communcationService.sendRequest(url).then(function success(data) {
                           // here you will get your server data
                            console.dir('++++++++++++++++This is main program suig the promises++++++++++++++++' );
                            console.dir(data);
                            obj.data = data;               
                            console.dir(obj);
                            communcationService.broadcastItem(obj);
                           // $scope.content = data;
                        }, function error(){
                    });
                }

                if(obj.action === "select") {
                    console.dir(" @@@@@@@@@@@@@@@@@@@@@@@@@This is the select action @@@@@@@@@@@@@@@@@@@@@@@@@");
                    console.dir(obj);
                    var url = 'http://localhost:5000/sendJson';
                    communcationService.sendRequest(url).then(function success(data){
                           // here you will get your server data
                            console.dir('++++++++++++++++This is main program suig the promises++++++++++++++++' );
                            console.dir(data);
                            obj.data = data;               
                            console.dir(obj);
                            communcationService.broadcastItem(obj);
                           // $scope.content = data;
                        }, function error(){
                    });
                }
                if(obj.action === "updateTable") {
                    console.dir(" @@@@@@@@@@@@@@@@@@@@@@@@@This is the updateTable action @@@@@@@@@@@@@@@@@@@@@@@@@");
                    console.dir(obj);
                }
                if(obj.action === "aceQuery") {
                    console.dir(" @@@@@@@@@@@@@@@@@@@@@@@@@This is the aceQuery action @@@@@@@@@@@@@@@@@@@@@@@@@");
                    console.dir(obj);   
                } else {
                    communcationService.broadcastItem(obj);
                }
                
            }
            
        }    
    };    
    communcationService.prepForBroadcast = function(obj) {
        switch(communcationService.databaseType) {
            case "mysql": 
                communcationService.communcationMysql(obj);            
                break;
        } 
    };
    return communcationService;
});