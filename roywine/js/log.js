// JavaScript Document

var workLog = [];

var columnSortedBy = 0;



//fills datepicker with today by default

Date.prototype.toDateInputValue = (function() {
	"use strict";
    var local = new Date(this);

    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());

    return local.toJSON().slice(0,10);

});

document.getElementById('dte').value = new Date().toDateInputValue();

var beginDate = new Date();// new Date(2018,4,26);

beginDate.setDate(beginDate.getDate()-30);

document.getElementById('bDate').value = beginDate.toDateInputValue();

document.getElementById('eDate').value = new Date().toDateInputValue();



var endDate = document.getElementById('eDate').value;// new Date(2018,5,29);

var pageNumber;



function nextPage(){

	"use strict";

	var pn = document.getElementById('pageNumber');

	var obj = JSON.parse(window.localStorage.getItem('sample'));

	var max = document.getElementById('pageNumber').getAttribute('max');

	if(pageNumber < obj.length && pageNumber < max ){

		pageNumber = Number(pageNumber) + 1;

		pn.value = pageNumber;

	}

	filterTable();

}

function previousPage(){

	"use strict";

	var pn = document.getElementById('pageNumber');

	if(pageNumber > 2){

		pageNumber = Number(pageNumber) - 1 ;

		pn.value = pageNumber;

	}else{

		pageNumber = 1 ;

		pn.value = pageNumber;

	}

	filterTable();

}

if(document.getElementById('pageNumber').value != ''){

	pageNumber = document.getElementById('pageNumber').value;

}else{

	pageNumber = 1;

}



//checks for localStorage item

if(JSON.parse(window.localStorage.getItem("sample"))){

	

	workLog = JSON.parse(window.localStorage.getItem("sample"));

	//var text = objToJSON(workLog);

	//downloadFile(text,"workLog.json");

	buildTable();

}

function saveToJSON(){

	"use strict";

	workLog = JSON.parse(window.localStorage.getItem("sample"));

	var text = objToJSON(workLog);

	downloadFile(text,"workLog.json");		

	

}





function processSelected(){

	"use strict";

	

	var sel = document.getElementById('add');

	var choice = sel.options[sel.selectedIndex].value;

	//console.log(choice);

	prefillByChoice(choice);

	

	

}



function prefillByChoice(choice){

	"use strict";

	var pgName = document.getElementById('page');

	var updtType =  document.getElementById('updateType');

	var notes = document.getElementById('notes');

	

	switch (choice){

		case "weeklyNews":

			pgName.value = 'news.html';

			setSelectOptionByValue('content');

			notes.value = 'Updated RTC MEC Awardee from the navy.mil site, via JSON.';

			break;

		case "weeklyHG":

			pgName.value = 'honor_grads.html';

			setSelectOptionByValue('content');

			notes.value = 'Updated RTC Honor Graduates from RTC PAO Office, via JSON.';	

			break;	

		case "weeklyGrad":

			pgName.value = 'graduation.html';

			setSelectOptionByValue('link');

			notes.value = 'Updated RTC Honor Graduates pdf link from RTC PAO Office, html update.';

			break;

		case "weeklyTG":

			pgName.value = 'tg_grad_dates.html';

			setSelectOptionByValue('content');

			notes.value = 'Updated RTC Graduation Dates for divisions from RTC PAO Office, via JSON.';	

			break;		

		default:

			break;

	}

	document.getElementById('updateEntry').style.display = 'none';	

	document.getElementById('deleteEntry').style.display = 'none';

	

}

function setSelectOptionByValue(val){

	"use strict";

	try{

		var updtType =  document.getElementById('updateType');

		for ( var i = 0; i < updtType.options.length; i++ ) {

			if ( updtType.options[i].value == val ) {

				updtType.options[i].selected = true;

				 return;

			}

		}

	}catch(err){

		console.log(err);

	}

}

function setSiteSelectOptionByValue(val){

	"use strict";

	try{

		var site =  document.getElementById('add');

		for ( var i = 0; i < site.options.length; i++ ) {

			if ( site.options[i].value == val ) {

				site.options[i].selected = true;

				 return;

			}

		}

	}catch(err){

		console.log(err);

	}

}

function clearEntry(){

	"use strict";

	try{

		document.getElementById('page').value = '';

		document.getElementById('notes').value = '';	

		document.getElementById('dte').value = new Date().toDateInputValue();

		document.getElementById('deleteEntry').style.display = 'none';

		document.getElementById('updateEntry').style.display = 'none';

		document.getElementById('valHolder').value = '';

		setSelectOptionByValue('none');

		setSiteSelectOptionByValue('none');



		

	}catch(err){

		console.log(err);

	}

}

