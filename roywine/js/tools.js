setHeader('none');

function selectTool(){
	"use strict";
	var sel = document.getElementById('mec_story');
	var choice = sel.options[sel.selectedIndex].value;
	//console.log(choice);
	switch (choice) {
		case "MEC":
			document.getElementById('mec').style.display = 'block';
			document.getElementById('story').style.display = 'none';
			document.getElementById('honor_grads').style.display = 'none';
			document.getElementById('tg').style.display = 'none';
			break;
		case "Story":
			document.getElementById('mec').style.display = 'none';
			document.getElementById('story').style.display = 'block';
			document.getElementById('honor_grads').style.display = 'none';
			document.getElementById('tg').style.display = 'none';
			break;
		case "Honor":
			document.getElementById('mec').style.display = 'none';
			document.getElementById('story').style.display = 'none';
			document.getElementById('honor_grads').style.display = 'block';
			document.getElementById('tg').style.display = 'none';
			document.getElementById('json').style.display = 'none';
			break;
		case "TG":
			document.getElementById('mec').style.display = 'none';
			document.getElementById('story').style.display = 'none';
			document.getElementById('honor_grads').style.display = 'none';
			document.getElementById('tg').style.display = 'block';
			document.getElementById('json').style.display = 'none';
			break;
		case "none":
			document.getElementById('mec').style.display = 'none';
			document.getElementById('story').style.display = 'none';
			document.getElementById('honor_grads').style.display = 'none';
			document.getElementById('tg').style.display = 'none';
			document.getElementById('json').style.display = 'none';
			break;
		default:		
	}
	setHeader(choice);
}

function setHeader(choice){
	"use strict";
	try{
		
		//get div
		var hdr = document.getElementById('content');
		
		while (hdr.firstChild) {
    		hdr.removeChild(hdr.firstChild);
		}
		//create h1
		var h1 = document.createElement('h1');
		hdr.appendChild(h1);
		
		//create p's
		var p1 = document.createElement('p');
		hdr.appendChild(p1);
		var p2 = document.createElement('p');
		hdr.appendChild(p2);
		var p3 = document.createElement('p');
		hdr.appendChild(p3);

		switch (choice) {
				case "MEC":
					h1.innerHTML = 'Military Excellence Award Entry';
					p1.innerHTML = 'This section is for updating the MEC Section of the news.html page.';
					p2.innerHTML = 'You may add or remove entries from the JSON file, as populated below.\n' +
					 				'It is recommended that no more than 7 (seven) items be displayed at any given time.\n' +
									'The items will appear on the web site in the order presented here.';
					p3.innerHTML = 'If you have Stories to add as well, you may select that section below and make \n' + 
									'the changes before creating the new JSON file for upload.  There is no benefit to making it twice.';
					document.getElementsByTagName('main')[0].style.top = '185px';
					break;
				case "Story":
					h1.innerHTML = 'RTC News Entry';
					p1.innerHTML = 'This section is for updating the articles Section of the news.html page.';
					p2.innerHTML = 'You may add or remove entries from the JSON file, as populated below.\n' +
									'It is recommended that no more than 5 (five) items be displayed at any given time.\n' +
									'The items will appear on the web site in the order presented here.';
					p3.innerHTML = 'If you have Awardees to add as well, you may select that section below and make \n' + 
									'the changes before creating the new JSON file for upload.  Always use news.json for the file name.';
					document.getElementsByTagName('main')[0].style.top = '185px';
					break;
				case "Honor":
					h1.innerHTML = 'Update Honor Graduates';
					p1.innerHTML = 'This section is for updating the Honor Grads of the honor_grads.html page.';
					p2.innerHTML = 'Following the formats in the input boxes, place the appropriate entry and press tab.\n' + 
									'This will activate the checks for duplicity and set case and formating';
					p3.innerHTML = 'Once complete, create the new JSON file and \n'+
									'always use honor_grad.json as the file name.';
					document.getElementsByTagName('main')[0].style.top = '185px';
					break;
				case "TG":
					h1.innerHTML = 'RTC Training Groups';
					p1.innerHTML = 'This page is here to enable the editing of the training groups tg_grad_dates.html page.';
					p2.innerHTML = 'Click on the row, or enter the training group number, to edit a particular training group.\n' + 
									'This will populate the input boxes for editing.';
					p3.innerHTML = 'Once complete, create the new JSON file and \n'+
									'always use tg.json as the file name.';
					document.getElementsByTagName('main')[0].style.top = '185px';
					break;
				case "none":
					h1.innerHTML = 'Recruit Training Tools';
					p1.innerHTML = 'This page is here to enable the editing and creation of the news and honor grads json files.';
					p2.innerHTML = 'No data is stored directly on the server from these tools.';
					p3.innerHTML = 'You must download the json files and place them in the appropriate folders for functionality.';
					document.getElementsByTagName('main')[0].style.top = '145px';
					break;
				default:
					h1.innerHTML = '';
					p1.innerHTML = '';
					p2.innerHTML = '';
					p3.innerHTML = '';
		}
		
		
		
	}catch(err){
		console.log(err);	
	}
	
}