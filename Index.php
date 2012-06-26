<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 6/23/12
 * Time: 6:26 PM
 * To change this template use File | Settings | File Templates.
 */
/** Set theme */
 $theme = "sos";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>SS Client Tracker</title>
	<link rel="stylesheet" href="themes/<?php echo $theme; ?>/css/styles.css">

	<!--[if lt IE 7]>
	<div class='aligncenter'><a href="http://www.microsoft.com/windows/internet-explorer/default.aspx?ocid=ie6_countdown_bannercode"><img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" alt="" border="0"></a></div>
	<![endif]-->
	<!--[if lt IE 9]>
	<script type="text/javascript" src="js/html5.js"></script>
	<link rel="stylesheet" href="css/ie.css">
	<![endif]-->

	<!-- Libraries -->
	<script type="text/javascript" src="extjs/ext-all-dev.js"></script>
	<!--<script type="text/javascript" src="extjs/ext-all-debug.js"></script>-->
	<!--<script type="text/javascript" src="extjs/ext-all.js"></script>-->
	<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.8.20.custom.min.js"></script>

</head>
<body>
	<div class="mainRootDiv">
		<div class="mainHeaderDiv">
			<div class="ssLogo"><img src="themes/<?php echo $theme; ?>/img/SS_logo.png" alt="Security Sciences Logo" style="border-width: 0; width: 262px; height: 43px;"> </div>
		</div>
		<div class="mainMenuDiv">
			<div class="btnInformation btnMain"></div>
			<div class="btnAlerts btnMain"></div>
			<div class="btnMedicalTracker btnMain"></div>
			<div class="btnKidTracker btnMain"></div>
			<div class="btnCarTracker btnMain"></div>
			<div class="btnPetTracker btnMain"></div>
			<div class="btnHomeSecurity btnMain"></div>
			<div class="btnProperties btnMain"></div>
		</div>
	</div>
</body>
</html>