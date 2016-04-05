angular.module("toDoBabel").directive("tareasItems", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			usuario:"="
		},
		templateUrl:"views/tareasItems.html"
	};
});