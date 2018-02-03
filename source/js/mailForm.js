import sendAjax from './sendAjax.js';

export default function() {

  let clearForm = function() {
    let form = $(this);
    form.find('.form-message').text('');
  };


  let showStatus = (container, res) => {
    let
      form = $(container),
      successBox = form.find('.form-message_success');

    if(res.status === 'ok') {
      successBox.text(res.text);
    } else {
      form.find('.form-message_error').text(res.text);
    }
  };


  let sendForm = (form, url, cb) => {
    // if(!isValid) return;
    let data = new FormData(form);

    clearForm.call(form);
    
    $(form).find('.form-message_success').text('Отправка сообщения...');
    sendAjax(url, data).then(
      (res) => {
        clearForm.call(form);
        showStatus(form, res);
        if(cb) {
          cb(res);
        }
      },
      (e) => {
        console.log(e);
      });

  };


  let sendMail = function(e) {
    e.preventDefault();
    let url = '/mail.php';
    
    sendForm(this, url, (res) => {
      console.log(res);
    });
    
  };


  let attachEvents = () => {
    $('#mailForm').on('submit', sendMail);
    $('#mailForm').on('reset', clearForm);
  };


  let init = () => {
    attachEvents();
  };


  return {
    init: init()
  };
}