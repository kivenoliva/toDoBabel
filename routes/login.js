"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Usuario = mongoose.model("Usuario");
var sha256 = require("sha256");


//Método para preguntar si un usuario que se loguea a la aplicacion, estaba registrado.
router.post("/", function(req, res, next) {
    console.log(req.body);
    var userName = req.body.nombre;
    var userPass = req.body.clave;

    //controlo si tengo al usuario en la base de datos.
    var query = Usuario.find({nombre: userName});
    
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Problema al buscar el usuario en la base de datos"});
            return;
        }

        //Ha ido bien la búsqueda, puede que me den resultados o no.
        if (rows.length === 0){
            console.log("Ese usuario no está en la base de datos");
            res.json({result: false, err: "No estás registrado, debes registrarte"});
            return;
        }

        console.log("El usuario está en la base de datos, comprobamos su contraseña");

        //Ha encontrado al usuario en la base de datos, por tanto comprobamos si la contraseña coincide

        //hasheo la contraseña metida
        var passEnterHasheada = sha256(userPass);

        // Recupero la contraseña del usuario para compararla con la metida. 
        var passUserDB = rows[0].clave;  //ya me viene hasheada de la base de datos.

        if ( passEnterHasheada !== passUserDB){
  
            res.json({result: false, err: "Nombre existente, pero contraseña incorrecta"});
            return;
        };

        res.json({result: true, rows: rows[0]});   //El usuario estaba registrado
        return;

    })
});

module.exports = router;