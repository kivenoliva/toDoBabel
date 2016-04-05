angular.module("toDoBabel").service("autentication", ["$http", "$log", "api_paths", "$q", function($http, $log, api_paths, $q){
	
	var userLogin = [false, ""];


	this.getLoginLocal = function(){
		var user = localStorage.getItem("usuarioLogueado");
		if( user == ""){
			userLogin[0] = false;
			userLogin[1] = "";
		}else{
			userLogin[0] = true;
			userLogin[1] = user;
		}
		return userLogin;
	};

	this.setLoginLocal = function(user,bool){
		userLogin[0] = bool;
		userLogin[1] = user;
		localStorage.setItem("usuarioLogueado", user);

	};

	this.logoutLocal = function(){
		userLogin[0] = false;
		userLogin[1] = "";
		localStorage.setItem("usuarioLogueado", "");
	};


	this.registro = function(datos_registro){
		//Crear el objeto diferido
		var deferred = $q.defer();
		//Hacer trabajo asíncrono
		$http.post(api_paths.registro,datos_registro).then(
		    function(response){
		            //resolver la promesa
		            deferred.resolve(response.data);
		    },
		    function(response){
		            //rechazar la promesa
		            deferred.reject(response.data);
		    }
		);
		//devolver la promesa
		return deferred.promise; 
	};

	this.getLogin = function(datos_login){
		
		//Crear el objeto diferido
		var deferred = $q.defer();
		//Hacer trabajo asíncrono
		$http.post(api_paths.login,datos_login).then(
		    function(response){
		            //resolver la promesa
		            deferred.resolve(response.data);
		    },
		    function(response){
		            //rechazar la promesa
		            deferred.reject(response.data);
		    }
		);
		//devolver la promesa
		return deferred.promise; 
	};

	
}]);