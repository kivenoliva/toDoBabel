angular.module("toDoBabel").controller("TareasUsuarioController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$sce","$routeParams",
	 function($scope, $location, autentication, paths, APIClient, $sce, $routeParams){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLoginLocal()[1];
		
		// Controller start
		APIClient.getTareasUsuario($scope.usuario).then(

			//primero siempre el succes
			function(data){
				console.log(data);
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