/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 7/6/12
 * Time: 10:11 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns("SOS.Modals");

Ext.define("SOS.Modals.LoginForm",
{
	extend: "Ext.window.Window",
	alias: "widget.loginForm",

	constructor: function(options)
	{
		/** Initialize. */
		var me = this;
		options = options || {};
		var tplCalendar = SOS.AppService.TemplateFiles['MdlDlgLoginForm.html'];

		/** Build Configuration options for the window. */
		var config = Ext.merge(options,
			{
				id: "ModalLoginForm",
				title: '<img src="images/DragTab-Yellow.png" alt="Click here to move the window" />',
				modal: true,
				closable: true,
				draggable: true,
				tpl: tplCalendar,
				data: {
					SessionID: SOS.AppService.SessionID
				},
				renderSelectors: {
					frmLoginUsernameTxtEl: "txtUsername"
					, frmLoginPasswordTxtEl: "txtPassword"
					, frmLoginSubmitBtnEl: "btnSubmit"
					, frmLoginResetBtnEl: "btnReset"
				},
				listeners:
				{
					scope: this,
					afterrender: this.OnAfterRender
				}
			});

		/** Init base. */
		this.callParent([config]);
	},

	OnAfterRender: function (e)
	{
		console.log("Finished rendering the Modal Dialog Login Form.");
		/** Initialize. */
		var me = this;
		me._viewContainer = Ext.getCmp("ModalLoginForm");
		var frmLogin = Ext.getCmp("ModalLoginForm");
		var btnSubmit = $("#btnSubmit");

		/** Bind events to buttons. */
		btnSubmit.bind("click", me, this.SubmitLoginInfo);

	},

	SubmitLoginInfo: function(e)
	{
		/** Initialize. */
		var sUsername =$("#txtUsername").val();
		var sPassword =$("#txtPassword").val();

		function fxSuccess(oResponse)
		{
			/** Check response code. */
			if (oResponse.Code != 0)
			{
				alert("Authentication failed:\r\n" + oResponse.Message);
				return;
			}

			alert(Ext.String.format("Successfully signed in {0} {1} with the following information\r"
				+ "CustomerID: {2}\r"
				+ "DealerId: {3}\r"
				+ "Gender: {4}\r"
				+ "Home Phone: {5}"
				, SOS.Services.ClientGpsTrack.FirstName
				, SOS.Services.ClientGpsTrack.LastName
				, SOS.Services.ClientGpsTrack.CustomerID
				, SOS.Services.ClientGpsTrack.DealerId
				, SOS.Services.ClientGpsTrack.Gender
				, SOS.Services.ClientGpsTrack.PhoneHome
			));

			/** Create device list. */
			/** Init device list. */
			SOS.Controllers.Devices.Init({CustomerMasterFileID: oResponse.Value.CustomerMasterFileId})

			/** Close modal and instance. */
			e.data.close();
			e.data.destroy();
		}
		function fxFailure(jxHdr)
		{
			console.log("There was an error", jxHdr);
		}

		var oDef = SOS.Services.ClientGpsTrack.Authenticate(sUsername, sPassword, fxSuccess, fxFailure)
	}
});

