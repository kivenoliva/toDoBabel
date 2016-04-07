"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Usuario = mongoose.model("Usuario");
var Proyecto = mongoose.model("Proyecto");
var async = require("async");

var arrayMiembros = [];

var getUsers = function(miembros){
	return new Promise(function(resolve, reject) {
		
		console.log(miembros);
		async.each(miembros, function(data, cb) {
			console.log("data", data);
			var query = Usuario.find({nombre: data});
			query.exec(function(err, newRow){ 
			    	if(err){
			    		console.log("Error al encontrar al usuario");
			    		cb();
			    		return;
			    	}
			    	console.log(newRow[0]);
			    	arrayMiembros.push(newRow[0]);
			    	cb();
		    	});


		}, function(err,data){
		    // if any of the file processing produced an error, err would equal that error
		    if( err ) {
		      // One of the iterations produced an error.
		      // All processing will now stop.
		      console.log("ERROR Al final de async.each");
		      reject();
		    } else {
		      console.log("Finalizado async.each");
		      resolve(data);
		    }
		});
		
	});


}

//Método get que devuelve una lista con todos los usuarios, por si fuera necesario.
router.get('/', function(req, res, next) {
    var query = Usuario.find({});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener todos los usuarios de la base de datos."});
            return;
        }
        res.json({result: true, rows: rows});
        return;
    });
});

//Método get que devuelve todos los usuarios de un proyecto.
router.get('/proyecto/:id', function(req, res, next) {
    var query = Proyecto.find({_id: req.params.id});
    query.exec(function(err, rows){
        if (err){
            res.json({result: false, err: "Error al obtener un proyecto de la base de datos."});
            return;
        }
        if(rows.length == 0){
        	  res.json({result: false, err: "El id que me has pasado está mal"});
            return;

        }
	getUsers(rows[0].miembros).then( function() {
		console.log("FIN");
		var respuesta = arrayMiembros;
		arrayMiembros = [];
		res.json({result: true, rows: respuesta});
        		return;
	}).catch( function(error) {
		console.log("ERROR EN PROMESAS");
		//process.exit(1);
	});
        
    });
});

module.exports = router;

