// ==========================================
// Page scroll
// ==========================================

export default function() {
  let
    goDownBtn = $('.down-arrow'),
    goUpBtn = $('.up-arrow'),
    page = $('html, body'),
    target = goDownBtn.data('target'),
    offset = $(target).offset().top;
        

  let slide = (offset) => {
    page.stop().animate({
      scrollTop: offset
    }, 1000);
  }; 
        

  let attachEvent= () => {
    goDownBtn.on('click', function(e) {
      e.preventDefault();
      slide(offset);

    });
    goUpBtn.on('click', function(e) {
      e.preventDefault();
      slide(0);
    });
  };

  return attachEvent();
}


