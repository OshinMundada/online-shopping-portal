var proj4_data;
var toggle = 0;

 function checkValidState(stateName) {
     var states = new Array("AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
         "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
         "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
         "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
         "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
         "AS", "DC", "FM", "GU", "MH", "MP", "PR", "PW", "VI");
     for (var i = 0; i < states.length; i++) {
         if (states[i] == $.trim(stateName))
             return true;
     }
     return false;
 }
 
  function isValidEmail(email) {
     var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     return regex.test(email);
 }




$(document).ready(function() {

    
    var results = new RegExp('[\?&]skustring=([^&#]*)').exec(window.location.href);
    $('#skustring').val(results[1]);

    var qityfunc = new RegExp('[\?&]qity=([^&#]*)').exec(window.location.href);
    $('#qity').val(qityfunc[1]);
    
    function billing(checked) {  
          if (checked) {  
                    $('#address1').val($('#address').val()) ; 
                   $('#address21').val($('#address2').val()) ;    
                    $('#city1').val($('#city').val()) ;  
                    $('#state1').val($('#state').val()) ;  
                    $('#zipcode1').val($('#zipcode').val()) ;  
          } else {  
                    $('#address11').val("") ; 
                   $('#address12').val("") ;    
                    $('#city1').val("") ;  
                    $('#state1').val("") ;  
                    $('#zipcode1').val("") ;  
          }        
        }    
     function validateData() {
         var name = $('#name').val(),
             email = $('#email').val(),
             phone = $('#mobi1').val()+$('#mobi2').val()+$('#mobi3').val(),
             address = $('#address').val(),
             city = $('#city').val(),
             state = $('#state').val(),
             zipcode = $('#zipcode').val(),
             address1 = $('#address1').val(),
             city1 = $('#city1').val(),
             state1 = $('#state1').val(),
             zipcode1 = $('#zipcode1').val(),
             cardnum = $('#credit').val(),
             cardname = $('#cardname').val(),
             cvv = $('#cvv').val(),
             expmonth = $('#expmonth').val(),
             expyear = $('#expyear').val();


         var errorMessage = $('#error_message');

         if ($.trim(name).length == 0) {
             $('#error_message').text("Please enter your name");
             $('#name').focus();
             return false;
         } else if ($.trim(email).length == 0) {
             errorMessage.text("Please enter email ID");
             $('#email').focus();
             return false;
         } else if (!isValidEmail(email)) {
             errorMessage.text("Please enter valid email ID");
             $('#email').focus();
             return false;
         }  else if ($.trim(phone).length == 0) {
             errorMessage.text("Please enter phone number");
             $('#phone').focus();
             return false;
         } else if (!$.isNumeric(phone)) {
            alert(phone);
             errorMessage.text("Please enter numeric phone number");
             $('#phone').focus();
             return false;
         } else if (phone.length != 10) {
             errorMessage.text("Please enter 10 digit phone number");
             $('#phone').focus();
             return false;
         } else if ($.trim(address).length == 0) {
             errorMessage.text("Please enter address");
             $('#address').focus();
             return false;
         } else if ($.trim(city).length == 0) {
             errorMessage.text("Please enter city");
             $('#city').focus();
             return false;
         } else if ($.trim(state).length == 0) {
             errorMessage.text("Please enter state");
             $('#state').focus();
             return false;
         } else if (!checkValidState($('#state').val().toUpperCase())) {
             errorMessage.text("Please enter valid state");
             $('#state').focus();
             return false;
         } else if ($.trim(zipcode).length == 0) {
             errorMessage.text("Please enter zipcode");
             $('#zipcode').focus();
             return false;
         } else if (!$.isNumeric(zipcode)) {
             errorMessage.text("Zipcode should be numeric");
             $('#zipcode').focus();
             return false;
         } else if (zipcode.length != 5) {
             errorMessage.text("Please enter valid zipcode");
             $('#zipcode').focus();
             return false;
         } else if ($.trim(address1).length == 0) {
             errorMessage.text("Please enter address");
             $('#address').focus();
             return false;
         } else if ($.trim(city1).length == 0) {
             errorMessage.text("Please enter city");
             $('#city').focus();
             return false;
         } else if ($.trim(state1).length == 0) {
             errorMessage.text("Please enter state");
             $('#state').focus();
             return false;
         } else if (!checkValidState($('#state').val().toUpperCase())) {
             errorMessage.text("Please enter valid state");
             $('#state').focus();
             return false;
         } else if ($.trim(zipcode1).length == 0) {
             errorMessage.text("Please enter zipcode");
             $('#zipcode').focus();
             return false;
         } else if (!$.isNumeric(zipcode1)) {
             errorMessage.text("Zipcode should be numeric");
             $('#zipcode').focus();
             return false;
         } else if (zipcode1.length != 5) {
             errorMessage.text("Please enter valid zipcode");
             $('#zipcode').focus();
             return false;
         } else if ($('input[type=radio]:checked').length == 0) {
            errorMessage.text("Please select the card type");
         } else if ($.trim(cardnum).length == 0) {
             errorMessage.text("Please enter the card number");
             $('#cardname').focus();
             return false;
         } else if ($.trim(cardnum).length != 16) {
             errorMessage.text("The card number is not valid");
             $('#cardname').focus();
             return false;
         }  else if ($.trim(cardname).length == 0) {
             errorMessage.text("Please enter name on card");
             $('#cardname').focus();
             return false;
         } else if ($.trim(cvv).length == 0) {
             errorMessage.text("Please enter cvv");
             $('#cvv').focus();
             return false;
         } else if ($.trim(cvv).length != 3) {
             errorMessage.text("CVV must be of 3 digits");
             $('#cvv').focus();
             return false;
         } else if($.trim(expmonth)=="" || $.trim(expyear)=="") {
            errorMessage.text("Enter month and year of expiry");
            return false;
         } else {
             return true;
         }

     }

     $('#subbut').on('click', function(e) {
            var isValid = validateData();
            if(isValid == false){
                e.preventDefault();
            }


        });

     $('#shipeqbill').on('click', function(e){   
            billing(this.checked);
        });
    
        
});

