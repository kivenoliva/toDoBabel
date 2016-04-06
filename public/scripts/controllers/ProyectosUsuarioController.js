angular.module("toDoBabel").controller("ProyectosUsuarioController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$sce","$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $sce, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLoginLocal()[1];

		// Scope métodos
		$scope.getMovieDetailURL = function(proyecto){
            return URL.resolve(paths.detalleProyecto, {id: proyecto._id});
        };

		
		// Controller start
		APIClient.getProyectosUsuario($scope.usuario).then(

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