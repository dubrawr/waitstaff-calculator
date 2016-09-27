angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/home.html',
		controller:'Controller',
		controllerAs: 'vm'})
	.when('/new-meal', {
		templateUrl: 'new-meal.html',
		controller: 'Controller',
		controllerAs: 'vm'
	}).when('/my-earnings', {
		templateUrl: 'my-earnings.html',
		controller: 'Controller',
		controllerAs: 'vm'
	}).when('error',{
		template: '<p>Error Page Not Found</p>'
	}).otherwise('error');
}])
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

// var app = angular.module('myApp', []);
// app.run(function($rootScope){
// 	$rootScope.allTip += $scope.tiptotal;
// 	$rootScope.averageTip = ($scope.allTip/$scope.count);
// 	$rootScope.count = $scope.count;
// });