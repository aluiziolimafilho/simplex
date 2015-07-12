//Linear Programming Problem.
function LPP(){
	this.type = 'min';
	this.c = [];

	//var constraint = {values: [1,1], sign: "<", b: 1};
	this.constraints = [];

	this.setType = function(type){
		if( type != "min" && type != "max" ){
			console.log("Error: wrong input of type. This must be 'min' or 'max'.");
			return;
		}
		this.type = type;
	};

	this.addC = function(c){
		if( typeof c != 'number') return;
		this.c.push(c);
	};

	this.createConstraint = function(valuesIn, signIn, bIn){
		if( typeof valuesIn != "array" 
			|| typeof signIn != "string" 
			|| typeof bIn != "number" ){

			console.log("Error: wrong type of inputs in constraint.");
			return;
		}

		var constraint = {values: valuesIn, sign: signIn, b: bIn};
		this.addConstraint(constraint);
		
	};

	this.addConstraint = function(constraintIn){
		this.constraints.push(constraintIn);
	};
}

function SimplexTable(){

	this.variablesInBase = []; // lista de índices das variáveis dentro da base.
	this.variablesOutBase = []; // lista de índices das variáveis fora da base.
	this.baseLines = []; // lista de listas das linhas da matriz B-1*A.
	this.b = []; // linhas da matriz B-1*b.
	this.costs = []; // lista dos custos reduzidos de cada variável(o índice equivale a variável).
	this.image = 0; // valor da imagem da função.
}

function Simplex(lpp){
	this.lpp = lpp; // objeto que representa o ppl de acordo com a classe definida acima;

	this.stepsOfSimplex = []; // lista das tabelas de cada iteração do simplex.
}
