angular.module('AuthServices', [])
.factory("Auth", ["$window", function($window){
	return {
		saveToken: function(token){
			$window.localStorage["airplanes-token"] = token;
		},
		getToken: function(){
			return $window.localStorage["airplanes-token"];
		},
		removeToken: function(){
			return $window.localStorage.removeItem('airplanes-token')
		},
		isLoggedIn: function(){
			var token = this.getToken();
			return token ? true : false
		}
	};
}])
.factory("AuthInterceptor", ["Auth", function(Auth){
	return {
		request: function(config){
			var token = Auth.getToken();
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}
	};
}]);