angular.module('myApp', ['ngMessages'])
.controller('Controller', function($scope){
	var vm = this;
	$scope.basemealprice = 0;
	$scope.tippercentage = 0;
	$scope.taxrate = 0;
	vm.tiprate = function(){
		return $scope.basemealprice * ($scope.tippercentage/100);
		};
	vm.taxrate = function(){
		return $scope.basemealprice * ($scope.taxrate/100);
	};
	vm.subtotal = function(){
		return $scope.basemealprice + vm.taxrate();
	};
	vm.total = function(){
		return vm.subtotal() + vm.tiprate();
	};
});

