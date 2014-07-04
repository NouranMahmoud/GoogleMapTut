$(window).load(function() {
  loadScript();
});

var map;
var poly;
function initialize() {

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
