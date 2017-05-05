$(document).ready(function() {


    $("#skuedit").on('blur', function(e) {
        document.getElementById("resultedit").innerHTML = "";

        var url = 'SKUExistanceCheck?sku=';
        url += $("#skuedit").val();
        var sku = $("#skuedit").val();

        if (sku) {
            if (validSKUREGEX(sku)) {
                document.getElementById("skuedit_status").innerHTML = "";
                $.get(url, validSKUOut);
            } else {
                document.getElementById("skuedit_status").innerHTML = "Invalid SKU";
                $("[name='skuedit']").focus();
            }
        }
    });

    $("#quantityedit").on('blur', function(e) {
        var quantity = $("#quantityedit").val();
        if (quantity) {
            if (qtyValidationCheck(quantity)) {
                if (parseInt(quantity) > 0 && parseInt(quantity) <= parseInt(window.onhandedit)) {
                    $('#subedit').prop('disabled', false);
                    document.getElementById("quantityedit_status").innerHTML = "";
                } else {
                    document.getElementById("quantityedit_status").innerHTML = "Invalid quantity. Only " + window.onhandedit + "left!";
                    $("[name='quantityedit']").focus();
                    $('#subedit').prop('disabled', true);
                }
            } else {
                document.getElementById("quantityedit_status").innerHTML = "Incorrect quantity!";
                $('#subedit').prop('disabled', true);
            }
        } else {
            document.getElementById("quantityedit_status").innerHTML = "Incorrect quantity!";
            $('#subedit').prop('disabled', true);

        }
    });

    $("#dateedit").on('blur', function(e) {
        var date = $("#dateedit").val();
        if (date) {
            if (validDate(date)) {
                document.getElementById("dateedit_status").innerHTML = "";
                $('#subedit').prop('disabled', false);

            } else {
                document.getElementById("dateedit_status").innerHTML = "Incorrect Date : (MM/DD/YYYY)  ";
                $("[name='dateedit']").focus();
                $('#subedit').prop('disabled', true);
            }
        }
    });
   
    $("#sku").on('blur', function(e) {
        document.getElementById("result").innerHTML = "";
        var url = 'SKUExistanceCheck?sku=';
        url += $("#sku").val();
        var sku = $("#sku").val();
        if (sku) {
            if (validSKUREGEX(sku)) {
                document.getElementById("sku_status").innerHTML = "";
                $.get(url, validSKU);
            } else {
                document.getElementById("sku_status").innerHTML = "Invalid SKU! ('ABC-123')";
                $("[name='sku']").focus();
            }
        }
    });

    $("#quantity").on('blur', function(e) {

        var quantity = $("#quantity").val();
        if (quantity) {
            if (qtyValidationCheck(quantity)) {
                if (quantity > 0) {
                    $('#submit').prop('disabled', false);
                    document.getElementById("quantity_status").innerHTML = "";
                } else {
                    document.getElementById("quantity_status").innerHTML = "Incorrect quantity!";
                    $("[name='quantity']").focus();
                    $('#submit').prop('disabled', true);
                }
            } else {
                document.getElementById("quantity_status").innerHTML = "Incorrect quantity!";
                $("[name='quantity']").focus();
                $('#submit').prop('disabled', true);
            }
        } else {
            document.getElementById("quantity_status").innerHTML = "Incorrect quantity!";
            $("[name='quantity']").focus();
            $('#submit').prop('disabled', true);

        }
    });

    $("#date").on('blur', function(e) {
        var date = $("#date").val();
        if (date) {
            if (validDate(date)) {
                document.getElementById("date_status").innerHTML = "";

                $('#submit').prop('disabled', false);

            } else {
                document.getElementById("date_status").innerHTML = "Incorrect Date (MM/DD/YYYY)";
                $("[name='date']").focus();
                $('#submit').prop('disabled', true);
            }
        }
    });

     $('#subedit').bind('click', function() {
        validOutData();
    });

    $('#submit').bind('click', function() {
        validData();
    });

    $('#logout').bind('click', function() {
        $("body").html("<h1>You Are Logged Out!</h1>");
        window.location.replace("http://jadran.sdsu.edu/jadrn030/servlet/Logout");
    });

    
});


 

   


function logout(response) {
  $('body').html(response);
	
}


