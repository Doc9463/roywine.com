// JavaScript Document
// Get the modal
var modal = document.getElementById('myModal');
document.getElementById('answer').value = 'No';

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Call this to open the modal 
function showModal(text){
	document.getElementById('modalP').innerHTML = text;
    modal.style.display = "block";
	
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }else if(event.target == span){
		modal.style.display = "none";
		
	}
}
var myVar;
function useTimer(val, text){
	"use strict";
	if(typeof text == 'undefined'){
		text = " seconds until No is selected";
	}
	document.getElementById('timer').style.display = '';
	myVar = setInterval(function() {
        document.getElementById("timer").innerHTML = val + " " + text;
    	val--;
		if(val < 0){
			clearTimeout(myVar);
			document.getElementById('no').click();
		}		
	}, 1000);
	

	
}
	
function noButtons(){
	"use strict";
	document.getElementById('yes').style.display = 'none';
	document.getElementById('no').style.display = 'none';	
	
}
function yesButtons(){
	"use strict";
	document.getElementById('yes').style.display = '';
	document.getElementById('no').style.display = '';	
	
	
}
function setAnswer(val){
	"use strict";
	clearTimeout(myVar);
	var answer = document.getElementById('answer');
	
	answer.value = val;;
	modal.style.display = "none";
	document.getElementById('timer').style.display = 'none';
	document.getElementById('timer').innerHTML = '';
}