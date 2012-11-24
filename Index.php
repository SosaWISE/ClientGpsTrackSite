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
<!--	<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>-->
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.1.js"></script>
	<script type="text/javascript" src="http://jzaefferer.github.com/jquery-validation/jquery.validate.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.8.20.custom.min.js"></script>
	<script type="text/javascript" src="js/app/Config.js"></script>
	<!-- START Utils -->
	<script type="text/javascript" src="js/app/Utils/Strings.js"></script>
	<!-- START Apps -->
	<script type="text/javascript" src="js/app/AppService.js"></script>
	<script type="text/javascript" src="js/app/Services/ClientGpsTrack.js"></script>
	<script type="text/javascript" src="js/app/Services/Authentication.js"></script>
	<!-- START Modals -->
	<script type="text/javascript" src="js/app/Modals/LoginForm.js"></script>
	<script type="text/javascript" src="js/app/Modals/MdlDlgInfoForm.js"></script>
	<!--   END Modals -->
	<!-- START Sliders -->
	<script type="text/javascript" src="js/app/Sliders/GpsInfoSlider.js"></script>
	<!--   END Sliders -->
	<!-- START Models -->
	<script type="text/javascript" src="js/app/Models/DeviceModel.js"></script>
	<!--   END Models -->
	<!-- START Views -->
	<script type="text/javascript" src="js/app/Views/GpsFenceList.js"></script>
	<script type="text/javascript" src="js/app/Views/GeoToolbar.js"></script>
	<!--   END Views -->
	<!-- START Controllers -->
	<script type="text/javascript" src="js/app/Controllers/Devices.js"></script>
	<!--   END Controllers -->
	<!-- START Google Maps Api -->
