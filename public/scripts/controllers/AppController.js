angular.module("toDoBabel").controller("AppController",
	["$scope", "$location", "autentication", "paths", function($scope, $location, autentication, paths){

		var controller = this;
		//Controller properties
		controller.titles = {};
		controller.titles[paths.home] = "Películas Babel";
		controller.titles[paths.proyectos] = "Proyectos de la empresa";
		controller.titles[paths.login] = "Login";
		controller.titles[paths.registro] = "Registro";



		//Model init
		$scope.model = {
			title: ""
		};
		$scope.notLogin = false;
		$scope.mensajesErrorLogin = "";

		$scope.$on("EstoyEnLogin", function(event, data) {
			$scope.$broadcast("Login", $scope);
		});

		$scope.$on("NoEstoyLogin", function(event, data) {
			$scope.$broadcast("NoLogin", $scope);
		});

		$scope.$on("MandoARegistro", function(event, data) {
		// event contiene datos propios del evento
		// data contiene los datos adjuntos procedentes del scope hijo
			$scope.notLogin = true;
			$location.url(paths.registro);
		});

		$scope.$on("ErroresLogin", function(event, data) {
		// event contiene datos propios del evento
		// data contiene los datos adjuntos procedentes del scope hijo
			$scope.notLogin = true;
			$scope.mensajesErrorLogin = data;
			$location.url(paths.erroresLogin);
		});

		$scope.$on("VuelvoALogin", function(event, data) {
		// event contiene datos propios del evento
		// data contiene los datos adjuntos procedentes del scope hijo
			$scope.notLogin = false;
			$location.url(paths.login);
		});

		$scope.$on("TerminoRegistro", function(event, data) {
		// event contiene datos propios del evento
		// data contiene los datos adjuntos procedentes del scope hijo
			$scope.notLogin = false;
		});

		$scope.$on("$locationChangeSuccess", function(event,currentRoute){
			$scope.model.title = controller.titles[$location.path()] || "404 Not Found";

			if(!autentication.getLoginLocal()[0] && !$scope.notLogin){
				console.log("No estas logeado");
				//$scope.$emit("alLogin");
				$location.url(paths.login);

				
			}else{
				console.log("Estas logueado con usuario : ",autentication.getLoginLocal()[1] );
			}			
		});
		
	}]
);