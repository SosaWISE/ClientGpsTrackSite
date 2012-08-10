/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 8/7/12
 * Time: 8:08 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns('SOS');
Ext.ns('SOS.Models');

Ext.define("SOS.Models.DeviceModel",
{
	/** START: Constructor. */
	constructor: function (options)
	{
		/** Initialize. */
		var me = this;

		/** Check for values. */
		if (!options) return;

		/** Set values. */
		me.DeviceID = options.DeviceID;
		me.DeviceName = options.DeviceName;
	}
	/**   END: Constructor. */

	/** START: Member Properties. */
	, DeviceName: null
	, DeviceID: null
	/**   END: Member Properties. */
});
