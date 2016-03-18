function medianGreCounty(medGreJson) {

	//Have to parse the data retrieved from C# method
	var medianGreJson = JSON.parse(medGreJson);


	//Extension method to merge json file with geoJson file counties.js//Have to specify the common
	//attribute name which can be created in the TO_GRE properties;  If one does not exist in the file you
	//want to merge with, can create it in the TO class and DAO class.
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

	//First parameter is the file with the feature collection.  The counties.js file contains a variable name for all
	//of the feature collections.  This makes the data easier to handle
	//The second parameter is the file you want to merge into the feature collection.
	//The third parameter is the var created to identify the datakey used to merge the file by

	extendGeoJSON(county, medianGreJson, joinMap);

	//Call function to create map with merged records
	createGreMap(county);
}