"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Proyecto = mongoose.model("Proyecto");


/*Funcion que comprueba si el nombre ya está guardado en la base de datos*/
function nombreUnico (nombre, callback){

    var query = Proyecto.find({nombre: nombre});
    query.exec(function(err, rows){
        if (err){
            callback(err);
            return;
        }
        console.log("ROWS", rows);
        if(rows.length == 0){
            callback(null, true);

        }else{
            callback(null, false);

        }
    });
};


//Método get que devuelve una lista con todos los proyectos de la empresa, por si fuera necesario.
router.get('/', function(req, res, next) {
    var query = Proyecto.find({});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener todos los proyectos de la base de datos."});
            return;
        }
        res.json({result: true, rows: rows});
        return;
    });
});

//Método que devuelve los proyectos de usuario metido
router.get('/usuario/:nombre', function(req, res, next) {
   var user = req.params.nombre;

    var query = Proyecto.find({});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener todos los proyectos de la base de datos."});
            return;
        }

        var arrayProyectosSelecc = [];
        
        for (var i = 0 ; i < rows.length ; i++){
        	if(rows[i].miembros.indexOf(user) != -1){
        		arrayProyectosSelecc.push(rows[i]);
        	}
        }

        res.json({result: true, rows: arrayProyectosSelecc});
        return;
    });

});

//Método que devuelve un proyecto por su id
router.get('/:id', function(req, res, next) {
   var user = req.params.nombre;

    var query = Proyecto.find({_id: req.params.id});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener todos los proyectos de la base de datos."});
            return;
        }

        res.json({result: true, rows: rows});
        return;
    });

});

//Método put que modifica un proyecto
router.put('/', function(req, res, next) {

    var new_proyecto = {
        
        nombre: req.body.nombre,
        miembros: req.body.miembros,
        tareas: req.body.tareas,
        fecha: req.body.fecha,
        _id: req.body._id
    }
    
    new_proyecto = new Proyecto(new_proyecto);

    var query = Proyecto.remove({_id: req.body._id});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener proyecto de la base de datos."});
            return;
        }

        if (rows.result.n == 0){
            res.json({result: false, err: "El proyecto a actualizar no existe. Revisa o haz un post"});
            return;
        }

        console.log("ELIMINADO PROYECTO");
        new_proyecto.save(function(err, newRow){
            if(err){
                res.json({result: false, err: "Error al guardar el proyecto"});
                return;
            }
            console.log("Guardado nuevo proyecto");
            res.json({result: true, rows: newRow});
            return;
        });
    });
    
});

//Método delete que borra un proyecto
router.delete('/:id', function(req, res, next) {

    console.log("llega delete", req.params.id);
    Proyecto.remove({_id: req.params.id}, function(err, rows) {
        if (err) {
            res.json({result: false, err: "Error al eliminar el proyecto."});
            return;
        }

        if (rows.result.n == 0){
            res.json({result: false, err: "El proyecto a borrar no existe. Revisa el nombre"});
            return;
        }

        res.json({result: true, rows: "Borrado correctamente"});
        return;
    });

});

//Método post que añade un proyecto nuevo
router.post('/', function(req, res, next) {

    var nombreOK = "";

    nombreUnico(req.body.nombre, function(error, result){
        if(error){
            res.json({result: false, err: err});
            return;
        }

        nombreOK = result;
        if(!nombreOK){
            res.json({result: false, err: "Ese nombre de proyecto ya está en uso, prueba otro"});
            return;
        }

        var new_proyecto = {
            nombre: req.body.nombre,
            miembros: req.body.miembros,
            tareas: req.body.tareas,
            fecha: req.body.fecha
        }

        new_proyecto = new Proyecto(new_proyecto);

        new_proyecto.save(function(err, newRow){
            if(err){
                res.json({result: false, err: "Error al guardar el proyecto"});
                return;
            }
            console.log("Guardado nuevo proyecto");
            res.json({result: true, rows: newRow});
            return;
        });
    }); 
});


module.exports = router;
