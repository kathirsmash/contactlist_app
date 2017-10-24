var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {
    var refresh = function() {
		$http({
			method: 'get',
			url: '/contactlist'
	    }).then(function (response){
	    	/*console.log('i got requested data');*/
			$scope.contactlist = response.data;
	    },function (error){
	    	console.log(error);
	    });
    }
    refresh();

    $scope.addContact = function() {
    		$http({
				method: 'post',
				url: '/contactlist',
				data: $scope.contact
		    }).then(function (response){
		    	/*console.log(response);*/
		    	refresh();
				/*$scope.contactlist = response.data;*/
		    },function (error){
		    	console.log(error);
		    });
    	}
    }

    $scope.removeContact = function(id) {
    	$http({
			method: 'delete',
			url: '/contactlist/' + id,
	    }).then(function (response){
	    	refresh();
	    },function (error){
	    	console.log(error);
	    });
    }

    $scope.edit = function(id) {
    	$http({
			method: 'get',
			url: '/contactlist/' + id,
	    }).then(function (response){
	    	$scope.contact = response.data;
	    },function (error){
	    	console.log(error);
	    });
    }
    $scope.update = function(id) {
    	var id = $scope.contact._id;
    	$http({
			method: 'put',
			url: '/contactlist/' + id,
			data: $scope.contact
	    }).then(function (response){
	    	refresh();
	    },function (error){
	    	console.log(error);
	    });
    }

    $scope.deselect = function(){
    	$scope.contact = "";
    }
});