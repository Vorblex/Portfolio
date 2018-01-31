// ==========================================
// Change mail-form background position
// ==========================================

let 
  section = $('.reviews'),
  formBg = section.find('.mail-form__bg'),
  offset = 0;


let applyStyles = function(elements, size) {
  elements.css('background-size', size);
};


export default function () {
  offset = section.offset().top - formBg.offset().top;

  formBg.css('backgroundPosition', `center ${offset}px`);

  if($(window).width() > 2000){
    applyStyles($('.reviews, .mail-form__bg'), $(window).width() / 16 + 'rem');
  } else {
    applyStyles($('.reviews, .mail-form__bg'), '125rem');
  }
}