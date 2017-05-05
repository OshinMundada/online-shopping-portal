function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
    }    



function isValidSKU(sku) {
     var regex = new RegExp(/([A-Za-z]{3})-([0-9]{3})/);
     return regex.test(sku);
 }

 function validateData() {
        var sku = $('#sku').val(),
            category = $('#category').val(),
            vendor = $('#vendor').val(),
            vendorModel = $('#vendorModel').val(),
            description = $('#description').val(),
            features = $('#features').val(),
            cost = $('#cost').val(),
            retail = $('#retail').val(),
            image = $('#image_upload').val();

        var errorMessage = $('#status');

        if ($.trim(sku).length == 0) {
             $('#status').text("Please enter the SKU");
             $('#sku').focus();
             return false;
         } else if (!isValidSKU(sku)) {
             errorMessage.text("Please enter valid SKU (XXX-123)");
             $('#sku').focus();
             return false;
         } else if (category == -1) {
             errorMessage.text("Please select category");
             $('#category').focus();
             return false;
         } else if (vendor == -1) {
             errorMessage.text("Please select vendor");
             $('#vedor').focus();
             return false;
         } else if ($.trim(vendorModel).length == 0) {
             errorMessage.text("Please enter Manufacturer's ID");
             $('#vendorModel').focus();
             return false;
         } else if ($.trim(description).length == 0) {
             errorMessage.text("Please enter a description");
             $('#description').focus();
             return false;
         } else if ($.trim(features).length == 0) {
             errorMessage.text("Please enter the features");
             $('#features').focus();
             return false;
         }  else if ($.trim(cost).length == 0) {
             errorMessage.text("Please enter the cost price");
             $('#cost').focus();
             return false;
         } else if (!$.isNumeric(cost)) {
             errorMessage.text("Cost should be numeric");
             $('#cost').focus();
             return false;
         } else if ($.trim(retail).length == 0) {
             errorMessage.text("Please enter the retail price");
             $('#retail').focus();
             return false;
         } else if (!$.isNumeric(retail)) {
             errorMessage.text("Retail price should be numeric");
             $('#retail').focus();
             return false;
         } else if ($.trim(image).length == 0) {
             errorMessage.text("Please select an image");
             $('#image_upload').focus();
             return false;
         } else {
              
             return true;
         }

     }
     
$(document).ready(function() {
$("#container").hide();
if(getCookie("jadrn030SID")=="") {
  window.location.replace("http://jadran.sdsu.edu/~jadrn030/proj1/index.html");
}

else {
$('#image_upload').change(function() {
        uploadFile();
    });

$('#addnew').on('click', function(e) {
    document.getElementById('sku').disabled = false;
       document.getElementById('vendorModel').disabled = false;
       document.getElementById('vendor').disabled = false;
       document.getElementById('category').disabled = false;
       document.getElementById('image_upload').disabled = false;
       document.getElementById('description').disabled = false;
       document.getElementById('features').disabled = false;
       document.getElementById('cost').disabled = false;
       document.getElementById('retail').disabled = false;
       document.getElementById('submit').disabled = false;

       document.getElementById('sku').value="";
       document.getElementById('vendorModel').value="";
       document.getElementById('vendor').value="-1";
       document.getElementById('category').value="-1";
       document.getElementById('image_upload').value="";
       document.getElementById('description').value="";
       document.getElementById('features').value="";
       document.getElementById('cost').value="";
       document.getElementById('retail').value="";
       document.getElementById('status').innerHTML="";
       document.getElementById('pic').innerHTML="";

});
	
	$('#submit').on('click', function(e) {

		var isValid = validateData();
            if(isValid == false) {
            	e.preventDefault();
            }
            else {

		var sku = document.getElementById('sku').value.toUpperCase();
		var vendorModel = document.getElementById('vendorModel').value;
		var venID = document.getElementById('vendor').value;
		var catID = document.getElementById('category').value;
		var image = document.getElementById('image_upload').value;
        var ext = image.substr(image.lastIndexOf('.'),image.length);
        var image = sku.concat(ext);

		var description = document.getElementById('description').value;
		var features = document.getElementById('features').value;
		var cost =document.getElementById('cost').value;
		var retail = document.getElementById('retail').value;
	
        insertData(sku,catID,venID,vendorModel,description,features,cost,retail,image);
	   
       document.getElementById('sku').disabled = true;
       document.getElementById('vendorModel').disabled = true;
       document.getElementById('vendor').disabled = true;
       document.getElementById('category').disabled = true;
       document.getElementById('image_upload').disabled = true;
       document.getElementById('description').disabled = true;
       document.getElementById('features').disabled = true;
       document.getElementById('cost').disabled = true;
       document.getElementById('retail').disabled = true;
       document.getElementById('submit').disabled = true;
    
	
}
	});
}

});
function uploadFile() {
    var form_data = new FormData($('[name="form"]')[0]);
    var storeimg = $('#sku').val().toUpperCase();
var image = document.getElementById("image_upload").value;
var ext = image.substr(image.lastIndexOf('.'),image.length);
var storeimgas = storeimg.concat(ext);
//storeimgas = storeimgas.toLowerCase();

    form_data.append("image", document.getElementById("image_upload").files[0]);
    form_data.append("storeimg",storeimgas);
      var imageValue = "<img src=\"/~jadrn030/proj1/tasvir/" + storeimgas + "\" width='150px' height='150px' />";
    
    
    $.ajax({
            url: "/perl/jadrn030/proj1/upload_file.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#pic').html(imageValue);
                    },
            error: function(response) {
                  $('#status').text(response);
                    }
            });
                }


function insertData(sku,catID,venID,vendorModel,description,features,cost,retail,image) {
	var message = "";
	$.ajax({
		type: 'POST',
		url: '/perl/jadrn030/proj1/add_data.cgi',
		data: {'sku': sku,
						'vendorModel': vendorModel,
						'catID': catID,
						'venID': venID,
						'image': image,
						'description': description,
						'features': features,
						'cost': cost,
						'retail': retail},
		success: function(res) {
			message = res.result;
			document.getElementById('status').innerHTML = "Successfully inserted data.";
		},
		error: function(res) {
			document.getElementById('status').innerHTML = "Error in uploading data";
		}
	});
    
}

