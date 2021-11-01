'use strict';
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

function rating() {
  var rating = $('.rating');

  if (rating.length) {
    rating.each(function () {
      var item = $(this);
      var readonly = item.data('readonly');
      var reverse = item.data('reverse');

      item.barrating({
        showSelectedRating: false,
        readonly: readonly,
        reverse: reverse
      });
    });
  }
}

function menu() {
  var menu = $('.main-menu');
  var item = menu.find('.item-link');

  item.click(function (e) {
    var li = $(this).closest('.menu-item');
    if (li.hasClass('has-sub')) {
      li.toggleClass('active');
    }
    // e.preventDefault();
  });
}

function scroll() {
  var body = $('body');
  $('.main-content').scroll(function () {
    var scroll = $(this).scrollTop();
    if (scroll > 0) {
      body.addClass('scrolled');
    } else {
      body.removeClass('scrolled');
    }
  });
}

function sidebar() {
  $('.navbar-toggle').click(function () {
    $('.app-navbar.vertical, .app-navbar.horizontal-vertical').toggleClass('opened');
    $('.content-overlay').toggleClass('show');
  });
  $('.content-overlay').click(function () {
    $('.app-navbar.vertical, .app-navbar.horizontal-vertical').removeClass('opened');
    $(this).removeClass('show');
  });
}

function topNavbarAction() {
  $('.app-actions .dropdown').on('show.bs.dropdown', function () {
    $('.content-overlay').addClass('show');
  });
  $('.app-actions .dropdown').on('hide.bs.dropdown', function () {
    $('.content-overlay').removeClass('show');
  });
}

function windowResize() {
  (function () {
    var delay = (function () {
      var timer = 0;
      return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();

    //Functions
    function resizeFunctions() {
      $('.app-navbar.vertical, .app-navbar.horizontal-vertical').removeClass('opened');
      $('.content-overlay').removeClass('show');
      $('.dropdown.show .dropdown-toggle').dropdown('toggle');
    }

    if (isTouchDevice) {
      $(window).bind('orientationchange', function () {
        delay(function () {
          resizeFunctions();
        }, 50);
      });
    } else {
      $(window).on('resize', function () {
        delay(function () {
          resizeFunctions();
        }, 50);
      });
    }
  }());
}

function init() {
  scroll();
  menu();
  sidebar();
  topNavbarAction();
  windowResize();

  $.ready.then(function () {
    $('body').addClass('loaded');
  });
}
