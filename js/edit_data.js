var imgchng=false;
var imgname;
$(document).ready(function() {

  $.get("/perl/jadrn030/proj1/fetch_vendor.cgi",fix_vendors);

  $.get("/perl/jadrn030/proj1/fetch_category.cgi",fix_categories);


    $("#checkEdit").on('click',function(e) {
            var url = '/perl/jadrn030/proj1/edit_data.cgi?sku=';
            url += $("#skuedit").val();
           // $('#busy_wait').css('visibility','visible');
           $.get(url, edit_data);
            });


        $('#imageEdit').change(function() {
        uploadEditFile();
        
    });
        $("#newEdit").on('click', function() {
            document.getElementById('checkEdit').style.display = "block";
        document.getElementById('showlater').style.display = "none";
        document.getElementById('skuedit').disabled = false;
        document.getElementById('skuedit').value="";
        document.getElementById('status_edit').innerHTML="&nbsp;";
        });

        

        $("#submitEdit").on('click',function() {
          
          var sku = document.getElementById('skuedit').value;
      		var vendorModel = document.getElementById('vendorModeledit').value;
      		var venID = document.getElementById('vendorEdit').value;
      		var catID = document.getElementById('categoryEdit').value;
      		if(imgchng == true) {
            var image = document.getElementById('imageEdit').value;

      		var storeimg = $('#skuedit').val();
            var ext = image.substr(image.lastIndexOf('.'),image.length);
            var storeimgas = storeimg.concat(ext);
            image = storeimgas.toLowerCase(); }
            else {
                image=imgname;
            }
            var description = document.getElementById('descriptionEdit').value;
      		var features = document.getElementById('featuresEdit').value;
      		var cost =document.getElementById('costEdit').value;
      		var retail = document.getElementById('retailEdit').value;
      		
      updateData(sku,catID,venID,vendorModel,description,features,cost,retail,image);
            });

    });

    function edit_data(response) {
        
        if(response==""){
            $("#status_edit").text("SKU does not exist. Check again.");
            $('#skuedit').focus();
        }
        else {
        var key = new Array();
        var description = new Array();
        var tmpStr = response.split("|");
        document.getElementById('checkEdit').style.display = "none";
        document.getElementById('showlater').style.display = "block";
        document.getElementById('skuedit').disabled = true;
        document.getElementById('status_edit').innerHTML="";
        
        document.getElementById("vendorEdit").value = tmpStr[2];
        document.getElementById("categoryEdit").value = tmpStr[1];
        document.getElementById("vendorModeledit").value = tmpStr[3];
        document.getElementById("descriptionEdit").value = tmpStr[4];
        document.getElementById("featuresEdit").value = tmpStr[5];
        document.getElementById("costEdit").value = tmpStr[6];
        document.getElementById("retailEdit").value = tmpStr[7];
        imgname=tmpStr[8];
        var imageValue = "<img src='/~jadrn030/proj1/tasvir/"+tmpStr[8]+"'width='150px' height='150px' />";
        
        $("#picture").html(imageValue);
    }

        }
        function fix_vendors(response) {
            var key = new Array();
            var description = new Array();
            var toWrite = "<option value=\"-1\">Select Vendor</option>";
            var tmpStr = response.split("||");
            for(i=0; i<tmpStr.length; i++) {
                tmp = tmpStr[i].split("=");
                toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
                }
            $('#vendorEdit').append(toWrite);
            }

        function fix_categories(response) {
            var key = new Array();
            var description = new Array();
            var toWrite = "<option value=\"-1\">Select Cateogory</option>";
            var tmpStr = response.split("||");
            for(i=0; i<tmpStr.length; i++) {
                tmp = tmpStr[i].split("=");
                toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
                }
            $('#categoryEdit').append(toWrite);
            }

            function updateData(sku,catID,venID,vendorModel,description,features,cost,retail,image) {
            	var message = "";
            	$.ajax({
            		type: 'POST',
            		url: '/perl/jadrn030/proj1/update_data.cgi',
            		data: {'sku': sku,
            						'vendorModel': vendorModel,
            						'catID': catID,
            						'venID': venID,
            						'image': image,
            						'description': description,
            						'features': features,
            						'cost': cost,
            						'retail': retail },
            		success: function(res) {
            			message = res.result;
            			document.getElementById('status_edit').innerHTML = message;
            		
            		},
            		error: function(res) {
            			message = res.result;
            			document.getElementById('status_edit').innerHTML = message;
            			
            		}
            	});
            }


             function uploadEditFile() {
            var form_data = new FormData($('[name="form"]')[0]);
    var storeimg = $('#skuedit').val();
var image = document.getElementById("imageEdit").value;
var ext = image.substr(image.lastIndexOf('.'),image.length);
var storeimgas = storeimg.concat(ext);
image = storeimgas.toLowerCase();

    form_data.append("image", document.getElementById("imageEdit").files[0]);
    form_data.append("storeimg",storeimgas);
      var imageValue = "<img src=\"/~jadrn030/proj1/tasvir/" + storeimgas + "\" width='150px' height='150px' />";
    
    imgchng = true;
    $.ajax({
            url: "/perl/jadrn030/proj1/upload_file.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
                //alert(response);
                $('#picture').html(imageValue);
                    },
            error: function(response) {
                  $('#status_edit').text(response);
                    }
            });
                }

