$(document).ready(function() {
	$.get("/jadrn030/servlet/AjaxPopulateDetails", handle1);

	

	});	
function handle1(response) {
	$('#container').html(response);
	}	
