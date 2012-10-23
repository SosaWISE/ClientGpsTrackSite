<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 10/18/12
 * Time: 5:46 AM
 * To change this template use File | Settings | File Templates.
 */
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		html { height: 100% }
		body { height: 100%; margin: 0; padding: 0 }
		#map_canvas { height: 100% }
	</style>
	<script type="text/javascript" src="/js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript"
	        src="http://maps.google.com/maps/api/js?key=AIzaSyCJY7XN6PfUqHUtYR6BEK1hB_tt9wyzVy8&libraries=geometry&sensor=true">
	</script>
	<script type="text/javascript" src="/js/app/Lib/polygonEdit.js"></script>
	<script type="text/javascript">

		function initialize()
		{
			var map = new google.maps.Map(document.getElementById("map_canvas"),{zoom: 14,
				center: new google.maps.LatLng(50.909528, 34.811726),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			mapPolygon = new google.maps.Polygon({map : map,
				strokeColor   : '#ff0000',
				strokeOpacity : 0.6,
				strokeWeight  : 4,
				path:[
					new google.maps.LatLng(50.91607609098315,34.80485954492187)
					,new google.maps.LatLng(50.91753710953153,34.80485954492187)
					,new google.maps.LatLng(50.91759122044873,34.815159227539056)
					,new google.maps.LatLng(50.9159678655622,34.815159227539056)
					,new google.maps.LatLng(50.91044803534999,34.81258430688476)
					,new google.maps.LatLng(50.91044803534999,34.81584587304687)
					,new google.maps.LatLng(50.90931151845126,34.81533088891601)
					,new google.maps.LatLng(50.90931151845126,34.811897661376946)
					,new google.maps.LatLng(50.90395327929007,34.8094944020996)
					,new google.maps.LatLng(50.9040074060014,34.80700531213378)
					,new google.maps.LatLng(50.90914915662899,34.809666063476556)
					,new google.maps.LatLng(50.90920327729935,34.8065761586914)
					,new google.maps.LatLng(50.91033979684091,34.80700531213378)
					,new google.maps.LatLng(50.910285677492006,34.81035270898437)
					,new google.maps.LatLng(50.91607609098315,34.81301346032714)]
			});
			mapPolygon.runEdit(true);
			google.maps.event.addListener(mapPolygon, 'click', function() {
				document.getElementById("info").innerHTML = 'path:[';
				mapPolygon.getPath().forEach(function (vertex, inex) {
					document.getElementById("info").innerHTML += 'new google.maps.LatLng('+vertex.lat()+','+vertex.lng()+')' + ((inex<mapPolygon.getPath().getLength()-1)?',':'');
				});
				document.getElementById("info").innerHTML += ']';
			});
		}
	</script>
</head>
<body onload="initialize()">
	<div style="width:100%;height:100%;">
		<div style="width:56px;height:100%;float:left;">
			<div id="stopEditPoly">Stop Edit</div>
		</div>
		<div id="map_canvas" style="width:auto; height:100%"></div>
	</div>
</body>
</html>