function textDisplay(txt){

	"use strict";	

	//display choice, only for testing

	document.getElementById('yes').style.display = "none";

	document.getElementById('no').style.display = "none";

	showModal(txt);

	

}

function deleteEntry(){

	"use strict";

	var val = document.getElementById('valHolder').value;

	var obj = JSON.parse(window.localStorage.getItem('sample'));

	yesButtons();

	showModal("This is forever! \nDo you want to delete?");

	useTimer(5);

	setTimeout( function (){

		if(document.getElementById('answer').value === 'Yes'){

			obj.splice(val, 1);

			noButtons();

			useTimer(3, "");

			showModal("Deleted");

			window.localStorage.setItem('sample',JSON.stringify(obj));

			clearEntry();

			destroyTable();

			buildTable();

		}

	},7000);



}

function updateEntry(){

	var val = document.getElementById('valHolder').value;

	

	var obj = JSON.parse(window.localStorage.getItem('sample'));

	

	var myTime = obj[val].time;

	

	var dte = document.getElementById('dte').value;

		dte = new Date(dte + ' ' + myTime + ' UTC');

	var myDate = dte.getFullYear()+"-" + (dte.getMonth() + 1) + "-" + dte.getDate();	

	

	obj[val].date = myDate;

	obj[val].page = document.getElementById('page').value;

	obj[val].update[0].notes = document.getElementById('notes').value;

	

	window.localStorage.setItem("sample",JSON.stringify(obj));

	//document.getElementById('updateEntry').style.display = 'none';

	clearEntry();

	destroyTable();

	buildTable();

}

function addEntry(){

	"use strict";

	try{

		

		var obj = {"date" : "","time" : "","site"	: "","page":"","update":[]};

		var update = {"type" :	"",	"notes":	""};

		var tm = new Date();

		tm.getDate();

		//var myDate = dte.getFullYear()+"-" + (dte.getMonth() + 1) + "-" + dte.getDate();

		var myTime = tm.getHours() + ":" + tm.getMinutes();

		

		var dte = document.getElementById('dte').value;

		dte = new Date(dte + ' ' + myTime + ' UTC');

		var myDate = dte.getFullYear()+"-" + pad((dte.getMonth() + 1),2) + "-" + dte.getDate();

		

		obj.date = myDate;

		obj.time = myTime;

		

		var sel = document.getElementById('add');

		var choice = sel.options[sel.selectedIndex].text;

		if(choice.includes('RTC')){

			obj.site = sel.options[sel.selectedIndex].value;//'RTC';

		}else{ 

			obj.site = choice;

		}

		var pageName = document.getElementById('page').value;

		obj.page = pageName;

		

		var myType = document.getElementById('updateType');

		var mySel = myType.options[myType.selectedIndex].value;

		update.type = mySel;

		

		var note = document.getElementById('notes').value;

		update.notes = note;

		//console.log(JSON.stringify(obj));

		

		obj.update.push(update);

		//console.log(JSON.stringify(obj));

		workLog.push(obj);

		

		window.localStorage.setItem("sample",JSON.stringify(workLog));

		//console.log(sample);

		clearEntry();

		if(pageName === "DELETEMENOW"){

			window.localStorage.setItem("sample","");

		}

		

		

	}catch(rubish){

		console.log(rubish);	

	}

	destroyTable();

	buildTable();



}

function filterTable(){

	"use strict";

	destroyTable();

	beginDate = document.getElementById('bDate').value;

	endDate = document.getElementById('eDate').value;

	buildTable();		

	

}

function destroyTable(){

	"use strict";

	

	try{

		

		if(document.getElementById('myTable')){

			var tbl = document.getElementById('myTable');

			tbl.parentNode.removeChild(tbl);

		}

	}catch(err){

		console.log(err);

	}

	

	

	

	

}



