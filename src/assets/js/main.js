function initMenu() {
  var menu = $(".main-menu");
  var item = menu.find(".item-link");

  item.click(function () {
    var li = $(this).closest(".menu-item");

    if (li.hasClass("has-sub")) {
      li.toggleClass("active");
    }
  });
}

function initScroll() {
  var body = $("body");

  $(".main-content").scroll(function () {
    var scroll = $(this).scrollTop();

    if (scroll > 0) {
      body.addClass("scrolled");
    } else {
      body.removeClass("scrolled");
    }
  });
}

function initSettings() {
  var modal = $("#settings");
  var boxed = modal.find("#boxed");
  var bar1Dark = modal.find("#topbar");
  var bar2Dark = modal.find("#sidebar");
  var layout = modal.find("#layout");

  boxed.change(function () {
    $("body")[$(this).is(":checked") ? "addClass" : "removeClass"]("boxed");
  });

  bar1Dark.change(function () {
    $("#navbar1")[$(this).is(":checked") ? "addClass" : "removeClass"]("dark");
  });

  bar2Dark.change(function () {
    $("#navbar2")[$(this).is(":checked") ? "addClass" : "removeClass"]("dark");
  });

  layout.find("option").each(function () {
    if ($("body").hasClass($(this).val())) {
      layout.selectpicker("val", $(this).val());
      $(this).prop("selected", true);
    }
  });
  layout.change(function () {
    var val = $(this).val();

    if (!$("body").hasClass(val)) {
      var lc = window.location.pathname;

      if (val === "horizontal-layout") {
        window.location.pathname = lc.replace("/dist", "/dist-horizontal");
      } else {
        window.location.pathname = lc.replace("/dist-horizontal", "/dist");
      }
    }
  });

  $("#reset-to-default").click(function () {
    $("body").addClass("boxed");
    boxed.prop("checked", true);
    $("#navbar1").removeClass("dark");
    bar1Dark.prop("checked", false);
    $("#navbar2").removeClass("dark");
    bar2Dark.prop("checked", false);
  });
}

function initResize() {
  var isTouchDevice = navigator.userAgent.match(
    /(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/
  );
  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  //Functions
  function resizeFunctions() {
    $(".app-navbar.vertical, .app-navbar.horizontal-vertical").removeClass(
      "opened"
    );
    $(".content-overlay").removeClass("show");
    $(".dropdown.show .dropdown-toggle").dropdown("toggle");
  }

  if (isTouchDevice) {
    $(window).bind("orientationchange", function () {
      delay(function () {
        resizeFunctions();
      }, 50);
    });
  } else {
    $(window).on("resize", function () {
      delay(function () {
        resizeFunctions();
      }, 50);
    });
  }
}

function initSidebar() {
  // Open/close sidebar
  $(".navbar-toggle").click(function () {
    $(".app-navbar.vertical, .app-navbar.horizontal-vertical").toggleClass(
      "opened"
    );
    $(".content-overlay").toggleClass("show");
  });
  $(".content-overlay").click(function () {
    $(".app-navbar.vertical, .app-navbar.horizontal-vertical").removeClass(
      "opened"
    );
    $(this).removeClass("show");
  });

  // Top navbar actions
  $(".app-actions .dropdown").on("show.bs.dropdown", function () {
    $(".content-overlay").addClass("show");
  });
  $(".app-actions .dropdown").on("hide.bs.dropdown", function () {
    $(".content-overlay").removeClass("show");
  });
}

function init() {
  initMenu();
  initScroll();
  initSettings();
  initSidebar();
  initResize();
  $.ready.then(function () {
    $("body").addClass("loaded");
  });
}
