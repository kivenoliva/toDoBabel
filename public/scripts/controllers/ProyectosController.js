angular.module("toDoBabel").controller("ProyectosController",
	["$scope", "$location", "autentication", "paths", "APIClient", function($scope, $location, autentication, paths, APIClient){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLogin()[1];


		// Controller start
		APIClient.getProyectos().then(
			//primero siempre el succes
			function(data){
				$scope.model = data.rows;

				if($scope.model.length == 0){
					$scope.uiState = "blank";
				}else{
					$scope.uiState = "ideal";
				}
				
			},

			//segundo si ha habido error
			function(data){
				$log.error("Error", data);
				$scope.uiState = "error";
			}
		);


	}]
);