/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 9/3/12
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

if (typeof SOS === 'undefined') { SOS = {}; }
if (typeof SOS.Sliders === 'undefined') { SOS.Sliders = {}; }

SOS.Sliders.GpsInfoSlider = (function ()
{
	/** START Private Members. */
	var TABLE_NAME_ROW = ''
		+ '<tr>'
		+	'<td class="fieldTitle">N</td>'
		+	'<td class="fieldValue">{0}</td>'
		+	'<td rowspan="3"><img src="{1}" style="width: 50px;"/></td>'
		+	'</tr>'
		+ '<tr>'
		+	'<td class="fieldTitle">A</td>'
		+	'<td class="fieldValue">{2}<br />{3}</td>'
		+ '</tr>'
		+ '<tr>'
		+	'<td class="fieldTitle">M</td>'
		+	'<td class="fieldValue">{4}</td>'
		+ '</tr>';
	var sliderHandler = "div.menuGps";
	var sliderEl = $(sliderHandler);
	/**   END Private Members. */

	/** START Member Functions. */
	return {
		Init: function (oData)
		{
			/** Bind data to the slider. */
			var szMonitoredInfo = $.validator.format(TABLE_NAME_ROW
			, oData.FirstName + ' ' + oData.MiddleName + ' ' + oData.LastName
			, '/images/Picture.png'
			, oData.AddressId
			, oData.Gender
			, oData.PhoneMobile);

			$("tbody", "table.monPartyInfo").html(szMonitoredInfo);

			/** Show the data. */
			$(sliderEl.selector).animate({width:220, paddingLeft:"10", paddingRight:"10", opacity:1.0}, "slow");
		}
	};
	/**   END Member Functions. */
})();
