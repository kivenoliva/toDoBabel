angular.module("toDoBabel").controller("LoginController",
    ["$scope","$location","paths", "autentication", function($scope,$location,paths, autentication){

        // Scope init
        $scope.uiState = "loading";
        $scope.model = {};
        $scope.user = [];
        $scope.registro = "";


        // Scope methods
        $scope.login = function(){
            console.log("Me pinchan en login");
            $scope.registro = false;
            /*
            autentication.setLogin($scope.model.name,true);
            console.log("Acabo de loguearme con el usuario : ", $scope.model.name);
            pubSub.publish();
            $location.url(paths.listado);           
            */
        };

        $scope.registro = function(){
            console.log("Me pinchan en registro");
            $scope.registro = true;
        };
        
    }]
);