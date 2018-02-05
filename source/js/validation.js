import clearForm from './clearForm.js';
import createQtip from './createQtip.js';

export default (function () {
    
  let removeError = function() {
    $(this).removeClass('error');
  };


  let validateForm = function(form) {
    let
      elements = $(form).find('input, textarea')
      .not('input[type="file"] input[type="hidden"]'),
      valid = true;

    elements.each(function() {
      let
        $this = $(this),
        val = $this.val(),
        pos = $this.attr('qtip-position');

      if(val.length === 0) {
        createQtip($this, pos);
        $this.addClass('error');
        valid = false;
      }
    });

    if(form.robot) {
      let radio = form.robot;

      if(radio.value == false) {
        $(radio[0]).next().addClass('error');
        valid = false;
      }
    }

    if(form.ishuman) {
      let checkbox = form.ishuman;
      
      if(!checkbox.checked) {
        $(checkbox).parent().addClass('error');
        valid = false;
      }
    }

    return valid;
  };


  let attachEvents = () => {
    $('form').on('keydown', '.error', removeError);
    $('form').on('reset', clearForm);
    $('.radios__label').on('click', removeError);
    $('.checkbox').on('click', removeError);
  };
    
    
  let init = () => {
    attachEvents();
  };
    
    
  return {
    init: init(),
    validateForm
  };
}());