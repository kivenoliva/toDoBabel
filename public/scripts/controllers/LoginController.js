angular.module("toDoBabel").controller("LoginController",
    ["$scope","$location","paths", "autentication", function($scope,$location,paths, autentication){

        // Scope init
        $scope.uiState = "loading";
        $scope.model = {};
        $scope.user = {};

        $scope.$emit("EstoyEnLogin", $scope);

        // Scope methods
        $scope.login = function(){

            //Contruyo objeto que paso a la API
            var datos_login = {};
            datos_login.nombre = $scope.model.name;
            datos_login.clave = $scope.model.password;

            //Scope start
            autentication.getLogin(datos_login).then(
                //success
                function(data){
                    if(!data.result){
                        $scope.$emit("ErroresLogin", data.err);
                        
                    }else{
                        //Como estoy logueado, me lo guardo en local para mi navegador
                        $scope.user = data.rows;
                        autentication.setLoginLocal(data.rows.nombre,true);
                        $scope.$emit("NoEstoyLogin", $scope);
                        $location.url(paths.proyectos);
                    }
                    
                }, 
                //datos encontrada
                function(error){
                    $location.url(paths.notFound);
                }
            );
        };

        $scope.registroLogin = function(){
            console.log("Me pinchan en registro");
            $scope.$emit("MandoARegistro", $scope);
        };
        
    }]
);