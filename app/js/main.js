﻿;
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

      if (windowWidth <= 530) {
        slidesPerView = 2;
      } else if (windowWidth <= 700) {
        slidesPerView = 3;
      }

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
        },
        on: {
          init: function() {

            if (!checkIsLoop($self, slidesPerView)) {
              $self.addClass('hide-controls');
            }
          }
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
          TweenMax.set([$(this).find('.news__descr'), $(this).find('.news__title')], {clearProps: 'all'});
          TweenMax.set([$(this).find('.news__img')], {clearProps: 'transform, opacity, visibility'});
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

    $('[data-fancybox="product-gallery"]').fancybox({
      protect: true,
      loop: true,
      infobar: false,
      buttons: [
        'close',
        'thumbnails',
      ],
      touch: {
        vertical: true,
        momentum: true
      },
    });

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
        speed: 450,
        watchOverflow: true,
        direction: 'vertical',
        spaceBetween: 20,
        roundLengths: true,
        loopedSlides: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      var gallerySwiper = new Swiper($gallery, {
        speed: 450,
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

        $sizes.removeClass('active');
        $(this).addClass('active');

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

  $(window).on('init-rating', function() {
    initRating();
  });

  $('.rating-container').click(function(e) {
    if (!$(e.target).hasClass('rating-container')) {
      var index = $($(e.target).closest('.star')).index();
      $(this).find('.star-inner').css('width', '0%');

      $(this).attr('data-rating', index + 1 + ".0");
      initRating();
    }
  });

  (function initReviewsForm() {
    var $form = $('#reviews-form');
    var $content = $form.find('.pitem__reviews-form-content');
    var $btn = $form.find('.pitem__reviews-btn');

    $btn.click(function(e) {
      if (!$form.hasClass('active')) {
        e.preventDefault();
        $content.fadeIn('350');
        $form.addClass('active');

        return false;
      } else {
        e.preventDefault();
      //  send form data
      }
    });
  })();

  (function initSelect() {
    var $select = $('.form__group--select').find('select');

    $select.each(function() {
      $(this).select2({
        containerCssClass: 'select-wrapper',
        dropdownCssClass: 'select-dropdown',
        dropdownParent: $(this).closest('.form__group'),
        minimumResultsForSearch: -1,
      });
    });
  })();

  function toggleShadowToHeader() {
    if (window.pageYOffset > 0) {
      if (!$('.header').hasClass('header--shadow')) {
        $('.header').addClass('header--shadow');
      }
    } else {
      if ($('.header').hasClass('header--shadow')) {
        $('.header').removeClass('header--shadow');
      }
    }
  }

  toggleShadowToHeader();

  $(window).scroll(function(e) {
    toggleShadowToHeader();
  });

  function initCart() {
    var $scroll = $('.pcart__right').find('.scrollbar-inner');
    var $autocomplete = $('.pcart__left').find('.autocomplete');

    var availableItems = {
      country: [
        'Украина',
        'Канада',
        'США',
      ],
      city: [
        'Киев',
        'Харьков',
        'Львов',
      ],
      point: [
        'Отделение 1',
        'Отделение 2',
        'Отделение №12, ул. Лукьяновская 1/2',
      ]
    }

    $scroll.scrollbar();
    $autocomplete.each(function() {
      $(this).autocomplete({
        source: availableItems[$(this).attr('data-autocomplete')],
        appendTo: $(this).closest('.form__group')
      });
    });
  }

  initCart();

  (function initAccount() {
    var $toggler = $('#account-toggler');
    var $close = $('#account-close');
    var $overlay = $('.paccount__left-overlay');
    var $openAddressForm = $('#address-add');
    var $orderToggler = $('.paccount__history-col--number');

    $orderToggler.click(function() {
      var $wrap = $(this).closest('.paccount__history-item');

      if (!$wrap.hasClass('active')) {
        $wrap.find('.paccount__history-details').fadeIn(350, function() {
          $wrap.addClass('active');
        });
        $wrap.addClass('opened');
      } else {
        $wrap.find('.paccount__history-details').fadeOut(350, function() {
          $wrap.removeClass('active');
        });
        $wrap.removeClass('opened');
      }
    });

    $toggler.click(function(e) {
      e.preventDefault();

      $('.paccount__content').toggleClass('active');
    });

    $close.click(function(e) {
      $('.paccount__content').removeClass('active');
    });

    $overlay.click(function(e) {
      $('.paccount__content').removeClass('active');
    });

    $openAddressForm.click(function(e) {
      e.preventDefault();

      $('.paccount__address-form').fadeIn('350');
    });

    var $autocomplete = $('.paccount__address-form').find('.autocomplete');

    var availableItems = {
      country: [
        'Украина',
        'Канада',
        'США',
      ],
      city: [
        'Киев',
        'Харьков',
        'Львов',
      ],
      point: [
        'Отделение 1',
        'Отделение 2',
        'Отделение №12, ул. Лукьяновская 1/2',
      ]
    }

    $autocomplete.each(function() {
      $(this).autocomplete({
        source: availableItems[$(this).attr('data-autocomplete')],
        appendTo: $(this).closest('.form__group')
      });
    });
  })();

  (function initAboutPage() {
    var $scroll = $('.pabout').find('.scrollbar-inner');

    $scroll.each(function() {
      $(this).scrollbar();
    });
  })();

  (function initProductionPage() {
    var $pb = $('#production-block');
    if ($pb.length) {
      var $top = $pb.find('.bproduction__img--top');
      var $left= $pb.find('.bproduction__img--left');
      var $center = $pb.find('.bproduction__img--center');
      var $right = $pb.find('.bproduction__img--right');
      var $bottom = $pb.find('.bproduction__img--bottom');
      var $img = $pb.find('.bproduction__img');
      var $title = $pb.find('.bproduction__title');
      var topOffset = $pb.offset().top;

      var tl = new TimelineLite();
      tl.pause();
      tl.fromTo($title, .8, {autoAlpha: 0, x: -150}, {ease: Power2.easeOut, autoAlpha: 1, x: 0})
        .fromTo($top, .8, {autoAlpha: 0, y: -250}, {ease: Power2.easeOut, autoAlpha: 1, y: 0}, '-=.45')
        .fromTo($left, .8, {autoAlpha: 0, x: -150}, {ease: Power2.easeOut, autoAlpha: 1, x: 0}, '-=.6')
        .fromTo($right, .8, {autoAlpha: 0, x: 150}, {ease: Power2.easeOut, autoAlpha: 1, x: 0}, '-=.6')
        .fromTo($bottom, .8, {autoAlpha: 0, y: 150}, {ease: Power2.easeOut, autoAlpha: 1, y: 0}, '-=.6')
        .fromTo($center, .8, {autoAlpha: 0, scaleX: .7, scaleY: .7}, {ease: Power2.easeOut, autoAlpha: 1, scaleX: 1, scaleY: 1}, '-=.45')

      $(window).resize(function(e) {
        topOffset = $pb.offset().top;
      });

      function hoverImg(tl, img, dir) {
        tl.fromTo($(img), .3, {scaleY: 1, scaleX: 1, transformOrigin: 'center'}, {scaleY: 1.1, scaleX: 1.1, onUpdate: function(e) {
          if (tl.progress() > 0.75) {
            if (dir === 'default') {
              $(img).addClass('front');
            } else if (dir === 'reverse') {
              $(img).removeClass('front');
            }
          }
        }});

        if (dir === 'default') {
          tl.play();
        } else if (dir === 'reverse') {
          tl.reverse();
        }
      }

      $img.each(function() {
        var imgTl = new TimelineLite();
        imgTl.pause();
        var $self = $(this);
        $self.hover(function() {
          imgTl.clear();
          hoverImg(imgTl, $self, 'default');
        }, function() {
          hoverImg(imgTl, $self, 'reverse');
        });
      });


      function checkIfInViewport() {
        if (window.scrollY > topOffset - ($pb.outerHeight(true) / 2)) {
          if (!$pb.hasClass('active')) {
            $pb.addClass('active');
            tl.play();
          }
        }
      }

      checkIfInViewport();

      $(window).scroll(function(e) {
        checkIfInViewport();

        if (window.scrollY < topOffset - ($pb.outerHeight(true) / 2) - 200) {
          $pb.removeClass('active');
          tl.pause();
          tl.time(0);
        }
      });
    }
  })();

  (function initFaqPage() {
    var $questions = $('.pfaq__item-question');

    $questions.each(function() {
      $(this).click(function() {
        var target = $(this).attr('data-faq');
        var $self = $(this);
        var isActive = $self.closest('.pfaq__item').hasClass('active');

        if (windowWidth > 650) {
          if ($('.pfaq__answer.faq-pc.active').length) {
            if (isActive) {
              $('.pfaq__answer.faq-pc.active').fadeOut(100, function() {
                $('.pfaq__answer.faq-pc.active').removeClass('active');
                $('.pfaq__item.active').removeClass('active');
              })
            } else {
              $('.pfaq__answer.faq-pc.active').fadeOut(100, function() {
                $('.pfaq__answer.faq-pc.active').removeClass('active');
                $('.pfaq__item.active').removeClass('active');
                $self.closest('.pfaq__item').addClass('active');
                $('.' + target + '.faq-pc').fadeIn(200);
                $('.' + target + '.faq-pc').addClass('active');
              })
            }
          } else {
            $self.closest('.pfaq__item').addClass('active');
            $('.' + target + '.faq-pc').fadeIn(200);
            $('.' + target + '.faq-pc').addClass('active');
          }
        } else {
          if (isActive) {
            $self.closest('.pfaq__item').removeClass('active');
            $('.' + target + '.faq-mobile').fadeOut(100);
            $('.' + target + '.faq-mobile').removeClass('active');
          } else {
            $self.closest('.pfaq__item').addClass('active');
            $('.' + target + '.faq-mobile').fadeIn(200);
            $('.' + target + '.faq-mobile').addClass('active');
          }

        }

      });
    });
  })();

  (function initContactsPage() {
    var $info = $('#map-info');

    if ($info.length) {
      var w = $('.container').width();

      function setLeft() {
        if (windowWidth > 630) {
          w = $('.container').width();
          $info.css({
            'left': ((windowWidth - w) / 2) + 'px'
          });

          if (!$info.hasClass('active')) {
            $info.addClass('active');
          }
        }
      }

      setLeft();

      $(window).resize(function() {
        setLeft();
      });
    }
  })();

  function initReviewsPage() {
    var $items = $('.previews-item');
    var MAX_HEIGHT = 235;
    window.wrap = $('#review-items');

    if (windowWidth <= 600) {
      MAX_HEIGHT = 145;
    }

    $items.each(function() {
      var $self = $(this);
      var $wrap = $self.find('.reviews__text');
      var $text = $wrap.find('.reviews__text-inner');

      if ($text.outerHeight() > MAX_HEIGHT) {
        var link = document.createElement('a');
        link.textContent += 'Развернуть';
        link.setAttribute('href', '#');
        link.classList.add('link');
        $text[0].style.maxHeight = MAX_HEIGHT + 'px';
        $wrap.append(link);

        $(link).click(function(e) {
          e.preventDefault();

          if (!$text.hasClass('opened')) {
            $text[0].style.maxHeight = $text[0].scrollHeight + 'px';
            $text.addClass('opened');
            $(this).text('Свернуть');
          } else {
            $text[0].style.maxHeight = MAX_HEIGHT + 'px';
            $text.removeClass('opened');
            $(this).text('Развернуть');
          }

          $(window.wrap).masonry('layout');
        });
      }
    });

    $(window.wrap).masonry({
      itemSelector: '.previews-item',
      horizontalOrder: true,
    });
  };

  initReviewsPage();
});