'use strict';

// ==========================================
// Main menu toggle and active class highlighted 
// ==========================================

export default function(trigger) {
  let
    nav = $('.main-nav'),
    navItems = nav.find('.main-nav__item'),
    navLinks = nav.find('.main-nav__link');


  trigger.on('tap', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    nav.toggleClass('active');
  });

  
  navLinks.each(function() {
    let $this = $(this),
      url = $(location)[0].pathname;
    if($this.attr('href') === url) {
      $this.addClass('active');
    }
  });  

  
  navItems.each(function(index) {
    let item_delay = 0.3 + 0.1 * index;
    $(this).css('transition-delay', item_delay + 's');
  });
}