function buildTable(){

	"use strict";

	if(JSON.parse(window.localStorage.getItem('sample'))){

		workLog = JSON.parse(window.localStorage.getItem('sample'));

	}

	

	var displayDiv = document.getElementById("displayWork");

	

	var tbl = document.createElement('table');

	displayDiv.appendChild(tbl);

	tbl.id = "myTable";

	

	var cap = document.createElement('caption');

	tbl.appendChild(cap);

	

	cap.innerHTML = "Work Log";

	

	var hr = document.createElement('tr');

	tbl.appendChild(hr);

	tbl.setAttribute('style','width: 100%;');

	

	var th1 = document.createElement('th');

	hr.appendChild(th1);

	th1.innerHTML = "date";

	th1.setAttribute('onClick','sortTable(0)');

	th1.setAttribute('style','width: 60px;');

	

	var th2 = document.createElement('th');

	hr.appendChild(th2);

	th2.innerHTML = "time";

	th2.setAttribute('onClick','sortTable(1)');

	th2.setAttribute('style','width: 50px; display: hidden;');

	

	var th3 = document.createElement('th');

	hr.appendChild(th3);

	th3.innerHTML = "site";

	th3.setAttribute('onClick','sortTable(2)');

	

	var th4 = document.createElement('th');

	hr.appendChild(th4);

	th4.innerHTML = "page";

	th4.setAttribute('onClick','sortTable(3)');

	

	var th5 = document.createElement('th');

	hr.appendChild(th5);

	th5.setAttribute('style','width: 70px;');

	th5.innerHTML = "update";

	th5.setAttribute('onClick','sortTable(4)');

	

	var th6 = document.createElement('th');

	hr.appendChild(th6);	

	th6.innerHTML = "notes";		

	th6.setAttribute('onClick','sortTable(5)');

	

	var i;

	if(pageNumber == '' || pageNumber == 1){

		 i = 0;

	}else{

		i = (pageNumber-1) * 10;

	}



	//table body

	var tbody = document.createElement('tbody');

	tbl.appendChild(tbody);

	

	for (i; i < workLog.length; i++){

		var w = workLog[i];

		var e = w.entry;	

		//console.log(JSON.stringify(e));

		var udt = w.update;

		

		var u = 0;

		

		for(u; u < udt.length; u++){

			var storedDate = convertUTCDateToLocalDate( new Date(w.date));

			storedDate = storedDate.getTime();

			var thisDate = convertUTCDateToLocalDate( new Date(beginDate));

			thisDate = thisDate.getTime();

			var thatDate = convertUTCDateToLocalDate(new Date(endDate));

			thatDate = thatDate.getTime();

			if(storedDate >= thisDate && storedDate <= thatDate){

				

				//console.log(JSON.stringify(udt[u]));

				var tr = document.createElement('tr');

				tbody.appendChild(tr);

				tr.setAttribute('onclick','processRow(' + i + ', this)');

				

				var td1 = document.createElement('td');

				tr.appendChild(td1);

				td1.setAttribute('style','width: 60px;');

				var dte = new Date(w.date);

				

				td1.innerHTML = dte.getFullYear() + "-" + pad((dte.getMonth() + 1),2) + "-" + pad(dte.getDate(),2);

				

				var td2 = document.createElement('td');

				tr.appendChild(td2);

				td2.setAttribute('style','width: 50px; display: hidden;');

				td2.innerHTML = w.time;

				

				var td3 = document.createElement('td');

				tr.appendChild(td3);

				td3.innerHTML = w.site;

				

				var td4 = document.createElement('td');

				tr.appendChild(td4);

				td4.innerHTML = w.page;

				

				var td5 = document.createElement('td');

				tr.appendChild(td5);

				td5.setAttribute('style','width: 70px;');

				td5.innerHTML = udt[u].type;

				

				var td6 = document.createElement('td');

				tr.appendChild(td6);

				td6.innerHTML = udt[u].notes;	

				if(pageNumber === 0 && i >9){

					i = workLog.length;

					

				}else if(i>(pageNumber*10)){

					i = workLog.length;

				}

			}else{

				//console.log(w.date);

			}

			

		}

	}

	if(columnSortedBy !== 0 || columnSortedBy !== ''){

		sortTable(columnSortedBy);

	}else{

		sortTable(0);

	}

	Counts();	

	var max = Math.ceil((workLog.length/10));

	document.getElementById('pageNumber').setAttribute('max',max);			

}

function convertUTCDateToLocalDate(date) {

    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);



    var offset = date.getTimezoneOffset() / 60;

    var hours = date.getHours();



    newDate.setHours(hours - offset);



    return newDate;   

}

function setPageNumber(){

	"use strict";

	pageNumber = document.getElementById('pageNumber').value;	

	

}

function pad (str, max) {

  str = str.toString();

  return str.length < max ? pad("0" + str, max) : str;

}

