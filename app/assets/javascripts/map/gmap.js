$(window).load(function() {
  loadScript();
});

var map;

function initialize() {
       
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
  //default control constructed by inner css
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map);
  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
  // control constructed by outer css
  var controlDiv =$("#control-div");
  var controlUI = $("#control-ui");
  var controlText = $("#control-text");
  controlUI.click(function() {
    map.setZoom(11);
  });
  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv[0]);

}

function HomeControl(controlDiv, map) {
 controlDiv.style.padding = '5px';
  
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to zoom level 11';
  controlDiv.appendChild(controlUI);

  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Fullscreen</b>';
  controlUI.appendChild(controlText);
  google.maps.event.addDomListener(controlUI, 'click', function() {
    $("#map-canvas").toggleClass("fullscreen");
    google.maps.event.trigger(map , 'resize');
    controlText.innerHTML = $("#map-canvas").hasClass("fullscreen")? '<b>Normal Screen</b>':'<b>FullScreen</b>';
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
