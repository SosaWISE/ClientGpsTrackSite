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
	var DEVICE_EVENT_ROW_TEMPLATE = ''
		+ '<!--Start Normal Row -->'
		+ '<tr data-id="eventId-{0}" class="{1} trEventItem">'
		+ '<td><strong>{0}</strong></td>'
		+ '	<td class="eventName">{3}</td>'
		+ '	<td class="rowPointer" rowspan="2"></td>'
		+ '</tr>'
		+ '<tr data-id="eventId-{0}" class="{1} trEventItem">'
		+ '	<td colspan="2" class="eventDate">{2}</td>'
		+ '	<!--<td colspan="2">Lat: {4} | Lon: {5}</td>-->'
		+ '</tr>'
		+ '<!--  END Normal Row -->';
	var ROW_SPACER = ''
		+ '<tr>'
		+ '<td class="rowSpacer" colspan="3"></td>'
		+ '</tr>';

	var sliderHandler = "div.menuGps";
	var sliderEl = $(sliderHandler);

	var deviceEventTblBdyEl = "#deviceEventTblBdy";

	var _eventHashList = {};

	/**   END Private Members. */

	/** START Member Functions. */
	return {
		Init: function (oData)
		{
			/** Bind data to the slider. */
			var szMonitoredInfo = $.validator.format(TABLE_NAME_ROW
			, oData.FirstName + ' ' + oData.MiddleName + ' ' + oData.LastName
			, '/images/Picture.png'
			, oData.StreetAddress
			, oData.City + ' ' + oData.StateId + ' ' + oData.PostalCode
			, oData.PhoneMobile);

			$("tbody", "table.monPartyInfo").html(szMonitoredInfo);

			/** Show the data. */
			$(sliderEl.selector).animate({width:220, paddingLeft:"10", paddingRight:"10", opacity:1.0}, "slow");
		}
		, buildSmallEventsList: function (eventsList)
		{
			/** Initialize. */
			var sHtml = "";

			/** Build rows. */
			$.each(eventsList, function (nIndex, oValue)
			{
				/** Initialize. */
				var eventDate = new Date(oValue.EventDate + ' UTC');
				_eventHashList[oValue.EventID] = oValue;
				_eventHashList[oValue.EventID].Centroid = new google.maps.LatLng(oValue.Lattitude, oValue.Longitude);

				/** Add Spacer. */
				//if (nIndex > 0) {sHtml += ROW_SPACER;}
				/** Add content. */
				sHtml += $.validator.format(DEVICE_EVENT_ROW_TEMPLATE
					, oValue.EventID
					, (nIndex % 2) === 0 ? "trNormal" : "trAlt"
					, eventDate.toString().replace(/GMT.*/g,"")
					, oValue.EventName
					, oValue.Lattitude
					, oValue.Longitude
				);
			});

			/** Insert rows to table. */
			$(deviceEventTblBdyEl).html(sHtml);

			/** Bind Click event to the row. */
			$("tr.trEventItem", deviceEventTblBdyEl).bind('click', function(e)
			{
				/** Show Event in console. */
				console.log("Event Clicked.", e);

				var nEventID = $(e.currentTarget).attr("data-id").replace("eventId-", "");
				/** Remover Edit mode from all GeoObjects. */
				SOS.Gps.Maps.StopAllEdit();
				/** Pane map to center of the fence. */
				SOS.Gps.Maps.CurrentMap.panTo(_eventHashList[nEventID].Centroid);

			});
		}

		, PaintEventsList: function (eventsList)
		{
			$.each(eventsList, function (index, eventItem)
			{
				/** Initialize. */
				var eventDate = new Date(eventItem.EventDate + ' UTC');
				var params = {
					Lattitude: eventItem.Lattitude
					, Longitude: eventItem.Longitude
					, EventTypeId: eventItem.EventTypeId
					, EventName: eventItem.EventName
					, EventDate: eventDate.toString().replace(/GMT.*/g,"")
					, EventID: eventItem.EventID
				};
				SOS.Gps.Maps.PaintMarker(params);
			});
		}
	};
	/**   END Member Functions. */
})();
