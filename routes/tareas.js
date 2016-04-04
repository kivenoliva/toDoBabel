"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Proyecto = mongoose.model("Proyecto");

// Función que me devuelve las tareas filtradas por un usuario.
function selecTareas(proyectos, user){

    //Selecciono los proyectos del usuario que me pasan
    var arrayProyectosSelecc = [];
    
    for (var i = 0 ; i < proyectos.length ; i++){
        if(proyectos[i].miembros.indexOf(user) != -1){
            arrayProyectosSelecc.push(proyectos[i]);
        }
    }

    //Aqui tengo los proyectos enteros que tiene el usuario
    //Ahora filtro solo para sus tareas de cada proyecto
    var tareasUser = [];

    for (var i = 0 ; i < arrayProyectosSelecc.length ; i++){

        for (var j = 0; j < arrayProyectosSelecc[i].tareas.length; j++){
            if(arrayProyectosSelecc[i].tareas[j].propietario == user){
                tareasUser.push(arrayProyectosSelecc[i].tareas[j]);
            }
        }
    }
    return tareasUser;
};


function borrarTarea(proyecto, tarea, res){
    
    var tareasNuevas = [];
    var tareaEncontrada = false;
    
    for(var i = 0; i < proyecto[0].tareas.length; i++){
        
        if (proyecto[0].tareas[i].tarea != tarea.tarea){
            tareasNuevas.push(proyecto[0].tareas[i]);
        }else{
            tareaEncontrada = true;
        }
    }

    if(!tareaEncontrada){
        res.json({result: false, err: "La tarea que quieres borrar no está en el proyecto. Revisa la tarea"});
        return;
    }


    var proyectoModificado = {         
        nombre: proyecto[0].nombre,
        miembros: proyecto[0].miembros,
        tareas: tareasNuevas,
        fecha_creación: proyecto[0].fecha_creación,
        _id: proyecto[0]._id
    }

    //instancio nuevo proyecto para guardar en memoria
    var new_proyecto = new Proyecto(proyectoModificado);
    
    Proyecto.remove({nombre: proyectoModificado.nombre}, function(err, rows) {
        if (err) {
            res.json({result: false, err: "Error al eliminar el proyecto."});
            return;
        }

        if (rows.result.n == 0){
            res.json({result: false, err: "El proyecto a borrar no existe. Revisa el nombre"});
            return;
        }

        console.log("ELIMINADO PROYECTO");
        new_proyecto.save(function(err, newRow){
            if(err){
                res.json({result: false, err: "Error al guardar el proyecto"});
                return;
            }
            console.log("Proyecto guardado");
            return;
        });
    });
};


//Método get que devuelve una lista con las tareas de un usuario
router.get('/:nombre', function(req, res, next) {
            
    var user = req.params.nombre;

    var query = Proyecto.find({});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener todos los proyectos de la base de datos."});
            return;
        }

        //Aquí tengo todos los proyectos
        var tareasUser = selecTareas(rows, user);
        res.json({result: true, rows: tareasUser});
        return;
    });
 
});



//Método put que cambia algo de una tarea y te devuelve la tarea cambiada
router.put('/', function(req, res, next) {
            
    var query = Proyecto.find({ nombre : req.body.proyecto});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener proyecto de la base de datos."});
            return;
        }

        if(rows.length == 0){
            res.json({result: false, err: "El proyecto de la tarea que quieres cambiar no existe."});
            return;
        }

        var tareasNuevas = [];
        var tareaEncontrada = false;
    
        //Me recorro las tareas y guardo todas menos la que hay que modificar y en su lugar guardo
        // la que me pasan en el body
        for(var i = 0; i < rows[0].tareas.length; i++){
            
            if (rows[0].tareas[i].tarea == req.body.tarea){
                tareasNuevas[i] = req.body;
                tareaEncontrada = true;
            }else{
                tareasNuevas[i] = rows[0].tareas[i];
            }

        }

        // Si la tarea que me mandan no estaba en el proyecto aviso al usuario y corto.
        if(!tareaEncontrada){
            res.json({result: false, err: "La tarea que quieres modificar no está en el proyecto"});
            return;
        }

        //Me contruyo el nuevo proyecto con la tarea modificada
        var proyectoModificado = {
            
            nombre: rows[0].nombre,
            miembros: rows[0].miembros,
            tareas: tareasNuevas,
            fecha_creación: rows[0].fecha_creación,
            _id: rows[0]._id
        }

        //instancio nuevo proyecto para guardar en memoria
        var new_proyecto = new Proyecto(proyectoModificado);
        
        //Borro el proyecto anterior y en su lugar guardo el nuevo con la tarea modificada
        Proyecto.remove({nombre: proyectoModificado.nombre}, function(err, rows) {
            if (err) {
                res.json({result: false, err: "Error al eliminar el proyecto."});
                return;
            }

            if (rows.result.n == 0){
                res.json({result: false, err: "El proyecto a borrar no existe. Revisa el nombre"});
                return;
            }

            console.log("ELIMINADO PROYECTO");
            new_proyecto.save(function(err, newRow){
                if(err){
                    res.json({result: false, err: "Error al guardar el proyecto"});
                    return;
                }
                console.log("Tarea modificada");
                res.json({result: true, rows: newRow});
                return newRow;
            });

        });
    });

});

//Método delete que borra una tarea
router.delete('/', function(req, res, next) {
    var query = Proyecto.find({ nombre : req.body.proyecto});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener proyecto de la base de datos."});
            return;
        }

        if (rows.length == 0){
            res.json({result: false, err: "El proyecto de la tarea a borrar no existe."});
            return;
        }

        borrarTarea(rows, req.body, res);
        res.json({result: true, rows: "Tarea borrada correctamente"});
        return;
    });
});

//Método post que añade una tarea nueva
router.post('/', function(req, res, next) {

    console.log(req.body.proyecto)
    //res.json({result: false, err: "Error al obtener proyecto de la base de datos."});
    
    var query = Proyecto.find({ nombre : req.body.proyecto});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener proyecto de la base de datos."});
            return;
        }

        if (rows.length == 0){
            res.json({result: false, err: "El proyecto de la tarea no existe. Revisa o crea antes un proyecto"});
            return;
        }

        //Sólo me debe devolver un proyecto, porque controlo nombre único, por eso a pincho meto rows[0]
        var tareasNuevas = rows[0].tareas;
        tareasNuevas.push(req.body);
        console.log(tareasNuevas);

        var proyectoModificado = {
            nombre: rows[0].nombre,
            miembros: rows[0].miembros,
            fecha_creación: rows[0].fecha_creación,
            tareas: tareasNuevas,
            _id: rows[0]._id
        }

        //instancio nuevo proyecto para guardar en memoria
        var new_proyecto = new Proyecto(proyectoModificado);
    
        Proyecto.remove({nombre: proyectoModificado.nombre}, function(err, rows) {
            if (err) {
                res.json({result: false, err: "Error al eliminar el proyecto."});
                return;
            }

            if (rows.result.n == 0){
                res.json({result: false, err: "El proyecto a borrar no existe. Revisa el nombre"});
                return;
            }

            console.log("ELIMINADO PROYECTO");
            new_proyecto.save(function(err, newRow){
                if(err){
                    res.json({result: false, err: "Error al guardar el proyecto"});
                    return;
                }
                console.log("Tarea añadida");
                res.json({result: true, rows: newRow});
                return;
            });
        }); 
    });

});


module.exports = router;
