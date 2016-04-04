var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API para el gestor de proyectos toDoBabel' });
});

module.exports = router;
