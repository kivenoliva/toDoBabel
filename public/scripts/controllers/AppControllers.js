angular.module("toDoBabel").controller("AppController",
	["$scope", "$location", "autentication", "paths", function($scope, $location, autentication, paths){

		var controller = this;
		//Controller properties
		controller.titles = {};
		controller.titles[paths.home] = "Películas Babel";
		controller.titles[paths.proyectos] = "Proyectos de la empresa";
		controller.titles[paths.login] = "Login";


		//Model init
		$scope.model = {
			title: ""
		};

		
		//Scope EventListeners
		$scope.$on("$locationChangeSuccess", function(event,currentRoute){
			$scope.model.title = controller.titles[$location.path()] || "404 Not Found";
			/*
			if(!autentication.getLogin()[0]){
				console.log("No estas logeado");
				//$scope.$emit("alLogin");
				$location.url(paths.login);

				
			}else{
				console.log("Estas logueado con usuario : ",autentication.getLogin()[1] );
			}
			*/
		});
		

	}]
);