function handleInData(response) {

    var key = new Array();
    var description = new Array();
    var tmpStr = response.split("|");
    document.getElementById("model").value = tmpStr[0];
    document.getElementById("category").value = tmpStr[1];
    document.getElementById("vendor").value = tmpStr[2];
    var url = 'http://jadran.sdsu.edu/jadrn030/servlet/CheckOnHand?sku=';
    url += $("#sku").val();

    $.get(url, onHandShow);
}

function onHandShow(response) {
    $("#on_hand").html("   Quantity available : " + response);

}

function validData() {
    var quantity = document.getElementById("quantity").value;
    var sku = document.getElementById("sku").value;
    var date = document.getElementById("date").value;
    if (!date) {
        document.getElementById("date_status").innerHTML = "Please enter date (MM/DD/YYYY)!";
        $("[name='date']").focus();
    } else {
        document.getElementById("date_status").innerHTML = "";
    }
    if (!sku) {
        document.getElementById("sku_status").innerHTML = "Please enter SKU (ABC-123)";
        $("[name='sku']").focus();
    } else {
        document.getElementById("sku_status").innerHTML = "";
    }
    if (!quantity) {
        document.getElementById("quantity_status").innerHTML = "Please enter quantity";
        $("[name='quantity']").focus();
    } else {
        if (!qtyValidationCheck(quantity)) {
            document.getElementById("quantity_status").innerHTML = "Invalid quantity";
            $("[name='quantity']").focus();

        } else {
            if (quantity == 0) {
                document.getElementById("quantity_status").innerHTML = "Invalid quantity";
                $("[name='quantity']").focus();

            } else {
                document.getElementById("quantity_status").innerHTML = "";
            }
        }
    }
    if (!validSKUREGEX(sku)) {
        document.getElementById("sku_status").innerHTML = "Invalid sku (ABC-123)";
        $("[name='sku']").focus();
    } else {
        document.getElementById("sku_status").innerHTML = "";

    }
    if (!validDate(date)) {
        document.getElementById("date_status").innerHTML = "Invalid date (MM/DD/YYYY)";
    } else {
        document.getElementById("date_status").innerHTML = "";
    }
    if (sku && date && quantity) {
        if (validSKUREGEX(sku) && validDate(date) && qtyValidationCheck(quantity) && quantity > 0) {
            var url = 'http://jadran.sdsu.edu/jadrn030/servlet/InsertMerchandiseIn?sku=';
            url += $("#sku").val();
            url += '&date=';
            url += $('#date').val();
            url += '&quantity=';
            url += $('#quantity').val();

            $.get(url, insertData);
        } else {
            $("[name='sku']").focus();
        }
    }
}

function handleOutData(response) {
    var key = new Array();
    var description = new Array();
    var tmpStr = response.split("|");
    document.getElementById("modeledit").value = tmpStr[0];
    document.getElementById("categoryedit").value = tmpStr[1];
    document.getElementById("vendoredit").value = tmpStr[2];
    var url = 'http://jadran.sdsu.edu/jadrn030/servlet/CheckOnHand?sku=';
    url += $("#skuedit").val();

    $.get(url, onHandShowOut);
}

function onHandShowOut(response) {

    $("#on_handedit").html("   Quantity available: " + response);
    window.onhandedit = response;
    

}

function insertData(response) {

    document.getElementById("sku_status").innerHTML = "";
    document.getElementById("sku").value = "";
    document.getElementById("category").value = "";
    document.getElementById("vendor").value = "";
    document.getElementById("model").value = "";
    document.getElementById("quantity").value = "";
    $('#submit').prop('disabled', true);

    document.getElementById("result").innerHTML = "Updated successfully!";
    document.getElementById("on_hand").innerHTML = "";

}
function insertDataOut(response) {
document.getElementById("skuedit_status").innerHTML = "";
document.getElementById("skuedit").value = "";
document.getElementById("categoryedit").value = "";
document.getElementById("vendoredit").value = "";
document.getElementById("modeledit").value = "";
document.getElementById("quantityedit").value = "";
$('#subedit').prop('disabled', true);
document.getElementById("resultedit").innerHTML = "Updated successfully!";
document.getElementById("on_handedit").innerHTML = "";
}

function validDate(d) {
    var date = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (date.test(d) == false) {
        return false;
    } else {
        return true;
    }
}

