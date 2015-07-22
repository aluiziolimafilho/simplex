//Linear Programming Problem.
function LPP(){
	this.type = 'min';
	this.c = [];

	//var constraint = {values: [1,1], sign: "<", b: 1};
	this.constraints = [];

	var that = this;

	this.getNumberOfLines = function(){
		return that.constraints.length;
	};

	this.getNumberOfColumns = function(){
		return that.c.length;
	};

	this.getType = function(){
		return that.type;
	};

	this.getC = function(index){
		if(index >= 0 && index < that.c.length) return that.c[index];
		else return 0;
	};

	this.getCVector = function(){
		return that.c;
	};

	this.getConstraint = function(index){
		return that.constraints[index];
	};

	this.setType = function(type){
		if( type != "min" && type != "max" ){
			console.log("Error: wrong input of type. This must be 'min' or 'max'.");
			return;
		}
		that.type = type;
	};

	this.addC = function(c){
		that.c.push(c);
	};

	this.addVectorC = function(c){
		that.c = c;
	};

	this.createConstraint = function(valuesIn, signIn, bIn){
		var constraint = {values: valuesIn, sign: signIn, b: bIn};
		that.addConstraint(constraint);
		
	};

	this.addConstraint = function(constraintIn){
		that.constraints.push(constraintIn);
	};

	this.isValid = function(){ // testa se o PPL é válido, ou seja, testa se a estrutura está correta.
		return true;
	};
}

