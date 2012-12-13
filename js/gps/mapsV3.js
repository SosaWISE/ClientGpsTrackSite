/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 10/19/12
 * Time: 7:16 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.ns("SOS");
Ext.ns("SOS.Gps");

SOS.Gps.Maps = (function ()
{
	/** START MEMBER Variables */
	/** ** START CONSTANTS */
	var _STD_GEO_REC_DIVIATION = .01;

	/** ** END CONSTANTS */
	var _geocoder;
	var _currentMap;
	var _fenceHashTable = {};
	/**   END MEMBER Variables */

	/** START MEMBER Functions */
	/** ** START Private MEMBER Functions */
	function _getNumberOfFences()
	{
		/** Initialize. */
		var resultCount = 0;
		$.each(_fenceHashTable, function ()
		{
			resultCount++;
		});

		/** Return result. */
		return resultCount;
	}
	/** **   END Private MEMBER Functions */
	return {
		initialize: function (oOptions)
		{
			/** Initialize */
			console.log(oOptions);
			//debugger;
			//noinspection JSUnresolvedFunction,JSUnresolvedVariable
			_currentMap = new google.maps.Map(document.getElementById("map_canvas"),{zoom: 14,
				//center: new google.maps.LatLng(oOptions.latitude, oOptions.longitude),
				center: new google.maps.LatLng(50.909528, 34.811726),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			/** Set the Geocoder. */
			_geocoder = new google.maps.Geocoder();

			/** Bind actions to events on toolbar. */
			SOS.Views.GeoToolbar.OnClickSaveGeometries(this.SaveGeometries);
			SOS.Views.GeoToolbar.OnNewGeoFenceClickEvent(this.NewGeoFence);
			SOS.Views.GeoToolbar.OnLocateDeviceClickEvent(this.LocateDevice);
		}

		, CenterMapFromAddress: function (street, city, state, zip)
		{
			/** Initialize. */
			var address = $.validator.format("{0}; {1} {2} {3}"
				, street
				, city
				, state
				, zip);
			_geocoder.geocode(
				{ 'address': address}
				, function (results, status)
				{
					if (status === google.maps.GeocoderStatus.OK)
					{
						_currentMap.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: _currentMap,
							position: results[0].geometry.location
						});
					}
					else
					{
						alert("Geocoder was not successful for the following reason: \r" + status);
					}
				}
			);
		}

		/***
		 * This sets the fences on the map.
		 */
		, PaintGeoFences: function (fencesArray)
		{
			/** Initialize. */
			_fenceHashTable = {};
			$.each(fencesArray, function (index, item)
			{
				switch (item.GeoFenceTypeId)
				{
					case "PNT":
						_fenceHashTable[item.GeoFenceID] = {
							GeoFenceID: item.GeoFenceID
							, Centroid: new google.maps.LatLng(item.PointLatitude, item.PointLongitude)
							, Type: "POINT"
							, Geometry: new google.maps.Marker({
								position: new google.maps.LatLng(item.PointLatitude, item.PointLongitude),
								draggable: true
							})
							, IsDirty: false
						};
						_fenceHashTable[item.GeoFenceID].Geometry.setMap(_currentMap);
						break;
					case "CIR":
						_fenceHashTable[item.GeoFenceID] = {
							GeoFenceID: item.GeoFenceID
							, Centroid: new google.maps.LatLng(item.CenterLattitude, item.CenterLongitude)
							, Type: "CIRCLE"
							, Geometry: new google.maps.Circle({
								center: new google.maps.LatLng(item.CenterLattitude, item.CenterLongitude),
								fillColor: '#0000FF',
								fillOpacity: 0.6,
								strokeColor: '#FF0000',
								strokeOpacity: 0.8,
								strokeWeight: 2,
								radius: item.Radius, // This is in meters.
								editable: true
							})
							, IsDirty: false
						};
						_fenceHashTable[item.GeoFenceID].Geometry.setMap(_currentMap);
						break;
					case "POLY":
						// ** Build path
						var pathArray = [];
						$.each(item.PolyPointsList, function(nIndex, oItem){
							// ** Skip the last point
							if (nIndex < item.PolyPointsList.length - 1)
							{
								pathArray.push(new google.maps.LatLng(oItem.Lattitude, oItem.Longitude));
							}
						});
						_fenceHashTable[item.GeoFenceID] = {
							GeoFenceID: item.GeoFenceID
							, Centroid: new google.maps.LatLng(item.MeanLattitude, item.MeanLongitude)
							, Type: "POLYGON"
							, Geometry: new google.maps.Polygon({
								strokeColor: '#ff0000'
								, strokeOpacity: 0.6
								, strokeWeight: 4
								, path: pathArray
								})
							, IsDirty: false
						};
						_fenceHashTable[item.GeoFenceID].Geometry.setMap(_currentMap);
						break;
					case "RECT":
						/** Create the bounds.  (x=Log; y=Lat) */
						var swLatLng = new google.maps.LatLng(item.MinLattitude, item.MinLongitude);
						var neLatLng = new google.maps.LatLng(item.MaxLattitude, item.MaxLongitude);
						_fenceHashTable[item.GeoFenceID] ={
							GeoFenceID: item.GeoFenceID
							, Centroid: new google.maps.LatLng(item.MeanLattitude, item.MeanLongitude)
							, Type: "RECTANGLE"
							, Geometry: new google.maps.Rectangle ({
								strokeColor: '#ff0000'
								, strokeOpacity: 0.6
								, strokeWeight: 4
								, bounds: new google.maps.LatLngBounds(swLatLng, neLatLng)
								//, editable: true
							})
							, IsDirty: false
						};
						/** Add bound change listener. */
						google.maps.event.addListener(_fenceHashTable[item.GeoFenceID].Geometry, 'bounds_changed'
							, function() {
								console.log('Rectangle has changed.');
								_fenceHashTable[item.GeoFenceID].IsDirty = true;
								SOS.Views.GeoToolbar.EnableSaveGeometriesButton();
							});
						_fenceHashTable[item.GeoFenceID].Geometry.setMap(_currentMap);
						break;
				}
			});
		}

		, StopAllEdit: function ()
		{
			$.each(_fenceHashTable, function (geoFenceID, fenceItem)
			{
				switch(fenceItem.Type)
				{
					case "POINT":
						break;
					case "POLYGON":
						/** Set the Fence to Edit mode. */
						fenceItem.Geometry.stopEdit(true);
						break;
					case "CIRCLE":
						SOS.Gps.Maps.circleRunStopEdit(geoFenceID, false);
						break;
					case "RECTANGLE":
						fenceItem.Geometry.setEditable(false);
						break;
				}
			});
		}

		, CircleStopEdit: function (index)
		{
			this.circleRunStopEdit(index, false);
		}

		, CircleRunEdit: function (index)
		{
			this.circleRunStopEdit(index, true);
		}

		, circleRunStopEdit: function (index, edit)
		{
			/** Initialize. */
			var geoFenceID = _fenceHashTable[index].GeoFenceID;
			var radius = _fenceHashTable[index].Geometry.radius;
			var center = _fenceHashTable[index].Geometry.center;
			var geoObject = new google.maps.Circle({
				center: center,
				fillColor: '#0000FF',
				fillOpacity: 0.6,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				radius: radius, // This is in meters.
				editable: edit
			});
			var isDirty = _fenceHashTable[index].IsDirty;

			/** Remove from map. */
			_fenceHashTable[index].Geometry.setMap(null);

			/** Reset the circle. */
			_fenceHashTable[index] = {
				GeoFenceID: geoFenceID
				, Centroid: center
				, Type: "CIRCLE"
				, Geometry: geoObject
				, IsDirty: isDirty
			};
			google.maps.event.addListener(geoObject, 'center_changed', function() {
				console.log('Center has Changed');
				_fenceHashTable[index].IsDirty = true;
				SOS.Views.GeoToolbar.EnableSaveGeometriesButton();
			});
			google.maps.event.addListener(geoObject, 'radius_changed', function() {
				console.log('Radius has Changed');
				_fenceHashTable[index].IsDirty = true;
				SOS.Views.GeoToolbar.EnableSaveGeometriesButton();
			});
			/** Add back to map. */
			_fenceHashTable[index].Geometry.setMap(_currentMap);
		}

		, SaveGeometries: function ()
		{
			/** Initialize. */
			var geoFenceToBeSaved = [];
			function fxClosure(geoFenceID)
			{
				geoFenceToBeSaved.pop();
				if (geoFenceToBeSaved.length == 0) SOS.Views.GeoToolbar.DisableSaveGeometriesButton();
			}

			/** Loop through to figure out who is going to be saveed. */
			$.each(_fenceHashTable, function (geoFenceID, fenceItem)
			{
				if(fenceItem.IsDirty) geoFenceToBeSaved.push(geoFenceID);
			});

			/** Loop through each fence. */
			$.each(_fenceHashTable, function (geoFenceID, fenceItem)
			{
				/** Check to see if there are any dirty geometries. */
				if (fenceItem.IsDirty)
					SOS.Gps.Maps.SaveGeometry(geoFenceID, fxClosure);
			});

			/** Disable the Edit mode of any fence. */
			SOS.Gps.Maps.StopAllEdit(false);
		}

		, SaveGeometry: function (geoFenceID, fxClosure)
		{
			/** Initialize. */
			var fenceItem = _fenceHashTable[geoFenceID];
			switch(fenceItem.Type)
			{
				case "POINT":
					this.SavePoint(fenceItem, fxClosure);
					break;
				case "CIRCLE":
					this.SaveCircle(fenceItem, fxClosure);
					break;
				case "RECTANGLE":
					this.SaveRectangle(fenceItem, fxClosure);
					break;
			}
		}

		, SaveRectangle: function (fenceItem, fxClosure)
		{
			/** Initialize. */
			var oDevice = SOS.Controllers.Devices.DeviceList[SOS.Controllers.Devices.AccountID];
			function fxSuccess(oResponse)
			{
				if (oResponse.Code === 0)
				{
					alert("Successfully save Rectangle.");
					fenceItem.IsDirty = false;
					fxClosure(fenceItem.GeoFenceID);
				}
				else
				{
					alert("Error: " + oResponse.Message);
				}
			}
			function fxFailure(oResponse)
			{
				alert("Failure on saving Point.");
			}

			//debugger;
			/** Create params. */
			var pointNE = fenceItem.Geometry.getBounds().getNorthEast();
			var pointSW = fenceItem.Geometry.getBounds().getSouthWest();
			var params = {
				GeoFenceID: fenceItem.GeoFenceID
				, AccountId: SOS.Controllers.Devices.AccountID
				, MaxLattitude: pointNE.lat()
				, MaxLongitude: pointNE.lng()
				, MinLattitude: pointSW.lat()
				, MinLongitude: pointSW.lng()
			};

			/** Return hdr handler. */
			return SOS.Services.ClientGpsTrack.SaveRectangleFence(params, fxSuccess, fxFailure);
		}

		, SavePoint: function(fenceItem, fxClosure)
		{
			/** Initiliaze. */
			var oDevice = SOS.Controllers.Devices.DeviceList[SOS.Controllers.Devices.AccountID];
			function fxSuccess(oResponse)
			{
				if (oResponse.Code === 0)
				{
					alert("Successfully save Point.");
					fenceItem.IsDirty = false;
					fxClosure(fenceItem.GeoFenceID);
				}
				else
				{
					alert("Error: " + oResponse.Message);
				}
			}
			function fxFailure(oResponse)
			{
				alert("Failure on saving Point.");
			}
			/** Create params. */
			var centerPoint = fenceItem.Geometry.position;
			var params = {
				GeoFenceID: fenceItem.GeoFenceID
				, AccountId: SOS.Controllers.Devices.AccountID
				, Lattitude: centerPoint.Ya
				, Longitude: centerPoint.Za
			};

			/** Return hdr handler. */
			return SOS.Services.ClientGpsTrack.SaveGeoPoint(params, fxSuccess, fxFailure);
		}

		, SaveCircle: function (fenceItem, fxClosure)
		{
			/** Initialize. */
			function fxSuccess(oResponse)
			{
				if (oResponse.Code === 0)
				{
					alert("Successfully Saved Circle");
					fenceItem.IsDirty = false;
					fxClosure(fenceItem.GeoFenceID);
				}
				else
				{
					alert("Error: " + oResponse.Message);
				}
			}
			function fxFailure(oResponse)
			{
				alert("Failure to save circle");
			}
			var centerPoint = fenceItem.Geometry.getCenter();
			var params = {
				GeoFenceID: fenceItem.GeoFenceID
				, radius: fenceItem.Geometry.getRadius()
				, centerLattitude: centerPoint.Ya
				, centerLongitude: centerPoint.Za
			};

			/** Execute services. */
			SOS.Services.ClientGpsTrack.SaveCircleFence(params, fxSuccess, fxFailure);
		}

		, NewGeoFence: function ()
		{
			/** Check that there are no more than 5 fences. */
			if (_fenceHashTable.length >= 5)
			{
				alert("Sorry you are only allowd 5 geo fences per this device.");
				return;
			}

			/** Initialize. */
			//debugger;
			var itemId = _getNumberOfFences() ? 0 - _fenceHashTable.length : 0;

			/** Get center of the map. */
			var ctrLatLng = _currentMap.getCenter();
			var zoom = _currentMap.getZoom();

			/** Create the bounds.  (x=Log; y=Lat) */
			//var swLatLng = new google.maps.LatLng(item.MinLattitude, item.MinLongitude);
			//var neLatLng = new google.maps.LatLng(item.MaxLattitude, item.MaxLongitude);
			var swLatLng = new google.maps.LatLng(ctrLatLng.lat() - _STD_GEO_REC_DIVIATION, ctrLatLng.lng() - _STD_GEO_REC_DIVIATION);
			var neLatLng = new google.maps.LatLng(ctrLatLng.lat() + _STD_GEO_REC_DIVIATION, ctrLatLng.lng() + _STD_GEO_REC_DIVIATION);
			_fenceHashTable[itemId] ={
				GeoFenceID: itemId
				, Centroid: ctrLatLng
				, Type: "RECTANGLE"
				, Geometry: new google.maps.Rectangle ({
					strokeColor: '#ff0000'
					, strokeOpacity: 0.6
					, strokeWeight: 4
					, bounds: new google.maps.LatLngBounds(swLatLng, neLatLng)
					, editable: true
				})
				, IsDirty: false
			};
			/** Add bound change listener. */
			google.maps.event.addListener(_fenceHashTable[itemId].Geometry, 'bounds_changed'
				, function() {
					console.log('Rectangle has changed.');
					_fenceHashTable[itemId].IsDirty = true;
					SOS.Views.GeoToolbar.EnableSaveGeometriesButton();
				});
			_fenceHashTable[itemId].Geometry.setMap(_currentMap);

		}

		, PaintMarker: function (param)
		{
			/** Initialize. */
			//var iconOriginPoint = new google.maps.Point(0,0);
			var iconPath = "";
			var iconSize = new google.maps.Size(32,37, 'px', 'px');
			switch(param.EventTypeId)
			{
				case "EMERG":
					//iconOriginPoint = new google.maps.Point(0,0);
					iconPath = "/images/AlertBubble_Medical.png";
					break;
				case "FALL":
					//iconOriginPoint = new google.maps.Point(33,0);
					iconPath = "/images/AlertBubble_GSensor.png";
					break;
				case "FENCE":
					//iconOriginPoint = new google.maps.Point(97,0);
					iconPath = "/images/AlertBubble_GeoFenceExit.png";
					break;
				case "FENCE_RT":
					//iconOriginPoint = new google.maps.Point(65,0);
					iconPath = "/images/AlertBubble_GeoFenceEnter.png";
					break;
				case "LOWBAT":
					//iconOriginPoint = new google.maps.Point(161,0);
					iconPath = "/images/AlertBubble_LowBattery.png";
					break;
				case "MEDICAL":
					//iconOriginPoint = new google.maps.Point(0,0);
					iconPath = "/images/AlertBubble_Medical.png";
					break;
				case "SPEED":
					//iconOriginPoint = new google.maps.Point(129,0);
					iconPath = "/images/AlertBubble_Speed.png";
					break;
				case "TAMPER":
					//iconOriginPoint = new google.maps.Point(193,0);
					iconPath = "/images/AlertBubble_Tamper.png";
					break;
				case "CURRENT_POS":
					iconPath = "/images/AlertBubble_CurrentPos.png";
					iconSize = new google.maps.Size(32,40, 'px', 'px');
					break;
			}

			//debugger;
			var iconMarker = new google.maps.MarkerImage(SOS.Config.CurrentURL + iconPath
			, iconSize);
/** This is very strange.  THis should change the GIT. */
			var oPos = new google.maps.LatLng(param.Lattitude, param.Longitude);
			var options = {
//				animation: google.maps.Animation.DROP
				position: oPos
				, icon: iconMarker
//				, icon: iconPath
//				, icon: {
//					origin: iconOriginPoint
//					, url: '/images/GoogleIconSprit.png'
//					, size: new google.maps.Size(32, 37)
//				}
//				, flat: false // This shows the icon shadow
//				, map: _currentMap
				, title: '(' + param.EventID + ')' + param.EventName
//				, shadow: {
//					anchor: new google.maps.Point(20,50)
//					, origin: new google.maps.Point(0,38)
//					, url: '/images/GoogleIconSprit.png'
//					, size: new google.maps.Size(47, 38)
//				}
//				, visible: true
			};
			var marker = new google.maps.Marker(options);
			marker.setMap(_currentMap);
		}

		, LocateDevice: function()
		{
			/** Initialize. */
			var oDevice = SOS.Controllers.Devices.DeviceList[SOS.Controllers.Devices.AccountID];
			function fxSuccess (response)
			{
				/** Check for a successful response. */
				if (response.Code !== 0)
				{
					alert("Locate Device Error:" + response.Message);
					return;
				}
				/** Create a position marker. */
				console.log("Locate Device Response: ", response);
				//alert("Locate was successfull");
				SOS.Gps.Maps.PaintMarker({
					EventTypeId: "CURRENT_POS",
					Lattitude: response.Value.Lattitude,
					Longitude: response.Value.Longitude,
					EventID: 0,
					EventName: response.Value.PlaceName
				});
				/** Pan to location. */
				var latlng = new google.maps.LatLng(response.Value.Lattitude, response.Value.Longitude);
				SOS.Gps.Maps.CurrentMap.panTo(latlng);
			}
			function fxFailure (response){
				console.log("Locate Device Response Failure: ", response);
				alert("Locate Device Failed");
			}
			/** Create params. */
			var params = {
				AccountID: oDevice.AccountId,
				UnitID: oDevice.UnitID
			};

			/** Return hdr handler. */
			return SOS.Services.ClientGpsTrack.RequestDeviceLocation(params, fxSuccess, fxFailure);
		}

		/** START MEMBER Variables. */
		, get FenceTable()
		{
			return _fenceHashTable;
		}
		, get CurrentMap()
		{
			return _currentMap;
		}
		, get Geocoder()
		{
			return _geocoder;
		}
		/**   END MEMBER Variables. */
	};
	/**   END MEMBER Functions */
})();