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

	this.transformFromLPPToSimplexTable = function(lpp){
	};
}

function Simplex(lpp){
	this.lpp = lpp; // objeto que representa o ppl de acordo com a classe definida acima;

	this.stepsOfSimplex = []; // lista das tabelas de cada iteração do simplex.
}
