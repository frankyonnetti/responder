$(document).ready(function() {
  'use strict';

  // Utility function. Causes the callback to only fire after a delay. If the
  // callback is called before the delay it waits. Useful for rapidly firing callbacks
  // like window.resize
  // -------------------------------------------------------------------
  var response_change = {};
  response_change.waitForIdle = function(fn, delay) {
    var timer = null;
    return function () {
      var context = this,
          args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };

  // Get the viewport width & height right away and use through out document.
  // -------------------------------------------------------------------
  var viewport_width = $(window).width();
  var viewport_height = $(window).height();
  $(window).resize(response_change.waitForIdle(function() {
    viewport_width = $(window).width();
    viewport_height = $(window).height();
  }, 100));


  // Set window height
  var mainHeight = function() {
    var sumDeviceWidth = 0;
    $('.device-window').each(function() {
      sumDeviceWidth += Number($(this).outerWidth(true));
    });

  $('main').css({'height': viewport_height + 'px'});
  $('main .main-container').css({'min-width': (sumDeviceWidth + 40) + 'px'});
  $('header').css({'min-height': viewport_height + 'px'});
  };
  mainHeight();


  $(window).resize(response_change.waitForIdle(function() {
    mainHeight();
  }, 200));



  // --------------------------------------------------------------------

  var responderURLfield = 'input#responder-url';

  var loadWebsiteWindow = function() {

    var responderURL = $(responderURLfield).val();

    var responderURL_1 = localStorage.getItem('urlItem_1');
    var responderURL_2 = localStorage.getItem('urlItem_2');
    var responderURL_3 = localStorage.getItem('urlItem_3');


    if (responderURL !== null && responderURL_1 !== responderURL) {
      if (responderURL.indexOf('http') === 0) {
        localStorage.setItem('urlItem_1', responderURL);
      }
    }
    if (responderURL_1 !== null && responderURL_1 !== responderURL) {
      if (responderURL_1.indexOf('http') === 0) {
        localStorage.setItem('urlItem_2', responderURL_1);
      }
    }
    if (responderURL_2 !== null && responderURL_1 !== responderURL) {
      if (responderURL_2.indexOf('http') === 0) {
        localStorage.setItem('urlItem_3', responderURL_2);
      }
    }

    $('header ul ul#url-submission li').remove();

    if (responderURL_1 !== null) {
      $('header ul ul#url-submission').append('<li>' + responderURL_1 + '</li>');
    }
    if (responderURL_2 !== null) {
      $('header ul ul#url-submission').append('<li>' + responderURL_2 + '</li>');
    }
    if (responderURL_3 !== null) {
      $('header ul ul#url-submission').append('<li>' + responderURL_3 + '</li>');
    }

    // Check if URL field has content, and if so,
    // use it for each webview.
    $('.frame').each(function() {
      if (responderURL.indexOf('http') === 0) {
        $(this).attr('src', responderURL);
        localStorage.setItem('urlItem', responderURL);
      }
    });

  };

  // click from list
  $('header ul ul#url-submission').on('click', 'li', function() {
    var responderURLval = $(this).html();
    $('.frame').each(function() {
      $(this).attr('src', responderURLval);
    });
  });



  // load
  if (localStorage.getItem('urlItem') !== null &&
      localStorage.getItem('urlItem').indexOf('http') === 0) {
    $(responderURLfield).val(localStorage.getItem('urlItem'));
    loadWebsiteWindow();
  } else {
    $(responderURLfield).css('text-indent', '-1000000px');
    $('.frame').each(function() {
      $(this).attr('src', 'empty.html');
    });
    setTimeout(function() {
      $(responderURLfield).val('').css('text-indent', '0');
    }, 300);
  }

  // $(responderURLfield).on('click', function() {
  //   $(this).select();
  // });

  // click re-load button
  // $('#button-load').on('click', function() {
  //   $(responderURLfield).val(localStorage.getItem('urlItem'));
  //   // $(responderURLfield).blur();
  //   loadWebsiteWindow();
  // });

  // hit enter key
  $(document).keyup(function(e) {
    if (e.keyCode === 13) {
      $(responderURLfield).blur();
      loadWebsiteWindow();
    }
  });

  // $('.button-clear').click(function() {
  //   $(responderURLfield).val('');
  //   $('.frame').each(function() {
  //     $(this).attr('src', 'empty.html');
  //   });
  //   localStorage.setItem('urlItem', 'empty.html');
  // });






  $('webview a').click(function() {
    console.log($(this).attr('href'));
    // var link = $(this).attr('href');
    // $('iframe').attr('src', link);
    // return false;
  });


  //
  // ----------------------------------

  $('header ul li.urls i.fa').click(function() {
    $('header ul ul#url-submission').addClass('open');
  });


});
