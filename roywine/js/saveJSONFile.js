//******************************************************
//Save to JSON section
//******************************************************

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
		var bt = JSON.parse(text);
		var fileBlob = new Blob([JSON.stringify(bt, null, 2)], {type : 'application/json'});//
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

		var div = document.getElementById('AddDiv');
		
		var btn = document.createElement('a');
		div.appendChild(btn);
		btn.setAttribute('visibility', 'none');
		btn.setAttribute('id', 'btn_download')
		
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
