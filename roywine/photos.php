<!doctype html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta charset="UTF-8">

		<title>Photos</title>
		
		<link rel="stylesheet" href="css/photos.css" type="text/css"/>
	</head>

	<body>
		<header>
		
		
		
		</header>
		<main>
			
			<div class="photoCenter">
		
				

		<?php
			$d = dir('photos');

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
		for( $i = 0; $i < sizeof($photos) ; $i++){
			$p = '<img id="photoViewer" class="photoViewer" src="photos/'.$photos[$i].'" alt="Images"/>';	 
			echo $p;
		 }
			//$p = '<img id="photoViewer" class="photoViewer" src="photos/'.$photos[0].'" alt="Images"/>';
			//echo $p;
		?>

		
			</div>
		
		</main>
		<footer>
		
		
		
		</footer>
		<script src="js/photos.js" type="text/javascript"></script>
	</body>
</html>
