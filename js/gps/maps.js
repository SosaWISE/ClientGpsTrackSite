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
	function gob(e)
	{

		if (typeof(e)=='object') return(e);
		if (document.getElementById) return(document.getElementById(e));

		return(eval(e))
	}
	var map;
	var polyShape;
	var geocoder;
	var copyrightNode;
	var startMarker;
	var nemarker;
	var toolID = 4;  //4--Circle
	var lcur = 0;
	var pcur = 0;
	var plmcur = 0;
	var polyPoints = [];
	var outerPoints = [];
	var pointsArray = [];
	var markersArray = [];
	var pointsArrayKml = [];
	var markersArrayKml = [];
	var addresssArray = [];
	var outerArray = [];
	var innerArray = [];
	var outerArrayKml = [];
	var innerArrayKml = [];
	var holePolyArray = [];
	var innerArrays = [];
	var innerArraysKml = [];
	var waypts = [];
	var destinations = [];
	var adder = 0;
	var dirpointstart = null;
	var dirline = null;
	var firstdirclick = 0;
	//dirmarknum = 1;
	var step = 0;
	var tmpPolyLine = new google.maps.Polyline({
		strokeColor: "#00FF00",
		strokeOpacity: 0.8,
		strokeWeight: 2
	});
	var tinyMarker;
	var directionsYes = 0;
	var placemarks = [];
	var polylinestyles = [];
	var polygonstyles = [];
	var circlestyles = [];
	var markerstyles = [];
	var startpoint;

	var directionsDisplay;

