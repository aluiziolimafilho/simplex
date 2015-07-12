(function(){
	var gm = new GraphicManager();
	gm.addColumn();
	gm.addColumn();
	gm.addLine();
	gm.addLine();

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
		console.log("dual.");
	});
	$("#calculate_simplex_btn").on('click',function(e){
		console.log("simplex.");
	});
})();
