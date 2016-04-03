"use strict";

// Cargamos la librería
var express = require('express');
require("./lib/connectMongoose");
var fs = require("fs");
var mongoose = require('mongoose');
require("./models/proyecto_models");
var Proyecto = mongoose.model("Proyecto");
require("./models/usuarios_models");  
var Usuario = mongoose.model("Usuario");
var async = require("async");


//Promesa que borra la base de datos de los proyectos.
var deleteProyectos = function (){

	return new Promise(function(resolve, reject) {
		Proyecto.remove({}, function(err) {
		    if (err) {
		    	reject(new Error("ERROR AL ELIMINAR PROYECTO"));
		        return;
		    }
		    console.log("ELIMINADO PROYECTOS");
		    resolve();
			return;
		});
	});
};

//Promesa que borra la base de datos de los usuarios.
var deleteUsuario = function (){

	return new Promise(function(resolve, reject) {
		Usuario.remove({}, function(err) {
		    if (err) {
		    	reject(new Error("ERROR AL ELIMINAR USUARIOS"));
		        return;
		    }
		    console.log("ELIMINADO USUARIOS");
		    resolve();
			return;
		});
	});
};

//Promesa que lee el json donde están los proyectos precargados y recoge los datos
var leerFicheroProyectos = function(){

	return new Promise(function(resolve, reject) {
		fs.readFile("./models/proyecto.json", {encoding:"utf8"}, function(error, data){
			if(error){
				reject(new Error("Error al leer el fichero proyecto.json", error));
				return;
			}

			var data = JSON.parse(data);
			console.log("LEIDO FICHERO PROYECTOS");
			resolve(data);
		});
	});
};

//Promesa que lee el json donde están los usuarios precargados y recoge los datos
var leerFicheroUsuarios = function(){

	return new Promise(function(resolve, reject) {
		fs.readFile("./models/usuarios.json", {encoding:"utf8"}, function(error, data){
			if(error){
				reject(new Error("Error al leer el fichero usuario.json", error));
				return;
			}

			var data = JSON.parse(data);
			console.log("LEIDO FICHERO USUARIOS");
			resolve(data);
		});
	});
};
	
// Promesa que guarda en la base de datos los proyectos leídos del json
var saveProyectos = function(data){
	
	return new Promise(function(resolve, reject) {
	
		
		async.each(data.proyectos, function(data, cb) {
			var new_proyecto = new Proyecto(data);
			new_proyecto.save(function(err, newRow){
		    	if(err){
		    		console.log("ERROR AL GUARDAR PROYECTO");
		    		cb();
		    		return;
		    	}
		    	console.log("GUARDADO PROYECTO");
		    	cb();
		    });


		}, function(err){
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

};

// Promesa que guarda en la base de datos los usuarios leídos del json
var saveUsuarios = function(data){
	
	return new Promise(function(resolve, reject) {
	
		
		async.each(data.usuarios, function(data, cb) {
			var new_user = new Usuario(data);
			new_user.save(function(err, newRow){
		    	if(err){
		    		//res.json({result:false, err:err});
		    		console.error("ERROR AL GUARDAR USUARIOS");
		    		cb();
		    		return;
		    	}
		    	console.log("GUARDADO USUARIOS");
		    	cb();
		    	
		    });


		}, function(err){
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

};


//Empieza la serie de promesas
deleteProyectos()
	.then(leerFicheroProyectos)
	.then(saveProyectos)
	.then(deleteUsuario)
	.then(leerFicheroUsuarios)
	.then(saveUsuarios)
	
	.then( function() {
		console.log("FIN");
		process.exit();
	})
	.catch( function(error) {
		console.log("ERROR EN PROMESAS");
		process.exit(1);
	});