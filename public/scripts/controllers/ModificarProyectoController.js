angular.module("toDoBabel").controller("ModificarProyectoController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.usuario = autentication.getLoginLocal()[1];
		$scope.formatoFecha = new Date("2016/4/28");
		

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

			//hago chanchullo con la fecha para mandarsela en string bien construido a la base de datos			
			var fecha = $scope.formatoFecha.toString().split(" ");
			var array = [fecha[0], fecha[1], fecha[2], fecha[3]];
			var fechaBD = array.join(" ");
			console.log(array);
			$scope.model.fecha = fechaBD;

			APIClient.modificarProyecto($scope.model).then(

				//primero siempre el succes
				function(data){

					if(!data.result){
                        alert(data.err);
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
		$scope.$emit("ChangeTitle", "Cargando");  
		APIClient.getProyectoId($routeParams.id).then(

			//primero siempre el succes
			function(data){
				

				if(!data.result){
                    alert(data.err);
                }else{
                    $scope.model = data.rows[0];
                    $scope.$emit("ChangeTitle", "Modificar Proyecto");   
					$scope.formatoFecha = new Date($scope.model.fecha);

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