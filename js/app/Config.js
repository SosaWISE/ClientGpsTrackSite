/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 7/3/12
 * Time: 10:03 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.ns('SOS');

Ext.define("SOS.Config",
{
	singleton: true
	, RestURL: "//localhost:50243/" // Development server.
//	, RestURL: "//www.freedomsos.com/"

	, AuthServiceUrl: function()
	{
		return SOS.Config.RestURL + "AuthSrv/";
	}

	, ClientGpsTrackSrvUrl: function()
	{
		return SOS.Config.RestURL + "ClientGpsTrackSrv/";
	}
});
