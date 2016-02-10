angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $rootScope, items, baskets) {

    $scope.text = "This is the text from ModalInstanceCtrl";
    $scope.items = items;
    console.dir('-----------------------------------ModalInstanceCtrl----------------------------------------------------------------');
    console.dir($rootScope.parentText);
    console.dir($scope.items);
    console.dir(baskets);
    
    $scope.jsonData = $rootScope.jsonData;
    $scope.gridOptions  = $rootScope.gridOptions;
    
    $scope.ok = function () {
      $rootScope.parentText = "Resetted in the ModalInstanceCtrl :: child";
      $uibModalInstance.close($scope.text);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});
