angular.module("toDoBabel").controller("ProyectosController",
	["$scope", "$location", "autentication", "paths", "APIClient", function($scope, $location, autentication, paths, APIClient){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLogin()[1];
		//globales que mantengo actualizadas para el tema de paginacion
		$scope.empiece = 0;
		$scope.limite = 4;


		//Scope methods
		$scope.nextPaginacion = function(){

			$scope.empiece = $scope.empiece + $scope.limite;
			APIClient.getProyectos($scope.empiece, $scope.limite).then(
				//primero siempre el succes
				function(data){
					if(!data.result){
	                    alert(data.err);
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
		};

		$scope.previusPaginacion = function(){

			$scope.empiece = $scope.empiece - $scope.limite;
			console.log($scope.empiece, $scope.limite)
			APIClient.getProyectos($scope.empiece, $scope.limite).then(
				//primero siempre el succes
				function(data){
					if(!data.result){
	                    alert(data.err);
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
		};

		// Controller start
		APIClient.getProyectos().then(
			//primero siempre el succes
			function(data){
				if(!data.result){
                    alert(data.err);
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