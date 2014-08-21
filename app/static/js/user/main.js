/* global google */
/* exported initMap, addMarker, getPositions */

/* Global Functions 
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

 'use strict';
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initMap(lat, lng, zoom){
   	var styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}],
   	mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
           map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({
    	map: map,
    	position: latLng,
    	title: name,
    	animation: google.maps.Animation.DROP
    });
  }

  function getPositions(){

    /* Grabs everything under .vacations and turns positions into an actual javascript array with toArray(). 
    Then use Array.map to loop through each index and create an object called pos. 
    Each loop through overwrites each array index and replaces it with the pos object.
    */
    var positions = $('.vacation').toArray().map(function(tr){
        var name = $(tr).attr('data-name'),
             lat = $(tr).attr('data-lat'),
             lng = $(tr).attr('data-lng'),
             pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
        return pos;
    });

    //Return newly transformed array to whatever called it
    return positions;
  }