function avgGreCounty(avgGreJson) {
	var averageGreJson = JSON.parse(avgGreJson);

	var joinMap = {
		geoKey: "properties.name",
		dataKey: "Name",
		propertyMap: [
			{
				geoProperty: "GreVerbal",
				dataProperty: "GreVerbal"
			},
			{
				geoProperty: "GreQuantitative",
				dataProperty: "GreQuantitative"

			},
			{
				geoProperty: "GreAnalyticalWriting",
				dataProperty: "GreAnalyticalWriting"
			}
		]
	};
	extendGeoJSON(county, averageGreJson, joinMap);
	createGreMap(county);
}