$(document).ready(function() {
	$('#submit').on('click', function() {	
		var skucode = document.getElementById('skucode').value.toUpperCase();
		var product_name = document.getElementById('product_name').value;
		insertData(skucode,product_name);
	});
});

function insertData(skucode, product_name) {
	var message = "";
	$.ajax({
		type: 'POST',
		url: '/perl/jadrn030/proj1/insert_data.cgi',
		data: {'skucode': skucode, 
			   'product_name': product_name},
		success: function(res) {
			message = res.result;
			document.getElementById('content').innerHTML = message;
		},
		error: function() {}
	});
}   