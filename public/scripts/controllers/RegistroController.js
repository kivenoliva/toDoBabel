angular.module("toDoBabel").controller("RegistroController",
	["$scope", "$location", "autentication", "paths", function($scope, $location, autentication, paths){

		$scope.model = {};
		$scope.successMessage = null;
		$scope.errorMessage = null;
		$scope.userRegistrado = {};

		console.log("Registro controller");
		$scope.$emit("EstoyEnLogin", $scope);

		$scope.registro = function(){

			var datos_registro = {};
			datos_registro.nombre = $scope.model.nombre;
			datos_registro.clave = $scope.model.clave;
			datos_registro.url_imagen = $scope.model.foto;
			datos_registro.email = $scope.model.email;			

			autentication.registro(datos_registro).then(
                //postMessage(Message, transferList)cula encontrada
                function(data){
                	console.log(data);
                    if(!data.result){
                        $scope.$emit("ErroresLogin", data.err);
                    }else{
                        //Como estoy logueado, me lo guardo en local para mi navegador
                        console.log(data);
                        $scope.userRegistrado = data.rows;
                        autentication.setLoginLocal(data.rows.nombre,true);
                        $scope.$emit("TerminoRegistro", $scope);
                        $scope.$emit("NoEstoyLogin", $scope);
                        $location.url(paths.proyectos);
                    }
                    
                }, 
                //Pelicula no encontrada
                function(error){
                    $location.url(paths.notFound);
                }
            );			

		};

		$scope.loginRegistro = function(){

			$scope.$emit("VuelvoALogin", $scope);
		};
		
	}]
);