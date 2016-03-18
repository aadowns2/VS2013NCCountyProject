function createChoroplethAdmitStatus(county) {

	//To Change the layer background to different color
	//Change .leaflet-container {background: color ;} in leaflet.css

	var map = L.map("map").setView([35.782169, -80.793457], 7);

	//Change color to whatever is available in choroplethcolors.js
	//[#] represents the number of color schemes
	//database of color from www.colorbrewer2.org
	//download as javascript file, assign variable name
	//See choroplethcolors.js

	var x = colorbrewer.PuBu["7"];

	//if don't assign to var then usage is colorbrewer.Reds["7"][1]

	function getColor(d) {
		return d > 301 ? x[6] :
			   d > 101 ? x[5] :
			   d > 71 ? x[4] :
			   d > 31 ? x[3] :
			   d > 11 ? x[2] :
			   d > 6 ? x[1] :
				x[0];
	}


    //Create popup box to display information from county parameter
	var informationbox = L.control({
		position: 'bottomleft'
	});
	informationbox.onAdd = function (e) {
		this._div = L.DomUtil.create('div', 'info');
		this.refresh();
		return this._div;
	};
	informationbox.refresh = function (properties) {
		this._div.innerHTML = '<h4>Western Carolina Admittance Status</h4>';
		if (properties !== void 0) {
			this._div.innerHTML +=
				'<img src="CSS/Images/logo.jpg"></img>' +
				'<b>' + properties.name + ' County' + '</b>' +
                
                //The properties.**** has to be the same as what is in the TO_Admits file.
                //Other properties can be added as needed such as properties.Waitlist, properties.NoAction
                //Make sure when adding these properties to the below code, you also add a layer similar to existing layers only change the variable names accordingly

				'<br/>' + 'Admitted: ' + properties.Admitted +
				'<br/>' + 'Not Admitted: ' + properties.NotAdmitted +
				'<br/>' + 'Rejected: ' + properties.Rejected +
                '<br/>' + '<b>Click to zoom.</b>';
		} else {
			this._div.innerHTML += '<b>Hover a county.</b>';
		}
	};
	informationbox.addTo(map);

	var admittancelayer = L.geoJson(county, {
		style: function (feature) {
			return {
				fillColor: getColor(feature.properties.Admitted),
				fillOpacity: 0.75,
				weight: 1,
				color: 'black'
			};
		},
		onEachFeature: function (feature, layer) {
			layer.on({
				'mousemove': function (e) {
					e.target.setStyle({
						weight: 4
					});
					informationbox.refresh(feature.properties);
				},
				'mouseout': function (e) {
					admittancelayer.resetStyle(e.target);
					informationbox.refresh();
				},
				'click': function (e) {
					map.fitBounds(e.target.getBounds());
				}
			});
		}
	}).addTo(map);

	var noadmittancelayer = L.geoJson(county, {
		style: function (feature) {
			return {
				fillColor: getColor(feature.properties.NotAdmitted),
				fillOpacity: 0.75,
				weight: 1,
				color: 'black'
			};
		},
		onEachFeature: function (feature, layer) {
			layer.on({
				'mousemove': function (e) {
					e.target.setStyle({
						weight: 4
					});
					informationbox.refresh(feature.properties);
				},
				'mouseout': function (e) {
					noadmittancelayer.resetStyle(e.target);
					informationbox.refresh();
				},
				'click': function (e) {
					map.fitBounds(e.target.getBounds());
				}
			});
		}
	}).addTo(map);

	var rejectedlayer = L.geoJson(county, {
		style: function (feature) {
			return {
				fillColor: getColor(feature.properties.Rejected),
				fillOpacity: 0.75,
				weight: 1,
				color: 'black'
			};
		},
		onEachFeature: function (feature, layer) {
			layer.on({
				'mousemove': function (e) {
					e.target.setStyle({
						weight: 4
					});
					informationbox.refresh(feature.properties);
				},
				'mouseout': function (e) {
					rejectedlayer.resetStyle(e.target);
					informationbox.refresh();
				},
				'click': function (e) {
					map.fitBounds(e.target.getBounds());
				}
			});
		}
	}).addTo(map);

	//Add ability to change maps with radio button

	L.control.layers({
		'Admitted': admittancelayer,
		'Not Admitted': noadmittancelayer,
		'Rejected': rejectedlayer
	}).addTo(map);


	//Add legend for each map
	var legend = L.control({ position: 'bottomright' });

	legend.onAdd = function () {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 6, 11, 31, 71, 101, 301],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);
}