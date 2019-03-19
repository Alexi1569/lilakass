;
jQuery(document).ready(function ($) {
  var windowWidth = $(window).width();
  var mobileMenu = $('#mobile-menu');

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

    if ((!$(event.target.closest('.header__favourites')).is('.header__favourites')) && $('.header__favourites').hasClass('active')) {
      $('.header__favourites').removeClass('active');
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
    var $tabs = $('.tabs');

    $tabs.each(function() {
      var isPrevent = false;

      $(this).find('.tabs__list a').click(function(e) {
        e.preventDefault();
        var $self = $(this);
        var isActive = $self.hasClass('active');
        var goal = $(this).attr('href');
        var tl = new TimelineLite();

        if (!isActive && !isPrevent) {
          isPrevent = true;
          tl.to($tabs.find('.tabs__tab.active'), .3, {position: 'absolute', scale: .95, autoAlpha: 0, onComplete: function() {
              $tabs.find('.tabs__tab.active').removeClass('active');
              $tabs.find('.tabs__list a').removeClass('active');
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
    });
  })();

  (function initAuthModal() {
    var $forget = $('#forget-password');
    var $auth = $('#auth-btn');
    var $switch = $('.auth-switch');

    $switch.click(function(e) {
      e.preventDefault();

      var $self = $(this);

      $('.auth-modal__part.active').fadeOut('300', function() {
        $('.auth-modal__part:not(.active)').fadeIn('300');
        $('.auth-modal__part:not(.active)').addClass('active');
        $(this).removeClass('active');

        if ($self.attr('data-register') === 'true') {
          $auth.trigger('click');
        }
      })
    });

    $forget.click(function(e) {
      e.preventDefault();

      $('.login__part-email:not(.login__part-remind)').fadeOut('300', function() {
        $('.login__part-remind').css('display', 'flex');
        $('.login__part-remind').hide();
        $('.login__part-remind').fadeIn('300');
      })
    });

    $auth.click(function(e) {
      e.preventDefault();

      $('.login__part-remind').fadeOut('300', function() {
        $('.login__part-email:not(.login__part-remind)').css('display', 'flex');
        $('.login__part-email:not(.login__part-remind)').hide();
        $('.login__part-email:not(.login__part-remind)').fadeIn('300');
      })
    });
  })();

  (function initCart() {
    var $cart = $('.cart');
    var $toggler = $cart.find('.header__action-top');
    var $items = $cart.find('.header__cart-items');
    var hWithMargin = $cart.find('.header__cart-items .card').outerHeight(true);
    var hWithoutMargin = $cart.find('.header__cart-items .card').outerHeight(true);

    $items.scrollbar();

    $toggler.click(function(e) {
      e.preventDefault();

      $.fancybox.open({
        src  : '#cart-modal',
        type : 'inline',
        opts : {
          beforeShow : function( instance, current ) {
            $items.scrollbar();
          }
        }
      });
    });

    $cart.hover(function() {
      $(this).addClass('active');
    }, function() {
      $(this).removeClass('active');
    });
  })();

  (function initCard() {
    $('.card__amount').each(function() {
      var $minus = $(this).find('.card__amount-minus');
      var $plus = $(this).find('.card__amount-plus');
      var $input = $(this).find('input[type="number"]');
      var max = parseInt($input.attr('max'), 10);
      var min = parseInt($input.attr('min'), 10);

      $plus.click(function() {
        var val = parseInt($input.val(), 10);
        $input.val(++val);

        if (val !== min) {
          $minus.removeClass('disabled');
        }

        if (val === max) {
          $plus.addClass('disabled');
        } else {
          $plus.removeClass('disabled');
        }
      });

      $minus.click(function() {
        var val = parseInt($input.val(), 10);
        $input.val(--val);

        if (val !== max) {
          $plus.removeClass('disabled');
        }

        if (val === min) {
          $minus.addClass('disabled');
        } else {
          $minus.removeClass('disabled');
        }
      });
    });
  })();

  (function initHeaderFavourites() {
    var $favourites = $('#header__favourites');
    var $toggler = $favourites.find('.header__action-top');
    var $items = $('.favourites-modal .header__cart-items');

    $toggler.click(function() {
      $favourites.toggleClass('active');
    });

    $favourites.click(function() {
      $.fancybox.open({
        src  : '#favourites-modal',
        type : 'inline',
        opts : {
          beforeShow : function( instance, current ) {
            $items.scrollbar();
          }
        }
      });
    });
  })();

  (function initFilter() {
    var $slider = $('#filter-slider');
    var $from = $('#filter-from');
    var $to = $('#filter-to');
    var $toggler = $('#filter-toggler');
    var $filter = $('#catalog-filter');
    var $close = $('#filter-close');

    $toggler.click(function() {
      $toggler.toggleClass('active');
      $filter.toggleClass('active');
    });

    $close.click(function() {
      $toggler.removeClass('active');
      $filter.removeClass('active');
    });

    $slider.slider({
      range: true,
      min: 0,
      max: 3000,
      values: [ 500, 2567 ],
      slide: function( event, ui ) {
        $from.val(ui.values[ 0 ]);
        $to.val(ui.values[ 1 ]);
      }
    });


    var items = document.getElementsByClassName('pcatalog__filter-row-top');
    var i;

    for (i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {
        this.closest('.pcatalog__filter-row').classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  })();

  (function initTextBlock() {
    var $text = $('.text-block');

    $text.each(function() {
      var $self = $(this);
      var $content = $self.find('.text-block__content');
      var $link = $(this).find('a[href="#text-toggler"]');
      var linkOffset = $link.offset();
      var wrapOffset = $content.offset();
      var childOffsetTop = linkOffset.top - wrapOffset.top;

      $content[0].style.maxHeight = childOffsetTop + $link.outerHeight(true) + 'px';
      $self.addClass('initialized');

      $link.click(function(e) {
        e.preventDefault();
        $self.toggleClass('opened');

        //check language
        var language = 'ru';

        if ($content[0].style.maxHeight) {
          $content[0].style.maxHeight = null;
          switch (language) {
            case 'ru':
              $link.text('Скрыть');
              break;
          }
        } else {
          $content[0].style.maxHeight = childOffsetTop + $link.outerHeight(true) + 'px';
          switch (language) {
            case 'ru':
              $link.text('Развернуть');
              break;
          }
        }
      })
    });
  })();

  (function initProductSliders() {
    var $previews = $('#previews');
    var $gallery = $('#gallery');
    var slidesPerView = 4;

    if ($gallery.length) {
      var h = $(gallery).outerHeight(true);
      $next = $gallery.find('.swiper-button-next');
      $prev = $gallery.find('.swiper-button-prev');

      $previews.css({
        'height': h + 'px'
      });

      $(window).resize(function() {
        h = $(gallery).outerHeight(true);
        $previews.css({
          'height': h + 'px'
        });

        previewsSwiper.update();
      });

      var previewsSwiper = new Swiper($previews, {
        loop: checkIsLoop($previews, slidesPerView),
        slidesPerView: slidesPerView,
        speed: 650,
        watchOverflow: true,
        direction: 'vertical',
        spaceBetween: 20,
        loopedSlides: 1,
        watchSlidesVisibility: true,
        roundLengths: true,
        watchSlidesProgress: true,
      });

      var gallerySwiper = new Swiper($gallery, {
        speed: 650,
        loop: true,
        spaceBetween: 20,
        loopedSlides: 1,
        thumbs: {
          swiper: previewsSwiper,
        },
        navigation: {
          nextEl: $next,
          prevEl: $prev,
        },
      });
    }
  })();

  var $countdown = $('.countdown-target');

  $countdown.each(function() {
    $(this).countdown('2019/04/25', function(event) {
      var $days = $(this).find('.pitem__countdown-days');
      var $hours = $(this).find('.pitem__countdown-hours');
      var $minutes = $(this).find('.pitem__countdown-minutes');
      var $seconds = $(this).find('.pitem__countdown-seconds');

      $days.find('span').text(event.strftime('%D'));
      $hours.find('span').text(event.strftime('%H'));
      $minutes.find('span').text(event.strftime('%M'));
      $seconds.find('span').text(event.strftime('%S'));
    });
  });

  (function initProductSizes() {
    var $sizes = $('.pitem__sizes-options a');

    $sizes.each(function() {
      $(this).click(function(e) {
        e.preventDefault();

        var goal = $(this).attr('href');
        $('.pitem__sizes-tab.active').fadeOut('350', function() {
          $(this).removeClass('active');
          $(goal).fadeIn('350');
          $(goal).addClass('active');
        });

      });
    });
  })();

  function initRating() {
    var $rating = $('[data-rating]');
    var total = 5;

    $rating.each(function() {
      var num = $(this).attr('data-rating');
      var stars = $(this).find('.star');

      var res = total - +num;
      var isFloat = (res < 1) && (res > 0);
      var i = 0;

      while (res > 0) {
        var diff;

        if (isFloat) {
          diff = Math.ceil(res) - res;

          $(stars[stars.length - 1 - i]).find('.star-inner').css({
            'width': (100 - diff * 100) + '%'
          });
          res = 0
        } else {
          $(stars[stars.length - 1 - i]).find('.star-inner').css({
            'width': '100%'
          });
          res--;
          isFloat = (res < 1) && (res > 0);
        }

        i++;

        if (i === 6) {
          break;
        }
      }
    });
  };

  initRating();
});