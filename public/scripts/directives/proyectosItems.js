angular.module("toDoBabel").directive("proyectosItems", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			modo:"@",
			proyectoDetalle: "&",
			usuario:"="
		},
		templateUrl:"views/proyectosItems.html"
	};
});