//	var centerChangedLast;
//	var reverseGeocodedLast;
//	var currentReverseGeocodeResponse;
	/**   END Private Member Properties. */

	/** START Private class. */
	function polystyle() {
		this.name = "Lump";
		this.kmlcolor = "CD0000FF";
		this.kmlfill = "9AFF0000";
		this.color = "#FF0000";
		this.fill = "#0000FF";
		this.width = 2;
		this.lineopac = 0.8;
		this.fillopac = 0.6;
	}
	function linestyle() {
		this.name = "Path";
		this.kmlcolor = "FF0000FF";
		this.color = "#FF0000";
		this.width = 3;
		this.lineopac = 1;
	}
	function circstyle() {
		this.name = "Circ";
		this.color = "#FF0000";
		this.fill = "#0000FF";
		this.width = 2;
		this.lineopac = 0.8;
		this.fillopac = 0.6;
	}
	function markerstyleobject() {
		this.name = "markerstyle";
		this.icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png";
	}
	function placemarkobject() {
		this.name = "NAME";
		this.desc = "YES";
		this.style = "Path";
		this.stylecur = 0;
		this.tess = 1;
		this.alt = "clampToGround";
		this.plmtext = ""; // KLM text from <Placemark> to </Placemark>
		this.jstext = "";
		this.jscode = [];
		this.kmlcode = []; // coordinatepairs lng lat
		this.kmlholecode = []; // coordinatepairs lng lat
		this.poly = "pl";
		this.shape = null;
		this.point = null;
		this.toolID = 1;
		this.hole = 0;
		this.ID = 0;
	}
	/**   END Private class. */

	/** START Public Members. */
	return {
		initialize: function (oOptions)
		{
			debugger;
			/** Initialize. */
			geocoder = new google.maps.Geocoder();
			//var latlng = new google.maps.LatLng(40.768617, -111.891975);//(45.0,7.0);//40.764723, -111.896433
			var latlng = new google.maps.LatLng(oOptions.longitude, oOptions.latitude);//(45.0,7.0);//40.764723, -111.896433
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

			SOS.Gps.Maps.createplacemarkobject();
			SOS.Gps.Maps.createlinestyleobject();
			SOS.Gps.Maps.createpolygonstyleobject();
			SOS.Gps.Maps.createcirclestyleobject();
			SOS.Gps.Maps.createmarkerstyleobject();
			SOS.Gps.Maps.preparePolyline(); // create a Polyline object

			google.maps.event.addListener(map, 'click', SOS.Gps.Maps.addLatLng);
			google.maps.event.addListener(map, 'zoom_changed', SOS.Gps.Maps.mapzoom);
			SOS.Gps.Maps.cursorposition(map);
		}

		, createplacemarkobject: function ()
		{
			var thisPlaceMark = new placemarkobject();
			placemarks.push(thisPlaceMark);
		}

		, createlinestyleobject: function ()
		{
			var polylineStyle = new linestyle();
			polylinestyles.push(polylineStyle);
		}

		, createpolygonstyleobject: function ()
		{
			var polygonStyle = new polystyle();
			polygonstyles.push(polygonStyle);
		}

		, createcirclestyleobject: function ()
		{
			var cirStyle = new circstyle();
			circlestyles.push(cirStyle);
		}

		, createmarkerstyleobject: function ()
		{
			var thisStyle = new markerstyleobject();
			markerstyles.push(thisStyle);
		}

		, preparePolyline: function ()
		{
			debugger;
			var polyOptions = {
				path: polyPoints,
				strokeColor: polylinestyles[lcur].color,
				strokeOpacity: polylinestyles[lcur].lineopac,
				strokeWeight: polylinestyles[lcur].width};
			polyShape = new google.maps.Polyline(polyOptions);
			polyShape.setMap(map);
			/*var tmpPolyOptions = {
			 strokeColor: polylinestyles[lcur].color,
			 strokeOpacity: polylinestyles[lcur].lineopac,
			 strokeWeight: polylinestyles[lcur].width
			 };
			 tmpPolyLine = new google.maps.Polyline(tmpPolyOptions);
			 tmpPolyLine.setMap(map);*/
		}

		, cursorposition: function (mapregion)
		{
			google.maps.event.addListener(mapregion,'mousemove',function(point){
				var LnglatStr6 = point.latLng.lng().toFixed(6) + ', ' + point.latLng.lat().toFixed(6);
				var latLngStr6 = point.latLng.lat().toFixed(6) + ', ' + point.latLng.lng().toFixed(6);
				gob('overPos').options[0].text = LnglatStr6;
				gob('overPos').options[1].text = latLngStr6;
			});
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
				SOS.Gps.Maps.setstartMarker(startpoint);
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

		, setstartMarker: function (point)
		{
			startMarker = new google.maps.Marker({
				position: point,
				map: map});
			startMarker.setTitle("#" + polyPoints.length);
		}


		, mapzoom: function ()
		{
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

		, setTool: function ()
		{
			if(polyPoints.length == 0 && kmlcode == "" && javacode == "")
			{
				SOS.Gps.Maps.newstart();
			}
			else
			{
				if(toolID == 1)
				{ // polyline
					// change to polyline draw mode not allowed
					if(outerArray.length > 0) { //indicates polygon with hole
						toolID = 2;
						SOS.Gps.Maps.nextshape();
						toolID = 1;
						SOS.Gps.Maps.newstart();
						return;
					}
					if(rectangle) {
						toolID = 3;
						nextshape();
						toolID = 1;
						newstart();
						return;
					}
					if(circle) {
						toolID = 4;
						nextshape();
						toolID = 1;
						newstart();
						return;
					}
					if(markerShape) {
						toolID = 5;
						nextshape();
						toolID = 1;
						newstart();
						return;
					}
					if(directionsYes == 1) {
						toolID = 6;
						nextshape();
						directionsYes = 0;
						toolID = 1;
						newstart();
						return;
					}
					placemarks[plmcur].style = polylinestyles[polylinestyles.length-1].name;
					placemarks[plmcur].stylecur = polylinestyles.length-1;
					if(polyShape) polyShape.setMap(null);
					preparePolyline(); //if a polygon exists, it will be redrawn as polylines
					if(codeID == 1) logCode1(); // KML
					if(codeID == 2) logCode4(); // Javascipt
				}
				if(toolID == 2){ // polygon
					if(rectangle) {
						toolID = 3;
						nextshape();
						toolID = 2;
						newstart();
						return;
					}
					if(circle) {
						toolID = 4;
						nextshape();
						toolID = 2;
						newstart();
						return;
					}
					if(markerShape) {
						toolID = 5;
						nextshape();
						toolID = 2;
						newstart();
						return;
					}
					if(directionsYes == 1) {
						toolID = 6;
						nextshape();
						directionsYes = 0;
						toolID = 2;
						newstart();
						return;
					}
					placemarks[plmcur].style = polygonstyles[polygonstyles.length-1].name;
					placemarks[plmcur].stylecur = polygonstyles.length-1;
					if(polyShape) polyShape.setMap(null);
					preparePolygon(); //if a polyline exists, it will be redrawn as a polygon
					if(codeID == 1) logCode2(); // KML
					if(codeID == 2) logCode4(); // Javascript
				}
				if(toolID == 3 || toolID == 4 || toolID == 5 || toolID == 6){
					if(polyShape) polyShape.setMap(null);
					if(circle) circle.setMap(null);
					if(rectangle) rectangle.setMap(null);
					directionsYes = 0;
					newstart();
				}
			}
		}

		, clearMap: function ()
		{
			if(editing == true) stopediting();
			if(polyShape) polyShape.setMap(null); // polyline or polygon
			if(outerShape) outerShape.setMap(null);
			if(rectangle) rectangle.setMap(null);
			if(circle) circle.setMap(null);
			if(drawnShapes.length > 0) {
				for(var i = 0; i < drawnShapes.length; i++) {
					drawnShapes[i].setMap(null);
				}
			}
			plmcur = 0;
			dirmarknum = 1;
			newstart();
			placemarks = [];
			createplacemarkobject();
		}

		, newstart: function ()
		{
		polyPoints = [];
		outerPoints = [];
		pointsArray = [];
		markersArray = [];
		pointsArrayKml = [];
		markersArrayKml = [];
		addresssArray = [];
		outerArray = [];
		innerArray = [];
		outerArrayKml = [];
		innerArrayKml = [];
		holePolyArray = [];
		innerArrays = [];
		innerArraysKml = [];
		waypts = [];
		destinations = [];
		adder = 0;
		dirpointstart = null;
		dirline = null;
		firstdirclick = 0;
		//dirmarknum = 1;
		step = 0;
		if(directionsYes == 1 && toolID != 6) directionsYes = 0;
		SOS.Gps.Maps.closethis('polylineoptions');
		SOS.Gps.Maps.closethis('polygonoptions');
		SOS.Gps.Maps.closethis('circleoptions');
		if(toolID != 2) closethis('polygonstuff');
		if(directionsDisplay) directionsDisplay.setMap(null);
		if(startMarker) startMarker.setMap(null);
		if(nemarker) nemarker.setMap(null);
		if(tinyMarker) tinyMarker.setMap(null);
		if(toolID == 1) {
			placemarks[plmcur].style = polylinestyles[polylinestyles.length-1].name;
			placemarks[plmcur].stylecur = polylinestyles.length-1;
			preparePolyline();
			polylineintroduction();
		}
		if(toolID == 2){
			showthis('polygonstuff');
			gob('stepdiv').innerHTML = "Step 0";
			placemarks[plmcur].style = polygonstyles[polygonstyles.length-1].name;
			placemarks[plmcur].stylecur = polygonstyles.length-1;
			preparePolygon();
			polygonintroduction();
		}
		if(toolID == 3) {
			placemarks[plmcur].style = polygonstyles[polygonstyles.length-1].name;
			placemarks[plmcur].stylecur = polygonstyles.length-1;
			preparePolyline(); // use Polyline to collect clicked point
			activateRectangle();
			rectangleintroduction();
		}
		if(toolID == 4) {
			placemarks[plmcur].style = circlestyles[circlestyles.length-1].name;
			placemarks[plmcur].stylecur = circlestyles.length-1;
			preparePolyline(); // use Polyline to collect clicked point
			activateCircle();
			circleintroduction();
			codeID = gob('codechoice').value = 2; // javascript, no KML for circle
		}
		if(toolID == 5) {
			placemarks[plmcur].style = markerstyles[markerstyles.length-1].name;
			placemarks[plmcur].stylecur = markerstyles.length-1;
			preparePolyline();
			markerintroduction();
		}
		if(toolID == 6){
			directionsYes = 1;
			/*if(dirline != null) {
			 placemarks[plmcur].style = placemarks[dirline].style;
			 placemarks[plmcur].stylecur = placemarks[dirline].stylecur;
			 }else{*/
			placemarks[plmcur].style = polylinestyles[polylinestyles.length-1].name;
			placemarks[plmcur].stylecur = polylinestyles.length-1;
			//}
			preparePolyline();
			directionsintroduction();
			codeID = gob('codechoice').value = 1;
		}
		kmlcode = "";
		javacode = "";
	}

		, newstart: function ()
		{
			polyPoints = [];
			outerPoints = [];
			pointsArray = [];
			markersArray = [];
			pointsArrayKml = [];
			markersArrayKml = [];
			addresssArray = [];
			outerArray = [];
			innerArray = [];
			outerArrayKml = [];
			innerArrayKml = [];
			holePolyArray = [];
			innerArrays = [];
			innerArraysKml = [];
			waypts = [];
			destinations = [];
			adder = 0;
			dirpointstart = null;
			dirline = null;
			firstdirclick = 0;
			//dirmarknum = 1;
			step = 0;
			if(directionsYes == 1 && toolID != 6) directionsYes = 0;
			closethis('polylineoptions');
			closethis('polygonoptions');
			closethis('circleoptions');
			if(toolID != 2) closethis('polygonstuff');
			if(directionsDisplay) directionsDisplay.setMap(null);
			if(startMarker) startMarker.setMap(null);
			if(nemarker) nemarker.setMap(null);
			if(tinyMarker) tinyMarker.setMap(null);
			if(toolID == 1) {
				placemarks[plmcur].style = polylinestyles[polylinestyles.length-1].name;
				placemarks[plmcur].stylecur = polylinestyles.length-1;
				preparePolyline();
				polylineintroduction();
			}
			if(toolID == 2){
				showthis('polygonstuff');
				gob('stepdiv').innerHTML = "Step 0";
				placemarks[plmcur].style = polygonstyles[polygonstyles.length-1].name;
				placemarks[plmcur].stylecur = polygonstyles.length-1;
				preparePolygon();
				polygonintroduction();
			}
			if(toolID == 3) {
				placemarks[plmcur].style = polygonstyles[polygonstyles.length-1].name;
				placemarks[plmcur].stylecur = polygonstyles.length-1;
				preparePolyline(); // use Polyline to collect clicked point
				activateRectangle();
				rectangleintroduction();
			}
			if(toolID == 4) {
				placemarks[plmcur].style = circlestyles[circlestyles.length-1].name;
				placemarks[plmcur].stylecur = circlestyles.length-1;
				preparePolyline(); // use Polyline to collect clicked point
				activateCircle();
				circleintroduction();
				codeID = gob('codechoice').value = 2; // javascript, no KML for circle
			}
			if(toolID == 5) {
				placemarks[plmcur].style = markerstyles[markerstyles.length-1].name;
				placemarks[plmcur].stylecur = markerstyles.length-1;
				preparePolyline();
				markerintroduction();
			}
			if(toolID == 6){
				directionsYes = 1;
				/*if(dirline != null) {
				 placemarks[plmcur].style = placemarks[dirline].style;
				 placemarks[plmcur].stylecur = placemarks[dirline].stylecur;
				 }else{*/
				placemarks[plmcur].style = polylinestyles[polylinestyles.length-1].name;
				placemarks[plmcur].stylecur = polylinestyles.length-1;
				//}
				preparePolyline();
				directionsintroduction();
				codeID = gob('codechoice').value = 1;
			}
			kmlcode = "";
			javacode = "";
		}

		, nextshape: function ()
		{
			if(editing == true) stopediting();
			//If a saved shape has been inspected, set a new listener on it
			if(plmcur < placemarks.length -1) {
				addpolyShapelistener();
				plmcur = placemarks.length -1;
			}
			//Set listener on current shape. Create new placemark object.
			//Increase counter for placemark
			increaseplmcur();
			if(polyShape) drawnShapes.push(polyShape); // used in clearMap, to have it removed from the map, drawnShapes[i].setMap(null)
			if(outerShape) drawnShapes.push(outerShape);
			if(circle) drawnShapes.push(circle);
			if(tinyMarker) drawnShapes.push(tinyMarker);
			// markerShape has been pushed in drawMarkers and createdirMarker, rectangle has been converted to polygon
			polyShape = null;
			outerShape = null;
			rectangle = null;
			circle = null;
			markerShape = null;
			//directionsDisplay = null;
			SOS.Gps.Maps.newstart();
		}

		, closethis: function (name)
		{
			gob(name).style.visibility = 'hidden';
		}

		, showthis: function (name)
		{
			gob(name).style.visibility = 'visible';
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