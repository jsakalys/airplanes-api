angular.module('AuthCtrls', ['AuthServices'])
.controller('MainCtrl', ['$scope', 'Auth', function($scope, Auth){
	$scope.logout = function(){
		Auth.removeToken();
	};
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth){
	$scope.user = {
		email: '',
		password: ''
	};
	$scope.actionName = 'Login';
	$scope.userAction = function(){
		$http.post('/api/auth', $scope.user).then(function success(res){
			Auth.saveToken(res.data.token);
			$location.path('/')
		}, function error(res){
			console.log(res.data);
		});
	};
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth){
	$scope.user = {
		email: '',
		password: ''
	};
	$scope.actionName = "Signup";
	$scope.userAction = function(){
		$http.post("/api/users", $scope.user).then(function(res){
			$http.post("api/auth", $scope.user).then(function success(res){
				Auth.saveToken(res.data.token);
				$location.path('/');
			}, function error(res){
				console.log(res.data);
			});
		});
	};
}])