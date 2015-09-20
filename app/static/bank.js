function initialize() {
    var mapCanvas = document.getElementById('map');

    var mapOptions = {
    center: new google.maps.LatLng(39.0403, -76.5463),
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

    map = new google.maps.Map(mapCanvas, mapOptions);

    yes();
};

var map = null;
var markers = [];

google.maps.event.addDomListener(window, 'load', initialize);

function yes() {
  //Send the AJAX call to the server
  $.ajax({
  //The URL to process the request
    'url' : 'http://localhost:5000/get_branches',
  //The type of request, also known as the "method" in HTML forms
  //Can be 'GET' or 'POST'
    'type' : 'GET',
    'datatype' : 'text/xml',
  //The response from the server
    'success' : function(data) {
    //You can use any jQuery/JavaScript here!!!
      swag = JSON.parse(data);

      swag.forEach(function(o) {
        
                 /*if (typeof data.geocode === undefined || typeof data.geocode.lat === undefined || typeof data.gecode.lng === undefined) {
            return;}*/

            if (o.geocode.lat && o.geocode.lng) {
                var circle = new google.maps.Circle({
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#FF0000',
                  fillOpacity: 0.35,
                  map: map,
                  center: {lat: o.geocode.lat, lng: o.geocode.lng},
                  radius: Math.sqrt(Math.random() * 10000000 + 1000000 )
                });
              /*markers.push(new google.maps.Marker({
                position: {lat: o.geocode.lat, lng: o.geocode.lng},
                map: map,
                title: o._id
              }))*/}

      });
    }
  });
}