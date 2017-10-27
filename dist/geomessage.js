"use strict";
var GeoMessage = class {
  constructor() {
    this.geomessages = {};
    this.selection = {};
  }
  asGeoJSON() {
    var geoJSON = { type: "FeatureCollection", features: [] };
    for (var i in this.geomessages) {
      var feature = {};
      feature.properties = this.geomessages[i];
      switch (feature.properties._type) {
        case "bedavail":
          //todo
          break;
        case "chemlight":
          //todo
          break;
        case "eod":
          //todo
          break;
        case "gsrrep":
          //todo
          break;
        case "medevac":
          //todo
          break;
        case "position_report":
          var coords = feature.properties._control_points.split(",");
          feature.geometry = {
            type: "Point",
            coordinates: [Number(coords[0]), Number(coords[1])]
          };
          break;
        case "sensor_obs":
          //todo
          break;
        case "sitrep":
          //todo
          break;
        case "slantrep":
          //todo
          break;
        case "spotrep":
          //todo
          break;
      }
      if (feature.hasOwnProperty("geometry")) geoJSON.features.push(feature);
    }
    //console.log(geoJSON);
    return geoJSON;
  }
  read(xml) {
    var nodeName;

    if (typeof xml == "string") {
      xml = new DOMParser().parseFromString(xml, "text/xml");
    } else {
      return this;
    }

    var geomessages = xml.getElementsByTagName("geomessage");
    for (var message in geomessages) {
      nodeName = geomessages[message].nodeName;
      if (nodeName == "#text" || typeof nodeName === "undefined") continue;

      var _action = geomessages[message].getElementsByTagName("_action");
      _action = _action.length > 0 ? _action[0].textContent : "";
      var _id = geomessages[message].getElementsByTagName("_id");
      _id = _id.length > 0 ? _id[0].textContent : "";

      switch (_action.toLowerCase()) {
        case "remove":
          delete this.geomessages[_id];
          break;
        case "removeall":
          this.geomessages = {};
          break;
        case "select":
          //todo
          break;
        case "un-select":
          //todo
          break;
        case "update":
          var messageObj = {};
          for (var i in geomessages[message].childNodes) {
            nodeName = geomessages[message].childNodes[i].nodeName;
            if (nodeName == "#text" || typeof nodeName === "undefined")
              continue;
            messageObj[geomessages[message].childNodes[i].nodeName] =
              geomessages[message].childNodes[i].textContent;
          }
          if (!this.geomessages.hasOwnProperty(_id)) {
            this.geomessages[_id] = messageObj;
          } else {
            //TODO UPDATE
          }
          break;
      }
    }
    return this;
  }
};
