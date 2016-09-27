angular.module('myApp', ['ngMessages', 'ngRoute'])
.controller('Controller', function($scope){
	var vm = this;
	$scope.allTip = 0;		
	$scope.averageTip = 0;

	var resetFields = function(){
	$scope.basemealprice = '';
	$scope.tippercentage = '';
	$scope.taxrate = '';
	};

	$scope.count = 0;
	$scope.hideRight = false;
	$scope.showError = false;
	$scope.submit = function(){
		if ($scope.leftForm.$invalid){
			$scope.showError = true;
			$scope.formError = 'Please fill in valid inputs.';
		} else {
		$scope.showError = false;
		$scope.hideRight = true;
		$scope.count++;
		$scope.tiptotal = $scope.basemealprice * ($scope.tippercentage/100);
		$scope.taxtotal = $scope.basemealprice * ($scope.taxrate/100);
		$scope.subtotal = $scope.basemealprice + $scope.taxtotal;
		$scope.total = $scope.subtotal + $scope.tiptotal;
		$scope.allTip += $scope.tiptotal;
		$scope.averageTip = ($scope.allTip/$scope.count);
		resetFields();

	}
};
	$scope.resetEntire = function(){
		resetFields();
		$scope.allTip = '';
		$scope.averageTip = '';
		$scope.count = 0;
		$scope.subtotal = '';
		$scope.tiptotal = '';
		$scope.total = '';
	};
});

