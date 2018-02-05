export default function() {
  let $this = $(this);
  $this.find('input, textarea').trigger('hideTooltip');
  $this.find('.error').removeClass('error');
}