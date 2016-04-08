angular.module("toDoBabel").controller("TareasUsuarioController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$sce","$routeParams",
	 function($scope, $location, autentication, paths, APIClient, $sce, $routeParams){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLoginLocal()[1];

		//Scope methods
		$scope.cambioTarea = function(tarea, usuario){
			console.log(tarea, usuario);
			if(tarea.estado == "NoAsignada"){
				tarea.estado = "Empezada";
				tarea.propietario = usuario;
			}else if(tarea.estado == "Empezada"){
				tarea.estado = "Finalizada";
			}

			console.log(tarea);
			APIClient.modificarTarea(tarea).then(

				//primero siempre el succes
				function(data){
					if(!data.result){
                    	alert(data.err);
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

		$scope.borrarTarea = function(tarea){
			console.log(tarea);
			//Borro del model la tarea, luego actualizo la base de datos
			for(var i = 0; i<$scope.model.length; i++){

				if($scope.model._id == tarea._id){
					$scope.model.splice(i,1);
				}

			}
			
			//Pido el proyecto por el nombre
			/******FALLOOOOOOOOOOOO***********/
			
			//console.log(tarea);
			APIClient.deleteTarea($scope.model._id, tarea._id).then(

				//primero siempre el succes
				function(data){
					if(!data.result){
						alert(data.err);
					}else{
						//$scope.model = data.rows;
						console.log(data.rows);
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
		APIClient.getTareasUsuario($scope.usuario).then(

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