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
  // --------------------
  var mainHeight = function() {
    var sumDeviceWidth = 0;
    $('.device-window').each(function() {
      sumDeviceWidth += Number($(this).outerWidth(true));
    });

    $('main').css({'height': viewport_height + 'px'});
    $('main .main-container').css({'min-width': (sumDeviceWidth + 40) + 'px'});
    $('header .header-wrap').css({'min-height': viewport_height + 'px'});
  };
  mainHeight();


  $(window).resize(response_change.waitForIdle(function() {
    mainHeight();
  }, 200));



  // --------------------

  var responderURLfield = 'input#responder-url';

  var loadWebsiteWindow = function() {
    var responderURL = $(responderURLfield).val();

    // Check if URL field has content, and if so,
    // use it for each webview.
    $('.frame').each(function() {
      if (responderURL.indexOf('http') === 0) {
        $(this).attr('src', responderURL);
        localStorage.setItem('urlItem', responderURL);
      }
    });
  };


  // Create a "bookmark" list.
  // -------------------------

  var bookMarkCounter = '';
  if (localStorage.getItem('keepBookMarkCount') > 0) {
    var getBookMarkVal = localStorage.getItem('keepBookMarkCount');
    bookMarkCounter = parseInt(getBookMarkVal) + 1;
  } else {
    bookMarkCounter = 0;
  }

  var loadBookMarks = function() {
    for (var counter = 0; counter <= bookMarkCounter; counter++) {
      $('header ul ul#url-submission').append(localStorage.getItem('bookMarkUrl_' + counter));
    }
  };
  loadBookMarks();

  $('header ul ul#url-submission lh i.fa').click(function() {

    // variables
    var currentPathClass = $(responderURLfield).val().replace(/[^a-z0-9\s]/gi, '');
    var getActiveURL = '<li class="' + currentPathClass + '">' + $(responderURLfield).val() + '</li>';
    var addBookMarktoList = function() {
      $('header ul ul#url-submission').append(getActiveURL);
      localStorage.setItem('keepBookMarkCount', bookMarkCounter);
      localStorage.setItem('bookMarkUrl_' + bookMarkCounter++, getActiveURL);
    };

    if ($('header ul ul#url-submission').find('li').length) {
      //console.log('has li.' + currentPathClass);
      if ($('header ul ul#url-submission').find('li.' + currentPathClass).length) {
        // console.log('list already has that URL');
      } else {
        // console.log('no URL, but does now');
        addBookMarktoList();
      }
    } else {
      // console.log('no li');
      addBookMarktoList();
    }
  });


  // Add url from list
  $('header ul ul#url-submission').on('click', 'li', function() {
    var responderURLval = $(this).html();
    $('.frame').each(function() {
      $(this).attr('src', responderURLval);
    });
  });


  // load
  if (localStorage.getItem('urlItem') !== null &&
      localStorage.getItem('urlItem').indexOf('http') === 0)
  {
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




  // Sidbar setting
  // ----------------------------------

  // Set sidebar localstorage for open or closed
  if (localStorage.getItem('sidebar_open') === null) {
    localStorage.setItem('sidebar_open', 'false');
  } else if (localStorage.getItem('sidebar_open') === 'true') {
    $('body').addClass('open');
  }


  // Click sidebar el to open sidebar
  $('header ul li').click(function() {
    if ($(this).hasClass('selected')) {

      if (localStorage.getItem('sidebar_open') === 'true') {
        $('body').removeClass('open');
        localStorage.setItem('sidebar_open', 'false');
      } else {
        $('body').addClass('open');
        localStorage.setItem('sidebar_open', 'true');
      }

    } else {

      if (localStorage.getItem('sidebar_open') === 'false') {
        $('body').addClass('open');
        localStorage.setItem('sidebar_open', 'true');
      }
    }
  });


  // Remember which el was clicked
  $('header ul li').click(function() {
    $('header ul li').removeClass('selected');
    $(this).addClass('selected');
    var elClicked = $(this).index() + 1;
    localStorage.setItem('sidebar_el_clicked', elClicked);
  });
  var getClickedNum = localStorage.getItem('sidebar_el_clicked');
  $('header ul li:nth-child(' + getClickedNum + ')').addClass('selected');
  $('header ul ul li').removeClass('selected');


});
