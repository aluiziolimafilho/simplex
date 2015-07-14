(function(){
	var gm = new GraphicManager();
	var dm = new DataManager(gm);
	gm.putMatrix(2,2);

	$("#add_column_btn").on('click',function(e){
		gm.addColumn();
	});
	$("#remove_column_btn").on('click',function(e){
		gm.removeColumn();
	});
	$("#add_line_btn").on('click',function(e){
		gm.addLine();
	});
	$("#remove_line_btn").on('click',function(e){
		gm.removeLine();
	});
	$("#move_to_dual_btn").on('click',function(e){
		var lines = gm.numberOfConstraints;
		var columns = gm.numberOfVariables;
		gm.putMatrix(columns,lines);
	});
	$("#calculate_simplex_btn").on('click',function(e){

	});
})();
