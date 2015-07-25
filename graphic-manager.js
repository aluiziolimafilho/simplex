function GraphicManager(){
	var $function_head = $('#function_head');
	var $function_variables = $('#function_variables');
	var $constraints_head = $('#constraints_head');
	var $constraints = $("#constraints");

	this.numberOfVariables = 0; // número total de varáveis do PPL.
	this.numberOfConstraints = 0; // número total restrições do PPL.

	var that = this;

	var addVariableInFunctionHead = function(number){
		var element = '<th>c'+number+'</th>';
		$function_head.append(element);
	};

	var addFunctionVariables = function(number){
		var element = '<td><input id="c'+number+'" value="1" type="number" class="form-control"/></td>';
		$function_variables.append(element);
	};

	var updateConstraintHead = function(){
		$constraints_head.empty();
		
		var element = '<tr>';
		element += '<th>#</th>';
		for(var i=0; i<that.numberOfVariables; i++){
			element += '<th>x'+(i+1)+'</th>';
		}

		element += 	'<th><translate trans="sign">sign</translate></th>'+
					'<th>b</th>'+
					'</tr>';

		$constraints_head.append(element);
	};

	var addConstraint = function(number){

		var element = '<tr id="constraint_'+number+'">';
		element += '<td>'+number+'</td>';

		for(var i=0; i<that.numberOfVariables; i++){
			element += '<td><input id="x'+number+'_'+(i+1)+'" value="1" type="number" class="form-control"/></td>';
		}

		element += 	'<td>'+
						'<select id="sign_'+number+'" class="form-control">'+
							'<option value="<">&leq; &nbsp; &nbsp; &nbsp;</option>'+
							'<option class="block" value=">">&geq; &nbsp;</option>'+
							'<option value="=">= &nbsp;</option>'+
						'</select>'+
					'</td>'+
					'<td><input id="b'+number+'" value="1" type="number" class="form-control"/></td>';
		element += '</tr>';

		$constraints.append(element);
	};

	var updateConstraintVariable = function(){
		$constraints.empty();
		for(var i=0; i<that.numberOfConstraints; i++){
			addConstraint(i+1);
		}
	};

	this.getNumberOfLines = function(){
		return that.numberOfConstraints;
	};

	this.getNumberOfColumns = function(){
		return that.numberOfVariables;
	};

	this.addLine = function(){
		that.numberOfConstraints++;
		addConstraint(that.numberOfConstraints);
	};

	this.addColumn = function(){
		that.numberOfVariables++;
		addVariableInFunctionHead(that.numberOfVariables);
		addFunctionVariables(that.numberOfVariables);
		updateConstraintHead();
		updateConstraintVariable();
	};

	this.removeLine = function(){
		if(that.numberOfConstraints == 0) return;

		that.numberOfConstraints--;
		$constraints.empty();
		for(var i=0; i<that.numberOfConstraints; i++){
			addConstraint(i+1);
		}
	};

	this.removeColumn = function(){
		if(that.numberOfVariables == 0) return;

		that.numberOfVariables--;
		$function_head.empty();
		$function_variables.empty();
		updateConstraintHead();
		updateConstraintVariable();
		for(var i=0; i<that.numberOfVariables; i++){
			addVariableInFunctionHead(i+1);
			addFunctionVariables(i+1);
		}
	};

	this.putMColumns = function(numberOfColumns){
		if(numberOfColumns < 0) return;

		that.numberOfVariables = numberOfColumns;
		$function_head.empty();
		$function_variables.empty();
		updateConstraintHead();
		updateConstraintVariable();
		for(var i=0; i<that.numberOfVariables; i++){
			addVariableInFunctionHead(i+1);
			addFunctionVariables(i+1);
		}
		
	};

	this.putNLines = function(numberOfLines){
		if(numberOfLines < 0) return;

		that.numberOfConstraints = numberOfLines;
		$constraints.empty();
		for(var i=0; i<that.numberOfConstraints; i++){
			addConstraint(i+1);
		}
	};

	this.putMatrix = function(lines, columns){
		if(lines < 0 || columns < 0) return;

		$constraints.empty();
		this.putMColumns(columns);
		this.putNLines(lines);
	};

	this.endOfFirstFaseMessage = function(){
		var $step = $("#steps");
		var element = '<div class="row">';
		element += '<div class="alert alert-success">';
		element += '<strong><translate trans="end_first_fase">End of first fase.</trasnlate><strong>';
		element += '</div>';
		element += '</div>';
		$step.append(element);
	};

	this.putAlertMessage = function(id,msg,type){
		var element = '<div class="alert alert-'+type+'">';
		element += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
		element += '<strong><translate trans="'+msg+'">'+msg+'</translate><strong>';
		element += '</div>';
		var $id = $("#"+id);
		$id.empty();
		$id.append(element);
	};

	this.removeAlertMessage = function(id){
		var $id = $("#"+id);
		$id.empty();
	};

	this.printTypeOfSolution = function(id,type){
		switch(type){
			case "single":
				that.putAlertMessage(id,"single_solution","info");
				break;
			case "infinite_solutions":
				that.putAlertMessage(id,"infinite_solutions","info");
				break;
			case "multiple_solutions":
				that.putAlertMessage(id,"multiple_solutions","info");
				break;
			case "unlimited":
				that.putAlertMessage(id,"solution_unlimited","info");
				break;
			default:
				break;
		}
	};
}
