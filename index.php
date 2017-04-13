<!doctype html>
<html>
<head>
	<title>Opvoed App</title>
	
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="assets/css/yipp.css" rel="stylesheet">
	<link href="assets/css/zSlider.css" rel="stylesheet">
	<link href="assets/css/signin.css" rel="stylesheet">
	<link href="assets/css/timeline.css" rel="stylesheet">
	<!-- <link href="assets/css/emergency.css" rel="stylesheet"> -->
	<link href="assets/css/app.css" rel="stylesheet">
	
	<style type="text/css">
		[v-cloak] { display:none; }
		.screen {display: none;}
	</style>

	<script>
	  UPLOADCARE_PUBLIC_KEY = '85b915135beefa3ef62e';
	</script>
</head>

<body>
<div id="container">
	<div id="app">
		<router-view></router-view>
	</div>      
	<script src="assets/js/app.js"></script>
	<script type="text/javascript">
		window.input = $('#uploadPic');

	</script>
</div>
</body>
</html>