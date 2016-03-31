angular.module('userCtrl', [])

// User controller for the main page
// Inject the User factory
.controller('userController', function(User) {
	var vm = this;

	// Set a processing variable to show loading things
	vm.processing = true;

	// Grab all the users at page load
	User.all()
	.success(function(data) {
		// When all the users come back, remove the processing variable
		vm.processing = false;

		// Bind the users that come back to vm.users
		vm.users = data;
	});

	// Function to delete a user
	vm.deleteUser = function(id) {
		vm.processing = true;

		// Accept the user id as a parameter
		User.delete(id)
		.success(function(data) {
			// Get all users to update the table
			// You can also set up your api to return the list of users with the delete call
			User.all()
			.success(function(data) {
				vm.processing = false;
				vm.users = data;
			});
		});
	};
})

// Controller applied to user creation page
.controller('userCreateController', function(User) {
	var vm = this;

	// Variable to hide/show elements of the view differentiates between create or edit pages
	vm.type = 'create';

	// Function to create a user
	vm.saveUser = function() {
		vm.processing = true;

		// Clear the message
		vm.message = '';

		// Use the create function in the userService
		User.create(vm.userData)
		.success(function(data) {
			vm.processing = false;

			// Clear the form
			vm.userData = {};
			vm.message = data.message;
		});
	};
})

// Controller applied to user edit page
.controller('userEditController', function($routeParams, User) {
	var vm = this;

	// Variable to hide/show elements of the view differentiates between create or edit pages
	vm.type = 'edit';

	// Get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	User.get($routeParams.user_id)
	.success(function(data) {
		vm.userData = data;
	});

	// Function to save the user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// Call the userService function to update
		User.update($routeParams.user_id, vm.userData)
		.success(function(data) {
			vm.processing = false;
			vm.userData = {};
			vm.message = data.message;
		});
	};
});