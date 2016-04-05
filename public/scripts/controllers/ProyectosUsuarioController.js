angular.module("toDoBabel").controller("ProyectosUsuarioController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$sce","$routeParams",
	 function($scope, $location, autentication, paths, APIClient, $sce, $routeParams){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLoginLocal()[1];


		// Scope methods
		$scope.proyectoDetalle = function(){
			console.log("PINCHAN DETALLE");
			//$location.url(paths.notFound);
			//Hacer luego el detalle


		};
		
		// Controller start
		APIClient.getProyectosUsuario($scope.usuario).then(

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