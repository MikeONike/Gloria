$(window).on('load', function () {

   var searchIcon = $('.header-search form > a.fas.fa-search');
   var headerSearchInput = $('.header-search-input');
   var overlay = $('.overlay');

   var hamMenu = $('.ham-menu');
   var headNav = $('.head-nav');

   // var subMenuItems = $('.head-nav > ul > li > ul');
   // var menuItems = $('.head-nav > ul > li');
   // var menuItemsArray = menuItems.toArray();


   ///////////////////////////////
   // show search input on click
   ///////////////////////////////

   function checkSearchClass() {
      if (headerSearchInput.hasClass('search-visible')) {
         headerSearchInput.removeClass('search-visible');
         $('.header-search-input input').val('');
      } else {
         headerSearchInput.addClass('search-visible');
      }
   }

   searchIcon.on('click', function () {
      checkSearchClass();

      overlay.css('display', 'block');
      console.log(event.target)
   })

   overlay.on('click', function () {
      checkSearchClass();

      overlay.css('display', 'none');
   })

   //////////////////////////////////////
   // display / hide head menu on click
   //////////////////////////////////////

   hamMenu.on('click', function () {
      if (headNav.hasClass('head-nav-block')) {
         headNav.removeClass('head-nav-block')
      } else {
         headNav.addClass('head-nav-block')
      }

      if (hamMenu.hasClass('ham-close')) {
         hamMenu.addClass('ham-open').removeClass('ham-close');
      } else {
         hamMenu.addClass('ham-close').removeClass('ham-open');
      }

   });


   ///////////////////////////////////////

   $('.head-nav li a > span:contains(magazin)').closest('li').css('order', '1');
   $('.head-nav li a > span:contains(živim)').closest('li').css('order', '2');


   $('.head-nav li a > span:contains(magazin) + span').css('visibility', 'hidden');
   $('.head-nav li a > span:contains(živim) + span').css('visibility', 'hidden');


   //////////////////////////////////
   // header menu chevron
   //////////////////////////////////

   $('span.fas.fa-sort-down').on('click', (e) => {
      e.preventDefault();

      $('span.fas.fa-sort-down').parents('li').children('ul').css('height', '0px');

      let height = $(e.target).parents('li').children('ul')[0];
      if ($(e.target).parents('li').children('ul').height() > 0) {
         $(e.target).parents('li').children('ul').css('height', '0px');
      } else {
         $(e.target).parents('li').children('ul').css('height', `${height.scrollHeight}px`)
      }
   });
});