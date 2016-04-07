angular.module("toDoBabel").controller("DetalleMiembrosController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLoginLocal()[1];
		
		console.log($scope.model);
		//Scope methods
		//Scope methods
		$scope.volver = function(){
			var urlBien = URL.resolve(paths.detalleProyecto, {id: $routeParams.id});
			$location.url(urlBien);
		}


		//Scope start
		APIClient.getMiembrosProyecto($routeParams.id).then(

			//primero siempre el succes
			function(data){

				if(!data.result){
				    $scope.$emit("ErroresLogin", data.err);
				}else{
				    	$scope.model = data.rows;
					
					if($scope.model.length == 0){
						$scope.uiState = "blank";
					}else{
						$scope.uiState = "ideal";
					}
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