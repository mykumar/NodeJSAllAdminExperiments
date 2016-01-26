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
  .state('route2', {
      url: "/route2",
      templateUrl: "routes/route2.html",
      controller: function($scope,  $rootScope){
          $scope.route2 = "This is the route 2222222222222222222222222222222222 ";
          $scope.rvalue = "This is from the route 2";
          $rootScope.rvalue = $scope.rvalue;
        }
  })
        .state('route2.list', {
            url: "/list",
            templateUrl: "routes/route2.list.html",
            controller: route2listController
        })
    });

function route1Controller($scope, $rootScope,  sharedService){
              $scope.route1 = "This is the route 7777777777777777777777777777777777777777777 ";
              $scope.rvalue = "This is from the route 1";
              $rootScope.rvalue = $scope.rvalue;
              // $scope.value = "";
              $scope.firstCtrl = function($scope) 
              {
                  $rootScope.$emit('route1ToChild1', "This is the rout155557676777");
              };

              $scope.handleClick = function(msg) {
                console.log('I am sending msg');
                console.log(msg);
                  sharedService.prepForBroadcast(msg);
              };

              $rootScope.$on('Child1ToRoute1', function(event, data) { 
                   console.log(data); 
                   $scope.value = data; 
              });
              $rootScope.$on('Child2ToRoute1', function(event, data) { 
                   console.log('Child2ToRoute1 ---> I got dta');  
                   console.log(data); 
                   $scope.value = data; 
              });  
            };

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
route1Controller.$inject = ['$scope', '$rootScope' , 'mySharedService'];    
