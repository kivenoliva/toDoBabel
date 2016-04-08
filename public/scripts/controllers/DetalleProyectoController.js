angular.module("toDoBabel").controller("DetalleProyectoController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.usuario = autentication.getLoginLocal()[1];
		$scope.tareasNuevas = "";

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
			for(var i = 0; i<$scope.model.tareas.length; i++){

				if($scope.model.tareas[i]._id == tarea._id){
					$scope.model.tareas.splice(i,1);
				}

			}
			//console.log(tarea, usuario);
			
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
		
		$scope.volver = function(){
			$location.url(paths.proyectosUser);
		}

		$scope.modificarProyecto = function(id){
			var urlBien = URL.resolve(paths.modificarProyecto, {id: id});
			$location.url(urlBien);
		}

		$scope.borrarProyecto = function(){
			console.log("id controller", $scope.model._id);
			APIClient.deleteProyecto($scope.model._id).then(

				//primero siempre el succes
				function(data){
					if(!data.result){
						alert(data.err);
					}else{
						//$scope.model = data.rows;
						console.log(data.rows);
						$location.url(paths.proyectosUser);
					}							
				},

				//segundo si ha habido error
				function(data){
					$log.error("Error", data);
					$scope.uiState = "error";
				}
			);

		}

		$scope.nuevaTarea = function(){
			var objTarea = {};
			objTarea.proyecto = $scope.model.nombre;
			objTarea.propietario = "";
			objTarea.estado = "NoAsignada";
			objTarea.tarea = $scope.tareasNuevas;
			APIClient.postTarea(objTarea).then(

				//primero siempre el succes
				function(data){
					if(!data.result){
						alert(data.err);
					}else{
		
						$scope.model = data.rows
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
		}

		// Controller start
		$scope.$emit("ChangeTitle", "Cargando");
		APIClient.getProyectoId($routeParams.id).then(

			//primero siempre el succes
			function(data){
				if(!data.result){
					alert(data.err);
				}else{
					$scope.model = data.rows[0];
					$scope.$emit("ChangeTitle", $scope.model.nombre);
					
					if($scope.model.length == 0){
						$scope.uiState = "blank";
					}else{
						$scope.uiState = "ideal";
					}
					$scope.getDetailURL = function(){
						
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