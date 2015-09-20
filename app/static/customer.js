function initialize() {
    var mapCanvas = document.getElementById('map');

    var mapOptions = {
    center: new google.maps.LatLng(44.5403, -78.5463),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

    map = new google.maps.Map(mapCanvas, mapOptions);

  //yes();
};

var map = null;
var markers = [];

google.maps.event.addDomListener(window, 'load', initialize);

function yes() {
  console.log('ok')
  payload = {'account_id' : $('#superid').val()}

  //Send the AJAX call to the server
  $.ajax({
  //The URL to process the request
    'url' : 'http://localhost:5000/get_user_purchase_info',
  //The type of request, also known as the "method" in HTML forms
  //Can be 'GET' or 'POST'
    'type' : 'POST',
    'data' : payload,
    'datatype' : 'application/json',
  //The response from the server
    'success' : function(data) {console.log(data);
    //You can use any jQuery/JavaScript here!!!
      if (data.length <= 0) {
          console.log("false");
          return false;
      }
      swag = JSON.parse(data);
      swag.forEach(function(o) {
        
            contentString='<h1>' + o.name + '</h1>'

            if (o.lat && o.lng) {
                var infowindow = new google.maps.InfoWindow({
               content: contentString
                });

                marker = new google.maps.Marker({
                position: {lat: o.lat, lng: o.lng},
                map: map,
                title: o._id
              })

                marker.addListener('click', function() {
                infowindow.open(map, marker);
                });
              }
      });
    }
  });
}