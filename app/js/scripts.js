$(document).ready(function() {
  'use strict';

  var loadWebsiteWindow = function() {
    var responderURL = $('input#responder-url').val();
    $('.frame').each(function() {
      $(this).attr('src', responderURL);
      localStorage.setItem('urlItem', responderURL);
    });
  };

  // load
  if (localStorage.getItem('urlItem').length !== 0) {
    $('input#responder-url').val(localStorage.getItem('urlItem'));
    loadWebsiteWindow();
  }

  // click load button
  $('#button-load').click(function() {
    loadWebsiteWindow();
  });

  // hit enter key
  $(document).keyup(function(e) {
    if (e.keyCode === 13) {
      loadWebsiteWindow();
    }
  });

  $('.button-clear').click(function() {
    $('input#responder-url').val('');
    $('.frame').each(function() {
      $(this).attr('src', '');
    });
    localStorage.setItem('urlItem', '');
  });


  $('webview a').click(function() {
    console.log($(this).attr('href'));
    // var link = $(this).attr('href');
    // $('iframe').attr('src', link);
    // return false;
  });

});
