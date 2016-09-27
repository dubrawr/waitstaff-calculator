angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/home.html',
		controller:'homeCtrl',
		controllerAs: 'vm'})
	.when('/new-meal', {
		templateUrl: 'new-meal.html',
		controller: 'newMealCtrl',
		controllerAs: 'vm'
	}).when('/my-earnings', {
		templateUrl: 'my-earnings.html',
		controller: 'myEarningsCtrl',
		controllerAs: 'vm'
	}).when('error',{
		template: '<p>Error Page Not Found</p>'
	}).otherwise('error');
}])
.factory('earningsService', function(){
	return {
		tips: [],
		reset: function(){
			this.tips = [];
		}
	};
})
.controller('newMealCtrl', function($scope, earningsService){
	
	var vm = this;
	
	$scope.basemealprice = 0;
	$scope.tippercentage = 0;
	$scope.taxrate = 0;
	var resetFields = function(){
		$scope.basemealprice = 0;
		$scope.tippercentage = 0;
		$scope.taxrate = 0;
	};

	$scope.showError = false;
	$scope.tiptotal = function(){
		return $scope.basemealprice * ($scope.tippercentage/100);
	};
	$scope.taxtotal = function(){
		return $scope.basemealprice * ($scope.taxrate/100);
	};
	$scope.subtotal = function(){
		return $scope.basemealprice + $scope.taxtotal();
	};
	$scope.total = function(){
		return $scope.subtotal() + $scope.tiptotal();
	};
	$scope.submit = function(){
		if ($scope.leftForm.$invalid){
			$scope.showError = true;
			$scope.formError = 'Please fill in valid inputs.';
		} else {
			$scope.showError = false;
			earningsService.tips.push($scope.tiptotal());
			resetFields();
		}
	};
	
})
.controller('homeCtrl', function(){})
.controller('myEarningsCtrl', function($scope, earningsService){
	$scope.allTip = function(){
		var tipSum = earningsService.tips.reduce(function(a, b){
			return a + b; }, 0);
		return tipSum;
	};
	$scope.count = function(){
		return earningsService.tips.length;
	};
	$scope.averageTip = function(){
		return $scope.allTip()/$scope.count();
	};
	$scope.resetEarnings = function(){
		earningsService.reset();
	};
});

