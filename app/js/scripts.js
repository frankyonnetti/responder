$( document ).ready(function() {
  'use strict';

  // load
  if (localStorage.getItem('urlItem').length !== 0) {
    $('input.responder-url').val(localStorage.getItem('urlItem'));
    var responderURL = $('input.responder-url').val();
    $('.frame').each(function() {
      $(this).attr('src', responderURL);
      localStorage.setItem('urlItem', responderURL);
    });
  }



  $('.button-load').click(function() {

    var responderURL = $('input.responder-url').val();

    $('.frame').each(function() {
      $(this).attr('src', responderURL);
    });
    localStorage.setItem('urlItem', responderURL);

  });


  $('.button-clear').click(function() {
    $('input.responder-url').val('');
    $('.frame').each(function() {
      $(this).attr('src', '');
    });
    localStorage.setItem('urlItem', '');
  });

});
