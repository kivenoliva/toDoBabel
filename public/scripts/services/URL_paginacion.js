angular.module("toDoBabel").service("URL_paginacion", ["$log",function($log){
	this.resolve = function(url,start,limite){

		var startContruido = "?start=" + start;
		var limiteConstruido = "&limit=" + limite;

		var urlCompleta = url + startContruido + limiteConstruido;

		return urlCompleta;
	};
}])