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

        this.modificarTarea = function(tarea){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            //var urlBien  = URL.resolve(api_paths.tareasUsuario, {id: id});
            $http.put(api_paths.modificarTarea, tarea).then(
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

        this.getProyectoId = function(id){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            var urlBien  = URL.resolve(api_paths.detalleProyecto, {id: id});
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

        this.modificarProyecto = function(proyecto){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            //var urlBien  = URL.resolve(api_paths.tareasUsuario, {id: id});
            $http.put(api_paths.proyectos, proyecto).then(
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

        this.postProyecto = function(proyecto){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            //var urlBien  = URL.resolve(api_paths.tareasUsuario, {id: id});
            $http.post(api_paths.proyectos, proyecto).then(
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

        this.getGente = function(){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            $http.get(api_paths.gente).then(
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

        this.getMiembrosProyecto = function(id){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            var urlBien  = URL.resolve(api_paths.miembrosProyecto, {id: id});
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

        this.postTarea = function(tarea){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            //var urlBien  = URL.resolve(api_paths.tareasUsuario, {id: id});
            $http.post(api_paths.nuevaTarea, tarea).then(
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

        this.deleteTarea = function(idP, idT){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            var urlBien  = URL.resolve(api_paths.borrarTarea, {idP: idP, idT: idT});
            console.log("URL", urlBien);
            $http.delete(urlBien).then(
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

        this.deleteProyecto = function(id){
            //Crear el objeto diferido
            var deferred = $q.defer();
            //Hacer trabajo asíncrono
            console.log("id apiCliente", id)
            var urlBien  = URL.resolve(api_paths.borrarProyecto, {id: id});
            $http.delete(urlBien).then(
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