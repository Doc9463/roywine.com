// JavaScript Document

//***********************************************************
//****************  TOOLS  **********************************
//***********************************************************

//returns array from string based on delim
function createArrayFromCSV_String(string, delim){
	"use strict";
	var arr = [];
	if(string !== null && string !== ""){
		arr = string.split(delim);
		var arr2 = [];
		for(var i = 0; i < arr.length; i++){
			arr[i].trim();
			arr2[i] = Number(arr[i]);
		}
	}
	return arr2;
}
//pads zero (0) to str sent
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad(0 + str, max) : str;
}
//sleeps for input time
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
//***********************************************************
//*************  Date Formatting Strings  *******************
//***********************************************************

//MMMDDYYYY (April 30, 2018)
function formatDateMMMDDYYYY(dateString){
	"use strict";
	//date prototype must be in scope of use
	Date.prototype.formatMMMDDYYYY = function(){
		var y = this.getFullYear();
		var m = getMonthText(this.getMonth());
		
		var d = this.getDate();
		if(d < 10){
			d = "0" + d;
		}
		return (m + " " + d + "," + y);
	}
	var myDate = new Date(dateString);
	// converts to local time
	myDate.setMinutes(myDate.getTimezoneOffset() + myDate.getMinutes());
	
	return myDate.formatMMMDDYYYY();
}
//YYMMDD (2018-04-30)
function formatDateYYYYMMDD(dateString){
	"use strict";
	
	//date prototype must be in scope of use
	Date.prototype.formatYYYYMMDD = function(){
		var y = this.getFullYear();
		var m = this.getMonth() + 1;
		if(m < 10){
			m = "0" + m;
		}
		var d = this.getDate();
		if(d < 10){
			d = "0" + d;
		}
		return (y + "-" + m + "-" + d);
	}
	var myDate = new Date(dateString);
	// converts to local time
	myDate.setMinutes(myDate.getTimezoneOffset() + myDate.getMinutes());
	
	return myDate.formatYYYYMMDD();
}



