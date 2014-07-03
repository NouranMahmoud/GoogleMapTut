$(window).load(function() {
  loadScript();
});

var map;
var poly;
function initialize() {
        var markerCoords1 = new google.maps.LatLng(30.055487, 31.279766);
        var markerCoords2 = new google.maps.LatLng(30.543523, 31.656232);
       
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
       
        // drawing dynamic polyline
          var polyOptions = {
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          };
        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);
        google.maps.event.addListener(map, 'click', addLatLng);
        
        // drawing custom dynamic polyline ( with dashes/ symbols)
        // Define the symbol, using one of the predefined paths ('CIRCLE')
        // supplied by the Google Maps JavaScript API.
        var lineSymbol = {
          path: 'M 0,-1 0,1',
          scale: 4,
          strokeOpacity: 1,
          strokeColor: '#393'
        };
        // drawing static polyline
        var lineCoordinates = [
          new google.maps.LatLng(30.055487, 31.279766),
          new google.maps.LatLng(30.223356, 31.324345),
          new google.maps.LatLng(30.345656, 31.567677),
          new google.maps.LatLng(30.565678, 31.676887)
        ];
        createPolyline(map,lineCoordinates,lineSymbol);
        animateCircle();

         // drawing dynamic polyline
          var polyOptions = {
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            draggable:true,
            editable: true
          };
        polyg = new google.maps.Polyline(polyOptions);
        polyg.setMap(map);
        google.maps.event.addListener(map, 'click', addLatLng);

}


function animateCircle() {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = linePath.get('icons');
      icons[0].offset = (count / 2) + '%';
      linePath.set('icons', icons);
  }, 20);
}

function addLatLng(event){  
    var path = polyg.getPath();
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);
    
    console.log(path);
}
var linePath;
function createPolyline(map,lineCoordinates,lineSymbol){
    linePath = new google.maps.Polyline({
    path: lineCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    editable: true,
     icons: [{ // this Array is for adding symbols to the line
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }]
  });
   linePath.setMap(map);
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