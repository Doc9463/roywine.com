// JavaScript Document

//returns next occuring Friday Date based on inputDate
function getFriday(inputDate){
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	//days[d.getDay()]
	
	while(inputDate.getDay() !== 5){
		inputDate.setDate(inputDate.getDate()+1);
	}
	
	return inputDate;
}

//takes element or element id
function focusElement(el){
	"use strict";
	try{
		if(el){
			el.focus();
			return;
		}else if(document.getElementById(el)){
			document.getElementById(el).focus();	
		}
			
	}catch(err){
		return;
	}				
}
//formats date into MMM dd, yyyy
function formatDate(dateStr){
	"use strict";
	var date = new Date(dateStr);
	// converts to local time
	date.setMinutes(date.getTimezoneOffset() + date.getMinutes());
	// gets components for display 
	var month = getMonthText(date.getMonth());
	var day = date.getDate();
	var year = date.getFullYear();
	// 
	var formatedDate = month + " " + day + ", " + year;

	return formatedDate;
}
// returns month text based on month value (numeric)
function getMonthText(monthVal){
	"use strict";
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return months[monthVal];
}



//converts a JS object to JSON string
function objToJSON(obj){
	"use strict";
	var text = "Unable to convert to JSON, see log";
	try{
		text = JSON.stringify(obj);
	}catch(err){
		console.log(err);
	}finally{
		return text;
	}
}

// evals browser and requests correct file creation method (function)
function downloadFile(text, filename){
	"use strict";
	
	try{		

		if(window.navigator.msSaveOrOpenBlob){
			
			downloadIE(filename, text)
			
	
		}else{
			downloadNonIE(filename, text);
		}
		
	}catch(err){
		console.log(err);
	}
}
// creates file for download for IE based on text and filename
function downloadIE(filename, text){
	"use strict";
	try{
		
		var fileBlob = new Blob([JSON.stringify(text, null, 2)], {type : 'application/json'});
	
		window.navigator.msSaveOrOpenBlob(fileBlob, filename);
		
		
		//showModal("Browse for the file you just saved to upload to website");
		
	}catch(err){
		console.log(err);
	}
		
}
// creates file for download for non-IE based on text and filename
function downloadNonIE(filename, text) {
	"use strict";
	try{
		var url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
		
		var element = document.getElementById('btn_download');
			element.setAttribute('href', url);
			element.setAttribute('download', filename);
			element.style.display = 'none';
			element.click();
			element.parentNode.removeChild(element);
	}catch(err){
		console.log(err);
	}
}
