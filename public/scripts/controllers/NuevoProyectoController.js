angular.module("toDoBabel").controller("NuevoProyectoController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "ideal";
		$scope.model = {};
		$scope.usuario = autentication.getLoginLocal()[1];
		$scope.tareasSumadas = [];
		$scope.formatoFecha = new Date("0000/00/00");
		

		//Scope methods
		$scope.volver = function(){
			$location.url(paths.proyectos);
		};

		$scope.sumarTarea = function(){
			
			$scope.tareasSumadas.push($scope.model.tareas);
			
		};

		$scope.sumarProyecto = function(){
		
			//Con lo que me llega construyo un array a los miembros y tareas.
			var arrayMiembros = [];
			arrayMiembros = $scope.model.miembros.split(",");
			$scope.model.miembros = arrayMiembros;
			console.log($scope.model);

			//Construyo las tareas
			console.log($scope.tareasSumadas);
			var arrayTareasConstruidas = [];
			for(var i = 0; i < $scope.tareasSumadas.length; i++){
				console.log("entra for");
				var objTarea = {};
				objTarea.proyecto = $scope.model.nombre;
				objTarea.propietario = "";
				objTarea.estado = "NoAsignada";
				objTarea.tarea = $scope.tareasSumadas[i];

				arrayTareasConstruidas.push(objTarea);

			}
			$scope.model.tareas = arrayTareasConstruidas;


			var fecha = $scope.formatoFecha.toString().split(" ");
			var array = [fecha[0], fecha[1], fecha[2], fecha[3]];
			var fechaBD = array.join(" ");
			console.log(array);
			$scope.model.fecha = fechaBD;

			//Ya tengo el objeto bien en model para llamar al post
			APIClient.postProyecto($scope.model).then(

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
		
		};

	}]
);