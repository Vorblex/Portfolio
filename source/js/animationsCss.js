import animateSkills from './animateSkills.js';

export default function() {
    
  var checkDistance = function (scrollTop, elem) {
    var offset = elem.offset().top,
      windowHeight = Math.ceil($(window).height() / 1.3),
      topBorder = offset - scrollTop - windowHeight,
      bottomEdge = elem.outerHeight(true) + offset,
      bottomBorder = scrollTop + windowHeight - bottomEdge;

    return topBorder <= 0 && bottomBorder <= 0;

  };

  var animationsActions = {
    toTop : function () {
      $(this).addClass('toTop');
    },

    toRight : function () {
      $(this).addClass('toRight');
    },
        
    toLeft : function () {
      $(this).addClass('toLeft');
    }
  };
    
  var init = function() {
    $(window).scroll(function(){
      var scrollTop = $(window).scrollTop();
              
      $('.animated').each(function () {
        var $this = $(this);

        if ( checkDistance(scrollTop, $this)) {
          var animationType = $this.data('animate');

          if (typeof $this.data('animated') == 'undefined') {
            $this.data('animated', true);
            animationsActions[animationType].call($this);
            if($('.skills').length) animateSkills();
          }

        }
      });
    });
  };
    
  return init();
    
}