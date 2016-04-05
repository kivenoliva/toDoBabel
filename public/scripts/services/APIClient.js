angular.module("toDoBabel").service("APIClient", 
    ["$http", "$q", "api_paths", function($http, $q, api_paths){

        
        this.getProyectos = function(){
        //Crear el objeto diferido
        var deferred = $q.defer();
        //Hacer trabajo asíncrono
        $http.get(api_paths.proyectos).then(
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
    }]
);