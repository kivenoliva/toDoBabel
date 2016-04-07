angular.module("toDoBabel").controller("ModificarProyectoController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.usuario = autentication.getLoginLocal()[1];

		//Scope methods
		$scope.volver = function(){
			var urlBien = URL.resolve(paths.detalleProyecto, {id: $scope.model._id});
			$location.url(urlBien);
		}

		$scope.modificarProyecto = function(){
			//compruebo si han tocado los miembros
			if(typeof($scope.model.miembros) == "string"){
				var string = $scope.model.miembros;
				var array = string.split(",");
				$scope.model.miembros = array;
			}
			
			for(var i = 0; i<$scope.model.tareas.length; i++){
				$scope.model.tareas[i].proyecto = $scope.model.nombre;
			}

			/*
			//hacer put en la base de datos
			//hago chanchullo con la fecha para mandarsela en string bien construido a la base de datos
			var obj = $scope.model;
			var fecha = obj.fecha.toString().split(" ");
			var array = [fecha[0], fecha[1], fecha[2], fecha[3]];
			var fechaBD = array.join(" ");
			obj.fecha = fechaBD.toString();
			*/

			APIClient.modificarProyecto($scope.model).then(

				//primero siempre el succes
				function(data){

					if(!data.result){
                        $scope.$emit("ErroresLogin", data.err);
                    }else{
                        $scope.model = data.rows;
						//console.log("despues", $scope.model)
						var urlBien = URL.resolve(paths.detalleProyecto, {id: $scope.model._id});
						$location.url(urlBien);
		
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
		APIClient.getProyectoId($routeParams.id).then(

			//primero siempre el succes
			function(data){
				

				if(!data.result){
                    $scope.$emit("ErroresLogin", data.err);
                }else{
                    $scope.model = data.rows[0];
					/*
					//transformo la fecha que me viene en string a date para el formulario.
					$scope.model.fecha = new Date($scope.model.fecha);
					console.log($scope.model.fecha)
					*/
					//console.log($scope.model);
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