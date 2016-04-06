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
			console.log($scope.model);

			//hacer put en la base de datos
		}

		// Controller start
		APIClient.getProyectoId($routeParams.id).then(

			//primero siempre el succes
			function(data){
				$scope.model = data.rows[0];
				//console.log($scope.model);
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