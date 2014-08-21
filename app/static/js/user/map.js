(function(){
  'use strict';
  $(document).ready(function(){
    var arr = $('#waypoints').find('.coordinate');
    var waypoints = $.makeArray(arr);

    //Loops through all divs and grabs the lat and lng from the data attributes
    waypoints = waypoints.map(function(div){
       var lat  = $(div).attr('data-lat');
       var lng  = $(div).attr('data-lng');
       var name = $(div).text();
      return {lat: lat, lng: lng, name: name};
    });

    //Initialize map with first waypoint
    initMap(waypoints[0].lat, waypoints[1].lng, 2);

    //Data for Google Maps pins
    waypoints.forEach(function(a){
      addMarker(a.lat, a.lng, a.name);
    });

    var wp = waypoints.map(function(waypoint){
    	return new google.maps.LatLng(waypoint.lat, waypoint.lng);
    });

    var start = wp[0];
    var end   = wp[length];

    //console.log(wp); console.log(start); console.log(end);

  });




})();