<!--	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false" ></script>-->
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyCJY7XN6PfUqHUtYR6BEK1hB_tt9wyzVy8&libraries=geometry&sensor=true"></script>
	<script type="text/javascript" src="/js/app/Lib/polygonEdit.js"></script>
	<script type="text/javascript" src="js/Gps/mapsV3.js"></script>
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
			<div class="menuGps">
				<div class="monPartyInfo">
					<table class="monPartyInfo">
						<thead>
						<tr>
							<th colspan="3" class="secTitle">Monitored Information</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td class="fieldTitle">N</td>
							<td class="fieldValue">Andres Sosa</td>
							<td rowspan="3"><img src="/images/Picture.png" style="width: 50px;" alt="Andres Sosa"/></td>
						</tr>
						<tr>
							<td class="fieldTitle">A</td>
							<td class="fieldValue">1184 N 840 E<br />OREM UT 84097</td>
						</tr>
						<tr>
							<td class="fieldTitle">M</td>
							<td class="fieldValue">(801) 822-9323</td>
						</tr>
						</tbody>
					</table>
				</div>
				<br />
				<!-- START Events Table -->
				<table class="listTable">
					<thead>
					<tr>
						<th colspan="3">Latest Events</th>
					</tr>
					</thead>
					<tbody id="deviceEventTblBdy">
					<!--Start Normal Row -->
					<tr class="trNormal">
						<td>08/01/2012</td>
						<td>Fall Detection</td>
						<td class="rowPointer" rowspan="2"></td>
					</tr>
					<tr class="trNormal">
						<td colspan="2">794 E 3950 N; Provo UT 84606</td>
					</tr>
					<!--  END Normal Row -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!-- START Alternate Row -->
					<tr class="trAlt">
						<td>08/01/2012</td>
						<td>Fall Detection</td>
						<td class="rowPointer" rowspan="2"></td>
					</tr>
					<tr class="trAlt">
						<td colspan="2">794 E 3950 N; Provo UT 84606</td>
					</tr>
					<!--   END Alternate Row -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!--Start Normal Row -->
					<tr class="trNormal">
						<td>08/01/2012</td>
						<td>Fall Detection</td>
						<td class="rowPointer" rowspan="2"></td>
					</tr>
					<tr class="trNormal">
						<td colspan="2">794 E 3950 N; Provo UT 84606</td>
					</tr>
					<!--  END Normal Row -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!-- START Alternate Row -->
					<tr class="trAlt">
						<td>08/01/2012</td>
						<td>Fall Detection</td>
						<td class="rowPointer" rowspan="2"></td>
					</tr>
					<tr class="trAlt">
						<td colspan="2">794 E 3950 N; Provo UT 84606</td>
					</tr>
					<!--   END Alternate Row -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!--Start Normal Row -->
					<tr class="trNormal">
						<td>08/01/2012</td>
						<td>Fall Detection</td>
						<td class="rowPointer" rowspan="2"></td>
					</tr>
					<tr class="trNormal">
						<td colspan="2">794 E 3950 N; Provo UT 84606</td>
					</tr>
					<!--  END Normal Row -->
					</tbody>
				</table>
				<!--   END Events Table -->
				<br />
				<!-- START GPS Boundaries -->
				<table class="listTable">
					<thead>
					<tr>
						<th colspan="3">GPS Boundaries</th>
					</tr>
					</thead>
					<tbody id="fenceTBody">
					<!--Start Normal Row -->
					<tr class="trNormalGps">
						<td>Circle</td>
						<td>Radius: <strong>200ft</strong></td>
						<td class="rowPointerGps" rowspan="2"></td>
					</tr>
					<tr class="trNormalGps">
						<td colspan="2">Lat\Long: <strong>40.123456\-111.343456</strong></td>
					</tr>
					<!--  END Normal Row -->
					<!-- START Row Spacer -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!--   END Row Spacer -->
					<!--START Alternate Row -->
					<tr class="trAltGps">
						<td>Circle</td>
						<td>Radius: <strong>200ft</strong></td>
						<td class="rowPointerGps" rowspan="2"></td>
					</tr>
					<tr class="trAltGps">
						<td colspan="2">Lat\Long: <strong>40.123456\-111.343456</strong></td>
					</tr>
					<!--  END Alternate Row -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!--Start Normal Row -->
					<tr class="trNormalGps">
						<td>Circle</td>
						<td>Radius: <strong>200ft</strong></td>
						<td class="rowPointerGps" rowspan="2"></td>
					</tr>
					<tr class="trNormalGps">
						<td colspan="2">Lat\Long: <strong>40.123456\-111.343456</strong></td>
					</tr>
					<!--  END Normal Row -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!--Start Normal Row -->
					<tr class="trAltGps">
						<td>Circle</td>
						<td>Radius: <strong>200ft</strong></td>
						<td class="rowPointerGps" rowspan="2"></td>
					</tr>
					<tr class="trAltGps">
						<td colspan="2">Lat\Long: <strong>40.123456\-111.343456</strong></td>
					</tr>
					<!--  END Normal Row -->
					<tr>
						<td class="rowSpacer" colspan="3"></td>
					</tr>
					<!--Start Normal Row -->
					<tr class="trNormalGps">
						<td>Circle</td>
						<td>Radius: <strong>200ft</strong></td>
						<td class="rowPointerGps" rowspan="2"></td>
					</tr>
					<tr class="trNormalGps">
						<td colspan="2">Lat\Long: <strong>40.123456\-111.343456</strong></td>
					</tr>
					<!--  END Normal Row -->
					</tbody>
				</table>
				<!--   END GPS Boundaries -->
			</div>
			<div id="map_canvas">Maps Goes Here</div>
			<div class="toolsMenu cf">
				<div id="btnSaveGeometries" class="btnMain btnToolSaveDisabled"></div><div class="btnMain btnToolBullsEye"></div><div id="btnNewGeoFence" class="btnMain btnToolNewGeoFence"></div>
<!--				<div class="btnMain btnToolCircle"></div>-->
<!--				<div class="btnMain btnToolPolygon"></div>-->
				<div id="devOptions" class="devOptions">
<!--					<select id="toolchoice" name="toolchoice" style="border:1px solid #000000;" onchange="SOS.Gps.Maps.setTool();">-->
<!--						<option value="3">Rectangle</option>-->
<!--						<option value="4" selected="">Circle</option>-->
<!--					</select>-->
<!--					<select id="overPos">-->
<!--						<option>LngLat mousemove</option>-->
<!--						<option selected="selected">LatLng mousemove</option>-->
<!--					</select>-->
				</div>
			</div>
		</div>
		<div class="mainMenuDiv">
			<div class="btnInformation btnMain"></div>
			<div class="btnAlerts btnMain"></div>
			<!-- START: Insert devices here. -->
			<div class="deviceList">
<!--				<div class="btnMedicalTracker btnMain"></div>-->
<!--				<div class="btnKidTracker btnMain"></div>-->
<!--				<div class="btnCarTracker btnMain"></div>-->
<!--				<div class="btnPetTracker btnMain"></div>-->
<!--				<div class="btnHomeSecurity btnMain"></div>-->
			</div>
			<!--   END: Insert devices here. -->
			<div class="btnProperties btnMain"></div>
		</div>
	</div>
</body>
</html>