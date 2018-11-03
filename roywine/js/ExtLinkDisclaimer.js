function DISCLAIMER(){
	"use strict";
	this.text = 'Thank you for visiting!';
				
	this.showDISCLAIMER = function (url, myText){
							this.text = myText;
							var dm = document.getElementById('disclaimerModal');
							var dmP1 = document.getElementById('disclaimerP1');
							var ok = document.getElementById('disclaimerContinue');
							window.location = '#';
							dmP1.innerHTML = this.text;
							ok.setAttribute('onClick','disclaimer.disclaimerContinue("' + url + '");');
							dm.style.display = 'block';
						};
	this.disclaimerContinue = function (url){
							this.disclaimerCancel();
							if(url !== '#'){window.open(url);}
						};
						
	this.disclaimerCancel = function () {
							var dm = document.getElementById('disclaimerModal');
							dm.style.display = 'none';
						};
						
	this.buildModal = function (){
							//insert modal
							var disclaimerDiv = document.createElement('div');
							document.body.appendChild(disclaimerDiv);
							disclaimerDiv.id = 'disclaimerModal';
							disclaimerDiv.classList.add('disclaimer');
							disclaimerDiv.style.display = 'none';
							
							var disclaimerContent = document.createElement('div');
							disclaimerDiv.appendChild(disclaimerContent);
							disclaimerContent.id = 'disclaimerContent';
							disclaimerContent.classList.add('disclaimerContent');
							
							var p1 = document.createElement('p');
							disclaimerContent.appendChild(p1);
							p1.id = 'disclaimerP1';
							
							var b1 = document.createElement('button');
							disclaimerContent.appendChild(b1);
							b1.id = 'disclaimerContinue';
							b1.setAttribute('onclick','disclaimer.disclaimerContinue();');
							b1.innerHTML = 'Continue';
							
							var b2 = document.createElement('button');
							disclaimerContent.appendChild(b2);
							b2.id = 'disclaimerCancel';
							b2.setAttribute('onclick','disclaimer.disclaimerCancel();');
							b2.innerHTML = 'Cancel';
						};
	this.buildModal();
}
