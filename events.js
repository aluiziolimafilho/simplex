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

		var simplex = new Simplex(lpp);
		simplex.calculateSimplex2Fases();
		console.log(simplex.getSolution());
		console.log(simplex.getSolution().getSolution());
		console.log(simplex.getSolution().getImage());
		dm.putSimplex(simplex);
		
	});

	$(".toggler").click(function(){
		var target = $(this).attr("data-target");
		$(target).fadeToggle();
	});
})();
