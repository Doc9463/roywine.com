<?php
$d = dir('../photos');

//echo "Handle: " . $d->handle . "<br>";
//echo "Path: " . $d->path . "<br>";
$photos = [];

while (($file = $d->read()) !== false){ 
  //echo "filename: " . $file . "<br>"; 
	if(strpos($file,'jpg') !== false || strpos($file,'JPG') !== false){
		array_push($photos, $file);
	}
} 
$d->close(); 

$myPhotos = json_encode($photos);

echo $myPhotos;
?>