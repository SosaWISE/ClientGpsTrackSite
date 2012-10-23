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
	/**   END MEMBER Variables */

	/** START MEMBER Functions */
	return {
		initialize: function (oOptions)
		{
			/** Initialize */
			console.log(oOptions);
			//debugger;
			var map = new google.maps.Map(document.getElementById("map_canvas"),{zoom: 14,
				center: new google.maps.LatLng(oOptions.latitude, oOptions.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

		}
	};
	/**   END MEMBER Functions */
})();