/* global google */
/* jshint camelcase:false */

(function(){
  'use strict';
  $(document).ready(function(){
    $('#addHint').click(addHint);
    $('form').submit(addLocation);

  });

  function addHint(){
    var $input = "<input class='form-control' type='text' name='hints'/>";
    $('#hints').append($input);
  }

  function addLocation(e){
    var lat = $('#lat').val();

    if(!lat){ //If lat is empty, then let's change that fact
      var name = $('#name').val();
      geocode(name); //Google automatically returns a lat and lng from this based on the location name.
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results, status){
      var name = results[0].formatted_address,
          lat = results[0].geometry.location.lat(),
          lng = results[0].geometry.location.lng();

      //Update the form before submitting so database can get these saved too
      $('#name').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);

      //Submit the form
      $('form').submit();
    });
  }



})();