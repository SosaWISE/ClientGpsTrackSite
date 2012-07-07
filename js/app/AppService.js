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
	singleton: true

	/*******************************************************************************************************************
	 *******************************************************************************************************************
	 * Member Variables
	 *******************************************************************************************************************
	 ******************************************************************************************************************/
	, SessionID: null

	, TemplateFiles: []

	/*******************************************************************************************************************
	 *******************************************************************************************************************
	 * Member functions
	 *******************************************************************************************************************
	 ******************************************************************************************************************/
	, Init: function()
	{
		$("div.btnInformation").bind("click", SOS.AppService.LoginUser);

		$.when(SOS.AppService.SessionStart())
			.done(SOS.AppService.LoadExtFiles);
	}

	/*******************************************************************************************************************
	 * Loads external files from the app/Views folder.
	 ******************************************************************************************************************/
	, LoadExtFiles: function ()
	{
		/** Initialize. */
		function LoadFileView(viewName)
		{
			return $.get("js/app/Views/" + viewName, function(data) {
				/** Initialize. */
				//var templateType = viewName.match(/<!-- TemplateId: raw MdlDlgLoginForm.html -->/g);

				SOS.AppService.TemplateFiles[viewName] = data;
				console.log('Load was performed.', data);
			});
		}

		/** Load all files. */
		$.when(
			LoadFileView("MdlDlgLoginForm.html")
		).then(function(){
				console.log("Finished the loading of templates");
				var oLoginForm = new SOS.Modals.LoginForm();
				oLoginForm.show();
			});
	}

	, LoginUser: function()
	{
		var dealerId = prompt("Enter DealerId:");
		var username = prompt("Enter Username:");
		var password = prompt("Enter Password:");

		SOS.AppService.Authenticate(dealerId, username, password);
	}
	, SessionStart: function ()
	{
		/** Initialize. */
		function fxSuccess(oResponse)
		{
			console.log("SessionStart: Made it successfully", oResponse);
			SOS.AppService.SessionID = oResponse.Value.SessionId;
			//alert("Successfully began a session with SessionID of '" + oResponse.Value.SessionId + "'");
		}
		function fxFailure(jxHdr)
		{
			console.log(jxHdr);
		}

		/** Execute ajax. */
		return $.ajax({
			url: SOS.Config.AuthServiceUrl() + "SosStart"
			, data: { szApplicationToken: "SOS_GPS_CLNT" }
			, type: "GET"
			, dataType: "jsonp"
			, contentType: 'application/json; charset=utf-8'
			, jsonpCallback: "jsoncallback"
			, success: fxSuccess
			, error: fxFailure
		});
	}
	, Authenticate: function (dealerId, username, password)
	{
		/** Initialize. */
		function fxSuccess(oResponse)
		{
			/** Check result. */
			if (oResponse.Code === 0)
			{
				alert("Successfully Authenticate '" + oResponse.Value.Fullname + "'.");
			}
			else
			{
				alert("There was a problem with the authentication of the user:\r\n"
				+ "'" + oResponse.Message + "'");
			}
		}
		function fxFailure(jxHdr)
		{
			alert("There was an error communicating with the service.");
			console.log("Error communicating with service.", jxHdr);
		}
		/** Execute ajax. */
		$.ajax({
			url: SOS.Config.AuthServiceUrl() + "SosWiseCrmAuthenticate"
			, data: {
				lSessionId: SOS.AppService.SessionID
				, lDealerId: dealerId
				, szUsername: username
				, szPassword: password
			}
			, type: "GET"
			, dataType: "jsonp"
			, contentType: 'application/json; charset=utf-8'
			, jsonpCallback: "jsoncallback"
			, success: fxSuccess
			, error: fxFailure
		});

	}
});