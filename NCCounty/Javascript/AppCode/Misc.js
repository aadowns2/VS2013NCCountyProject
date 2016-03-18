//Use this function in place of extension for merge

////Have to parse the GeoJson file returned from C# method
//var greData = JSON.parse(results);

//// Loop through counties JSON file
//for (var x = 0; x < county.features.length; x++) {

//	// Loop through GRE JSON file created from C# method
//	for (var y = 0; y < greData.length; y++) {

//		// Match files based on property
//		if (county.features[x].properties["name"] === greData[y]["name"]) {

//			// Fields we want to merge from JSON file into GeoJSON file
//			var TO_Gre = ['GreVerbal', 'GreQuantitative', 'GreAnalyticalWriting'];

//			// Loop through fields
//			for (var z = 0; z < TO_Gre.length; z++) {
//				// Add to GeoJSON file
//				county.features[x].properties[TO_Gre[z]] = greData[y][TO_Gre[z]];
//			}
//		}
//	}
//}

//Use this to loop through all properties
//and show all properites of new county file on popup

//if (feature.properties) {
//	var popupString = '<div class="popup">';
//	for (var k in feature.properties) {
//		if (feature.properties.hasOwnProperty(k)) {
//			var v = feature.properties[k];
//			popupString += k + ': ' + v + '<br />';
//		}
//	}
//	popupString += '</div>';
//	layer.bindPopup(popupString);
//}

//This C# code calls javascript function first which in turns calls C# method mapRequest()
//Depending on situation, may want to do all processing server side and then send data to javascript
//
//ScriptManager.RegisterStartupScript(this, GetType(), "myFunction", "createJson();", true);

//Call C# method to get data from school database and create json file
//function createJson() {

//	Uncomment to use ajax request for C# method to retrieve data
//	This is used when the javascript calls the C# method.  You can either have
//	javascript call the C# method or have C# send data to javascript function
//	$.ajax({
//		type: "post",
//		url: "WebForm1.aspx/mapRequest",
//		contentType: "application/json",
//		dataType: "json",
//		updateCounty: function(greJson) {
//			success(greJson.d);
//		},
//		error: function() {
//			error();
//		}
//	});

//	//Another way to call C# method to retrieve list -- see webform1.aspx and DA_GRE
//	//PageMethods.mapRequest(success, error);
//}


//Random color generator
//randomColor options:  count:, hue, luminosity
//see https://github.com/davidmerfield/randomColor

//var c = 'blue';

//var o1 = randomColor({ count: 4, hue: c });
//console.log(o1);
//var o2 = randomColor({ count: 4, hue: c });
//var o3 = randomColor({ count: 4, hue: c });
//var o4 = randomColor({ count: 4, hue: c });
//var o5 = randomColor({ count: 4, hue: c });
//var o6 = randomColor({ count: 4, hue: c });
//var o7 = randomColor({ count: 4, hue: c });


////Create color styles to use on map display
//function getColor(d) {
//	return d > 401 ? o7[1] :
//		d > 201 ? o6[2] :
//		d > 101 ? o5[3] :
//		d > 51 ? o4[4] :
//		d > 31 ? o3[4] :
//		d > 11 ? o2[4] : o1[4];

//}

//function rand(min, max) {
//	return parseInt(Math.random() * (max - min + 1), 7) + min;
//}

//function color() {
//	var h = rand(180, 250);
//	var s = rand(30, 100);
//	var l = rand(20, 70);
//	return 'hsl(' + h + ',' + s + '%,' + l + '%)';
//}

//function style(feature) {
//	return {
//		fillColor: getColor(feature.properties.Admitted),
//		fillOpacity: 1.5,
//		weight: 1,
//		opacity: 1.5,
//		color: 'black',
//		dashArray: '3 '
//	};
//}


//(function(layer, properties) {
//	var y = properties;
//	if (!y.Admitted) {
//		y.Admitted = 'No Data To Report';
//	}
//	console.log(y);

//	layer.on('mouseover', function() {
//		var popup = $('<div></div>', {
//			id: 'popup',
//			css: {
//				position: 'absolute',
//				top: '10px',
//				right: '10px',
//				width: '350',
//				height: 'auto',
//				zIndex: 1002,
//				backgroundColor: 'lightblue',
//				padding: '8px',
//				border: "2px solid #444444"
//			}
//		});

//		$('<div></div>', {

//			css: {fontSize: "20px"},
//			html:	'<div>' + '<img style: "center" src=CSS/Images/logo.jpg>' + '</div>' +
//					'<div>' + y.name + ' County' + '</div>' +
//					'<div>' + 'Students Admitted: ' + y.Admitted  + '</div>'
//		}).appendTo(popup);
//		popup.appendTo("#map");

//		layer.on("mouseout", function() {
//			$("#popup").remove();
//		});
//	});
//})(layer, feature.properties);