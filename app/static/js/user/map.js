(function(){
  'use strict';
  $(document).ready(function(){
    var arr = $('#waypoints').find('.coordinate');
    var waypoints = $.makeArray(arr);

    //Loops through all divs and grabs the lat and lng from the data attributes
    waypoints.map(function(div){
       var lat = $(div).attr('data-lat');
       var lng = $(div).attr('data-lng');
      return {lat: lat, lng: lng};
    });

  });

})();