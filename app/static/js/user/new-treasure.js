(function(){
  'use strict';
  $(document).ready(function(){
    var i = 1;
    $('#addHint').click(addHint);

  });

  function addHint(){
    var $input = "<input class='form-control' type='text' name='hints'/>";
    $('#hints').append($input);
  }

})();