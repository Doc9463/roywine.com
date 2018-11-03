// JavaScript Document
//taken from W3 Schools example

//Update this line to reflect the table id, or include it in the call
var tableID = "myTable";
//Update this line to reflect the table id, or include it in the call

function mysortTable(n, tID){
	"use strict";
	
	var obj = JSON.parse(window.localStorage.getItem('sample'));
	
	obj.sort(function (a, b){return a.date - b.date});
	destroyTable();
	window.localStorage.setItem('sample',JSON.stringify(obj));
	buildTable();	
	
}

function sortTable(n, tID) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	columnSortedBy = n;
	//validate tID is a table
	if(document.getElementById(tID)){
		tableID = tID;
	}
	
	table = document.getElementById(tableID); //added variable for tableID
	
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc"; 
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.getElementsByTagName("TR");
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
		  // Start by saying there should be no switching:
		  shouldSwitch = false;
		  /* Get the two elements you want to compare,
		  one from current row and one from the next: */
		  x = rows[i].getElementsByTagName("TD")[n];
		  y = rows[i + 1].getElementsByTagName("TD")[n];
		  /* Check if the two rows should switch place,
		  based on the direction, asc or desc: */
			var a = x.innerHTML.toLowerCase();
			var b = y.innerHTML.toLowerCase();
		  if (dir == "asc") {
			  if(n === 0){
				  a = new Date(a);
				  a = a.getTime();
				  b = new Date(b);
				  b = b.getTime();
				  
			  }
			  if (a > b) {
			  // If so, mark as a switch and break the loop:
			  shouldSwitch = true;
			  break;
			}
		  } else if (dir == "desc") {
			  if(n === 0){
				  a = new Date(a);
				  a = a.getTime();
				  b = new Date(b);
				  b = b.getTime();
				  
			  }			  
			if (a < b) {
			  // If so, mark as a switch and break the loop:
			  shouldSwitch = true;
			  break;
		  	}
		  }
		}
		if (shouldSwitch) {
		  /* If a switch has been marked, make the switch
		  and mark that a switch has been done: */
		  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		  switching = true;
		  // Each time a switch is done, increase this count by 1:
		  switchcount ++; 
		} else {
		  /* If no switching has been done AND the direction is "asc",
		  set the direction to "desc" and run the while loop again. */
		  if (switchcount == 0 && dir == "asc") {
			dir = "desc";
			switching = true;
		  }
		}
	}
}