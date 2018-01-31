// ==========================================
// Parallax
// ==========================================

let 
  container = $('.parallax'),
  items = container.find('.parallax__item'),
  translate,
  strafe;


let isNoParallax = function() {
  return container.css('display') === 'none';
};



let applyStyles = function(element) {
  element.css(
    {
      'transform' : translate,
      'webkitTransform' : translate      
    });
};


export default {
      
  scroll() { 
    if(isNoParallax()) return;


    let wScroll = $(this).scrollTop();
    strafe = wScroll / -200;
    
    items.each(function(i) {
      
      translate = `translate3d(0, ${strafe * (i - 9)}%, 0)`;
      
      container.css('opacity', 1 - wScroll / 2000);
      
      applyStyles($(this)); 
    });
    
  },
  
  mouse(e) {
    if(isNoParallax()) return;

    let
      initialX = window.innerWidth / 2 - e.pageX,
      initialY = window.innerHeight / 2 - e.pageY;

    items.each(function(i) {

      strafe = i / 100;

      let 
        positionX = initialX * strafe,
        positionY = initialY * strafe;

      translate = `translate3d(${positionX}px, ${positionY}px, 0)`;

      applyStyles($(this));
    });

  }

};