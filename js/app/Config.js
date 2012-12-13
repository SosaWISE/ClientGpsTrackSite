/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 7/3/12
 * Time: 10:03 AM
 * To change this template use File | Settings | File Templates.
 */
//Ext.ns('SOS');
//
//Ext.define("SOS.Config",
//{
//	singleton: true
////	, RestURL: "//localhost:50243/" // Development server.
//	, RestURL: "//sos.corp2.local/" // Stage Environment.
////	, RestURL: "//www.freedomsos.com/"
//
//	, AuthServiceUrl: function()
//	{
//		return SOS.Config.RestURL + "AuthSrv/";
//	}
//
//	, ClientGpsTrackSrvUrl: function()
//	{
//		return SOS.Config.RestURL + "ClientGpsTrackSrv/";
//	}
//});

if (typeof SOS === "undefined") {	SOS = { }; }
SOS.Config = (function ()
{
	/** START Private Members. */
	 //var _restURL =  "//localhost:50243/"; // Development server.
	var _restURL =  "//sos.corp2.local/"; // Stage Environment.
	 //var _restURL =  "//www.freedomsos.com/";

	// var _currentURL = "//ClientGPS.SecuritySciences.com";
	var _currentURL = "//SOS.ClientGPSTrackSite.Local/";

	/**   END Private Members. *./

	/** START Public Members. */
	return {
		get RestURL()
		{
			return _restURL;
		}
		, get CurrentURL()
		{
			return _currentURL;
		}
		, AuthServiceUrl: function()
		{
			return SOS.Config.RestURL + "AuthSrv/";
		}

		, ClientGpsTrackSrvUrl: function()
		{
			return SOS.Config.RestURL + "ClientGpsTrackSrv/";
		}
	};
	/**   END Public Members. */
})();
