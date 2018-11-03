// JavaScript Document
var photos = new Photos();
photos.getImages();
function Photos(){
	"use strict";
	this.viewer = document.getElementById('photoViewer');
	this.photoList = {};
	this.photoIndex = 0;
	this.stop = false;
	this.pauseBtn = document.getElementById('pauseBtn');
	
	this.getImages = function(){
			var xmlhttp = new XMLHttpRequest();
        	xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
				photos.photoList = JSON.parse(this.responseText);
				switchImage(photos.photoIndex);
            }
        };
        xmlhttp.open("GET", "php/photo.php", true);
        xmlhttp.send();
	};
	this.pause = function(){
		if(this.stop){
			this.stop = false;
			this.pauseBtn.innerHTML = "Pause";
			switchImage();
		}else{
			this.stop = true;
			this.pauseBtn.innerHTML = "Play";
		}
	};
	this.previousImage = function(){
			if(photos.photoIndex !== 0){
				photos.photoIndex--;
			}else{
				photos.photoIndex = photos.photoList.length - 1;	
			}
			photos.viewer.src = "photos/" + photos.photoList[photos.photoIndex];
			document.getElementById('display').innerHTML = photos.photoList[photos.photoIndex];
	};
	this.nextImage = function(){
			if(photos.photoIndex < photos.photoList.length -1){
				photos.photoIndex++;
			}else{
				photos.photoIndex = 0;	
			}
			photos.viewer.src = "photos/" + photos.photoList[photos.photoIndex];
			document.getElementById('display').innerHTML = photos.photoList[photos.photoIndex];
	};
	document.getElementById("secondsSel").options[2].selected=true;
}
	
function switchImage(){
	"use strict";
		if(!photos.stop){	
			photos.viewer.src = "photos/" + photos.photoList[photos.photoIndex];
			if(photos.photoIndex < photos.photoList.length -1){
				photos.photoIndex++;
			}else{
				photos.photoIndex = 0;	
			}
		}else{
			return;
		}
			var sel = document.getElementById('secondsSel');
			var secs = Number(sel.options[sel.selectedIndex].value);
			document.getElementById('display').innerHTML = photos.photoList[photos.photoIndex];
			setTimeout(switchImage, secs);
}