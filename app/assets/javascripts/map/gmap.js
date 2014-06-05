$(window).load(function() {
  loadScript();
});

var map;
var poly;
function initialize() {

        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.NORMAL
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
        console.log("I'm in");
   }

function loadScript() {
	console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  //'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o&sensor=false&libraries=drawing'
  script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false' +
    //'&v=3.14'+
    //'&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o'+
    //'&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);
}