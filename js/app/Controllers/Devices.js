/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 8/7/12
 * Time: 7:08 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns('SOS');
Ext.ns('SOS.Controllers');

Ext.define("SOS.Controllers.Devices",
{
	/** Class type. */
	singleton: true

	/** START Member Properties. */
	, DeviceList: []
	, DeviceListEl: {}
	, CustomerMasterFileID: null
	/**   END Member Properties. */

	/** START Member Functions. */
	, Init: function(options)
	{
		/** Initialize. */
		debugger;
		SOS.Controllers.Devices.DeviceListEl = $(".deviceList");
		SOS.Controllers.Devices.CustomerMasterFileID = options.CustomerMasterFileID;
		SOS.Controllers.Devices.DeviceListEl.html("");
	}

	, LoadDeviceList: function ()
	{
		/** Initialize. */

	}
	/**   END Member Functions. */
});

