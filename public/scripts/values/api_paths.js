angular.module("toDoBabel").value("api_paths", {
	login: "/api/login",
	registro: "/api/registro",
	proyectos: "/api/proyectos",
	proyectosUsuario: "/api/proyectos/usuario/:id",
	tareasUsuario: "api/tareas/:id",
	modificarTarea: "api/tareas",
	detalleProyecto: "/api/proyectos/:id",
	gente:"/api/users",
	miembrosProyecto:"/api/users/proyecto/:id",
	nuevaTarea:"/api/tareas"
});