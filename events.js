(function(){
	var gm = new GraphicManager();
	var dm = new DataManager(gm);
	var firstLPP = new LPP();

	//optimal solution single.
	firstLPP.setFunction("min",[-1,-1]);
	firstLPP.createConstraint([3,2],'>',6);
	firstLPP.createConstraint([4,1],'<',16);
	firstLPP.createConstraint([-2,3],'<',6);
	firstLPP.createConstraint([1,4],'>',4);

	//infinite solutions.
	/*firstLPP.setFunction("min",[5,4,1]);
	firstLPP.createConstraint([2,3,0],'>',1);
	firstLPP.createConstraint([1,-4,-2],'>',3);*/

	//unlimited solution.
	/*firstLPP.setFunction("max",[1,2]);
	firstLPP.createConstraint([4,1],'>',20);
	firstLPP.createConstraint([1,2],'>',10);
	firstLPP.createConstraint([1,0],'>',2);*/

	//multiple solutions.
	/*firstLPP.setFunction("max",[1,2]);
	firstLPP.createConstraint([1,0],'<',3);
	firstLPP.createConstraint([0,1],'<',4);
	firstLPP.createConstraint([1,2],'<',9);*/

	dm.putLPP(firstLPP);

	var firstFase = true;

	var simplex = null;

	setTranslations();

	$("#add_column_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.addColumn();
		dm.partialPutLPP(lpp);

		setTranslations();
	});
	$("#remove_column_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.removeColumn();
		dm.partialPutLPP(lpp);

		setTranslations();
	});
	$("#add_line_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.addLine();
		dm.partialPutLPP(lpp);
	
		setTranslations();
	});
	$("#remove_line_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.removeLine();
		dm.partialPutLPP(lpp);

		setTranslations();
	});
	$("#calculate_simplex_btn").on('click',function(e){
		var lpp = dm.getLPP();
		dm.putLPP(lpp);
		firstFase = true;
		$('#great_base').empty();
		$('#solutions').empty();
		$('#steps').empty();

		var sp = new Simplex(lpp);
		if(sp.calculateSimplex2Fases()){
			gm.putAlertMessage("solve_msg","problem_solved","success");
			gm.printTypeOfSolution("type_solution_msg", sp.getSolution().getTypeOfSolution());
			simplex = sp;
			dm.putSolution(sp.getSolution(),1);
			dm.putGreatBase(sp.getGreatBase());
		}
		else{
			gm.removeAlertMessage("type_solution_msg");
			gm.putAlertMessage("solve_msg","invalid_lpp","danger");
		}
		
		setTranslations();
	});

	$("#clear_solutions_btn").on('click',function(){
		$('#great_base').empty();
		$('#solutions').empty();
		$('#steps').empty();
		gm.removeAlertMessage("type_solution_msg");
		gm.removeAlertMessage("solve_msg");
		gm.removeAlertMessage("next_solution_msg");
		gm.removeAlertMessage("next_step_msg");

		setTranslations();
	});

	$("#next_solution").on('click',function(){
		if(simplex == null){
			gm.putAlertMessage("next_solution_msg","first_press_button_solve_lpp","warning");
			setTranslations();
			$('#solutions').empty();
			return;
		}

		var result = simplex.nextSolution();
		if(result == null){
			gm.putAlertMessage("next_solution_msg","there_isnt_more_solutions","info");
			setTranslations();
			return;
		}
		dm.putSolution(result, simplex.getStepSolution());

		setTranslations();
	});

	$("#next_step").on('click',function(){
		if(simplex == null){
			gm.putAlertMessage("next_step_msg","first_press_button_solve_lpp","warning");
			$('#steps').empty();
			firstFase = true;
			setTranslations();
			return;
		}

		var result = simplex.nextStepFirstFase();
		if(result == null){
			if(firstFase){
				gm.endOfFirstFaseMessage();				
				firstFase = false;
			}
			result = simplex.nextStepSecondFase();
		}
		if(result == null) gm.putAlertMessage("next_step_msg","end_of_steps","info");

		dm.putStep(result, simplex.getStep());
		
		setTranslations();
	});

	$("#language").on("change",setTranslations);

	$(".toggler").click(function(){
		var target = $(this).attr("data-target");
		$(target).fadeToggle();
	});
})();
