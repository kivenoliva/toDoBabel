"use strict";

var mongoose = require('mongoose');

//Creo el esquema que tendrá el usuario
var usuarioSchema = mongoose.Schema({
	nombre: String,
	email: String,
	url_imagen: String,
	clave: String
});

var Usuario = mongoose.model("Usuario", usuarioSchema);