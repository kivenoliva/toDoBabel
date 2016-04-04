angular.module("toDoBabel").service("autentication", ["$log", function($log){
	
	var userLoginApp = [false, ""];

	this.getLogin = function(){

		var user = localStorage.getItem("usuarioLogueado");
		console.log(user);
		if( user == ""){
			console.log("ENTRA");
			userLoginApp[0] = false;
			userLoginApp[1] = "";
		}else{
			userLoginApp[0] = true;
			userLoginApp[1] = user;
		}
		return userLoginApp;

	};

	
}]);