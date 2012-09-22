/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 9/18/12
 * Time: 5:55 AM
 * To change this template use File | Settings | File Templates.
 */

if (typeof SOS === "undefined") {	SOS = { }; }
if (typeof SOS.Services === "undefined") {	SOS.Services = {}; }

SOS.Services.Authentication = (function ()
{
	/** START Private Members. */
	/**   END Private Members. */

	/** START Public Members. */
	return {
		General: function (username, password)
		{
			/** Inititalize. */
			var oData = {
				sUsername : username
				, sPassword : password
			};
			function fxSuccess(oResponse)
			{
				console.log("Success response is here", oResponse);
			}
			function fxFailure (oResponse)
			{
				console.log("Failure response is here: ", oResponse);
			}

			/** Execute. */
			var jxHdr = $.ajax({
				url: SOS.Config.AuthServiceUrl() + "GeneralAuthentication"
				, data: oData
				, type: "GET"
				, dataType: "jsonp"
				, contentType: 'application/json; charset=utf-8'
				, jsonpCallback: "jsoncallback"
				, success: fxSuccess
				, error: fxFailure
			});

			/** Display console. */
			console.log("Authenticate Client: ", jxHdr);

			/** Return result. */
			return jxHdr;
		},

		TokenAuthentication: function (token, afxSuccess, afxFailure)
		{
			/** Inititalize. */
			var oData = {
				sToken: token
		    };
			function fxSuccess(oResponse)
			{
				if (afxSuccess)
				{
					afxSuccess(oResponse);
					return;
				}
				console.log("Success response is here", oResponse);
			}
			function fxFailure (oResponse)
			{
				if (afxFailure)
				{
					afxFailure(oResponse);
					return;
				}
				console.log("Failure response is here: ", oResponse);
			}

			/** Execute. */
			var jxHdr = $.ajax({
				url: SOS.Config.AuthServiceUrl() + "TokenAuthentication"
				, data: oData
				, type: "GET"
				, dataType: "jsonp"
				, contentType: 'application/json; charset=utf-8'
				, jsonpCallback: "jsoncallback"
				, success: fxSuccess
				, error: fxFailure
			});

			/** Display console. */
			console.log("Authenticate Client: ", jxHdr);

			/** Return result. */
			return jxHdr;
		},

		TerminateSession: function (afxSuccess, afxFailure)
		{
			/** Inititalize. */
			var oData = {};
			function fxSuccess(oResponse)
			{
				if (afxSuccess)
				{
					afxSuccess(oResponse);
					return;
				}
				console.log("Success response is here", oResponse);
			}
			function fxFailure (oResponse)
			{
				if (afxFailure)
				{
					afxFailure(oResponse);
					return;
				}
				console.log("Failure response is here: ", oResponse);
			}

			/** Execute. */
			var jxHdr = $.ajax({
				url: SOS.Config.AuthServiceUrl() + "TerminateSession"
				, data: oData
				, type: "GET"
				, dataType: "jsonp"
				, contentType: 'application/json; charset=utf-8'
				, jsonpCallback: "jsoncallback"
				, success: fxSuccess
				, error: fxFailure
			});

			/** Display console. */
			console.log("Authenticate Client: ", jxHdr);

			/** Return result. */
			return jxHdr;
		}
	};
	/**   END Public Members. */
})();
