function GraphicManager(){
	this.$function_head = $('#function_head');
	this.$kind_of_function = $('#kind_of_function');
	this.$function_variables = $('#function_variables');
	this.$constraints_head = $('#constraints_head');
	this.$constraints = $("#constraints");

	this.constraint_id = "#constraint_";
	this.variable_id = "#x";
	this.variableOnFunction_id = "#c";

	this.numberOfVariables = 0; // número total de varáveis do PPL.
	this.numberOfConstraints = 0; // número total restrições do PPL.

	this.addVariableInFunctionHead = function(number){
		var element = '<th>c'+number+'</th>';
		this.$function_head.append(element);
	};

	this.addFunctionVariables = function(number){
		var element = '<td><input id="c'+number+'" value="1" type="number" class="form-control"/></td>';
		this.$function_variables.append(element);
	};

	this.updateConstraintHead = function(){
		this.$constraints_head.empty();
		
		var element = '<tr>';
		element += '<th>#</th>';
		for(var i=0; i<this.numberOfVariables; i++){
			element += '<th>x'+(i+1)+'</th>';
		}

		element += 	'<th>sign</th>'+
					'<th>b</th>'+
					'</tr>';

		this.$constraints_head.append(element);
	};

	this.addConstraint = function(number){

		var element = '<tr id="constraint_'+number+'">';
		element += '<td>'+number+'</td>';

		for(var i=0; i<this.numberOfVariables; i++){
			element += '<td><input id="x'+number+'_'+i+'" value="1" type="number" class="form-control"/></td>';
		}

		element += 	'<td>'+
						'<select id="type_'+number+'" class="form-control">'+
							'<option value="<">&leq; &nbsp; &nbsp; &nbsp;</option>'+
							'<option class="block" value=">">&geq; &nbsp;</option>'+
							'<option value="=">= &nbsp;</option>'+
						'</select>'+
					'</td>'+
					'<td><input id="b'+number+'" value="1" type="number" class="form-control"/></td>';
		element += '</tr>';

		this.$constraints.append(element);
	};

	this.updateConstraintVariable = function(){
		this.$constraints.empty();
		for(var i=0; i<this.numberOfConstraints; i++){
			this.addConstraint(i+1);
		}
	};

	this.addLine = function(){
		this.numberOfConstraints++;
		this.addConstraint(this.numberOfConstraints);
	};

	this.addColumn = function(){
		this.numberOfVariables++;
		this.addVariableInFunctionHead(this.numberOfVariables);
		this.addFunctionVariables(this.numberOfVariables);
		this.updateConstraintHead();
		this.updateConstraintVariable();
	};

	this.removeLine = function(){
		if(this.numberOfConstraints == 0) return;

		this.numberOfConstraints--;
		this.$constraints.empty();
		for(var i=0; i<this.numberOfConstraints; i++){
			this.addConstraint(i+1);
		}
	};

	this.removeColumn = function(){
		if(this.numberOfVariables == 0) return;

		this.numberOfVariables--;
		this.$function_head.empty();
		this.$function_variables.empty();
		this.updateConstraintHead();
		this.updateConstraintVariable();
		for(var i=0; i<this.numberOfVariables; i++){
			this.addVariableInFunctionHead(i+1);
			this.addFunctionVariables(i+1);
		}
	};
}