function SimplexTable(){

	this.variablesInBase = []; // lista de índices das variáveis dentro da base.
	//this.variablesOutBase = []; // lista de índices das variáveis fora da base.

	this.slackVariables = []; // aqui fica uma lista dos indices das variaveis de folga.
	this.virtualVariables = []; // aqui fica uma lista dos indices das variaveis virtuais.
	this.st = math.matrix(); // st = simplex table.

	var that = this;

	// função responsável por transforma a restrições de forma adequada para o simplex tabular.
	var getConstraintTable = function(lpp){
		var listOfSlack = [];
		var numberOfSlacks = 0;
		var jump1 = 0;
		for(var i=0; i<lpp.getNumberOfLines(); i++){
			var constraint = lpp.getConstraint(i);
			switch(constraint.sign){
				case '<':
					numberOfSlacks++;
					listOfSlack.push(1);
					that.slackVariables.push(lpp.getNumberOfColumns()+i-jump1);
					break;
				case '>':
					numberOfSlacks++;
					listOfSlack.push(-1);
					that.slackVariables.push(lpp.getNumberOfColumns()+i-jump1);
					break;
				case '=':
					listOfSlack.push(0);
					jump1++;
					break;
			}
		}
		
		var tempTable = [];
		var jump2 = 0;

		for(var i=0; i<lpp.getNumberOfLines(); i++){
			
			var slacks = math.zeros(numberOfSlacks);
			if(listOfSlack[i] == 0) jump2++;
			else{
				slacks.subset(math.index(i-jump2), listOfSlack[i]);
			}

			var constraint = lpp.getConstraint(i);
			
			var line = math.matrix(constraint.values);
			line = math.concat(line,slacks);

			tempTable.push(line);
		}
		tempTable = math.matrix(tempTable);
		return tempTable;

	};

	var isUnity = function(constraintTable,column){
		var count = 0;
		var ones = 0;
		var pos = -1;
		var size = constraintTable.size();
		var lines = size[0];
		for(var i=0; i <lines; i++){
			var value = constraintTable.subset(math.index(i,column));
			if(value != 0) count++;
			if(value == 1){
				ones++;
				pos = i;
			}
		}
		if(count == 1 && ones == 1) return pos;
		else return null;
	}

	// função reponsável por descobrir as variaveis virtuais.
	var setVirtualVariables = function(constraintTable){
		var size = constraintTable.size();
		var identity = math.zeros(size[0]);
		var size = constraintTable.size();
		var countVirtual = size[1];
		
		for(var i=0; i<that.slackVariables.length; i++){
			var index = that.slackVariables[i];
			var unit = isUnity(constraintTable,index);
			if(unit != null){
				identity.subset(math.index(unit),index);
			}
		}
		var basics = identity.map(function(value,index,matrix){
			if(value == 0){
				value = countVirtual;
				that.virtualVariables.push(value);
				countVirtual++;
			}
			return value;
		});

		that.variablesInBase = basics.valueOf();
	};

	var setVirtualColumn = function(constraintTable){
		if(that.virtualVariables.length == 0) return constraintTable;

		var size = constraintTable.size();

		for(var i=0; i<that.variablesInBase.length; i++){
			var index = that.variablesInBase[i];
			if(index >= size[1]){ // se index for maior ou igual ao número de colunas da tabela então index é uma variável virtual.
				var column = [];
				for(var j=0; j<size[0]; j++){
					if(i==j) column.push([1]);
					else column.push([0]);
				}
				column = math.matrix(column);
				constraintTable = math.concat(constraintTable, column);
			}
		}

		return constraintTable;
	};

	var setBColumn = function(lpp,constraintTable){
		
		var listB = [];
		for(var i=0; i<lpp.getNumberOfLines(); i++){
			var constraint = lpp.getConstraint(i);
			listB.push([constraint.b]);
		}
		var b = math.matrix(listB);
		constraintTable = math.concat(constraintTable,b);
		return constraintTable;
	};

	var setCostLine = function(lpp,constraintTable){
		var weights = [];
		var size = constraintTable.size();
		var limit = size[1] - that.virtualVariables.length-1;
		var addVector = [];

		if(that.virtualVariables.length == 0){
			for(var i=0; i<that.variablesInBase.length; i++){
				var variable = that.variablesInBase[i];
				var value = lpp.getC(variable);
				weights.push(value);
			}
			var first = math.matrix(lpp.getCVector());
			var second = math.zeros(that.slackVariables.length + that.virtualVariables.length);
			addVector = math.concat(first,second);
			addVector = math.concat(addVector,[0]);
		}
		else{
			for(var i=0; i<that.variablesInBase.length; i++){
				var value = that.variablesInBase[i];
				if(value >= limit) weights.push(1);
				else weights.push(0);
			}
			var first = math.zeros(limit);
			var second = math.ones(that.virtualVariables.length);
			addVector = math.concat(first,second);
			addVector = math.concat(addVector,[0]);
		}
		weights = math.matrix(weights);
		
		var costs = math.multiply(weights,constraintTable);
		costs = math.subtract(costs,addVector);
		for(var i=0; i<that.variablesInBase.length; i++){
			var value = that.variablesInBase[i];
			costs.subset(math.index(value),0);
		}

		constraintTable = math.concat([costs.valueOf()],constraintTable,0);

		return constraintTable;
	}

	this.transformFromLPPToSimplexTable = function(lpp){
		var constraintTable = getConstraintTable(lpp);
		setVirtualVariables(constraintTable);
		constraintTable = setVirtualColumn(constraintTable);
		constraintTable = setBColumn(lpp,constraintTable);

		that.st = setCostLine(lpp,constraintTable);
	};

	this.isGreatTable = function(){
		
		return false;
	};

	this.hasVirtualVariableOnBase = function(){
		if(that.virtualVariables.length == 0) return false;
		return true;
	};

	this.variableToInBase = function(){
		return 0;
	};

	this.varialbeToOutBase = function(){
		return 0;
	};

	var makePivoting = function(vIn, vOut){

	};

	this.nextTable = function(){
		var vIn = that.variableToInBase();
		var vOut = that.varialbeToOutBase();
		makePivoting(vIn, vOut);
	};

	this.removeVirtualVariables = function(){
		if(that.virtualVariables.length == 0) return;
	};

	this.getSolution = function(){
		return [];
	};

	this.getImage = function(){
		return 0;
	};
}

function Simplex(lpp){
	this.lpp = lpp; // objeto que representa o ppl de acordo com a classe definida acima;

	this.firstFase = []; // lista das tabelas de cada iteração do simplex da primeira fase.
	this.secondFase = []; // lista das tabelas de cada iteração do simplex da segunda fase.
	this.solution = null;

	var that = this;

	this.calculateSimplex2Fases = function(){
		var table = new SimplexTable();
		table.transformFromLPPToSimplexTable(that.lpp);
		that.firstFase.push(table);
		while(table.hasVirtualVariableOnBase()){
			table.nextTable();
			that.firstFase.push(table);
		}
		table.removeVirtualVariables();
		that.secondFase.push(table);
		while(!table.isGreatTable()){
			table.nextTable();
			that.secondFase.push(table);
		}
		that.solution = table;
		return table;
	};

	this.getSolution = function(){
		return that.solution;
	};

	this.getStepsFirstFase = function(){
		return that.firstFase;
	};

	this.getStepsSecondFase = function(){
		return that.firstFase;
	};
}
