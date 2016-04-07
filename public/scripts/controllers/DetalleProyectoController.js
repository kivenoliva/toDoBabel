angular.module("toDoBabel").controller("DetalleProyectoController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.usuario = autentication.getLoginLocal()[1];

		//Scope methods

		$scope.cambioTarea = function(tarea, usuario){
			//console.log(tarea, usuario);
			if(tarea.estado == "NoAsignada"){
				tarea.estado = "Empezada";
				tarea.propietario = usuario;
			}else if(tarea.estado == "Empezada"){
				tarea.estado = "Finalizada";
			}

			//console.log(tarea);
			APIClient.modificarTarea(tarea).then(

				//primero siempre el succes
				function(data){
					if(!data.result){
						$scope.$emit("ErroresLogin", data.err);
					}else{
						//$scope.model = data.rows;
						//console.log(data.rows);
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
		
		$scope.volver = function(){
			$location.url(paths.proyectosUser);
		}

		$scope.modificarProyecto = function(id){
			var urlBien = URL.resolve(paths.modificarProyecto, {id: id});
			$location.url(urlBien);
		}

		// Controller start
		APIClient.getProyectoId($routeParams.id).then(

			//primero siempre el succes
			function(data){
				if(!data.result){
					$scope.$emit("ErroresLogin", data.err);
				}else{
					$scope.model = data.rows[0];
					
					if($scope.model.length == 0){
						$scope.uiState = "blank";
					}else{
						$scope.uiState = "ideal";
					}
					$scope.getDetailURL = function(){
						console.log(paths.detalleMiembros);
						console.log($scope.model._id);
						return URL.resolve(paths.detalleMiembros, {id: $scope.model._id});
					};
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