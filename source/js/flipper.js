// ==========================================
// Flip actions on welcome page
// ==========================================
import clearForm from './clearForm.js';

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
    clearForm.call($('form'));
    flipper.removeClass('active');
    button.removeClass('hide');
  });
}