function processRow(val, thisEl){

	"use strict";

	try{

		var obj = JSON.parse(window.localStorage.getItem('sample'));

		var val = Number(val);

		//console.log(thisEl);

		for(var i = 0; i < obj.length; i++){

			var e = obj[i].update;

			if(val === i){

				setSiteSelectOptionByValue(obj[i].site);

				var dte = new Date(obj[i].date + ' ' + obj[i].time + ' UTC');

				var m = (dte.getMonth() + 1).toString();

				var d = dte.getDate().toString();

				document.getElementById('dte').value = dte.getFullYear() + '-' + pad(m,2) + '-' + pad(dte.getDate(),2);

				document.getElementById('page').value = obj[i].page;

				setSelectOptionByValue(e[0].type);

				document.getElementById('notes').value = e[0].notes;

				document.getElementById('valHolder').value = val;

				document.getElementById('updateEntry').style.display = '';

				document.getElementById('deleteEntry').style.display = '';

				return;	

			}

			

		}

		

		

		

	}catch(err){

		

	}

	

	

}

function Counts(){

	"use strict";

	

	var obj = JSON.parse(window.localStorage.getItem('sample'));

	

	var rtc = 0, otcn = 0, nstc = 0,n6 = 0,sta21 = 0, sapr = 0, chap = 0, band = 0, njrotc = 0, nrotc = 0, nstcSP = 0, n6SP = 0, otcnSP = 0, saprSP = 0, chapSP = 0,bandSP = 0;

	var i = 0;

	

	for(i; i < obj.length; i++){

		var storedDate = convertUTCDateToLocalDate( new Date(obj[i].date + " " + obj[i].time + ":00"));

			storedDate = storedDate.getTime();

			var thisDate = convertUTCDateToLocalDate( new Date(beginDate + " 00:00:00"));

			thisDate = thisDate.getTime();

			var thatDate = convertUTCDateToLocalDate(new Date(endDate + " 23:59:59"));

			thatDate = thatDate.getTime();

			if(storedDate >= thisDate && storedDate <= thatDate){

			switch(obj[i].site){

				case "RTC":

					rtc++;

					break;

				case "NSTC":

					nstc++;

					break;

				case "N6":

					n6++;

					break;				

				case "OTCN":

					otcn++;

					break;

				case "STA-21":

					sta21++;

					break;

				case "SAPR":

					sapr++;

					break;

				case "Chaplain":

					chap++;

					break;

				case "Band":

					band++;

					break;

				case "NJROTC":

					njrotc++;

					break;

				case "NROTC":

					nrotc++;

					break;		

				case "OTCN-SP":

					otcnSP++;

					break;	

				case "NSTC-SP":

					nstcSP++;

					break;

				case "N6-SP":

					n6SP++;

					break;	

				case "SAPR-SP":

					saprSP++;

					break;

				case "Chaplain-SP":

					chapSP++;

					break;

				case "Band-SP":

					bandSP++;

					break;	

				case "weeklyNews":

					rtc++;

					break;	

				case "weeklyHG":

					rtc++;

					break;

				case "weeklyGrad":

					rtc++;

					break;

				case "weeklyTG":

					rtc++;

					break;				

				default:

			}

		}

	}

	document.getElementById('rtcCount').value = rtc;

	document.getElementById('nstcCount').value = nstc;

	document.getElementById('n6Count').value = n6;

	document.getElementById('sta21Count').value = sta21;

	document.getElementById('otcnCount').value = otcn;

	document.getElementById('SAPRCount').value = sapr;

	document.getElementById('chapCount').value = chap;

	document.getElementById('bandCount').value = band;

	document.getElementById('njrotcCount').value = njrotc;

	document.getElementById('nrotcCount').value = nrotc;

	document.getElementById('otcnShareCount').value = otcnSP;

	document.getElementById('nstcShareCount').value = nstcSP;

	document.getElementById('n6ShareCount').value = n6SP;

	document.getElementById('SAPRShareCount').value = saprSP;

	document.getElementById('chapShareCount').value = chapSP;

	document.getElementById('bandShareCount').value = bandSP;

	

	var total = ( rtc+otcn+nstc+n6+sta21+sapr+chap+band+njrotc+nrotc+nstcSP+n6SP+otcnSP+saprSP+chapSP+bandSP);

	document.getElementById('totalCount').value = total;

	//console.log(rtc);

	

	

	

}