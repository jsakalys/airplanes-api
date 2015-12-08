var app = angular.module('AirplaneApp', ['ngRoute', 'AuthCtrls', 'AuthServices']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
$routeProvider
	.when('/', {
		templateUrl: '/app/views/airplanes.html'
	})
	.when('/about', {
		templateUrl: '/app/views/about.html'
	})
	.when('/login', {
		templateUrl: '/app/views/auth.html',
		controller: 'LoginCtrl'
	})
	.when('/signup', {
		templateUrl: '/app/views/auth.html',
		controller: 'SignupCtrl'
	})
	.otherwise({
		tepmlateUrl: '/app/views/404.html'
	});
$locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor')
}])
.run(["$rootScope", "Auth", function($rootScope, Auth){
	$rootScope.isLoggedIn = function(){
		return Auth.isLoggedIn.apply(Auth)
	}
}]);