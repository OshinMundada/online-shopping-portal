$(document).ready(function() {

    $.get("/perl/jadrn030/proj1/fetch_vendor.cgi",fix_vendor);

    $.get("/perl/jadrn030/proj1/fetch_category.cgi",fix_category);


  $("#delete").on('click',function(e) {
      var url = '/perl/jadrn030/proj1/delete_data.cgi?sku=';
      url += $("#sku_delete").val();
     $('#busy_wait').css('visibility','visible');
     $.get(url, deleteData);
      });

  $("#delete_sku_button").on('click',function(e) {
    
        var url = '/perl/jadrn030/proj1/edit_data.cgi?sku=';
        url += $("#sku_delete").val();
        
       $('#busy_wait').css('visibility','visible');
       $.get(url, handleDataD);
          });

$('#newDelete').on('click',function() {
  document.getElementById('showlaterdel').style.display = "none";
    document.getElementById('delete_sku_button').style.display = "block";
    document.getElementById('statusDelete').innerHTML="";
    document.getElementById('sku_delete').disabled = false;
});


    $("#sku").on('blur',function(e) {
      if(($("#sku").val())!="") {
        var url = '/perl/jadrn030/proj1/check_dup_sku.cgi?sku=';
        url += $("#sku").val();
        $("#submit").attr('disabled', 'disabled');
       $('#busy_wait').css('visibility','visible');
       $.get(url, handleData);
     }
        });

    });

function handleDataD(response){
    $('#busy_wait').css('visibility','hidden');
    if(response=="") {
      document.getElementById('showlaterdel').style.display = "none";
        document.getElementById('delete_sku_button').style.display = "block";
        $("#statusDelete").text("Product with this SKU does not exist.");
    }
    else {
    document.getElementById('showlaterdel').style.display = "block";
    document.getElementById('delete_sku_button').style.display = "none";
    document.getElementById('statusDelete').innerHTML="";
      
    var key = new Array();
    var description = new Array();
    var tmpStr = response.split("|");
    document.getElementById('sku_delete').disabled = true;
    
    var ven;
    if(tmpStr[2]==1) { ven="Becca"; }
    else if(tmpStr[2]==2) { ven="Burberry"; }
    else if(tmpStr[2]==3) { ven="Clinique"; }
    else if(tmpStr[2]==4) { ven="Dior"; }
    else if(tmpStr[2]==5) { ven="Josie Maran"; }
    else if(tmpStr[2]==6) { ven="Marc Jacobs"; }
    else if(tmpStr[2]==7) { ven="Tata Harper"; }
    document.getElementById("vendorDelete").value = ven;
    
    var cat;
    if(tmpStr[1]==1) { cat="Face"; }
    else if(tmpStr[1]==2) { cat="Eyes"; }
    else if(tmpStr[1]==3) { cat="Lips"; }
    else if(tmpStr[1]==4) { cat="Nails"; }
    document.getElementById("categoryDelete").value = cat;
    

    document.getElementById("vendorModelDelete").value = tmpStr[3];
    document.getElementById("descriptionDelete").value = tmpStr[4];
    document.getElementById("featuresDelete").value = tmpStr[5];
    document.getElementById("costDelete").value = tmpStr[6];
    document.getElementById("retailDelete").value = tmpStr[7];
    

    var imageValue = "<img src='/~jadrn030/proj1/tasvir/"+tmpStr[8]+"'width='150px' height='150px' />";
    $("#pictureDelete").html(imageValue);
  }

}

function handleData(response){
    $('#busy_wait').css('visibility','hidden');

    if(response.startsWith("duplicate")) {
        $('#status').text("This record appears to be a duplicate.");
        
      }

    else if(response.startsWith("ok")) {
        $('#status').text("This record is not a duplicate.");
        $("#submit").removeAttr('disabled');
        
    }

}

function deleteData(response){
    $('#busy_wait').css('visibility','hidden');

    if(response.startsWith("success"))
        $('#statusDelete').text("Record Deleted");

    else if(response.startsWith("failure")) {
        $('#statusDelete').text("No such SKU.");
    }
}

function fix_vendor(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('#vendor').append(toWrite);
    }

function fix_category(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Cateogory</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('#category').append(toWrite);
    }
