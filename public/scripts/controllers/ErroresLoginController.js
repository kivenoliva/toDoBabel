angular.module("toDoBabel").controller("ErroresLoginController",
    ["$scope","$location","paths", "autentication", function($scope,$location,paths, autentication){

        // Scope init
        $scope.uiState = "loading";
        $scope.mensaje = $scope.$parent.mensajesErrorLogin;
        console.log("Errores controller");

        $scope.loginErrores = function(){

            console.log("Volvemos al Login");
            $scope.$emit("VuelvoALogin", $scope);
        };

        $scope.registroErrores = function(){
            console.log("Me pinchan en registro");
            $scope.$emit("MandoARegistro", $scope);
        };
        
    }]
);