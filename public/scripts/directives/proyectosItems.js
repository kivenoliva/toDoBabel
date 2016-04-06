angular.module("toDoBabel").directive("proyectosItems", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			modo:"@",
			getDetailUrl : "&",
			usuario:"="
		},
		templateUrl:"views/proyectosItems.html"
	};
});