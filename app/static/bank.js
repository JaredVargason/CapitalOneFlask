function initialize() {
	var data = [{
    "title": "Stockholm",
    "lat": 59.3,
    "lng": 18.1,
    "description": "Stockholm is the capital and the largest city of Sweden and constitutes the most populated urban area in Scandinavia with a population of 2.1 million in the metropolitan area (2010)"
  },
  {
    "title": "Oslo",
    "lat": 59.9,
    "lng": 10.8,
    "description": "Oslo is a municipality, and the capital and most populous city of Norway with a metropolitan population of 1,442,318 (as of 2010)."
  },
  {
    "title": "Copenhagen",
    "lat": 55.7,
    "lng": 12.6,
    "description": "Copenhagen is the capital of Denmark and its most populous city, with a metropolitan population of 1,931,467 (as of 1 January 2012)."
  }];

    var mapCanvas = document.getElementById('map');

	var mapOptions = {
		center: new google.maps.LatLng(44.5403, -78.5463),
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

    var map = new google.maps.Map(mapCanvas, mapOptions);
    console.log("made it here");

    var myLatLng = {lat: 45.363, lng: -72.044};
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: {lat: 42.714, lng: -75.000},
      radius: 10000
    });
};

console.log("happened");
google.maps.event.addDomListener(window, 'load', initialize);
console.log("done");