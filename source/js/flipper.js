// ==========================================
// Flip actions on welcome page
// ==========================================

export default function() {

  let 
    flipper = $('.flipper'),
    button = $('#flipBtn');
   
  button.on('tap', function() {
    flipper.addClass('active');
    $(this).addClass('hide');
  });
      
  $(document).on('tap', function(e) {
    if(!$(e.target).find('.flipper').hasClass('active')) return;
    flipper.removeClass('active');
    button.removeClass('hide');
  });
}