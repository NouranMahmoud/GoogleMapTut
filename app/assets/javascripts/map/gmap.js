$(window).load(function() {
  loadScript();
});

var map;
var poly;
function initialize() {
        var markerCoords1 = new google.maps.LatLng(30.055487, 31.279766);
        var markerCoords2 = new google.maps.LatLng(30.543523, 31.656232);
        var directionsService = new google.maps.DirectionsService(); 
        var directionsDisplay = new google.maps.DirectionsRenderer(); 
  
  var mapstyle = [
                    {
                      "featureType": "administrative.locality",
                      "elementType": "labels.icon",
                      "stylers": [
                        { "invert_lightness": true },
                        { "color": "#e40952" },
                        { "visibility": "on" }
                      ]
                    },{
                      "featureType": "water",
                      "elementType": "geometry.fill",
                      "stylers": [
                        { "visibility": "on" },
                        { "hue": "#5eff00" },
                        { "color": "#282744" },
                        { "weight": 0.1 },
                        { "saturation": -56 },
                        { "lightness": 22 },
                        { "gamma": 3.91 }
                      ]
                    }
                  ]
  var styledMap = new google.maps.StyledMapType(mapstyle,{name: "styled map"});
  var mapOptions = {
          center: new google.maps.LatLng(30.055487, 31.279766),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.NORMAL,
          panControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_CENTER
          },
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
          },
          scaleControl: false,
          streetViewControl: true,
          overviewMapControl: true
        };
        // initializing map
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
        map.mapTypes.set("map_style",styledMap);
        map.setMapTypeId("map_style");
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

        // drawing static polyline
        var lineCoordinates = [
          new google.maps.LatLng(30.055487, 31.279766),
          new google.maps.LatLng(30.223356, 31.324345),
          new google.maps.LatLng(30.345656, 31.567677),
          new google.maps.LatLng(30.565678, 31.676887)
        ];
        createPolyline(map,lineCoordinates);


        // drawing dynamic polyline
          var polyOptions = {
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          };
        //poly = new google.maps.Polyline(polyOptions);
        //poly.setMap(map);
        //google.maps.event.addListener(map, 'click', addLatLng);
        
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

    // drawing polygon 
    var polygonCoords = [
    new google.maps.LatLng(30.055487, 31.279766),
    new google.maps.LatLng(30.466465, 31.118292),
    new google.maps.LatLng(30.321384, 31.75737),
    ];
    // Construct the polygon.
    drawingPolygon(polygonCoords);
    //google.maps.event.addListener(map, 'click', addLatLng);
    
         // drawing dynamic polyline
          var polyOptions = {
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            draggable:true,
            editable: true
          };
        polyg = new google.maps.Polygon(polyOptions);
        polyg.setMap(map);
        google.maps.event.addListener(map, 'click', addLatLng);
      // geocoding 
      var geocoding  = new google.maps.Geocoder();
      $("#submit_button_geocoding").click(function(){
        codeAddress(geocoding);
      });
      $("#submit_button_reverse").click(function(){
        codeLatLng(geocoding);
      });
      
      // trying the drawing liberary
     var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        //google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    markerOptions: {
      icon: "/assets/icon.png"
    }
  });
  drawingManager.setMap(map);
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map);
  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

  var controlDiv =$("#control-div");
  var controlUI = $("#control-ui");
  var controlText = $("#control-text");
  controlUI.click(function() {
    map.setZoom(11);
  });
  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv[0]);

}

function HomeControl(controlDiv, map, home) {
 controlDiv.style.padding = '5px';
  
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to fullscreen';
  controlDiv.appendChild(controlUI);

  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Full Screen</b>';
  controlUI.appendChild(controlText);
  google.maps.event.addDomListener(controlUI, 'click', function() {
    $("#map_canvas").toggleClass("fullscreen");
    google.maps.event.trigger(map , 'resize');
    console.log("btn clicked");
    controlText.innerHTML = $("#map_canvas").hasClass("fullscreen")? '<b>Normal Screen</b>':'<b>Full Screen</b>';
  });
}

var info;
function codeLatLng(geocoding){

  var input = $('#search_box_reverse').val();
  console.log(input);
  
  var latlngbounds = new google.maps.LatLngBounds();
  var listener;
  var regex = /([1-9])+\.([1-9])+\,([1-9])+\.([1-9])+/g;
  if(regex.test(input)) {
  var latLngStr = input.split(",",2);
  var lat = parseFloat(latLngStr[0]);
  var lng = parseFloat(latLngStr[1]);
  var latLng = new google.maps.LatLng(lat, lng);
  geocoding.geocode({'latLng': latLng}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK){
       if(results.length > 0){
         //map.setZoom(11);
         var marker;
         map.setCenter(results[1].geometry.location);
         var i;
        info = createInfoWindow("");
         for(i in results){
           latlngbounds.extend(results[i].geometry.location);
             marker = new google.maps.Marker({
             map: map,
             position: results[i].geometry.location
           });
          
          google.maps.event.addListener(marker, 'click', (function(marker,i) {
            return function() {
            info.setContent(results[i].formatted_address);
            info.open(map,marker);
            }
          })(marker,i));
        }

         map.fitBounds(latlngbounds);
         listener = google.maps.event.addListener(map, "idle", function() {
          if (map.getZoom() > 16) map.setZoom(16);
            google.maps.event.removeListener(listener);
          });
       }
     }
    else{
       alert("Geocoder failed due to: " + status);
     }  
  });
  }else{
    alert("Wrong lat,lng format!");
  }
}
function codeAddress(geocoding){
  var address = $("#search_box_geocoding").val();
  if(address.length > 0){
    geocoding.geocode({'address': address},function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        map.setCenter(results[0].geometry.location);
        var marker  =  new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        }else{
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }else{
    alert("Search field can't be blank");
  }
}
function drawingPolygon(polygonCoords){
    var polygone = new google.maps.Polygon({
    paths: polygonCoords,
    strokeColor: '#FF00FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    draggable:true,
    editable: true
  });
  polygone.setMap(map);
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
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    //'&v=3.14'+
    //'&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o'+
    '&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);
}