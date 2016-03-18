function createGreMap(county) {

	//Create variables for tile layers. This makes use of extension methods in leaflet-providers.js
	//Eliminates the need to type in url of each tile layer.
	//See http://leaflet-extras.github.io/leaflet-providers/preview/ for different tile layers
	//Can be added to leaflet-providers.js file, follow outline of others

	var landMap = new L.TileLayer.ThunderForest(),
		openStreet = new L.TileLayer.OpenStreetMap(),
		stamenTerrain = new L.TileLayer.StamenTerrain(),
		stamenWaterColor = new L.TileLayer.StamenWaterColor(),
		mapQuestAerial = new L.TileLayer.MapQuestAerial(),
		mapQuestOsm = new L.TileLayer.MapQuestOpenOsm();

	//Place map in the div along with a base layer. The setview is the coordinates for North Carolina.
	//Reference website http://www.latlong.net/category/states-236-14.html for other state coordinates

	var map = L.map("map", { layers: [openStreet] }).setView([35.782169, -80.793457], 7);

	//Create baselayers to be used as a dropdown to change layer of map at runtime
	var baseLayers = {
		"Landscape": landMap,
		"Open Street Map": openStreet,
		"Stamen Terrain": stamenTerrain,
		"Stamen WaterColor": stamenWaterColor,
		"Map Quest Aerial": mapQuestAerial,
		"Map Quest Osm": mapQuestOsm
	};

	L.control.layers(baseLayers).addTo(map);

	//Puts control on map to find different locations.  Position can be changed to bottomright, text can be
	//any
	var osmGeocoder = new L.Control.OSMGeocoder({
		collapsed: true,
		position: "topright",
		text: "Find!"
	});
	map.addControl(osmGeocoder);

	//Adds layers to the map for popups to display county names and gre scores
	var defaultStyle = {
		color: "darkblue",
		weight: 2,
		opacity: 0.6,
		fillOpacity: 0.05,
		fillColor: "white"
	};

	function onEachFeature(feature, layer) {
		//Bind properties desired to popup
		//Only show counties that have GRE data

		//Modify .leaflet-popup-content-wrapper to change style of popup (i.e. font size, border)

		if (feature.properties.name && (feature.properties.GreVerbal || feature.properties.GreQuantitative || feature.properties.GreAnalyticalWriting)) {
			layer.bindPopup("<br>" + feature.properties.name + " County" + "<br/>" +
				"<br>" + "<b>" + "Gre Verbal : " + "<b>" + feature.properties.GreVerbal + "<br/>" +
				"<br>" + "<b>" + "Gre Quantitative : " + "<b>" + feature.properties.GreQuantitative + "<br/>" +
				"<br>" + "<b>" + "Gre Analytical Writing : " + "<b>" + feature.properties.GreAnalyticalWriting + "<br/>");
		} else
			layer.bindPopup(feature.properties.name + " County" + "<br/>" +
				"<br>" + "<b>" + "No GRE Scores Available" + "<b>" + "<br/");
	}

	L.geoJson(county, { onEachFeature: onEachFeature, style: defaultStyle }).addTo(map);
}


function createAdmitStatusMap(county) {
	//Create variables for tile layers. This makes use of extension methods in leaflet-providers.js
	//Eliminates the need to type in url of each tile layer.
	//See http://leaflet-extras.github.io/leaflet-providers/preview/ for different tile layers
	//Can be added to providers js file, follow outline of others

	var landMap = new L.TileLayer.ThunderForest(),
		openStreet = new L.TileLayer.OpenStreetMap(),
		stamenTerrain = new L.TileLayer.StamenTerrain(),
		stamenWaterColor = new L.TileLayer.StamenWaterColor(),
		mapQuestAerial = new L.TileLayer.MapQuestAerial(),
		mapQuestOsm = new L.TileLayer.MapQuestOpenOsm();

	//Place map in the div along with a base layer. The setview is the coordinates for North Carolina.
	//Reference website http://www.latlong.net/category/states-236-14.html for other state coordinates

	var map = L.map("map", { layers: [mapQuestOsm] }).setView([35.782169, -80.793457], 7);

	//Create baselayers to be used as a dropdown to change layer of map at runtime
	var baseLayers = {
		"Landscape": landMap,
		"Open Street Map": openStreet,
		"Stamen Terrain": stamenTerrain,
		"Stamen WaterColor": stamenWaterColor,
		"Map Quest Aerial": mapQuestAerial,
		"Map Quest Osm": mapQuestOsm
	};

	L.control.layers(baseLayers).addTo(map);

	//Puts control on map to find different locations.  Position can be changed to bottomright, text can be
	//any
	var osmGeocoder = new L.Control.OSMGeocoder({
		collapsed: true,
		position: "topright",
		text: "Find!"
	});
	map.addControl(osmGeocoder);

	//Adds layers to the map for popups to display county names and gre scores
	var defaultStyle = {
		color: "darkblue",
		weight: 2,
		opacity: 0.6,
		fillOpacity: 0.05,
		fillColor: "white"
	};

	function onEachFeature(feature, layer) {

		//Bind properties desired to popup
		//Only show counties that have GRE data
		if (feature.properties.name && (feature.properties.Admitted || feature.properties.NotAdmitted || feature.properties.Waitlist)) {
			layer.bindPopup("<br>" + feature.properties.name + " County" + "<br/>" +
				"<br>" + "<b>" + "Students Admitted : " + "<b>" + feature.properties.Admitted + "<br/>" +
				"<br>" + "<b>" + "Students Not Admitted : " + "<b>" + feature.properties.NotAdmitted + "<br/>" +
				"<br>" + "<b>" + "Student Waitlist : " + "<b>" + feature.properties.Waitlist + "<br/>");
		} else
			layer.bindPopup(feature.properties.name + " County" + "<br/>" +
				"<br>" + "<b>" + "No Data To Report" + "<b>" + "<br/");
	}

	L.geoJson(county, { onEachFeature: onEachFeature, style: defaultStyle }).addTo(map);
}