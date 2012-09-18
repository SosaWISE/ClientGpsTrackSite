/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 8/7/12
 * Time: 7:08 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns('SOS');
Ext.ns('SOS.Controllers');

Ext.define("SOS.Controllers.Devices",
{
	/** Class type. */
	singleton: true

	/** START Member Properties. */
	, DeviceList: []
	, DeviceListEl: {}
	, CustomerMasterFileID: null
	, DeviceElList: {
			Medical: '<div data-id="dId-{0}" data-idid="cId-{1}" class="btnMedicalTracker btnMain">{2}</div>',
			Kid:     '<div data-id="dId-{0}" data-idid="cId-{1}" class="btnKidTracker btnMain">{2}</div>',
			Car:     '<div data-id="dId-{0}" data-idid="cId-{1}" class="btnCarTracker btnMain">{2}</div>',
			Pet:     '<div data-id="dId-{0}" data-idid="cId-{1}" class="btnPetTracker btnMain">{2}</div>',
			Home:    '<div data-id="dId-{0}" data-idid="cId-{1}" class="btnHomeSecurity btnMain">{2}</div>',
			Exercise:'<div data-id="dId-{0}" data-idid="cId-{1}" class="btnExercise btnMain">{2}</div>'
		}
	/**   END Member Properties. */

	/** START Member Functions. */
	, Init: function(options)
	{
		/** Initialize. */
		SOS.Controllers.Devices.DeviceListEl = $(".deviceList");
		SOS.Controllers.Devices.CustomerMasterFileID = options.CustomerMasterFileID;
		SOS.Controllers.Devices.DeviceListEl.html("");

		/** Load Devices. */
		SOS.Controllers.Devices.LoadDeviceList();
	}

	, LoadDeviceList: function ()
	{
		/** Initialize. */
		var oOptions = {CustomerMasterFileID: SOS.Controllers.Devices.CustomerMasterFileID};
		function fxSuccess(oResponse)
		{
			/** Check result. */
			if (oResponse.Code !== 0)
			{
				alert("An error was thrown:\n" + oResponse.Message);
				return;
			}

			/** Show the list of devices. */
			var sDevices = "";
			$.each(oResponse.Value, function (nIndex, oItem)
			{
				/** Add to device list. */
				SOS.Controllers.Devices.DeviceList[nIndex] = oItem;

				/** Check to see what type of device it is. */
				switch (oItem.PanelTypeId)
				{
					case "PERS-M":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Medical
							, oItem.AccountId, oItem.CustomerID, oItem.IndustryNumber);
						break;
					case "PERS-C":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Kid
							, oItem.AccountId, oItem.CustomerID, oItem.IndustryNumber);
						break;
					case "PERS-A":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Kid
							, oItem.AccountId, oItem.CustomerID, oItem.IndustryNumber);
						break;
					case "PERS-P":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Pet
							, oItem.AccountId, oItem.CustomerID, oItem.IndustryNumber);
						break;
					case "PERS-E":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Exercise
							, oItem.AccountId, oItem.CustomerID, oItem.IndustryNumber);
						break;
					default:
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Home
							, oItem.AccountId, oItem.CustomerID, oItem.IndustryNumber);
						break;
				}
			});

			/** Build list of devices and show. */
			SOS.Controllers.Devices.DeviceListEl.html(sDevices);

			/** Bind events to buttons. */
			$("div.btnMain", $("div.deviceList")).bind("click", SOS.Controllers.Devices.buttonClick);
		}
		function fxFailure(oResponse)
		{
			/** Initialize. */
			console.log(oResponse);
		}

		/** Execute. */
		SOS.Services.ClientGpsTrack.GetDeviceListByCMFID(oOptions, fxSuccess, fxFailure);
	}

	, buttonClick: function (e)
	{
		/** Initialize. */
		var oEl = $(e.currentTarget);
		var lAccountID = $(e.currentTarget).attr("data-id").replace("dId-", "");
		var lCustomerId = $(e.currentTarget).attr("data-idid").replace("cId-", "");

		console.log("Button Click on Device Icon:", oEl, lAccountID, lCustomerId);

		/**
		 * Call server to get information. */
		// ** Initialize.
		var oOptions = {
			AccountID: lAccountID
			, CustomerID: lCustomerId
		};
		function fxSuccess(oResponse) {
			if (oResponse.Code !== 0)
			{
				alert("The following error was encountered: \n" + oResponse.Message);
				return;
			}
			console.log(oResponse);
			/** Load Google map. */
			var oOptions = {
				latitude: -111.67569100000003
				, longitude: 40.31907001347657
			};

			SOS.Gps.Maps.initialize(oOptions);

			/** Show account information. */
			SOS.Sliders.GpsInfoSlider.Init(oResponse.Value);
		}
		function fxFailure (oResponse){
			console.log(oResponse);
		}

		$.when(SOS.Services.ClientGpsTrack.GetDeviceDetails(oOptions, fxSuccess, fxFailure))
			.done(SOS.Controllers.Devices.loadDeviceEvents, e);
	}
	, loadDeviceEvents: function (deviceDetailsResult)
	{
		/** Initialize. */
		console.log("Loading Device Events:", deviceDetailsResult);
		var endDate = new Date();
		var startDate = new Date();
		startDate = new Date(startDate.setDate(startDate.getDate() - 30));
		var oOptions = {
			AccountID : deviceDetailsResult.Value.AccountId
			, StartDate : (1 + startDate.getUTCMonth()) + '/' + startDate.getUTCDate() + '/' + startDate.getUTCFullYear()
			, EndDate : (1 + endDate.getUTCMonth()) + '/' + endDate.getUTCDate() + '/' + endDate.getUTCFullYear()
			, PageSize: 5
			, PageNumber: 1
		};
		function fxSuccess(oResponse)
		{
			console.log(oResponse.Value);
			SOS.Sliders.GpsInfoSlider.buildSmallEventsList(oResponse.Value);
		}
		function fxFailure(oResponse)
		{
			alert("Failed to get Event Details:\r" + oResponse.Message);
		}

		/** Return execution header. */
		return SOS.Services.ClientGpsTrack.GetDeviceEvents(oOptions, fxSuccess, fxFailure);
	}
	/**   END Member Functions. */
});