function validSKU(response) {
    if (response.startsWith("yes")) {
        document.getElementById("sku_status").innerHTML = "";
        var url = "/jadrn030/servlet/RetrieveMerchandiseInformation?sku=";
        url += $("#sku").val();
        $.get(url, handleInData);
        $('#submit').prop('disabled', false);
    } else if (response.startsWith("no") && $('#sku').val() != '') {
        document.getElementById("sku_status").innerHTML = "SKU not found in database!";
        $("[name='sku']").focus();
        document.getElementById("category").value = "";
        document.getElementById("vendor").value = "";
        document.getElementById("model").value = "";
        $('#submit').prop('disabled', true);
    }
}

function validSKUOut(response) {

    if (response.startsWith("yes")) {
        document.getElementById("skuedit_status").innerHTML = "";
        var url = "/jadrn030/servlet/RetrieveMerchandiseInformation?sku=";
        url += $("#skuedit").val();
        $.get(url, handleOutData);
        $('#subedit').prop('disabled', false);
    } else if (response.startsWith("no") && $('#sku').val() != '') {
        document.getElementById("skuedit_status").innerHTML = "SKU not found in database!";
        $("[name='skuedit']").focus();
        document.getElementById("categoryedit").value = "";
        document.getElementById("vendoredit").value = "";
        document.getElementById("modeledit").value = "";
        $('#subedit').prop('disabled', true);
    }
}

function qtyValidationCheck(quantity) {
    var regex = new RegExp("^[0-9]*$");
    if (regex.test(quantity)) {
        return true;
    } else {
        return false;
    }
}



function validOutData() {
    var quantity = document.getElementById("quantityedit").value;
    var sku = document.getElementById("skuedit").value;
    var date = document.getElementById("dateedit").value;


    if (!date) {
        document.getElementById("dateedit_status").innerHTML = "Please enter date (MM/DD/YYYY)";
        $("[name='dateedit']").focus();
    } else {
        document.getElementById("dateedit_status").innerHTML = "";
    }
    if (!sku) {
        document.getElementById("skuedit_status").innerHTML = "Please enter SKU (ABC-123)";
        $("[name='skuedit']").focus();
    } else {
        document.getElementById("skuedit_status").innerHTML = "";
    }
    if (!quantity) {
        document.getElementById("quantityedit_status").innerHTML = "Please enter quantity.";
        $("[name='quantityedit']").focus();
    } else {
        if (!qtyValidationCheck(quantity)) {
            document.getElementById("quantityedit_status").innerHTML = "Please enter valid quantity.";
            $("[name='quantityedit']").focus();
        } else {
            if (quantity == 0) {
                document.getElementById("quantityedit_status").innerHTML = "Please enter quantity > 0.";
                $("[name='quantityedit']").focus();
            } else {
                document.getElementById("quantityedit_status").innerHTML = "";
            }
        }
    }
    if (!validSKUREGEX(sku)) {
        document.getElementById("skuedit_status").innerHTML = "Please enter SKU - ABC-123";
        $("[name='skuedit']").focus();
    } else {
        document.getElementById("skuedit_status").innerHTML = "";
    }
    if (!validDate(date)) {
        document.getElementById("dateedit_status").innerHTML = "Enter valid Date - MM/DD/YYYY.";
        $("[name='skuedit']").focus();
    } else {
        document.getElementById("dateedit_status").innerHTML = "";
    }
    if (sku && date && quantity) {
        if (validSKUREGEX(sku) && validDate(date) && qtyValidationCheck(quantity) && quantity > 0) {

            if(quantity<=parseInt(window.window.onhandedit)){
            var url = 'http://jadran.sdsu.edu/jadrn030/servlet/InsertMerchandiseOut?sku=';

            url += $("#skuedit").val();
            url += '&date=';
            url += $('#dateedit').val();
            url += '&quantity=';
            url += $('#quantityedit').val();

            $.get(url, insertDataOut);
          }
          else {
            document.getElementById("quantityedit_status").innerHTML = "Quantity Unavailable. Only" + window.onhandedit + "left!";
          }
        }
    }
}




function validSKUREGEX(r) {
    var sku = /^[a-zA-Z]{3}-[0-9]{3}$/;
    if (sku.test(r) == false) {
        document.getElementById("category").value = "";
        document.getElementById("vendor").value = "";
        document.getElementById("model").value = "";
        $('#submit').prop('disabled', true);
        return false;
    } else {
        return true;
    }
}
