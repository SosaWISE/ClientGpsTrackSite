/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 9/21/12
 * Time: 6:49 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.ns("SOS.Utils");
Ext.define("SOS.Utils.Strings",
	{
		singleton: true,

		/**
		 * Standard phone formatting
		 * @param szPhone
		 * @return {*}
		 */
		formatPhone: function (szPhone)
		{
			return szPhone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
		},
		/**
		 * Normal date.
		 * @param oDate
		 * @return {*}
		 */
		formatDate: function(oDate, saFormat)
		{
			/** Initialize. */
			var szFormat = saFormat || 'M/d/Y';
			return Ext.util.Format.dateRenderer(szFormat)(oDate);
		},
		/**
		 * Other ways to format dates
		 *  Ext.util.Format.dateRenderer('M d Y h:i:s.u A  | F j,Y,g:iA')(d)
		 * @param oDate
		 * @param bHideTimeZone {boolean}
		 * @return {*}
		 */
		formatDateLong: function (oDate, bHideTimeZone, saFormat) {
			/** Initialize. */
			var sFormat;

			if (!bHideTimeZone)
			{
				//return Ext.util.Format.dateRenderer('M/d/Y h:i A (T)')(oDate);
				sFormat = saFormat || 'M/d/Y h:i A (T)';
			}
			else
			{
				oDate = oDate.replace("T"," ");
				//return Ext.util.Format.dateRenderer('M/d/Y h:i A')(oDate);
				sFormat = saFormat || 'M/d/Y h:i A';
			}

			/** Return result. */
			return Ext.util.Format.dateRenderer(sFormat)(oDate);
		},
		getLeadIdObject: function (sArg)
		{
			/** Initialize. */
			var aArg = sArg.split('-');
			var lLeadId = Number(aArg[1]);
			var lCustomerMasterFileId = Number(aArg[2]);

			/** Return result. */
			return {
				LeadId:lLeadId, CustomerMasterFileId:lCustomerMasterFileId
			};
		},
		getParameterByName: function(name)
		{
			/** Initialize. */
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.search);
			if(results == null)
				return null;
			else
				return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	});