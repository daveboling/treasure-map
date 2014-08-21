/* global google:true, map:true, directionsDisplay:true, directionsService:true */

(function(){
'use strict';
var directionsDisplay, //Needed for Waypoints API
directionsService = new google.maps.DirectionsService(); //Needed for Waypoints API

  $(document).ready(function(){
    var arr = $('#waypoints').find('.coordinate'),
    waypoints = $.makeArray(arr);

    //Loops through all divs and grabs the lat and lng from the data attributes
    waypoints = waypoints.map(function(div){
      var lat  = $(div).attr('data-lat'),
      lng  = $(div).attr('data-lng');
      return {location: new google.maps.LatLng(lat, lng)};
    });

    initialize(waypoints);

  });

  function initialize(wps){
    var styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}],
      options = {
        zoom: 2,
        center: wps[0].location,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
      };

    //Set map equal to google.maps.Map, give it an ID to attach to and some options to see it up with
    map = new google.maps.Map(document.getElementById('map'), options);

    //Render options specific to directionsDisplay. E.G. the lines on the map
    var rendererOptions = {map: map, markerOptions: {icon: 'img/trea.png'}};
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    //Format the request to directions service
    var request = {
      origin: wps[0].location,
      destination: wps[wps.length - 1].location,
      waypoints: wps,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    //Sends our request to directionsService where it will tell us if we're crazy or not
	directionsService.route(request, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
				else {
				console.log(status);
				console.log(response);
      }
			});
}


  })();
