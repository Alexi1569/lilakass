;
jQuery(document).ready(function ($) {
  var windowWidth = $(window).width();
  var mobileMenu = $('#mobile-menu');
  var styledSelect = $('.styled-select');

  $(window).resize(function () {
    windowWidth = $(window).width();
  });

  $(window).on('load', function () {

  });

  $.fancybox.defaults.hideScrollbar = false;
  $.fancybox.defaults.touch = false;

  $.fancybox.defaults.btnTpl.smallBtn = '<span data-fancybox-close class="modal-close">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642"><path fill-rule="evenodd" d="M8.882 7.821l6.541-6.541A.75.75 0 1 0 14.362.219L7.821 6.76 1.28.22A.75.75 0 1 0 .219 1.281L6.76 7.822l-6.54 6.54a.75.75 0 0 0 1.06 1.061l6.541-6.541 6.541 6.541a.75.75 0 1 0 1.06-1.061l-6.54-6.541z"/></svg>' +
    '</span>';

  $(document).on('click touchstart', function (event) {
    if ((!$(event.target.closest('.header__search')).is('.header__search')) && $('.header__search').hasClass('active')) {
      $('.header__search').removeClass('active');
    }

  });

  if ("ontouchstart" in document.documentElement) {
    $('body').addClass('touch-device');
  } else {
    $('body').removeClass('touch-device');
  }

  $('.only-text-input').bind('keyup blur', function () {
      var node = $(this);
      node.val(node.val().replace(/[^a-zA-Zа-яА-Я ]/g, ''));
    }
  );

  $('.only-numbers-input').bind('keyup blur', function () {
      var node = $(this);
      node.val(node.val().replace(/[^0-9 ()-+]/g, ''));
    }
  );

  (function () {
    var acc = document.getElementsByClassName("faq__item-question");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  })();

  if ($(mobileMenu).length) {
    $(mobileMenu).mmenu({
        extensions: [
          "fx-listitems-drop",
          "fx-panels-slide-100",
          "border-full",
          "pagedim-black",
          "position-front",
          "position-right",
        ],
        navbar: {
          title: 'Главное меню'
        },
        navbars: [
          {
            height: 2,
            content: [
              '<div class="mobile-menu__top">' +
                '<a href="' + window.location.origin +'" class="mobile-menu__logo logo">' +
                  '<svg><use xlink:href="#logo"></use></svg>' +
                '</a>' +
              '</div>'
            ]
          },
        ]
      },
      {});
  }


  (function initSearch() {
    var $search = $('#header-search');
    var $icon = $search.find('.header__search-icon');

    $icon.click(function(e) {
      $search.toggleClass('active');
    });
  })();

  function checkIsLoop(slider, slidesPerView) {
    if ($(slider).find('.swiper-slide').length > slidesPerView) {
      return true;
    } else {
      return false;
    }
  }

  function animateBannerSlide(mySwiper) {
    var $current = $('.banner__slide.swiper-slide.swiper-slide-active');

    var tl = new TimelineLite();
    tl.to($current.find('.banner__descr'), .3, {autoAlpha: 1, x: '0%'})
      .to($current.find('.banner__title'), .3, {autoAlpha: 1, x: '0%'}, '-=.12')
      .to($current.find('.banner__btn'), .3, {autoAlpha: 1, x: '0%', onComplete: function() {tl.clear()}}, '-=.12')
  }

  function alignArrows(next, prev, w, container) {
    if (windowWidth > 1199) {
      $(next).css({
        'right': ((w - $(container).width()) / 2) + 'px'
      });
      $(prev).css({
        'left': ((w - $(container).width()) / 2) + 'px'
      });
    } else {
      $(next).css({
        'right': '10px'
      });
      $(prev).css({
        'left': '10px'
      });
    }
  }

  (function initBannerSlider() {
    var $slider = $('#banner-slider');
    var w = $(window).outerWidth(true);
    var $container = $('.container');

    $next = $slider.find('.swiper-button-next');
    $prev = $slider.find('.swiper-button-prev');
    var slidesPerView = 1;

    alignArrows($next, $prev, w, $container);

    $(window).resize(function() {
      alignArrows($next, $prev, w, $container);
    });

    var mySwiper = new Swiper($slider, {
      loop: checkIsLoop($slider, slidesPerView),
      navigation: {
        nextEl: $next,
        prevEl: $prev,
      },
      slidesPerView: slidesPerView,
      speed: 650,
      watchOverflow: true,
      pagination: {
        el: $slider.find('.swiper-pagination'),
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<div class="banner__pagination--current">0<span class="' + currentClass + '"></span></div>' +
            ' / ' +
            '<div class="banner__pagination--total">0<span class="' + totalClass + '"></span></div>';
        }
      },
      on: {
        init: function () {
         setTimeout(function() {
           animateBannerSlide(mySwiper);
         }, 250);
        },
      }
    });

    mySwiper.on('slideChangeTransitionStart', function() {
      var $current = $('.banner__slide.swiper-slide.swiper-slide-active');

      TweenMax.set([$current.find('.banner__descr'), $current.find('.banner__title'), $current.find('.banner__btn')], {clearProps: 'all'});
    });

    mySwiper.on('slideChangeTransitionEnd', function() {
      animateBannerSlide(mySwiper);
    });
  })();

  (function initProductsSlider() {
    var $slider = $('.products');

    $slider.each(function() {
      var slidesPerView = 4;
      var $self = $(this);
      $next = $self.find('.swiper-button-next');
      $prev = $self.find('.swiper-button-prev');

      var mySwiper = new Swiper($(this), {
        loop: checkIsLoop($self, slidesPerView),
        speed: 650,
        loopAdditionalSlides: 1,
        slidesPerView: slidesPerView,
        watchOverflow: true,
        spaceBetween: 30,
        roundLengths: true,
        navigation: {
          nextEl: $next,
          prevEl: $prev,
        },
        breakpoints: {
          900: {
            spaceBetween: 20,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          530: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
        }
      });
    });
  })();

  (function initPartnersSlider() {
    var $slider = $('#partners-slider');
    $next = $slider.closest('.partners__content').find('.swiper-button-next');
    $prev = $slider.closest('.partners__content').find('.swiper-button-prev');

    var mySwiper = new Swiper($slider, {
      speed: 650,
      slidesPerView: 'auto',
      watchOverflow: true,
      spaceBetween: 10,
      roundLengths: true,
      navigation: {
        nextEl: $next,
        prevEl: $prev,
      },
      breakpoints: {
        767: {
          slidesPerView: 3
        },
        550: {
          slidesPerView: 2
        },
        350: {
          slidesPerView: 1
        },
      }
    });
  })();

  function animateNewsSlide(slide) {
    var tl = new TimelineLite();

    tl.to($(slide).find('.news__img'), .55, {x: '0%', autoAlpha: 1})
      .to($(slide).find('.news__title'), .1, {autoAlpha: 1, x: '0%'}, '-=.4')
      .to($(slide).find('.news__descr'), .5, {autoAlpha: 1, x: '0%'}, '+=.1')
  }

  (function initNewsSlider() {
    var $slider = $('#news__slider');
    $next = $slider.find('.swiper-button-next');
    $prev = $slider.find('.swiper-button-prev');

    var slidesPerView = 2;

    var mySwiper = new Swiper($slider, {
      speed: 650,
      loop: false,
      slidesPerView: slidesPerView,
      watchOverflow: true,
      spaceBetween: 30,
      roundLengths: true,
      navigation: {
        nextEl: $next,
        prevEl: $prev,
      },
      on: {
        init: function() {
          if (windowWidth > 550) {
            var $nxt = $slider.find('.swiper-slide-next');
            animateNewsSlide($nxt);
          }
          var $cur = $slider.find('.swiper-slide-active');
          animateNewsSlide($cur);
        },
      },
      breakpoints: {
        550: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      }
    });

    mySwiper.on('slideChangeTransitionEnd', function() {
      var $nslide = $slider.find('.swiper-slide-next');
      var $aslide = $slider.find('.swiper-slide-active');

      if (windowWidth > 550) {
        $slider.find('.swiper-slide:not(.swiper-slide-next):not(.swiper-slide-active)').each(function() {
          TweenMax.set([$(this).find('.news__descr'), $(this).find('.news__title'), $(this).find('.news__img')], {clearProps: 'all'});
        });
      } else {
        $slider.find('.swiper-slide:not(.swiper-slide-active)').each(function() {
          TweenMax.set([$(this).find('.news__descr'), $(this).find('.news__title'), $(this).find('.news__img')], {clearProps: 'all'});
        });
      }

      if (windowWidth > 550) {
        animateNewsSlide($nslide);
      }

      animateNewsSlide($aslide);
    });
  })();

  (function initReviewsSlider() {
    var $slider = $('#reviews__slider');
    $next = $slider.find('.swiper-button-next');
    $prev = $slider.find('.swiper-button-prev');

    var slidesPerView = 1;

    var mySwiper = new Swiper($slider, {
      speed: 650,
      loop: checkIsLoop($slider, slidesPerView),
      watchOverflow: true,
      slidesPerView: slidesPerView,
      roundLengths: true,
      navigation: {
        nextEl: $next,
        prevEl: $prev,
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: checkIsLoop($slider, 2),
        },
        550: {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: checkIsLoop($slider, 1),
        },
      }
    });
  })();

  (function initTabs() {
    var $tabs = $('#trands-tabs');
    var isPrevent = false;

    $tabs.find('.trands__list a').click(function(e) {
      e.preventDefault();
      var $self = $(this);
      var isActive = $self.hasClass('active');
      var goal = $(this).attr('href');
      var tl = new TimelineLite();

      if (!isActive && !isPrevent) {
        isPrevent = true;
        tl.to($tabs.find('.trands__tab.active'), .3, {position: 'absolute', scale: .95, autoAlpha: 0, onComplete: function() {
            $tabs.find('.trands__tab.active').removeClass('active');
            $tabs.find('.trands__list a').removeClass('active');
            $self.addClass('active');
          }})
          .to($tabs.find(goal), 0, {position: 'initial', scale: .95}, '-=.3')
          .to($tabs.find(goal), .2, {autoAlpha: 1, scale: 1,
              onComplete: function() {
                $tabs.find(goal).addClass('active');
              }
          })
        setTimeout(function() {
          isPrevent = false;
        }, 500)
      }
    });
  })();

});