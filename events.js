(function(){
	var gm = new GraphicManager();
	var dm = new DataManager(gm);
	var firstLPP = new LPP();
	firstLPP.setFunction("min",[-1,-1]);
	firstLPP.createConstraint([3,2],'>',6);
	firstLPP.createConstraint([4,1],'<',16);
	firstLPP.createConstraint([-2,3],'<',6);
	firstLPP.createConstraint([1,4],'>',4);
	dm.putLPP(firstLPP);

	var firstFase = true;

	var simplex = null;

	$("#add_column_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.addColumn();
		dm.partialPutLPP(lpp);
	});
	$("#remove_column_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.removeColumn();
		dm.partialPutLPP(lpp);
	});
	$("#add_line_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.addLine();
		dm.partialPutLPP(lpp);
	});
	$("#remove_line_btn").on('click',function(e){
		var lpp = dm.getLPP();
		gm.removeLine();
		dm.partialPutLPP(lpp);
	});
	$("#calculate_simplex_btn").on('click',function(e){
		var lpp = dm.getLPP();
		dm.putLPP(lpp);
		firstFase = true;
		$('#solutions').empty();
		$('#steps').empty();

		var sp = new Simplex(lpp);
		sp.calculateSimplex2Fases();
		gm.putAlertMessage("solve_msg","Problem solved.","success");
		simplex = sp;
		dm.putSolution(sp.getSolution(),1);
		
	});

	$("#next_solution").on('click',function(){

	});

	$("#next_step").on('click',function(){
		if(simplex == null){
			$('#steps').empty();
			firstFase = true;
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
		if(result == null) gm.putAlertMessage("next_step_msg","End of steps.","warning");

		dm.putStep(result, simplex.getStep());
	});

	$(".toggler").click(function(){
		var target = $(this).attr("data-target");
		$(target).fadeToggle();
	});
})();
