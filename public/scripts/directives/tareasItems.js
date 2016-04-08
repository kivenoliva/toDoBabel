angular.module("toDoBabel").directive("tareasItems", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			usuario:"=",
			cambioTarea:"&",
			borrarTarea:"&"
		},
		templateUrl:"views/tareasItems.html"
	};
});