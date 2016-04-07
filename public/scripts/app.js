//Defino el módulo "toDoBabel"
angular.module("toDoBabel",['ngRoute',  "ngSanitize"]).config(
	["$routeProvider","paths", function($routeProvider,paths){
		//Configuro las URLS de la app
		$routeProvider
			.when(paths.home, {
				redirectTo: paths.proyectos
			}).when(paths.detalleProyecto, {
				templateUrl: 'views/DetalleProyecto.html'
			}).when(paths.proyectos, {
				templateUrl: 'views/Proyectos.html'
			}).when(paths.login, {
				templateUrl: 'views/Login.html'
			}).when(paths.registro, {
				templateUrl: 'views/Registro.html'
			}).when(paths.erroresLogin, {
				templateUrl: 'views/ErroresLogin.html'
			}).when(paths.proyectosUser, {
				templateUrl: 'views/ProyectosUsuario.html'
			}).when(paths.tareasUser, {
				templateUrl: 'views/TareasUsuario.html'
			}).when(paths.modificarProyecto, {
				templateUrl: 'views/ModificarProyecto.html'
			}).when(paths.nuevoProyecto, {
				templateUrl: 'views/NuevoProyecto.html'
			}).when(paths.gente, {
				templateUrl: 'views/Gente.html'
			}).otherwise({
				templateUrl: 'views/404.html'
			})
	}]
);
