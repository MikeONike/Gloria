$(window).on('load', function () {

   var searchIcon = $('.header-search form > a.fas.fa-search');
   var headerSearchInput = $('.header-search-input');
   var overlay = $('.overlay');

   var hamMenu = $('.ham-menu');
   var headNav = $('.head-nav');

   var containerWidth = $('.container').width();

   var topFooterLeftHead = $('.top-footer-left-head')[0];

   var postFormatDiagonal;
   var articleContentWidth;
   var articleContentOffset;

   var video = $('video');

   var flexItemBasis;

   // var newsletterInnerWidth = $('.newsletter-inner-box').outerWidth();
   // var newsletterInnerHeight = $('.newsletter-inner-box').outerHeight();

   // var subMenuItems = $('.head-nav > ul > li > ul');
   // var menuItems = $('.head-nav > ul > li');
   // var menuItemsArray = menuItems.toArray();


   ///////////////////////////////
   // show search input on click
   ///////////////////////////////

   function checkSearchClass() {
      if (headerSearchInput.hasClass('search-visible')) {
         headerSearchInput.removeClass('search-visible');
         console.log(0)
      } else {
         headerSearchInput.addClass('search-visible');
         console.log(1)
         // overlay.css('display', 'block');
      }
   }

   searchIcon.on('click', function (e) {
      e.preventDefault();
      checkSearchClass();
   });

   $(document).on('click', function (e) {

      if ($(e.target).is('input') || $(e.target).is('a.fas.fa-search')) {
         return;
      }

      headerSearchInput.removeClass('search-visible');
   })

   //////////////////////////////////////
   // display / hide head menu on click
   //////////////////////////////////////

   function openCloseMenu() {
      if (headNav.hasClass('head-nav-block')) {
         headNav.removeClass('head-nav-block')
      } else {
         headNav.addClass('head-nav-block')
      }
   }

   function menuToggleBtn() {
      if (hamMenu.hasClass('ham-close')) {
         hamMenu.addClass('ham-open').removeClass('ham-close');
      } else {
         hamMenu.addClass('ham-close').removeClass('ham-open');
      }
   }

   hamMenu.on('click', function () {
      openCloseMenu();
      menuToggleBtn();
   });

   $(window).on('resize', function () {
      if ($(window).width() > 900) {
         headNav.removeClass('head-nav-block');
         hamMenu.addClass('ham-close').removeClass('ham-open');
      }
   })


   /////////////////////////////////////////
   // change header navigation link order
   /////////////////////////////////////////

   function changeNavOrderHeader() {
      $('.head-nav li a > span:contains(magazin)').closest('li').css('order', '1');
      $('.head-nav li a > span:contains(živim)').closest('li').css('order', '2');
   }

   function changeNavOrderFooter() {
      $('.footer ul li a:contains(magazin)').closest('li').css('order', '1');
      $('.footer ul li a:contains(živim)').closest('li').css('order', '2');
   }

   function revertNavOrderHeader() {
      $('.head-nav li a > span:contains(magazin)').closest('li').css('order', '0');
      $('.head-nav li a > span:contains(živim)').closest('li').css('order', '0');
   }

   function revertNavOrderFooter() {
      $('.footer ul li a:contains(magazin)').closest('li').css('order', '0');
      $('.footer ul li a:contains(živim)').closest('li').css('order', '0');
   }

   changeNavOrderFooter();

   if ($(window).width() <= 992) {
      changeNavOrderHeader();
   }

   $(window).on('resize', function () {
      if ($(window).width() <= 992) {
         changeNavOrderHeader();
      } else {
         revertNavOrderHeader();
      }
   })

   $('.head-nav li a > span:contains(magazin) + span').css('visibility', 'hidden');
   $('.head-nav li a > span:contains(živim) + span').css('visibility', 'hidden');

   //////////////////////////////////
   // header menu accordion
   //////////////////////////////////

   function slideHeaderAccordion($target, $height, $classOne, $classTwo, $border, $color) {
      $($target).parents('li').children('ul').css('height', $height);
      $($target).removeClass($classOne).addClass($classTwo);
      $($target).css('border', $border);
      $($target).css('color', $color);
   }

   $('.head-nav > ul > li > a span.fas').on('click', (e) => {
      e.preventDefault();

      slideHeaderAccordion('.head-nav > ul > li > a span.fas', '0px', 'fa-sort-up', 'fa-sort-down', '', '');

      let height = $(e.target).parents('li').children('ul')[0];
      if ($(e.target).parents('li').children('ul').height() > 0) {
         slideHeaderAccordion(e.target, '0px', 'fa-sort-up', 'fa-sort-down', '', '');
      } else {
         slideHeaderAccordion(e.target, height.scrollHeight, 'fa-sort-down', 'fa-sort-up', 'none', '#000');
      }
   });

   ////////////////////////////////////
   // header fixed on scroll
   ////////////////////////////////////

   function checkScrollTop() {
      containerWidth = $('.container').width();
      var windows = $(window);
      if ($(window).scrollTop() >= 60) {
         if (windows.outerWidth() >= 992) {
            $('.header').addClass('header-fixed');
            $('.header').css('width', `${containerWidth}`);
         } else {
            $('.header').removeClass('header-fixed');
            $('.header').css('width', ``);

         }
      } else {
         $('.header').removeClass('header-fixed');
         $('.header').css('width', ``);
      }
   }

   checkScrollTop();


   $(window).on('scroll', function () {

      checkScrollTop();
   });
   $(window).on('resize', function () {

      checkScrollTop();
   });

   //////////////////////////////////////////
   // set <main> margin top == header height
   //////////////////////////////////////////

   function mainMarginTop() {
      if ($(window).outerWidth() <= 992) {
         $('main').css('margin-top', `${$('.header').height()}px`);
      } else {
         if ($(window).scrollTop() >= 60) {
            $('main').css('margin-top', `${$('.header-bottom').height()}px`);
         }
         $('main').css('margin-top', `0px`);
      }
   }

   mainMarginTop();
   $(window).on('resize scroll', function () {
      mainMarginTop();
   })

   ///////////////////////////////////////////////////////////
   // newsletter text and top footer left head equal height
   ///////////////////////////////////////////////////////////

   $(window).on('resize', function () {
      if ($('.newsletter-text').outerHeight() >= $('.top-footer-left-head').outerHeight()) {
         $('.top-footer-left-head').css('min-height', `${$('.newsletter-text').outerHeight()}px`);
      } else {
         $('.newsletter-text').css('min-height', `${$('.top-footer-left-head').outerHeight()}px`);
      }
   })

   /////////////////////////////////////////////
   // button back to top
   /////////////////////////////////////////////

   $('.footer .top-btn a').on('click', function () {
      $('body, html').animate({
         scrollTop: 0
      }, 1000);
   });

   ////////////////////////////////////////
   // position post format in center
   ////////////////////////////////////////
   postFormatDiagonal = Math.sqrt(Math.pow($('.post-format').width(), 2) + Math.pow($('.post-format').width(), 2));

   function positionPostFormatIcon($offset, $width, $postformat, $postFormatLead) {

      articleContentWidth = $width.outerWidth();

      articleContentOffset = $offset.offset().left;

      $postformat.offset({
         left: articleContentOffset + articleContentWidth / 2 - postFormatDiagonal / 2
      });

      $postformat.css('top', `-22px`);

      $('.sub-category .post-format').css({
         'bottom': '-23px', 
         'top': ''
      })

      if ($(window).outerWidth() >= 768) {

         $('.home-main-lead .post-format').css({
            'bottom': `20px`,
            'top': ''
         });

      } else {

         $('.home-main-lead .post-format').css({
            'bottom': '',
         });

      }
     
   }

   for (var i = 0; i < $('.home-article').length; i++) {
      positionPostFormatIcon(
         $($('.home-article .article-img')[i]),
         $($('.home-article .article-img')[i]),
         $($('.post-format')[i]),
         $($('.home-main-lead .post-format')[i])
      );
   }
   $(window).on('resize', function () {
      for (var i = 0; i < $('.home-article').length; i++) {
         positionPostFormatIcon(
            $($('.home-article .article-img')[i]),
            $($('.home-article .article-img')[i]),
            $($('.post-format')[i]),
            $($('.home-main-lead .post-format')[i])
         );
         console.log($($('.home-article')[i]).offset().left);
      }

   })

   /////////////////////////////////////////////////////////////
   // if article contains video remove black overlay on hover
   /////////////////////////////////////////////////////////////

   for (var i = 0; i < $('.article-img').length; i++) {

      if ($($('.article-img')[i]).children()[0] == $($('.article-img')[i]).children('video')[0]) {
         $($('.article-img')[i]).addClass('article-img-no-after');
      }
   }

   /////////////////////////////////////////////
   // add mute icon on video if video is muted 
   /////////////////////////////////////////////

   for (var i = 0; i < video.length; i++) {
      if ($('video')[i].muted == true) {
         console.log('true')
         $($('video')[i]).parent('a').addClass('video-muted');
         $($('video')[i]).parent('a').removeClass('article-img-no-after');
      }
   }

   $('video').on('play pause ended timeupdate volumechange', (e) => {
      if ($(e.target)[0].muted == true) {
         $(e.target).parent('a').addClass('video-muted');
         $(e.target).parent('a').removeClass('article-img-no-after');
      } else {
         $(e.target).parent('a').removeClass('video-muted');
         $(e.target).parent('a').addClass('article-img-no-after');
      }
   });

   ////////////////////////////////////////////////////////
   // CALCULATE MARGINS
   ////////////////////////////////////////////////////////

   function flexMargins() {
      if (!($('.flex-item').css('flex-basis'))) {
         return;
      }
      flexItemBasis = $('.flex-item').css('flex-basis').replace('%', '');
      flexItemBasis = Number(flexItemBasis);

      //I - calculate how many items are there by dividing 100% by Flex Basis to get number of items in the flex container (100 / 49 == 2)
      //II - than multiplay that by flax basis to know how much space those items take (49 * 2 == 98)
      //III - than 	subtract that from 100% to know find out how much space is left for margins (100% - 98% == 2%)

      //I.1 - same as I and multiplay that by 2 to get how many margins should be set (2 * 2 == 4)

      //final - subtract III by I.1 to get left and right margin value in % (2 / 4 == 0.5%)

      flexItemMargin = (100 - (flexItemBasis * Math.floor((100 / flexItemBasis)))) / (Math.floor((100 / flexItemBasis)) * 2);

      if ((100 - (flexItemBasis * Math.floor((100 / flexItemBasis)))) <= 0) {
         return;
      }

      $('.flex-item').css('margin-right', `${flexItemMargin}%`);
      $('.flex-item').css('margin-left', `${flexItemMargin}%`);
   }

   flexMargins();

   $(window).resize(function () {
      flexMargins();
   });


   /////////////////////////////////////////////////////////

   // function setOuterBoxDimensions() {
   //    $('.newsletter .newsletter-outer-box').css({
   //       'width': `${newsletterInnerWidth}px`,
   //       'height': `${newsletterInnerHeight}px`
   //    })
   // }

   // setOuterBoxDimensions();

   // $(window).on('scroll', () => {
   //    newsletterInnerWidth = $('.newsletter-inner-box').outerWidth();
   //    newsletterInnerHeight = $('.newsletter-inner-box').outerHeight();
   //    setOuterBoxDimensions();
   // })

});