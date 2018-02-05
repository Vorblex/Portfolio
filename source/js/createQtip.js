export default function(element, position='right') {
  
  if(position === 'right') {
    position = {
      my: 'left center',
      at: 'right center'
    };
  } else {
    position = {
      my: 'right center',
      at: 'left center',
      adjust: {
        method: 'shift none'
      }
    };
  }

  if($(window).width() < 768) {
    position = {
      my: 'center center',
      at: 'center center'
    };
  }


  element.qtip({
    content: {
      text: function() {
        return $(this).attr('qtip-content');
      }
    },
    show: {
      event: 'show'
    },
    hide: {
      event: 'keydown hideTooltip'
    },
    position: position,
    style: {
      classes: 'qtip-rounded qtip-red qtip-mystyle ',
      tip: {
        height: 10,
        width: 16
      }
    }
  }).trigger('show');
}