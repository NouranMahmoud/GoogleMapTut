$(window).load(function() {
  loadScript();
});

var map;
var poly;
function initialize() {
        
        var directionsService = new google.maps.DirectionsService(); 
        var directionsDisplay = new google.maps.DirectionsRenderer(); 
  
  var mapOptions = {
          center: new google.maps.LatLng(30.055487, 31.279766),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.NORMAL,
          panControl: true,
          scaleControl: false,
          streetViewControl: true,
          overviewMapControl: true
        };
        // initializing map
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
        directionsDisplay.setMap(map);
        var request =
                {
                        origin: "Mansoura, Daqahlia, Egypt",
                        destination: "Cairo, Egypt",
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
        directionsService.route(request, function(response, status)
            {
                 if (status == google.maps.DirectionsStatus.OK) //Check if request is successful.
                    {
                      console.log(status);
                      directionsDisplay.setDirections(response); //Display the directions result
                    }
            });
}
function loadScript() {
	console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  //'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o&sensor=false&libraries=drawing'
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    //'&v=3.14'+
    //'&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o'+
    '&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);
}
