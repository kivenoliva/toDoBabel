angular.module("toDoBabel").controller("GenteController",
	["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
	 function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
		
		//Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.usuario = autentication.getLoginLocal()[1];
		
		APIClient.getGente().then(

			//primero siempre el succes
			function(data){

				if(!data.result){
                    alert(data.err);
                }else{
                    $scope.model = data.rows;
					console.log("despues", $scope.model)
					if($scope.model.length == 0){
						$scope.uiState = "blank";
					}else{
						$scope.uiState = "ideal";
					}
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