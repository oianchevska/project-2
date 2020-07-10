console.log("map")

// Creating map object
var myMap = L.map("map", {
  center: [40.7, -103.95],
  zoom: 2
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Grab the data with d3
d3.json("http://127.0.0.1:5000/pets", function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

     console.log(response.pets)

  // Loop through data
  for (var i = 0; i < response.pets.length; i++) {

    // Set the data location property to a variable
    var location = response.pets[i];

    // console.log(location)


    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([ location.lat, location.lng ])
        .bindPopup("Type: "+location.type+"<br><br>"+"Breeds: "+ location.breeds+"<br><br>"+"Age: "+location.age+"<br><br>"+"Gender: "+location.gender));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

console.log("test")
