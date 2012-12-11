/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 11/2/12
 * Time: 6:55 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns("SOS");
Ext.ns("SOS.Views");

SOS.Views.GeoToolbar = (function (){
	/** START Private Member Variables. */
	var _SAVE_GEOMETRIES_BTN_EL = "#btnSaveGeometries";
	var _NEW_GEOFENCE_BTN_EL = "#btnNewGeoFence";
	var _LOCATE_DEVICE_BTN_EL = "#btnLocateDevice";
	var _onSaveGeometriesClickEvent;
	var _onNewGeoFenceClickEvent;
	var _onLocateDeviceClickEvent;
	/**   END Private Member Variables. */
	/** START Bind Event Handlers to Elements. */
	var onSaveGeometriesClickEvent = function ()
	{
		if (_onSaveGeometriesClickEvent) _onSaveGeometriesClickEvent();
	}
	var onNewGeoFenceClickEvent = function ()
	{
		if (_onNewGeoFenceClickEvent) _onNewGeoFenceClickEvent();
	}
	var onLocateDeviceClickEvent = function ()
	{
		if (_onLocateDeviceClickEvent) _onLocateDeviceClickEvent();
	}
	/**   END Bind Event Handlers to Elements. */

	return {
		/** START Public Member Variables. */

		/**   END Public Member Variables. */

		/** START Public Member Functions. */
		Init: function ()
		{
			$(_SAVE_GEOMETRIES_BTN_EL).click(onSaveGeometriesClickEvent);
			$(_NEW_GEOFENCE_BTN_EL).click(onNewGeoFenceClickEvent);
			$(_LOCATE_DEVICE_BTN_EL).click(onLocateDeviceClickEvent)
		}

		, OnClickSaveGeometries: function (fxHandler)
		{
			_onSaveGeometriesClickEvent = fxHandler;
		}

		, OnNewGeoFenceClickEvent: function (fxHandler)
		{
			_onNewGeoFenceClickEvent = fxHandler;
		}

		, OnLocateDeviceClickEvent: function (fxHandler)
		{
			_onLocateDeviceClickEvent = fxHandler;
		}

		/**   END Public Member Functions. */
		, EnableSaveGeometriesButton: function ()
		{
			if ($('.btnToolSaveDisabled'))
				$(_SAVE_GEOMETRIES_BTN_EL).addClass('btnToolSave').removeClass('btnToolSaveDisabled');
		}
		, DisableSaveGeometriesButton: function ()
		{
			if ($('.btnToolSave'))
				$(_SAVE_GEOMETRIES_BTN_EL).addClass('btnToolSaveDisabled').removeClass('btnToolSave');
		}
	};
})();