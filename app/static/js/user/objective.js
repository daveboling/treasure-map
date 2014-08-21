(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    //Grab coordinates from HTML
    var lat = $('#coordinates').attr('data-lat'), 
        lng = $('#coordinates').attr('data-lng');
    initMap(lat, lng, 9); //Initialize map
  });

})();
