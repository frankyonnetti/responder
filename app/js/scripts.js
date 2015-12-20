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

  $('main').css({'height': (viewport_height - 38) + 'px'});
  $('main .main-container').css({'min-width': (sumDeviceWidth + 40) + 'px'});

  };
  mainHeight();
  $(window).resize(response_change.waitForIdle(function() {
    mainHeight();
  }, 100));


  //
  // var gui = require('nw.gui');
  // var win = gui.Window.get();
  //
  // // Min
  // document.getElementById('windowControlMinimize').onclick = function() {
  //   win.minimize();
  // };
  //
  // // Close
  // document.getElementById('windowControlClose').onclick = function() {
  //   win.close();
  // };


  // --------------------------------------------------------------------

  var loadWebsiteWindow = function() {

    var responderURL = $('input#responder-url').val();







    var responderURL_1 = localStorage.getItem('urlItem_1');
    var responderURL_2 = localStorage.getItem('urlItem_2');
    var responderURL_3 = localStorage.getItem('urlItem_3');

    if (responderURL !== null && responderURL_1 !== responderURL) {
      localStorage.setItem('urlItem_1', responderURL);
      console.log(localStorage.getItem('urlItem_1'));
    }

    if (responderURL_1 !== null && responderURL_1 !== responderURL) {
      localStorage.setItem('urlItem_2', responderURL_1);
      console.log(localStorage.getItem('urlItem_2'));
    }

    if (responderURL_2 !== null && responderURL_1 !== responderURL) {
      localStorage.setItem('urlItem_3', responderURL_2);
      console.log(localStorage.getItem('urlItem_3'));
    }


    // // 3
    // if (responderURL_3 !== responderURL_2 ||
    //     responderURL_3 !== responderURL_1)
    // {
    //   responderURL_3 = responderURL_2;
    //   localStorage.setItem('urlItem_3', responderURL_3);
    //   console.log('URL 3: ' + responderURL_3);
    // }

    // // 2
    // if (responderURL_2 !== responderURL_1) {
    //   responderURL_2 = responderURL_1;
    //   localStorage.setItem('urlItem_2', responderURL_2);
    //   console.log('URL 2: ' + responderURL_2);
    // }

    // // 1
    // if (responderURL !== responderURL_1) {
    //   responderURL_1 = responderURL;
    //   localStorage.setItem('urlItem_1', responderURL_1);
    //   console.log('URL 1: ' + responderURL_1);
    // }






    // var existingURLs = {'urls':responderURL};
    // localStorage.setItem('urlItemList', JSON.stringify(existingURLs));
    // var retrievedObject = localStorage.getItem('urlItemList');
    // console.log('retrievedObject: ', JSON.parse(retrievedObject));



    $('.frame').each(function() {
      if (responderURL.length !== 0) {
        $(this).attr('src', responderURL);
        localStorage.setItem('urlItem', responderURL);
      } else {
        $(this).attr('src', 'empty.html');
        localStorage.setItem('urlItem', responderURL);
      }
    });
  };

  // load
  if (localStorage.getItem('urlItem').length !== 0) {
    $('input#responder-url').val(localStorage.getItem('urlItem'));
    loadWebsiteWindow();
  } else {
    loadWebsiteWindow();
  }

  $('input#responder-url').on('click', function () {
    // $(this).select();
  });

  // click re-load button
  $('#button-load').on('click', function () {
    $('input#responder-url').val(localStorage.getItem('urlItem'));
    // $('input#responder-url').blur();
    loadWebsiteWindow();
  });

  // hit enter key
  $(document).keyup(function(e) {
    if (e.keyCode === 13) {
      $('input#responder-url').blur();
      loadWebsiteWindow();
    }
  });

  $('.button-clear').click(function() {
    $('input#responder-url').val('');
    $('.frame').each(function() {
      $(this).attr('src', 'empty.html');
    });
    localStorage.setItem('urlItem', 'empty.html');
  });


  $('webview a').click(function() {
    console.log($(this).attr('href'));
    // var link = $(this).attr('href');
    // $('iframe').attr('src', link);
    // return false;
  });

});
