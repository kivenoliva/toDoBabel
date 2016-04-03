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

    for (i = 0 ; i < arrayProyectosSelecc.length ; i++){

        for (j = 0; j < arrayProyectosSelecc[i].tareas.length; j++){
            if(arrayProyectosSelecc[i].tareas[j].propietario == user){
                tareasUser.push(arrayProyectosSelecc[i].tareas[j]);
            }
        }
    }
    return tareasUser;
};


function modificarTarea(proyecto, tarea){

    var tareasNuevas = [];
    
    for(var i = 0; i < proyecto[0].tareas.length; i++){
        
        if (proyecto[0].tareas[i].tarea == tarea.tarea){
            tareasNuevas[i] = tarea;
        }else{
            tareasNuevas[i] = proyecto[0].tareas[i];
        }

    }

    var proyectoModificado = {
        
        "nombre": proyecto[0].nombre,
        "miembros": proyecto[0].miembros,
        "tareas": tareasNuevas
    }

    //instancio nuevo proyecto para guardar en memoria
    var new_proyecto = new Proyecto(proyectoModificado);
    
    Proyecto.remove({nombre: proyectoModificado.nombre}, function(err) {
            if (err) {
                console.log("ERROR AL ELIMINAR PROYECTO");
                return;
            }
            console.log("ELIMINADO PROYECTO");
            new_proyecto.save(function(err, newRow){
                if(err){
                    console.log("ERROR AL GUARDAR");
                    return;
                }
                console.log("GUARDADO");
                return newRow;
            });

    });

}

function borrarTarea(proyecto, tarea){
    
    var tareasNuevas = [];
    
    for(var i = 0; i < proyecto[0].tareas.length; i++){
        
        if (proyecto[0].tareas[i].tarea != tarea.tarea){
            tareasNuevas.push(proyecto[0].tareas[i]);
        }
    }


    var proyectoModificado = {
        
        "nombre": proyecto[0].nombre,
        "miembros": proyecto[0].miembros,
        "tareas": tareasNuevas
    }

    //instancio nuevo proyecto para guardar en memoria
    var new_proyecto = new Proyecto(proyectoModificado);
    
    Proyecto.remove({nombre: proyectoModificado.nombre}, function(err) {
            if (err) {
                console.log("ERROR AL ELIMINAR PROYECTO");
                return;
            }
            console.log("ELIMINADO PROYECTO");
            new_proyecto.save(function(err, newRow){
                if(err){
                    console.log("ERROR AL GUARDAR");
                    return;
                }
                console.log("GUARDADO");
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

        var newRow = modificarTarea(rows, req.body);
        res.json({result: true, rows: newRow});
        return;
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

        borrarTarea(rows, req.body);
        res.json({result: true, rows: "Tarea borrada correctamente"});
        return;
    });
});

//Método post que añade una tarea nueva
router.post('/', function(req, res, next) {
    var query = Proyecto.find({ nombre : req.body.proyecto});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener proyecto de la base de datos."});
            return;
        }

        var tareasNuevas = rows[0].tareas;
        tareasNuevas.push(req.body);
        console.log(tareasNuevas);

        var proyectoModificado = {
            "nombre": rows[0].nombre,
            "miembros": rows[0].miembros,
            "tareas": tareasNuevas
        }

        //instancio nuevo proyecto para guardar en memoria
        var new_proyecto = new Proyecto(proyectoModificado);
    
        Proyecto.remove({nombre: proyectoModificado.nombre}, function(err) {
                if (err) {
                    console.log("ERROR AL ELIMINAR PROYECTO");
                    return;
                }
                console.log("ELIMINADO PROYECTO");
                new_proyecto.save(function(err, newRow){
                    if(err){
                        console.log("ERROR AL GUARDAR");
                        return;
                    }
                    console.log("GUARDADO");
                    res.json({result: true, rows: "Tarea añadida"});
                    return;
                });

        });
        
    });

});




module.exports = router;
