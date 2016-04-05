angular.module("toDoBabel").controller("LoginController",
    ["$scope","$location","paths", "autentication", function($scope,$location,paths, autentication){

        // Scope init
        $scope.uiState = "loading";
        $scope.model = {};
        $scope.user = {};

        $scope.$emit("EstoyEnLogin", $scope);

        // Scope methods
        $scope.login = function(){

            console.log("Me pinchan en login");
            //Contruyo objeto que paso a la API
            var datos_login = {};
            datos_login.nombre = $scope.model.name;
            datos_login.clave = $scope.model.password;

            //Scope start
            autentication.getLogin(datos_login).then(
                //postMessage(Message, transferList)cula encontrada
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
                //Pelicula no encontrada
                function(error){
                    $location.url(paths.notFound);
                }
            );
            /*
            autentication.setLogin($scope.model.name,true);
            console.log("Acabo de loguearme con el usuario : ", $scope.model.name);
            pubSub.publish();
            $location.url(paths.listado);           
            */
        };

        $scope.registroLogin = function(){
            console.log("Me pinchan en registro");
            $scope.$emit("MandoARegistro", $scope);
        };
        
    }]
);