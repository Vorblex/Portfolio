export default function() {
  let
    container = $('.skills'),
    skills = container.find('.circle__second'),
    dasharray = 282.6,
    dashoffset,
    percentage,
    $this;

    
  skills.each(function() {
    $this = $(this);
    
    if(typeof $this.closest('.skills-section').data('animated') !== 'undefined') {
      percentage = $this.data('percentage');
      dashoffset = ((100 - percentage) / 100) * dasharray;
      $this.css('strokeDashoffset', dashoffset);
    }
    
  });

}