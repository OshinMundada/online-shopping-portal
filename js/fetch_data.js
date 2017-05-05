$(document).ready(function() {
	proj1_data = new Array();
	    $.get('/perl/jadrn030/fetch_data.cgi', storeData);
		
	$('#sku').on('click', function() { 

		tmpString = "";
		        for(var i=0; i < proj1_data.length; i++) {
		            tmpString += "<strong>"+proj1_data[i][0]+"</strong>-----"+proj1_data[i][1]+"<br>";          
		            }
		        var handle = document.getElementById('content');
		        handle.innerHTML = tmpString;
	});
});

function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj1_data[i] = innerArray;
        }
    }
	
function explodeArray(item,delimiter) {
	tempArray=new Array(1);
	var Count=0;
	var tempString=new String(item);

	while (tempString.indexOf(delimiter)>0) {
	tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
	tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
	Count=Count+1
	}

	tempArray[Count]=tempString;
	return tempArray;
}     
	
	