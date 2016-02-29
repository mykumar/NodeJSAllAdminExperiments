angular.module('nodeAllAdmin').factory('communcationService', function($rootScope,$http) {
    var communcationService = {};
    console.dir('@@@@@@@@@@@@communcationService-----------------------------');
    communcationService.message = '';
    communcationService.databaseType = '';
    communcationService.selectedTabId = 0;
    communcationService.sendRequest = function(requestUrl, methodType, reqData) {
        if(methodType === undefined) {
            methodType = 'GET';     
            return $http({
              method: methodType,
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
        } else if(methodType === 'POST') {
            console.dir('++++++++++++++++++++we are in POST++++++++++++++++++++++++++++++++++++++++++++++');
            return $http({
              method: methodType,
              url: requestUrl,
              data: reqData,
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
            console.dir('++++++++++++++++++++we are in POST++++++++++++++++++++++++++++++++++++++++++++++');
        }
        // You should return $http's result
        // $http will return a promise
        
    };
    communcationService.broadcastItem = function(obj) {
        $rootScope.$broadcast('handleBroadcast', obj);
    };
    communcationService.communcationMysql = function(obj) {
        if(obj)
        {
            if(obj.action) {
                if(obj.action === "loadConnectionsChildren") {
                    console.dir(" @@@@@@@@@@@@@@@@@@@@@@@@@This is the loadConnectionsChildren action @@@@@@@@@@@@@@@@@@@@@@@@@");
                    console.dir(obj);
                    var url = 'http://localhost:5000/mysql/'  + obj.connectionName + '/' + obj.action;
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
                if(obj.action === "loadConnections") {
                    console.dir(" @@@@@@@@@@@@@@@@@@@@@@@@@This is the loadConnections action @@@@@@@@@@@@@@@@@@@@@@@@@");
                    console.dir(obj);
                    var url = 'http://localhost:5000/mysql/' + obj.action;
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

                if(obj.action === "selectQuery") {
                    console.dir(" @@@@@@@@@@@@@@@@@@@@@@@@@This is the select action @@@@@@@@@@@@@@@@@@@@@@@@@");
                    console.dir(obj);
                    var url = 'http://localhost:5000/mysql/' + obj.connectionName + '/' + obj.dbName + '/' + obj.action;
                    var reqData = {'query' : 'select * from ' + obj.dbName + '.' + obj.tableName }; 
                    console.dir(url);
                    console.dir(reqData);
                    communcationService.sendRequest(url, 'POST',reqData).then(function success(data){
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
                    var url = 'http://localhost:5000/mysql/' + obj.connectionName + '/' + obj.dbName + '/' + obj.action;
                    var reqData = {'queries' : obj.queries, 'query' : 'select * from ' + obj.dbName + '.' + obj.tableName }; 
                    communcationService.sendRequest(url, 'POST', reqData).then(function success(data) {
                           // here you will get your server data
                            console.dir('++++++++++++++++This is main program usig the promises++++++++++++++++' );
                            console.dir(data);
                            obj.data = data;               
                            console.dir(obj);
                            communcationService.broadcastItem(obj);
                           // $scope.content = data;
                        }, function error(){
                    });

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