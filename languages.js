var translations =
{
	"language": "en_us",
	"title": { en_us: "Simplex, supposedly easy", pt_br: "Simplex, supostamente fácil"},
	"tools": { en_us: "Tools", pt_br: "Ferramentas"},
	"variables": { en_us: "Variables", pt_br: "Variáveis"},
	"constraints": { en_us: "Constraints", pt_br: "Restrições"},
	"solve_lpp": {en_us: "Solve LPP", pt_br: "Resolver PPL"},
	"clear_solutions": {en_us: "Clear Solutions", pt_br: "Limpar Soluções"},
	"function": {en_us: "Function", pt_br: "Função"},
	"type": { en_us: "Type", pt_br: "Tipo"},
	"solutions": { en_us: "Solution(s)", pt_br: "Solução(ões)"},
	"next_solution": { en_us: "Next Solution", pt_br: "Próxima Solução"},
	"step_by_step": { en_us: "Step by Step", pt_br: "Passo a Passo"},
	"next_step": { en_us: "Next Step", pt_br: "Próximo Passo"},
	"lpp": { en_us: "Linear Programming Problem", pt_br: "Problema de Programação Linear"},
	"solution": { en_us: "Solution", pt_br: "Solução"},
	"step": { en_us: "Step", pt_br: "Passo"},
	"great_base": { en_us: "Great Base", pt_br: "Base Ótima"},
	"base": { en_us: "Base", pt_br: "Base"},
	"costs": { en_us: "Costs", pt_br: "Custos"},
	"end_first_fase": { en_us: "End of first fase.", pt_br: "Fim da primeira fase."},
	"single_solution": { en_us: "This is a single solution.", pt_br: "Esta é uma solução única."},
	"infinite_solutions": { en_us: "There are infinite solutions.", pt_br: "Existem infinitas soluções."},
	"multiple_solutions": { en_us: "There are multiple solutions.", pt_br: "Existe multiplas soluções."},
	"solution_unlimited": { en_us: "The solution is unlimited.", pt_br: "A solução é ilimitada."},
	"problem_solved": { en_us: "Problem solved.", pt_br: "Problema resolvido."},
	"invalid_lpp": { en_us: "Invalid LPP.", pt_br: "PPL inválido."},
	"first_press_button_solve_lpp": { en_us: "First press the button 'solve lpp'.", pt_br: "Primeiro pressione o botão 'resolver ppl'."},
	"there_isnt_more_solutions": { en_us: "There isn't more solutions.", pt_br: "Não existe mais soluções."},
	"end_of_steps": { en_us: "End of steps.", pt_br: "Fim dos passos."},
	"sign": { en_us: "Sign", pt_br: "Sinal"},
	"size_error": { en_us: "The number of variables or constraints must be greater than zero.", pt_br: "O número de variáveis ou restrições tem que ser maior que zero."}

};

var setTranslations = function(){
	var settedLanguage = $("#language").val();
	translations["language"] = settedLanguage;

	$("translate").each(function(){
		var id = $(this).attr("trans");
		var language = translations["language"];

		var phrase = id;

		if( id in translations && language in translations[id] ){
			var translation = translations[id];
			phrase = translation[language];
		}
		
		$(this).empty();
		$(this).append(phrase);
		
	});
};
