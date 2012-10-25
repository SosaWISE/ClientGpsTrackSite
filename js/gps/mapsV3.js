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
	var _geocoder;
	var _currentMap;
	var _fenceHashTable = {};
	/**   END MEMBER Variables */

	/** START MEMBER Functions */
	return {
		initialize: function (oOptions)
		{
			/** Initialize */
			console.log(oOptions);
			//debugger;
			_currentMap = new google.maps.Map(document.getElementById("map_canvas"),{zoom: 14,
				center: new google.maps.LatLng(oOptions.latitude, oOptions.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			/** Set the Geocoder. */
			_geocoder = new google.maps.Geocoder();
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
				debugger;
				switch (item.GeoFenceTypeId)
				{
					case "PNT":
						break;
					case "CIR":
						break;
					case "POLY":
						_fenceHashTable[item.GeoFenceID] = new google.maps.Polygon({
							map: _currentMap
							, strokeColor: '#ff0000'
							, strokeOpacity: 0.6
							, strokeWeight: 4
							, path: []
						});
						break;
				}
			});
		}
		/** START MEMBER Variables. */
		, get FenceTable()
		{
			return _fenceHashTable;
		}
		/**   END MEMBER Variables. */
	};
	/**   END MEMBER Functions */
})();