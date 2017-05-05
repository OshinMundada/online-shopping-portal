$(document).ready(function(){
    $("#logout_button").on('click',function(){
        $.ajax({
        	url: "/perl/jadrn030/proj1/logout.cgi", 
        	success: function(result){
            $("#container").show();
            $("#rest").hide();
        }});
    });
});