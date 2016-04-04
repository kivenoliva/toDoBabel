"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Usuario = mongoose.model("Usuario");

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

module.exports = router;
