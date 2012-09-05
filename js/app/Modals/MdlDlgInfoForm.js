/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 8/10/12
 * Time: 7:24 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns("SOS.Modals");

Ext.define("SOS.Modals.InfoForm",
{
	/** START Class definition. */
	extend: "Ext.window.Window"
	, alias: "widget.infoForm"
	/**   END Class definition. */

	/** START: Member Methods. */
	, constructor: function (options)
	{
		/** Initialize. */
		//var me = this;
		options = options || {};
		var tplInfoForm = SOS.AppService.TemplateFiles['MdlDlgInfoForm.html'];

		/** Build Configuration options for the window. */
		var config = Ext.merge(options,
			{
				id: "ModalLoginForm",
				title: '<img src="images/DragTab-Yellow.png" alt="Click here to move the window" />',
				modal: true,
				closable: true,
				draggable: true,
				tpl: tplInfoForm,
				data: {
					SessionID: SOS.AppService.SessionID
				},
				renderSelectors: {
//					frmLoginUsernameTxtEl: "txtUsername"
//					, frmLoginPasswordTxtEl: "txtPassword"
//					, frmLoginSubmitBtnEl: "btnSubmit"
//					, frmLoginResetBtnEl: "btnReset"
				},
				listeners:
				{
					scope: this,
					afterrender: this.OnAfterRender
				}
			});

		/** Init base. */
		this.callParent([config]);

	}
	, OnAfterRender: function ()
	{
		console.log("Finished rendering the Modal Dialog Info Form.");

	}
	, statics: {
		Show: function ()
		{
			/** Initialize. */
			var oModal = new SOS.Modals.InfoForm();

			/** Show Modal information. */
			oModal.show();
		}
	}
	/**   END: Member Methods. */
});