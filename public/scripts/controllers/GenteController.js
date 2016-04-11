angular.module("toDoBabel").controller("GenteController",
    ["$scope", "$location", "autentication", "paths", "APIClient", "$routeParams", "URL",
     function($scope, $location, autentication, paths, APIClient, $routeParams, URL){
        
        //Scope init
        $scope.uiState = "loading";
        $scope.model = [];
        $scope.usuario = autentication.getLoginLocal()[1];

        //globales que mantengo actualizadas para el tema de paginacion
        $scope.empiece = 0;
        $scope.limite = 6;
        $scope.sinDatos = false;


        //Scope methods
        $scope.nextPaginacion = function(){

            $scope.empiece = $scope.empiece + $scope.limite;
            APIClient.getGente($scope.empiece, $scope.limite).then(
                //primero siempre el succes
                function(data){
                    if(!data.result){
                        alert(data.err);
                    }else{
                        $scope.model = data.rows;

                        if($scope.model.length == 0){
                            $scope.uiState = "blank";
                            $scope.sinDatos = true;
                        }else if($scope.model.length < 6){
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
            console.log($scope.empiece, $scope.limite)
            APIClient.getGente($scope.empiece, $scope.limite).then(
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


        //Scope start
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
                        $scope.sinDatos = true;
                    }else if($scope.model.length < 6){
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