angular.module("toDoBabel").directive("tareasItems", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			usuario:"=",
			cambioTarea:"&"
		},
		templateUrl:"views/tareasItems.html"
	};
});