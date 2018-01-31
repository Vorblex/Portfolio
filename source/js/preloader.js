// ==========================================
// Preloader
// ==========================================
 
let
  preloaderStatus = $('.preloader__percentage'),
  hasImageProperties = ['background', 'backgroundImage', 'listStyleImage', 'borderImage', 'borderCornerImage', 'cursor'],
  hasImageAttributes = ['srcset'],
  matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g,
  allImages = [],
  total = 0,
  count = 0,
  circle_o = $('.preloader__circle_outer'),
  circle_c = $('.preloader__circle_center'),
  circle_i = $('.preloader__circle_inner'),
  length_o = Math.PI * (circle_o.attr('r') * 2),
  length_c = Math.PI * (circle_c.attr('r') * 2),
  length_i = Math.PI * (circle_i.attr('r') * 2);


export default () => {

  let imageLoaded = () => {

    count ++;
    
    let percentage = Math.ceil(count / total * 100 );

    percentage = percentage > 100 ? 100 : percentage;

    circle_o.css({strokeDashoffset: ((100 - percentage) / 100) * length_o });

    if(percentage > 50) {
      circle_c.css({strokeDashoffset: ((100 - percentage) / 100) * length_c });
    }

    if(percentage === 100) {
      circle_i.css({strokeDashoffset: ((100 - percentage) / 100) * length_i });
    }

    preloaderStatus.html(percentage);
    
    if(count === total){
      return doneLoading();
    }
  };


  let doneLoading = () => {
    preloaderStatus.css({'animation' : 'none'});
    $('.preloader').delay(700).fadeOut(700, function(){
      $(this).remove();

      if($('.flipper').length){
        $('.flipper').removeClass('unloaded');
      }
    });
  };


  let imagesLoop = total => {
    for(let i = 0; i < total; i++){
      let testImage = new Image();

      testImage.onload = imageLoaded;
      testImage.onerror = imageLoaded;

      if (allImages[i].srcset) {
        testImage.srcset = allImages[i].srcset;
      }

      testImage.src = allImages[i].src;
    }
  };


  $('*').each(function () {
    let element = $(this);

    if (element.is('img') && element.attr('src')) {
      allImages.push({
        src: element.attr('src'),
        element: element[0]
      });
    }

    $.each(hasImageProperties, (i, property) => {
      let propertyValue = element.css(property);
      

      if (!propertyValue) {
        return true;
      }
      
      let match = matchUrl.exec(propertyValue);
      if (match) {
        allImages.push({
          src: match[2],
          element: element[0]
        });
      }
    });

    $.each(hasImageAttributes, (i, attribute) => {
      let attributeValue = element.attr(attribute);

      if (!attributeValue) {
        return true;
      }

      allImages.push({
        src: element.attr('src'),
        srcset: element.attr('srcset'),
        element: element[0]
      });
    });
  });

  total = allImages.length;

  if (total === 0) {
    doneLoading();
  } else {
    imagesLoop(total);
  }
};