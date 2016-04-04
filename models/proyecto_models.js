"use strict";

var mongoose = require('mongoose');

//Creo el esquema que tendrá un proyecto 
var proyectoSchema = mongoose.Schema({
	nombre: String,
	miembros: [String],
	fecha_creación: String,
	tareas:[{ tarea: String, estado: String, propietario:String, proyecto:String }]	
});

//La tarea puede tener los siguientes estados: NoAsignada, SinEmpezar, Haciendose, Terminada.

var Proyecto = mongoose.model("Proyecto", proyectoSchema);