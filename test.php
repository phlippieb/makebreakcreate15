<!DOCTYPE html>
<html>
<head>
	<title>TEST PAGE</title>
</head>
<body>
	<div> 
		<?php
			$file = fopen('output.json','r');
			if ($file) {
				while(($line = fgets($file)) != false) {
					$json = json_decode($line, true) ;
					$size = 14 + intval($json['score']) ;
					echo '<p style="font-size:' . $size . 'pt">' . $json['data'] . '</p>';
				}
			}
		?>
	</div>
</body>
</html>