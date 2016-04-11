angular.module("toDoBabel").directive("tareasItems", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			usuario:"=",
			cambioTarea:"&",
			borrarTarea:"&",
			modo:"="
		},
		templateUrl:"views/tareasItems.html"
	};
});