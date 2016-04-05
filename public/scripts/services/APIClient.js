angular.module("toDoBabel").service("APIClient", 
    ["$http", "$q", "api_paths", "URL","$log", function($http, $q, api_paths, URL, $log){

        
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
        
        this.getProyectosUsuario = function(id){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            var urlBien  = URL.resolve(api_paths.proyectosUsuario, {id: id});
            $http.get(urlBien).then(
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

        this.getTareasUsuario = function(id){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            var urlBien  = URL.resolve(api_paths.tareasUsuario, {id: id});
            $http.get(urlBien).then(
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