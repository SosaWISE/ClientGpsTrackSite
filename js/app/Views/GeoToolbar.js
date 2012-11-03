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
		var _onSaveGeometriesClickEvent;
	/**   END Private Member Variables. */
	/** START Bind Event Handlers to Elements. */
		var onSaveGeometriesClickEvent = function ()
		{
			if (_onSaveGeometriesClickEvent) _onSaveGeometriesClickEvent();
		}
	/**   END Bind Event Handlers to Elements. */


	return {
		/** START Public Member Variables. */

		/**   END Public Member Variables. */

		/** START Public Member Functions. */
		Init: function ()
		{
			$(_SAVE_GEOMETRIES_BTN_EL).click(onSaveGeometriesClickEvent);
		}

		, OnClickSaveGeometries: function (fxHandler)
		{
			_onSaveGeometriesClickEvent = fxHandler;
		}
		/**   END Public Member Functions. */
	};
})();