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
	<link rel="stylesheet" href="css/modals.css" />

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
	<script type="text/javascript" src="js/app/Config.js"></script>
	<script type="text/javascript" src="js/app/AppService.js"></script>
	<script type="text/javascript" src="js/app/Services/ClientGpsTrack.js"></script>
	<!-- START Modals -->
	<script type="text/javascript" src="js/app/Modals/LoginForm.js"></script>
	<script type="text/javascript" src="js/app/Modals/MdlDlgInfoForm.js"></script>
	<!--   END Modals -->
	<!-- START Models-->
	<script type="text/javascript" src="js/app/Models/DeviceModel.js"></script>
	<!--   END Models-->
	<!-- START Controllers -->
	<script type="text/javascript" src="js/app/Controllers/Devices.js"></script>
	<!--   END Controllers -->
	<!-- START Google Maps Api -->
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false" ></script>
	<script type="text/javascript" src="js/Gps/maps.js"></script>
	<!--   END Google Maps Api -->
	<script type="text/javascript">
		/** Boot strap. */
		$(function ()
		{
			$(window).bind("load", function ()
			{
				$(SOS.AppService.Init);
			});
		});

	</script>

</head>
<body>
	<div class="mainRootDiv cf">
		<div class="mainHeaderDiv">
			<div class="ssLogo"><img src="themes/<?php echo $theme; ?>/img/SS_logo.png" alt="Security Sciences Logo" style="border-width: 0; width: 262px; height: 43px;"> </div>
		</div>
		<div class="mainBodyDiv">
			<div id="map_canvas">Maps Goes Here</div>
			<div class="toolsMenu cf">
				<div class="btnMain">Circle</div>
				<div class="btnMain"></div>
				<div id="devOptions" class="devOptions" style="position:absolute; bottom:10px; right:10px;">
					<select id="toolchoice" name="toolchoice" style="border:1px solid #000000;" onchange="SOS.Gps.Maps.setTool();">
						<option value="3">Rectangle</option>
						<option value="4" selected="">Circle</option>
					</select>
					<select id="overPos">
						<option>LngLat mousemove</option>
						<option selected="selected">LatLng mousemove</option>
					</select>
				</div>
			</div>
		</div>
		<div class="mainMenuDiv">
			<div class="btnInformation btnMain"></div>
			<div class="btnAlerts btnMain"></div>
			<!-- START: Insert devices here. -->
			<div class="deviceList">
				<div class="btnMedicalTracker btnMain">001</div>
				<div class="btnKidTracker btnMain"></div>
				<div class="btnCarTracker btnMain"></div>
				<div class="btnPetTracker btnMain"></div>
				<div class="btnHomeSecurity btnMain"></div>
			</div>
			<!--   END: Insert devices here. -->
			<div class="btnProperties btnMain"></div>
		</div>
	</div>
</body>
</html>