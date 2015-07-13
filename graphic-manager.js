function GraphicManager(){
	this.$function_head = $('#function_head');
	this.$function_variables = $('#function_variables');
	this.$constraints_head = $('#constraints_head');
	this.$constraints = $("#constraints");

	this.numberOfVariables = 0; // número total de varáveis do PPL.
	this.numberOfConstraints = 0; // número total restrições do PPL.

	var that = this;

	var addVariableInFunctionHead = function(number){
		var element = '<th>c'+number+'</th>';
		that.$function_head.append(element);
	};

	var addFunctionVariables = function(number){
		var element = '<td><input id="c'+number+'" value="1" type="number" class="form-control"/></td>';
		that.$function_variables.append(element);
	};

	var updateConstraintHead = function(){
		that.$constraints_head.empty();
		
		var element = '<tr>';
		element += '<th>#</th>';
		for(var i=0; i<that.numberOfVariables; i++){
			element += '<th>x'+(i+1)+'</th>';
		}

		element += 	'<th>sign</th>'+
					'<th>b</th>'+
					'</tr>';

		that.$constraints_head.append(element);
	};

	var addConstraint = function(number){

		var element = '<tr id="constraint_'+number+'">';
		element += '<td>'+number+'</td>';

		for(var i=0; i<that.numberOfVariables; i++){
			element += '<td><input id="x'+number+'_'+i+'" value="1" type="number" class="form-control"/></td>';
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

		that.$constraints.append(element);
	};

	var updateConstraintVariable = function(){
		that.$constraints.empty();
		for(var i=0; i<that.numberOfConstraints; i++){
			addConstraint(i+1);
		}
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
		that.$constraints.empty();
		for(var i=0; i<that.numberOfConstraints; i++){
			addConstraint(i+1);
		}
	};

	this.removeColumn = function(){
		if(that.numberOfVariables == 0) return;

		that.numberOfVariables--;
		that.$function_head.empty();
		that.$function_variables.empty();
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
		that.$function_head.empty();
		that.$function_variables.empty();
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
		that.$constraints.empty();
		for(var i=0; i<that.numberOfConstraints; i++){
			addConstraint(i+1);
		}
	};

	this.putMatrix = function(lines, columns){
		if(lines < 0 || columns < 0) return;

		that.$constraints.empty();
		this.putMColumns(columns);
		this.putNLines(lines);
	};
}
