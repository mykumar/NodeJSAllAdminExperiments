angular.module('nodeAllAdmin').controller('modalContentCtrl', function ($scope, $uibModalInstance) {
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@I am in the modalContentCtrl');
	$scope.ok = function () {
	    $uibModalInstance.close($scope.selectedItem);
	};

	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
}); 