angular.module("toDoBabel").controller("MenuController",
	["$scope", "$location", "autentication", "paths", function($scope, $location, autentication, paths){

		//Scope init
		$scope.model = {
			selectedItem: $location.path()
		};
		$scope.paths = paths;
		$scope.view = "";

		$scope.$on("Login", function(event, data) {
			$scope.view = "login";
		});
		$scope.$on("NoLogin", function(event, data) {
			$scope.view = "";
		});

		//Scope methods
		$scope.getClassForItem = function(item){
			if($scope.model.selectedItem == item){
				return "active";
			}else{
				return "";
			}
		}
		$scope.logout = function(){

			autentication.logoutLocal();
			console.log("He hecho logout");
			$location.url(paths.login);			
		};
		//Scope event listeners
		$scope.$on("$locationChangeSuccess", function(event,currentRoute){	
			$scope.model.selectedItem = $location.path();	
		});

		
		
	}]
);