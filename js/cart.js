$(document).ready(function() {
    fetchCart();

$("#addtobasket").on("click", function() {
		
        var sku_selected = $("#sku").val();
        var quantity_selected = $("#quantity").val();
        var qty_num = $("#qty").val();
        //alert (qty_num);

        if(parseInt(quantity_selected) > parseInt(qty_num)) {
            alert("Quantity unavailable");
        }

        else if (parseInt(quantity_selected) < 0) {
            alert("Enter valid quantity");
        }

        else {
       
            $.ajax({
                url: "http://jadran.sdsu.edu/jadrn030/servlet/CartServlet?" +
                    "requesttype=addproduct&skuaddtocart="+sku_selected+"&quantity=" + quantity_selected,
                type: "POST",
                success: function(response) {

                    response = response.split("|")
                    if (response[0] == "Succeess") {
                            alert("Added to cart!");
                          $("#count").text(response[1].toString());
													//add something here
                    } else {
                        alert("Error! please try again.");
                    }
                }
            });
        }
  
	});	
    }); 
var fetchCart = function() {
    $.ajax({
        url: "http://jadran.sdsu.edu/jadrn030/servlet/CartServlet?" +
            "action=CartServlet&requesttype=size",
        type: "POST",
        success: function(response) {
            $("#count").text(response);
        }
    });
    }