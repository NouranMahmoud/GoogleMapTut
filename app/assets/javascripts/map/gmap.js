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
          mapTypeId: google.maps.MapTypeId.NORMAL
        };
        // initializing map
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
        
        // simple marker
        var marker = createMarker(markerCoords1, map, "Hi");
        
        // custom marker
        var customMarker = createCustomMarker(markerCoords2, map, "Hi");

        // add infowindow when clicking on the simple marker marker
        var info = createInfoWindow("Congratulation!");
        google.maps.event.addListener(marker, 'click', function() {
          info.open(map,marker);
        });

        // drawing points
        /*google.maps.event.addListener(map, 'click', function(e){
          createMarker(getCurrentPosition(e), map, "Hello World!");
        });*/


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
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
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

   }
function animateCircle() {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 20);
}

function addLatLng(event){  
    var path = poly.getPath();
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);
}
function createPolyline(map,lineCoordinates,lineSymbol){
   var linePath = new google.maps.Polyline({
    path: lineCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
     icons: [{
      icon: lineSymbol,
      offset: '100%'
    }]
  });
   linePath.setMap(map);
}

function createInfoWindow(text){
  var infowindow = new google.maps.InfoWindow({
    content: text
  });
  return infowindow;
}

function getCurrentPosition(e){
  var markercoords = new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());
  return markercoords;
}

var marker;
function createMarker(coords, map, title){
    marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    draggable: true,
    animation: google.maps.Animation.DROP
  });
    return marker;
}
function createCustomMarker(coords,map,title){
    marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    icon: createImage("/assets/icon.png"),
    draggable: true,
    animation: google.maps.Animation.DROP
  }); 
    return marker;
}

function createImage(url){
    var image = {
    url: url,
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  return image;
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