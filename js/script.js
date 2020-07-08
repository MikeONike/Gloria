$(window).on('load', function () {

   var searchIcon = $('.header-search form > a.fas.fa-search');
   var headerSearchInput = $('.header-search-input');
   var overlay = $('.overlay');

   var hamMenu = $('.ham-menu');
   var headNav = $('.head-nav');

   var containerWidth = $('.container').width();

   var topFooterLeftHead = $('.top-footer-left-head')[0];

   // var subMenuItems = $('.head-nav > ul > li > ul');
   // var menuItems = $('.head-nav > ul > li');
   // var menuItemsArray = menuItems.toArray();


   ///////////////////////////////
   // show search input on click
   ///////////////////////////////

   function checkSearchClass() {
      if (headerSearchInput.hasClass('search-visible')) {
         headerSearchInput.removeClass('search-visible');
      } else {
         headerSearchInput.addClass('search-visible');
         overlay.css('display', 'block');
      }
   }

   searchIcon.on('click', function (e) {
      e.preventDefault();
      checkSearchClass();
   });

   overlay.on('click', function () {
      checkSearchClass();

      overlay.css('display', 'none');
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

   function changeNavOrder() {
      // $('.head-nav li a > span:contains(magazin)').closest('li').css('order', '1');
      // $('.head-nav li a > span:contains(živim)').closest('li').css('order', '2');
      $('ul li a:contains(magazin)').closest('li').css('order', '1');
      $('ul li a:contains(živim)').closest('li').css('order', '2');
   }

   function revertNavOrder() {
      // $('.head-nav li a > span:contains(magazin)').closest('li').css('order', '0');
      // $('.head-nav li a > span:contains(živim)').closest('li').css('order', '0');
      $('ul li a:contains(magazin)').closest('li').css('order', '0');
      $('ul li a:contains(živim)').closest('li').css('order', '0');
   }

   if ($(window).width() <= 900) {
      changeNavOrder();
   }

   $(window).on('resize', function () {
      if ($(window).width() <= 900) {
         changeNavOrder();
      } else {
         revertNavOrder();
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
      }else {
         if($(window).scrollTop() >= 60) {
            $('main').css('margin-top', `${$('.header-bottom').height()}px`);
         }
         $('main').css('margin-top', `0px`);
      }
   }
   
   mainMarginTop();
   $(window).on('resize scroll', function () {
      mainMarginTop();
   })

   /////////////////////////////////////////////

   $('.newsletter-text').css('height', `${$('.top-footer-left-head').outerHeight()}px`); 


});