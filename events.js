(function(){
	var gm = new GraphicManager();
	var dm = new DataManager(gm);
	gm.putMatrix(2,2);

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
	/*$("#move_to_dual_btn").on('click',function(e){
		var lines = gm.getNumberOfLines();
		var columns = gm.getNumberOfColumns();
		gm.putMatrix(columns,lines);
	});*/
	$("#calculate_simplex_btn").on('click',function(e){
		
	});
})();
