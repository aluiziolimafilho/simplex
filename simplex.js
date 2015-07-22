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
		return that.c[index];
	}

	this.getConstraint = function(index){
		return that.constraints[index];
	}

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
	this.variablesOutBase = []; // lista de índices das variáveis fora da base.

	/*this.baseLines = []; // lista de listas das linhas da matriz B-1*A.
	this.b = []; // linhas da matriz B-1*b.
	this.costs = []; // lista dos custos reduzidos de cada variável(o índice equivale a variável).
	this.image = 0; // valor da imagem da função.
	*/

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
					that.slackVariables.push(lpp.getNumberOfLines()+i-jump1);
					break;
				case '>':
					numberOfSlacks++;
					listOfSlack.push(-1);
					that.slackVariables.push(lpp.getNumberOfLines()+i-jump1);
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

	this.transformFromLPPToSimplexTable = function(lpp){
		var constraintTable = getConstraintTable(lpp);
		setVirtualVariables(constraintTable);
		constraintTable = setVirtualColumn(constraintTable);
		constraintTable = setBColumn(lpp,constraintTable);

		console.log(constraintTable);
		console.log(that.variablesInBase);
		console.log(that.virtualVariables);
	};
}

function Simplex(lpp){
	this.lpp = lpp; // objeto que representa o ppl de acordo com a classe definida acima;

	this.stepsOfSimplex = []; // lista das tabelas de cada iteração do simplex.
}
