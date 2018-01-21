export default function() {
  let 
    flipper = $('.flipper'),
    button = $('#flipBtn');

  if(!flipper.length) return;
  
  button.on('tap', function(e) {
    flipper.addClass('active');
    $(this).addClass('hide');
  });
      
  $(document).on('tap', function(e) {
    if(!$(e.target).find('.flipper').hasClass('active')) return;
    flipper.removeClass('active');
    button.removeClass('hide');
  });
}