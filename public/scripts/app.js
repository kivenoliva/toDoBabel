//Defino el módulo "toDoBabel"
angular.module("toDoBabel",['ngRoute']).config(
	["$routeProvider","paths", function($routeProvider,paths){
		//Configuro las URLS de la app
		$routeProvider
			.when(paths.home, {
				redirectTo: paths.proyectos
			}).when(paths.proyectos, {
				templateUrl: 'views/Proyectos.html'
			}).when(paths.login, {
				templateUrl: 'views/Login.html'
			}).otherwise({
				templateUrl: 'views/404.html'
			})
	}]
);
