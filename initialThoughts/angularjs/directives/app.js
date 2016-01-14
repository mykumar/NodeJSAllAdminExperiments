var myapp = angular.module('myapp', ["ui.router"]);
    myapp.factory('mySharedService', function($rootScope) {
        var sharedService = {};

        this.message = '';

        sharedService.getBroadcast = function() {
            return this.message;
        };

        sharedService.prepForBroadcast = function(msg) {
            this.message = msg;
            console.log('I got the msg');
            console.log(this.message);
            console.log(msg);
           
        };

        return sharedService;
    });

    myapp.config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/route1")
      
      $stateProvider
      .state('route1', {
          url: "/route1",
          templateUrl: "routes/route1.html",
          controller: route1Controller
      })
          .state('route1.list', {
              url: "/list",
              templateUrl: "routes/route1.list.html",
              controller: function($scope, $rootScope){
                $scope.items = ["A", "List", "Of", "Items"];
                $scope.rvalue = "This is from the route 1.list";
                $rootScope.rvalue = $scope.rvalue;
                $scope.value = "This is the route1 .list value";
                $rootScope.$on('route1ToChild1', function(event, data) { 
                   console.log(data); 
                   $scope.value = data; 
                });  
                $scope.firstCtrl = function($scope) 
                {
                    $rootScope.$emit('Child1ToRoute1', "This is the LIST TO PARENT ");
                }

                $scope.setSharedMsg = function(msg) 
                {
                    sharedService.prepForBroadcast(msg);
                }

              }
          })
  

function route2listController($scope, $rootScope, sharedService){
    $scope.things = ["A", "Set", "Of", "Things"];
    $scope.rvalue = "This is from the route 2.list";

    $rootScope.rvalue = $scope.rvalue;
    $scope.firstCtrl = function($scope) 
    {
        $rootScope.$emit('Child2ToRoute1', "This is route 2 list -------- This is the LIST TO PARENT ");
    };
    $scope.getmsg = function() {
      console.log('route2listController ------ getmsg');
      console.log(sharedService.getBroadcast());
      $scope.shrMsg = sharedService.getBroadcast();
    };
  };

route2listController.$inject = ['$scope','$rootScope' ,'mySharedService'];            
