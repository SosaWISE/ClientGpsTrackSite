/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 8/23/12
 * Time: 7:56 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.ns("SOS");
Ext.ns("SOS.Gps");

SOS.Gps.Maps = (function ()
{
	/** START Private Member Properties. */
	function gob(e){if(typeof(e)=='object')return(e);if(document.getElementById)return(document.getElementById(e));return(eval(e))}
	var map;
	var polyShape;
	var geocoder;
	var copyrightNode;
	var polyPoints = [];
	var tmpPolyLine = new google.maps.Polyline({
		strokeColor: "#00FF00",
		strokeOpacity: 0.8,
		strokeWeight: 2
	});
	var tinyMarker;
	var directionsYes = 0;

//	var centerChangedLast;
//	var reverseGeocodedLast;
//	var currentReverseGeocodeResponse;
	/**   END Private Member Properties. */

	/** START Public Members. */
	return {
		initialize: function (oOptions)
		{
			debugger;
			/** Initialize. */
			geocoder = new google.maps.Geocoder();
			//var latlng = new google.maps.LatLng(40.768617, -111.891975);//(45.0,7.0);//40.764723, -111.896433
			var latlng = new google.maps.LatLng(oOptions.latitude, oOptions.longitude);//(45.0,7.0);//40.764723, -111.896433
			var mapTypeIds = [];
			// ** Build mapTypeId's. */
			for(var oType in google.maps.MapTypeId) {
				mapTypeIds.push(google.maps.MapTypeId[oType]);
			}
			mapTypeIds.push("OSM");

			// ** Create copyright node.
			copyrightNode = document.createElement('div');
			copyrightNode.id = 'copyright-control';
			copyrightNode.style.fontSize = '11px';
			copyrightNode.style.fontFamily = 'Arial, sans-serif';
			copyrightNode.style.margin = '0 2px 2px 0';
			copyrightNode.style.whiteSpace = 'nowrap';

			// ** Initialize map.
			var myOptions = {
				zoom: 16
				, center: latlng
				, draggableCursor: 'default'
				, draggingCursor: 'pointer'
				, scaleControl: true
				, mapTypeControl: true
				, mapTypeControlOptions: {mapTypeIds: mapTypeIds}
				, mapTypeId: google.maps.MapTypeId.ROADMAP
				, styles: [{featureType: 'poi', stylers: [{visibility: 'off'}]}]
				, streetViewControl: false
			};
			map = new google.maps.Map(gob('map_canvas'), myOptions);
			map.mapTypes.set("OSM", new google.maps.ImageMapType({
				getTileUrl: function(coord, zoom)
				{
					return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
				}
				, tileSize: new google.maps.Size(256, 256)
				, name: "OpenStreetMap"
				, maxZoom: 18
			}));
			google.maps.event.addListener(map, 'maptypeid_changed', SOS.Gps.Maps.updateCopyrights);
			map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(copyrightNode);

			polyPoints = new google.maps.MVCArray();
			tmpPolyLine.setMap(map);

			createplacemarkobject();
			createlinestyleobject();
			createpolygonstyleobject();
			createcirclestyleobject();
			createmarkerstyleobject();
			preparePolyline(); // create a Polyline object

			google.maps.event.addListener(map, 'click', SOS.Gps.Maps.addLatLng);
			google.maps.event.addListener(map, 'zoom_changed', SOS.Gps.Maps.mapzoom);
			cursorposition(map);
		}

		, addLatLng: function (point)
		{
			/** Initialize. */
			if(tinyMarker) tinyMarker.setMap(null);
			if(directionsYes == 1) {
				SOS.Gps.Maps.drawDirections(point.latLng);
				return;
			}
			if(plmcur != placemarks.length-1) {
				SOS.Gps.Maps.nextshape();
			}

			// Rectangle and circle can't collect points with getPath. solved by letting Polyline collect the points and then erase Polyline
			polyPoints = polyShape.getPath();
			// This codeline does the drawing on the map
			polyPoints.insertAt(polyPoints.length, point.latLng); // or: polyPoints.push(point.latLng)
			if(polyPoints.length == 1) {
				startpoint = point.latLng;
				placemarks[plmcur].point = startpoint; // stored because it's to be used when the shape is clicked on as a stored shape
				setstartMarker(startpoint);
				if(toolID == 5) {
					drawMarkers(startpoint);
				}
			}
			if(polyPoints.length == 2 && toolID == 3) createrectangle(point);
			if(polyPoints.length == 2 && toolID == 4) createcircle(point);
			if(toolID == 1 || toolID == 2) { // if polyline or polygon
				var stringtobesaved = point.latLng.lat().toFixed(6) + ',' + point.latLng.lng().toFixed(6);
				var kmlstringtobesaved = point.latLng.lng().toFixed(6) + ',' + point.latLng.lat().toFixed(6);
				//Cursor position, when inside polyShape, is registered with this listener
				cursorposition(polyShape);
				if(adder == 0) { //shape with no hole
					pointsArray.push(stringtobesaved); // collect textstring for presentation in textarea
					pointsArrayKml.push(kmlstringtobesaved); // collect textstring for presentation in textarea
					if(polyPoints.length == 1 && toolID == 2) closethis('polygonstuff');
					if(codeID == 1 && toolID == 1) logCode1(); // write kml for polyline
					if(codeID == 1 && toolID == 2) logCode2(); // write kml for polygon
					if(codeID == 2) logCode4(); // write Google javascript
				}
				if(adder == 1) { // adder is increased in function holecreator
					outerArray.push(stringtobesaved);
					outerArrayKml.push(kmlstringtobesaved);
				}
				if(adder == 2) {
					innerArray.push(stringtobesaved);
					innerArrayKml.push(kmlstringtobesaved);
				}
			}
		}

		, mapzoom: function (){
			var mapZoom = map.getZoom();
			gob("myzoom").value = mapZoom;
		}

		, updateCopyrights: function ()
		{
			if(map.getMapTypeId() == "OSM") {
				copyrightNode.innerHTML = "OSM map data @<a target=\"_blank\" href=\"http://www.openstreetmap.org/\"> OpenStreetMap</a>-contributors,<a target=\"_blank\" href=\"http://creativecommons.org/licenses/by-sa/2.0/legalcode\"> CC BY-SA</a>";
			}else{
				copyrightNode.innerHTML = "";
			}
		}

//		, initializeOld: function(oOptions)
//		{
//			/** Initialize block */
//			//var centerPosition = new google.maps.LatLng(-111.5468,40.2031);
//			var centerPosition = new google.maps.LatLng(oOptions.latitude,oOptions.longitude);
//			var myOptions = {
//				zoom: 7,
//				center: centerPosition,
//				mapTypeId: google.maps.MapTypeId.ROADMAP
//			};
//			map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
//			geocoder = new google.maps.Geocoder();
//
//			SOS.Gps.Maps.setupEvents();
//			SOS.Gps.Maps.centerChanged();
//		}
//
//		, setupEvents: function()
//		{
//			/** Initialize. */
//			reverseGeocodedLast = new Date();
//			centerChangedLast = new Date();
//
//			setInterval(function() {
//				if((new Date()).getSeconds() - centerChangedLast.getSeconds() > 1) {
//					if(reverseGeocodedLast.getTime() < centerChangedLast.getTime())
//						SOS.Gps.Maps.reverseGeocode();
//				}
//			}, 1000);
//
//			google.maps.event.addListener(map, 'zoom_changed', function() {
//				document.getElementById("zoom_level").innerHTML = map.getZoom();
//			});
//
//			google.maps.event.addListener(map, 'center_changed', SOS.Gps.Maps.centerChanged);
//
//			google.maps.event.addDomListener(document.getElementById('crosshair'),'dblclick', function() {
//				map.setZoom(map.getZoom() + 1);
//			});
//
//		}
//
//		, centerChanged: function()
//		{
//			centerChangedLast = new Date();
//			var latlng = SOS.Gps.Maps.getCenterLatLngText();
//			document.getElementById('latlng').innerHTML = latlng;
//			document.getElementById('formatedAddress').innerHTML = '';
//			currentReverseGeocodeResponse = null;
//		}
//
//		, getCenterLatLngText: function ()
//		{
//			return '(' + map.getCenter().lat() +', '+ map.getCenter().lng() +')';
//		}
//
//		, reverseGeocode: function()
//		{
//			reverseGeocodedLast = new Date();
//			geocoder.geocode({latLng:map.getCenter()}, SOS.Gps.Maps.reverseGeocodeResult);
//		}
//
//		, reverseGeocodeResult: function (results, status)
//		{
//			currentReverseGeocodeResponse = results;
//			if(status == 'OK') {
//				if(results.length == 0) {
//					document.getElementById('formatedAddress').innerHTML = 'None';
//				} else {
//					document.getElementById('formatedAddress').innerHTML = results[0].formatted_address;
//				}
//			} else {
//				document.getElementById('formatedAddress').innerHTML = 'Error';
//			}
//		}
};
	/**   END Public Members. */

})();