$(document).ready(function(){

	


});

$(document).on('click','.remove',function(){
		var sku = this.id.split("_")[1];
		// alert(sku);

			$.ajax({
				url : "http://jadran.sdsu.edu/jadrn030/servlet/CartServlet?" +
						"action=CartServlet&requesttype=delete&skuaddtocart="+sku,
				type : "POST",
				success : function(response) {
					// alert(response);
					 $("body").html(response);
					 // $("#count").text(countItems-1);
				}
			});
			
	});


$(document).on('change','.qtycart',function(){
		var id = this.id;
		var sku = id.split("_")[1];

		var availquant = parseInt($('#quant').val());
		 var oldquant = parseInt($('#oldquant').val());
		 var newquant = parseInt($("#"+id).val());
		var diff = Math.abs(newquant - oldquant);
		if(newquant > availquant) {
			alert ("Quantity unavailable");
		}

		else{
					$.ajax({
						url : "http://jadran.sdsu.edu/jadrn030/servlet/CartServlet?" +
						"action=CartServlet&requesttype=update&skuaddtocart="+sku+"&quantity="+diff.toString(),
						type : "POST",
						success : function(response) {
								alert("Quantity has been updated.")
								// $("#"+id).data("previous",newQuantity);
								$('body').html(response);
						}
					});
				}
	});

$(document).on('click','#checkoutbutton',function(){
	var items="", qity="";

	$('#cartshow tbody tr td:nth-child(1)').each( function(){

   items = items+$(this).text()+"|";
});

	$('#cartshow tbody tr td:nth-child(4) input').each( function(){

   qity = qity+$(this).val().trim()+"|";

});

	//alert(items);
	window.location.href = "http://jadran.sdsu.edu/jadrn030/onlineform.html?skustring="+items+"&qity="+qity;

});

$(document).on('click','#cancelbutton',function(){
	window.location.href = "http://jadran.sdsu.edu/jadrn030/prod.html";


});