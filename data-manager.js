function DataManager(gm){  //recebe como parâmetro uma instância da classe GraphicManager.
	
	var $kind_of_function = $('#kind_of_function');

	var constraint_id = "#constraint_";
	var variable_id = "#x";
	var variableOnFunction_id = "#c";
	var sign_id = "#sign_";
	var b_id = "#b";

	//var that = this;

	this.getKindOfFunction = function(){
		var kindOf = $kind_of_function.val();
		return kindOf;
	};

	this.getVectorC = function(){
		var c = [];
		for(var i=0; i<gm.numberOfVariables; i++){
			var $id = $(variableOnFunction_id+(i+1));
			var value = parseFloat($id.val());
			c.push(value);
		}
		return c;
	};

	this.getVectorSign = function(){
		var signs = [];
		for(var i=0; i<gm.numberOfConstraints; i++){
			var $id = $(sign_id+(i+1));
			var value = $id.val();
			signs.push(value);
		}
		return signs;
	};

	this.getVectorB = function(){
		var b = [];
		for(var i=0; i<gm.numberOfConstraints; i++){
			var $id = $(b_id+(i+1));
			var value = parseFloat($id.val());
			b.push(value);
		}
		return b;
	};

	this.getConstraintsMatrix = function(){
		var matrix = []; // lista de listas;
		for(var i=0; i<gm.numberOfConstraints; i++){
			var list = [];
			for(var j=0; j<gm.numberOfVariables; j++){
				var $id = $(variable_id+(i+1)+"_"+(j+1));
				var value = parseFloat($id.val());
				list.push(value);
			}
			matrix.push(list);
		}
		return matrix;
	};
}
