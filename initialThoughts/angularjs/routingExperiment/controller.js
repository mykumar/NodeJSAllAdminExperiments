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