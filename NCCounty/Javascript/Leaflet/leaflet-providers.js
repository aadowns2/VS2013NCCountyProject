// Lefalet shortcuts for common tile providers

L.TileLayer.Common = L.TileLayer.extend({
    initialize: function (options) {
        L.TileLayer.prototype.initialize.call(this, this.url, options);
    }
});

(function () {

  L.TileLayer.CloudMade = L.TileLayer.Common.extend({
        url: "http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png"
    });

    L.TileLayer.ThunderForest = L.TileLayer.Common.extend({
        url: "http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png"
    });

    L.TileLayer.StamenTerrain = L.TileLayer.Common.extend({
        url: "http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png"
    });

    L.TileLayer.StamenWaterColor = L.TileLayer.Common.extend({
        url: "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
    });

    L.TileLayer.OpenStreetMap = L.TileLayer.Common.extend({
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    });

    L.TileLayer.MapBox = L.TileLayer.Common.extend({
        url: "http://{s}.tiles.mapbox.com/v3/{user}.{map}/{z}/{x}/{y}.png"
    });

    L.TileLayer.MapQuestAerial = L.TileLayer.Common.extend({
        url: "http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}",
        options: {
            type: "sat",
            ext: "jpg",
            subdomains: "1234"
        }});

    L.TileLayer.MapQuestOpenOsm = L.TileLayer.Common.extend({
        url: "http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}",
        options: {
            type: "map",
            ext: "jpg",
            subdomains: "1234"
        }});

}());