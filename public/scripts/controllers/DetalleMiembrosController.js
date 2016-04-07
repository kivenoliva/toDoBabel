angular.module("toDoBabel").controller("DetalleMiembrosController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.usuario = autentication.getLoginLocal()[1];
		console.log("MIEMBROS CONTROLLER");

	}]
);