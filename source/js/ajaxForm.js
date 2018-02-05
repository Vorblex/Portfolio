import sendAjax from './sendAjax.js';
import validation from './validation.js';

export default function() {

  let clearStatus = function() {
    let form = $(this);
    form.find('.form-message').text('');
  };


  let showStatus = (container, res) => {
    console.log(res);
    let
      form = $(container),
      successBox = form.find('.form-message_success'),
      errorBox = successBox.next();

    if(res.status === 'ok') {
      successBox.text(res.text);
    } else {
      errorBox.text(res.text);
    }
  };


  let sendForm = (form, url, cb) => {
    if(!validation.validateForm(form)) return false;

    let data = new FormData(form);

    clearStatus.call(form);
    
    $(form).find('.form-message_success').text('Данные отправляются...');
    
    sendAjax(url, data).then(
      (res) => {
        clearStatus.call(form);

        if(res === null) {
          res = {status: 'error', text: 'Ошибка при отправке'};
        }

        showStatus(form, res);

        if(cb) {
          cb(res);
        }
      },
      (e) => {
        console.log(e.message);
      });

  };


  let submitForm = function(e) {
    e.preventDefault();

    let url = $(this).attr('action');

    sendForm(this, url, (res) => {
      // console.log(res);
    });
    
  };


  let attachEvents = () => {
    $('form').on('submit', submitForm);
    $('form').on('reset', clearStatus);
  };


  let init = () => {
    attachEvents();
  };


  return {
    init: init()
  };
}