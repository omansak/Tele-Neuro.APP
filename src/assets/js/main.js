'use strict';
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

function dataTable() {
  var table = $('.data-table');

  if (table.length) {
    table.DataTable();
  }
}

function autocomplete() {
  if ($('.autocomplete-control').length) {
    $.typeahead({
      input: '.autocomplete-control',
      order: 'asc',
      source: {
        groupName: {
          // Ajax Request
          ajax: {
            url: '../assets/data/autocomplete.json'
          }
        }
      }
    });
  }
}

function topbarAtocomplete() {
  if ($('.topbar-search').length) {
    $.typeahead({
      input: '.topbar-search',
      order: 'asc',
      source: {
        groupName: {
          // Ajax Request
          ajax: {
            url: '../assets/data/search-menu.json'
          }
        }
      }
    });
  }
}

function selectpicker() {
  var select = $('.selectpicker');

  if (select.length) {
    select.selectpicker({
      style: '',
      styleBase: 'form-control',
      tickIcon: 'icofont-check-alt'
    });
  }
}

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
    var a = $(this);
    var li = a.closest('.menu-item');
    var id = '#' + a.attr('href').split('#').pop();

    if (li.hasClass('has-sub')) {
      li.toggleClass('active');
    } else {
      if ($(id).length) {
        $('html, body').animate({
          scrollTop: $(id).offset().top
        }, 600);
      }
    }

    // e.preventDefault();
  });
}

function formValidation() {
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
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

function init() {
  //dataTable();
  //autocomplete();
  //selectpicker();
  //rating();
  //formValidation();
  //topbarAtocomplete();
  //$('.alert').alert();

  scroll();
  menu();

  // Open/close sidebar
  $('.navbar-toggle').click(function () {
    $('.app-navbar.vertical, .app-navbar.horizontal-vertical').toggleClass('opened');
    $('.content-overlay').toggleClass('show');
  });
  $('.content-overlay').click(function () {
    $('.app-navbar.vertical, .app-navbar.horizontal-vertical').removeClass('opened');
    $(this).removeClass('show');
  });

  // Top navbar actions
  $('.app-actions .dropdown').on('show.bs.dropdown', function () {
    $('.content-overlay').addClass('show');
  });
  $('.app-actions .dropdown').on('hide.bs.dropdown', function () {
    $('.content-overlay').removeClass('show');
  });

  $(window).on('load', function () {
    $.ready.then(function () {
      $('body').addClass('loaded');
    });
  });

  $.ready.then(function () {
    $('body').addClass('loaded');
  });

  //Window Resize
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
