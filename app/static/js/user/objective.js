/* global google*/
(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    //Grab coordinates from HTML
    var lat = $('#coordinates').attr('data-lat'), 
        lng = $('#coordinates').attr('data-lng');
    initMap(lat, lng, 9);
  });


function initMap(lat, lng, zoom){
    var styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}],
    mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
           map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

})();
