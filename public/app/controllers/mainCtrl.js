angular.module('mainCtrl', [])
.controller('mainController', function($rootScope, $location, Auth) {
	var vm = this;

	// Get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	// Check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		
		// Get user information to route change
		Auth.getUser()
		.success(function(data) {
			vm.user = data._doc;
		});
	});

	// Function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		// Clear the error
		vm.error = '';

		// Call the Auth.login() function
		Auth.login(vm.loginData.username, vm.loginData.password)
		.success(function(data) {
			vm.processing = false;
			// If a user successfully logs in, redirect to users page
			if (data.success) {
				$location.path('/users');
			} else {
				vm.error = data.message;
			}			
		});
	};

	// Function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		// eser all user info
		vm.user = {};
		$location.path('/login');
	};
});