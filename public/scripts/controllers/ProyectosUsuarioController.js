angular.module("toDoBabel").controller("ProyectosUsuarioController",
    ["$scope", "$location", "autentication", "paths", "APIClient", "$sce","$routeParams", "URL",
     function($scope, $location, autentication, paths, APIClient, $sce, $routeParams, URL){
        
        //Scope init
        $scope.uiState = "loading";
        $scope.model = [];
        $scope.usuario = autentication.getLoginLocal()[1];
        //globales que mantengo actualizadas para el tema de paginacion
        $scope.empiece = 0;
        $scope.limite = 4;
        $scope.sinDatos = false;

        // Scope métodos
        $scope.getMovieDetailURL = function(proyecto){
            return URL.resolve(paths.detalleProyecto, {id: proyecto._id});
        };

        $scope.nextPaginacion = function(){

            $scope.empiece = $scope.empiece + $scope.limite;
            APIClient.getProyectosUsuario($scope.usuario, $scope.empiece, $scope.limite).then(
                //primero siempre el succes
                function(data){
                    if(!data.result){
                        alert(data.err);
                    }else{
                        $scope.model = data.rows;

                        if($scope.model.length == 0){
                            $scope.uiState = "blank";
                            $scope.sinDatos = true;
                        }else if($scope.model.length < 4){
                            $scope.uiState = "ideal";
                            $scope.sinDatos = true;
                        }else{
                                $scope.uiState = "ideal";
                                $scope.sinDatos = false;
                            }
                    }   
                },

                //segundo si ha habido error
                function(data){
                    $log.error("Error", data);
                    $scope.uiState = "error";
                }
            );
        };

        $scope.previusPaginacion = function(){

            $scope.empiece = $scope.empiece - $scope.limite;
            console.log( $scope.empiece,  $scope.limite)
            APIClient.getProyectosUsuario($scope.usuario, $scope.empiece, $scope.limite).then(
                //primero siempre el succes
                function(data){
                    if(!data.result){
                        alert(data.err);
                    }else{
                        $scope.model = data.rows;

                        if($scope.model.length == 0){
                            $scope.uiState = "blank";
                            $scope.sinDatos = true;
                        }else{
                            $scope.uiState = "ideal";
                            $scope.sinDatos = false;
                        }
                    }   
                },

                //segundo si ha habido error
                function(data){
                    $log.error("Error", data);
                    $scope.uiState = "error";
                }
            );
        };

        
        // Controller start
        console.log($scope.usuario)
        APIClient.getProyectosUsuario($scope.usuario).then(

            //primero siempre el succes
            function(data){

                if(!data.result){
                    alert(data.err);
                }else{
                    //console.log(data.rows);
                    $scope.model = data.rows;

                    if($scope.model.length == 0){
                        $scope.uiState = "blank";
                        $scope.sinDatos = true;
                    }else if($scope.model.length < 4){
                        $scope.uiState = "ideal";
                        $scope.sinDatos = true;
                    }else{
                        $scope.uiState = "ideal";
                        $scope.sinDatos = false;
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