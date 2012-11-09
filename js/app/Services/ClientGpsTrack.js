/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 7/5/12
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns('SOS.Services');

Ext.define("SOS.Services.ClientGpsTrack",
{
	singleton: true

	/*******************************************************************************************************************
	 * Member Variables
	 ******************************************************************************************************************/
	/**
	 * @desc {Number} Customer Master File ID.
	 */
	, CustomerMasterFileId: null
	/**
	 * @desc {Number} Customer ID.
	 */
	, CustomerID: null
	, SessionID: null
	, DealerId: null
	, AddressId: null
	, LeadId: null
	, LocalizationId: null
	, Prefix: null
	, FirstName: null
	, MiddleName: null
	, LastName: null
	, Postfix: null
	, Gender: null
	, PhoneHome: null
	, PhoneWork: null
	, PhoneMobile: null
	, Email: null
	, DOB: null
	, SSN: null
	, Username: null
	, IsActive: null

	/*******************************************************************************************************************
	 * Member functions
	 ******************************************************************************************************************/
	, Init: function ()
	{

	}
	/*******************************************************************************************************************
	 * Authenticates the user and returns a ClientInfoModel on success.
	 * @param {String} username The username.
	 * @param {String} password The password.
	 * @param {Object} afxSuccess The successful closure.
	 * @param {Object} fxFailure The failure closure.
	 * @returns {Object} Ajax header.
	 ******************************************************************************************************************/
	, Authenticate: function(username, password, afxSuccess, fxFailure)
	{
		/** Initialize. */
		var oData = {
			szUsername: username
			, szPassword: password
			, lSessionID: SOS.AppService.SessionID
		};
		function fxSuccess (oResponse)
		{
			/** Check result.  */
			if (oResponse.Code === 0)
			{
				/** Get ID's. */
				SOS.Services.ClientGpsTrack.CustomerID = oResponse.Value.CustomerID;
				SOS.Services.ClientGpsTrack.SessionID = oResponse.Value.SessionID;
				SOS.Services.ClientGpsTrack.CustomerTypeId = oResponse.Value.CustomerTypeId;
				SOS.Services.ClientGpsTrack.CustomerMasterFileId = oResponse.Value.CustomerMasterFileId;
				SOS.Services.ClientGpsTrack.DealerId = oResponse.Value.DealerId;
				SOS.Services.ClientGpsTrack.AddressId = oResponse.Value.AddressId;
				SOS.Services.ClientGpsTrack.LeadId = oResponse.Value.LeadId;
				SOS.Services.ClientGpsTrack.LocalizationId = oResponse.Value.LocalizationId;
				SOS.Services.ClientGpsTrack.Prefix = oResponse.Value.Prefix;
				SOS.Services.ClientGpsTrack.FirstName = oResponse.Value.FirstName;
				SOS.Services.ClientGpsTrack.MiddleName = oResponse.Value.MiddleName;
				SOS.Services.ClientGpsTrack.LastName = oResponse.Value.LastName;
				SOS.Services.ClientGpsTrack.Postfix = oResponse.Value.Postfix;
				SOS.Services.ClientGpsTrack.Gender = oResponse.Value.Gender;
				SOS.Services.ClientGpsTrack.PhoneHome = oResponse.Value.PhoneHome;
				SOS.Services.ClientGpsTrack.PhoneWork = oResponse.Value.PhoneWork;
				SOS.Services.ClientGpsTrack.PhoneMobile = oResponse.Value.PhoneMobile;
				SOS.Services.ClientGpsTrack.Email = oResponse.Value.Email;
				SOS.Services.ClientGpsTrack.DOB = oResponse.Value.DOB;
				SOS.Services.ClientGpsTrack.SSN = oResponse.Value.SSN;
				SOS.Services.ClientGpsTrack.Username = oResponse.Value.Username;
				SOS.Services.ClientGpsTrack.IsActive = oResponse.Value.IsActive;
			}

			if (afxSuccess) afxSuccess(oResponse);
		}

		/** Execute. */
		var jxHdr = $.ajax({
			url: SOS.Config.ClientGpsTrackSrvUrl() + "Authenticate"
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

	, GetDeviceListByCMFID: function (oParams, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
		function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

		/** Check arguments. */
		if (oParams === undefined)
		{
			alert("Please pass oParams");
			return null;
		}
		if (oParams.CustomerMasterFileID === undefined)
		{
			alert("Please pass a CMFID.");
			return null;
		}

		/** Build arguments. */
		oData.lCMFID = oParams.CustomerMasterFileID;

		/** Execute call and return header. */
		return $.ajax({
			url: SOS.Config.ClientGpsTrackSrvUrl() + "GetListOfDevicesByCMFID"
			, data: oData
			, type: "GET"
			, dataType: "jsonp"
			, contentType: 'application/json; charset=utf-8'
			, jsonpCallback: "jsoncallback"
			, success: fxSuccess
			, error: fxFailure
		});
	}

	, GetDeviceDetails: function (oParams, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
		function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

		/** Check arguments. */
		if (oParams === undefined)
		{
			alert("Please pass oParams");
			return null;
		}
		if (oParams.AccountID === undefined)
		{
			alert("Please pass an AccountID.");
			return null;
		}

		if (oParams.CustomerID === undefined)
		{
			alert("Please pass a CustomerID.");
			return null;
		}

		/** Build arguments. */
		oData.lAccountID = oParams.AccountID;
		oData.lCustomerID = oParams.CustomerID;

		/** Return header. */
		return $.ajax({
			url:SOS.Config.ClientGpsTrackSrvUrl() + "GetDeviceDetails"
			, data:oData
			, type:"GET"
			, dataType:"jsonp"
			, contentType:'application/json; charset=utf-8'
			, jsonpCallback:"jsoncallback"
			, success:fxSuccess
			, error:fxFailure
		});
	}

	, GetDeviceDetailsJson: function (oParams, afxSuccess, afxFailure)
{
	/** Initialize. */
	var oData = {};
	function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
	function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

	/** Check arguments. */
	if (oParams === undefined)
	{
		alert("Please pass oParams");
		return null;
	}
	if (oParams.AccountID === undefined)
	{
		alert("Please pass an AccountID.");
		return null;
	}

	if (oParams.CustomerID === undefined)
	{
		alert("Please pass a CustomerID.");
		return null;
	}

	/** Build arguments. */
	oData.lAccountID = oParams.AccountID;
	oData.lCustomerID = oParams.CustomerID;
	var oJson = JSON.stringify(oData);

	/** Return header. */
	return $.ajax({
		url:SOS.Config.ClientGpsTrackSrvUrl() + "GetDeviceDetailsJson"
		, data:oJson
		, type:"POST"
		, dataType:"json"
		, crossDomain: true
		, xhrFields: {
			withCredentials: true
		}
		, contentType:'application/json'
		, success:fxSuccess
		, error:fxFailure
	});
}

	, GetDeviceEvents: function (oParams, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
		function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

		/** Check arguments. */
		if (oParams === undefined)
		{
			alert("Please pass oParams");
			return null;
		}
		if (oParams.AccountID === undefined)
		{
			alert("Please pass an AccountID.");
			return null;
		}
		if (oParams.StartDate === undefined)
		{
			alert("Please pass an StartDate.");
			return null;
		}
		if (oParams.EndDate === undefined)
		{
			alert("Please pass an EndDate.");
			return null;
		}
		if (oParams.PageSize === undefined)
		{
			alert("Please pass an PageSize.");
			return null;
		}
		if (oParams.PageNumber === undefined)
		{
			alert("Please pass an PageNumber.");
			return null;
		}

		/** Create arguments. */
		oData.lAccountID = oParams.AccountID;
		oData.sStartDate = oParams.StartDate;
		oData.sEndDate = oParams.EndDate;
		oData.nPageSize = oParams.PageSize;
		oData.nPageNumber = oParams.PageNumber;

		/** Execute and Return header. */
		return $.ajax({
			url:SOS.Config.ClientGpsTrackSrvUrl() + "GetDeviceEvents"
			, data:oData
			, type:"GET"
			, dataType:"jsonp"
			, contentType:'application/json; charset=utf-8'
			, jsonpCallback:"jsoncallback"
			, success:fxSuccess
			, error:fxFailure
		});
	}

	, GetDeviceFences: function(oParams, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
		function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

		/** Check arguments. */
		if (oParams === undefined)
		{
			alert("Please pass oParams");
			return null;
		}
		if (oParams.AccountID === undefined)
		{
			alert("Please pass an AccountID.");
			return null;
		}

		/** Create arguments. */
		oData.lAccountID = oParams.AccountID;
		var oJson = JSON.stringify(oData);

		/** Return header. */
		return $.ajax({
			url:SOS.Config.ClientGpsTrackSrvUrl() + "GetDeviceFencesJson"
			, data:oJson
			, type:"POST"
			, dataType:"json"
			, crossDomain: true
			, xhrFields: { withCredentials: true }
			, contentType:'application/json'
			, success:fxSuccess
			, error:fxFailure
		});
	}

	, SaveGeoPoint: function (oParams, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
		function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

		/** Check arguments. */
		if (oParams === undefined)
		{
			alert("Please pass oParams");
			return null;
		}
		if (oParams.AccountId === undefined)
		{
			alert("Please pass an AccountId.");
			return null;
		}
		if (oParams.PlaceName === undefined) {oParams.PlaceName = '[Not Enabled]';}
		if (oParams.PlaceDescription === undefined) {oParams.PlaceDescription = '[Not Enabled]';}
		if (oParams.Lattitude === undefined)
		{
			alert("Please enter a Latitude position for the point.");
		}
		if (oParams.Longitude === undefined)
		{
			alert("Please enter a Longitude position for the point.");
		}
		/** Create arguments. */
		oData.lAccountID = oParams.AccountID;
		var oJson = JSON.stringify(oData);

		/** Return header. */
		return $.ajax({
			url:SOS.Config.ClientGpsTrackSrvUrl() + "GeoPointSave"
			, data:oJson
			, type:"POST"
			, dataType:"json"
			, crossDomain: true
			, xhrFields: { withCredentials: true }
			, contentType:'application/json'
			, success:fxSuccess
			, error:fxFailure
		});
	}

	, SavePolygonFence: function (oParams, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse)
		{
			if (afxSuccess) { afxSuccess(oResponse); return; }
			console.log("Success Response: ", oResponse);
		}
		function fxFailure(oResponse)
		{
			if (afxFailure) { afxFailure(oResponse); return; }
			console.log("Failure Response: ", oResponse);
		}

		/** Check Arguments. */
		if (oParams === undefined)
		{
			alert("Please pass oParams");
			return null;
		}
		if (oParams.GeoFenceID === undefined) { oParams.GeoFenceID = 0; }
		if (oParams.AccountId === undefined)
		{
			alert("Please pass AccountId");
			return null;
		}
		if (oParams.CoordList === undefined)
		{
			alert("Please pass the list of coordinates");
			return null;
		}

		/** Create arguments to be passed. */
		oData.lGeoFenceID = oParams.GeoFenceID;
		oData.lAccountId = oParams.AccountId;
		oData.oCoordList = oParams.CoordList;
		var oJson = JSON.stringify(oData);

		/** Execute and Return header. */
		return $.ajax({
			url:SOS.Config.ClientGpsTrackSrvUrl() + "GeoPolygonSave"
			, data:oJson
			, type:"POST"
			, dataType:"json"
			, crossDomain: true
			, xhrFields: { withCredentials: true }
			, contentType:'application/json'
			, success:fxSuccess
			, error:fxFailure
		});
	}

	, SaveSimplePolygonFence: function (oParams, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
		function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

		/** Check Arguments. */
		if (oParams === undefined)
		{
			alert("Please pass oParams");
			return null;
		}
		if (oParams.GeoFenceID === undefined) { oParams.GeoFenceID = 0; }
	//	if (oParams.AccountId === undefined)
	//	{
	//		alert("Please pass AccountId");
	//		return null;
	//	}
	//	if (oParams.CoordList === undefined)
	//	{
	//		alert("Please pass the list of coordinates");
	//		return null;
	//	}

		/** Create arguments to be passed. */
		oData.lGeoFenceID = oParams.GeoFenceID;
		oData.lAccountId = oParams.AccountId;
	//	oData.laList = [1232,13123,131313,35453,5775];
		oData.oCoordList =  [{ GeoFencePolygonID:1, GeoFenceId: 1 },
		    { GeoFencePolygonID:2, GeoFenceId: 2 },
		    { GeoFencePolygonID:3, GeoFenceId: 3 },
		    { GeoFencePolygonID:4, GeoFenceId: 4 },
		    { GeoFencePolygonID:5, GeoFenceId: 5 }];


		var sJson = JSON.stringify(oData);
		/** Execute and Return header. */
		return $.ajax({
			url:SOS.Config.ClientGpsTrackSrvUrl() + "GeoSimpleSave"
			, data: sJson
			, type:"POST"
			, dataType:"json"
			, crossDomain: true
			, contentType: 'application/json'
			, success:fxSuccess
			, error:fxFailure
		});
	}

	, SaveCircleFence: function (params, afxSuccess, afxFailure)
	{
		/** Initialize. */
		var oData = {};
		function fxSuccess(oResponse) { if (afxSuccess) afxSuccess(oResponse); }
		function fxFailure(oResponse) { if (afxFailure) afxFailure(oResponse); }

		/** Check Arguments. */
		if (params === undefined)
		{
			alert("Please pass params argument.");
			return;
		}
		if (params.GeoFenceID === undefined)
		{
			alert("Please pass a GeoFenceID property.");
			return;
		}
		/** Setup the data argument. */
		oData.lGeoFenceID = params.GeoFenceID;
		oData.fRadius = params.radius;
		oData.fCenterLattitude = params.centerLattitude;
		oData.fCenterLongitude = params.centerLongitude;
		var sJson = JSON.stringify(oData);

		/** Execute query. */
		return $.ajax({
			url: SOS.Config.ClientGpsTrackSrvUrl() + "GeoCircleSave"
			, data: sJson
			, type: "POST"
			, dataType: "json"
			, crossDomain: true
			, xhrFields: { withCredentials: true }
			, contentType: 'application/json'
			, success: fxSuccess
			, failure: fxFailure
		});
	}
});