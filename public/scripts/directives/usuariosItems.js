angular.module("toDoBabel").directive("usuariosItems", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
		},
		templateUrl:"views/usuariosItems.html"
	};
});