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
			Medical: '<div data-id="dId-{0}" class="btnMedicalTracker btnMain">{1}</div>',
			Kid:     '<div data-id="dId-{0}" class="btnKidTracker btnMain">{1}</div>',
			Car:     '<div data-id="dId-{0}" class="btnCarTracker btnMain">{1}</div>',
			Pet:     '<div data-id="dId-{0}" class="btnPetTracker btnMain">{1}</div>',
			Home:    '<div data-id="dId-{0}" class="btnHomeSecurity btnMain">{1}</div>',
			Exercise:'<div data-id="dId-{0}" class="btnExercise btnMain">{1}</div>'
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
				/** Check to see what type of device it is. */
				switch (oItem.PanelTypeId)
				{
					case "PERS-M":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Medical
							, oItem.AccountId, oItem.IndustryNumber);
						break;
					case "PERS-C":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Kid
							, oItem.AccountId, oItem.IndustryNumber);
						break;
					case "PERS-A":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Kid
							, oItem.AccountId, oItem.IndustryNumber);
						break;
					case "PERS-P":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Pet
							, oItem.AccountId, oItem.IndustryNumber);
						break;
					case "PERS-E":
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Exercise
							, oItem.AccountId, oItem.IndustryNumber);
						break;
					default:
						sDevices += Ext.String.format(SOS.Controllers.Devices.DeviceElList.Home
							, oItem.AccountId, oItem.IndustryNumber);
						break;
				}
			});

			debugger;
			/** Build list of devices and show. */
			SOS.Controllers.Devices.DeviceListEl.html(sDevices);
		}
		function fxFailure(oResponse)
		{
			console.log(oResponse);
		}

		/** Execute. */
		SOS.Services.ClientGpsTrack.GetDeviceListByCMFID(oOptions, fxSuccess, fxFailure);
	}
	/**   END Member Functions. */
});

