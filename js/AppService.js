/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 6/26/12
 * Time: 2:32 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns('SOS');

Ext.define("SOS.AppService",
{
	Authenticate: function ()
	{
		/** Execute ajax. */
		$.ajax({
			url: PTP.Config.GetWeekInfoUrl()
			, data: { nPayPeriodId: nPayPeriodId }
			, type: "GET"
			, dataType: "jsonp"
			, contentType: 'application/json; charset=utf-8'
			, jsonpCallback: "localJsonpCallback"
			, success: fxSuccess
			, error: fxFailure
		});

	}
});