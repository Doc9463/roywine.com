// JavaScript Document
//************************************************
//***** get requested JSON and return JS obj *****
//************************************************

//move to html/aspx/primaryJS
//var myObj = getObjFromJSON(getJSONObj("http://www.bootcamp.navy.mil/assets/json/primarymenu.json?nocache=123"));  


function getJSONObj(location){
	"use strict";
	var xhttp = "";
	if(window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}else{
		xhttp = new ActiveXObject('Microsoft.XMLHTTP');
	}

	xhttp.open("GET", location, true);
	xhttp.send();
	return xhttp;
}

function getObjFromJSON(xhttp){
	"use strict";
	try{
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				//console.log(this.responseText);  //comment out for final
				if(JSON.parse(this.responseText)){
					var obj;
					var obj = JSON.parse(this.responseText);
					console.log(obj);  //comment out for final
					return obj;
				}
			}
	  	};
	}catch(err){
		console.log(err);
	}
}