/**
 * Created with JetBrains PhpStorm.
 * User: Andres Sosa
 * Date: 10/23/12
 * Time: 6:32 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.ns('SOS');
Ext.ns('SOS.Views');

SOS.Views.GpsFenceList = (function ()
{
	/** START Member Variables. */
	var _FENCE_TBODY_EL = "#fenceTBody";
	var _ROW_NORMAL = '					<!--Start Normal Row -->'
		+ '					<tr data-id="gfid-{0}" class="trNormalGps trFenceItem">'
		+ '						<td>{1}</td>'
		+ '						<td>{2}</td>'
		+ '						<td class="rowPointerGps" rowspan="2"></td>'
		+ '					</tr>'
		+ '					<tr data-id="gfid-{0}" class="trNormalGps trFenceItem">'
		+ '						<td colspan="2">Lat&#92;Long: <strong>{3}</strong></td>'
		+ '					</tr>'
		+ '					<!--  END Normal Row -->';
	var _ROW_SPACER = '					<!-- START Row Spacer -->' +
		'					<tr>' +
		'						<td class="rowSpacer" colspan="3"></td>' +
		'					</tr>' +
		'					<!--   END Row Spacer -->';
	var _ROW_ALTERN = '					<!--START Alternate Row -->' +
		'					<tr data-id="gfid-{0}" class="trAltGps trFenceItem">' +
		'						<td>{1}</td>' +
		'						<td>{2}</td>' +
		'						<td class="rowPointerGps" rowspan="2"></td>' +
		'					</tr>' +
		'					<tr data-id="gfid-{0}" class="trAltGps trFenceItem">' +
		'						<td colspan="2">Lat&#92;Long: <strong>{3}</strong></td>' +
		'					</tr>' +
		'					<!--  END Alternate Row -->';
	/**   END Member Variables. */

	/** START Member Functions. */
	return {
		BindToList: function(fenceList)
		{
			/** Initialize. */
			var htmlOutput = null;
			/** Loop through the fence items. */
			$.each(fenceList, function (index, item)
			{
				/** Initialize. */
				var htmlTemplate = (index % 2) === 0 ? _ROW_NORMAL : _ROW_ALTERN;
				var fenceType, center, coordinates;

				switch(item.GeoFenceTypeId)
				{
					case "POLY":
						fenceType = "Polygon";
						center = "Area";
						coordinates = $.validator.format("{0}&#92;{1}", item.MeanLattitude.toFixed(6) || "", item.MeanLongitude.toFixed(6) || "");
						break;
					case "CIR":
						fenceType = "Circle";
						center = "Radius: " + item.Radius.toFixed(2) + " meter";
						coordinates = $.validator.format("{0}&#92;{1}", item.CenterLattitude.toFixed(6) || "", item.CenterLongitude.toFixed(6) || "");
						break;
					case "PNT":
						fenceType = "Point";
						center = "Point: " + item.Radius;
						coordinates = $.validator.format("{0}&#92;{1}", item.PointLatitude.toFixed(6) || "", item.PointLongitude.toFixed(6) || "");
						break;
					case "RECT":
						fenceType = item.GeoFenceType;
						center = "Area: " + item.Area.toFixed(2) + " sq meter";
						coordinates = $.validator.format("{0}&#92;{1}", item.MeanLattitude.toFixed(6) || "", item.MeanLongitude.toFixed(6) || "");
						break;
				}

				htmlOutput += $.validator.format(htmlTemplate
					, item.GeoFenceID
					, fenceType
					, center
					, coordinates);
			});
			console.log("Here is the output: ", htmlOutput);
			$(_FENCE_TBODY_EL).html(htmlOutput);
			$("tr.trFenceItem", _FENCE_TBODY_EL).bind('click', function (e)
			{
				/** Show Event in console. */
				console.log("Fence Clicked.", e);

				/** Get the GeoFenceID. */
				var nGeoFenceID = $(e.currentTarget).attr("data-id").replace("gfid-", "");
				/** Remover Edit mode from all GeoObjects. */
				SOS.Gps.Maps.StopAllEdit();
				/** Pane map to center of the fence. */
				SOS.Gps.Maps.CurrentMap.panTo(SOS.Gps.Maps.FenceTable[nGeoFenceID].Centroid);
				switch(SOS.Gps.Maps.FenceTable[nGeoFenceID].Type)
				{
					case "POINT":
						break;
					case "POLYGON":
						/** Set the Fence to Edit mode. */
						SOS.Gps.Maps.FenceTable[nGeoFenceID].Geometry.runEdit(true);
						break;
					case "CIRCLE":
						SOS.Gps.Maps.CircleRunEdit(nGeoFenceID);
						break;
					case "RECTANGLE":
						SOS.Gps.Maps.FenceTable[nGeoFenceID].Geometry.setEditable(true);
						break;
				}
			});
		}
	};
	/**   END Member Functions. */
})();