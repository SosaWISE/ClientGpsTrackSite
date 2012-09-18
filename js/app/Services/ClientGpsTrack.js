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
});