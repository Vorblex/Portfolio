'use strict';

// ==========================================
// Slider
// ==========================================

export default class Slider {  
  constructor(sliderContainer, durationTime = 500)     {     
    this.prevBtn = sliderContainer.find('.slider__control_prev');
    this.nextBtn = sliderContainer.find('.slider__control_next');


    let 
      container = sliderContainer,
      display = container.find('.slider__img'),
      items = this.prevBtn.find($('.slider__control-item')),
      itemsNext,
      itemsLength = items.length,
      description = container.find('.slider__desc'),
      title = container.find('.subtitle'),
      link = container.find('.slider__link'),
      duration = durationTime,
      flag = true,
      counter = 0;
    

    let data = (function() {
      let dataObject = {
        pics: [],
        titles: [],
        descs: [],
        links: []
      };

      for(let item of items) {
        dataObject.pics.push($(item).data('src'));
        dataObject.titles.push($(item).data('title'));
        dataObject.descs.push($(item).data('desc'));
        dataObject.links.push($(item).data('link'));
      }

      return dataObject;
    }());
   

    let generateAnimatedText = (string, block) => {      
      let
        text = string.trim(),
        lettersArray = text.split(''),
        wordsArray = text.split(' '),
        newTextLength = lettersArray.length - wordsArray.length + 1,
        delayBase = duration / 1000 / newTextLength,
        letterNdx = 0,
        tempWord = [],
        newText = '';
        
      wordsArray.forEach( (word, ndx) => {
        tempWord = word.split('');
        let newWord = ''; 
          
        tempWord.forEach(letter => {
          letterNdx++;
          newWord += `<span class="letter" style="animation-delay: ${delayBase * (letterNdx + 1)}s">${letter}</span>`;
        });
        newText += `<span class="word">${newWord}</span>`;
        if(ndx < wordsArray.length -1) newText += '<span> </span>';
      });
        
      block.html(newText);
      block.find('.letter').addClass('animated');

    }; 

  
    let changeTextData = slide => {
      generateAnimatedText(data.titles[slide], title);
      generateAnimatedText(data.descs[slide], description);
      link.attr('href', data.links[slide]);
    };    

    
    let generateMarkup = () => {
      let markup = this.prevBtn.find('.slider__control-list').clone();
        
      this.nextBtn.append(markup)
             .find('.slider__control-item')
             .removeClass('active')
             .eq(counter + 1)
             .addClass('active');
    };
    

    let setDefault = () => {
      generateMarkup();
      changeTextData(counter);  
      display.attr('src', data.pics[counter]);  
      items.removeClass('active')
           .eq(counter - 1)
           .addClass('active');
    };
    
    setDefault();


    itemsNext = this.nextBtn.find($('.slider__control-item')); 

    let slideButtons = (slide, cb) => {
      let bothItems = {
        leftActiveItem:  items.filter('.active'),
        leftNextItem: items.eq(slide - 1),
        rightActiveItem: itemsNext.filter('.active'),
        rightNextItem: itemsNext.eq(slide + 1 > itemsLength - 1 ? 0 : slide + 1)
      };
 
      
      let changeItem = (type = 'left') => {
        let 
          active = type + 'ActiveItem',
          next = type + 'NextItem',
          percents = type === 'left' ? 100 : -100;
        bothItems[active].animate({'top': `${percents}%`}, duration);
        bothItems[next].animate({'top': '0%'}, duration, function() {
          $(this).addClass('active')
                 .siblings().removeClass('active')
                 .css('top', `${-percents}%`);
          cb();
        });
        if(type === 'left') {
          changeItem('right');
        }
      };

      changeItem();
    };


    let changeDisplay = slide => {
      display.fadeOut(duration / 2, function() {
        $(this).attr('src', data.pics[slide]).fadeIn(duration / 2);
      });
    };
 

    let animateAll = counter => {
      let animationState = $.Deferred();

      slideButtons(counter, () => animationState.resolve());  
      changeDisplay(counter);
      changeTextData(counter);

      return animationState;
    };


    let moveSlide = direction => {
      if(flag) {
        flag = false;
        let directions = {
          prev() {
            counter > 0 ? counter-- : counter = itemsLength - 1;  
          },
          next() {
            counter < itemsLength - 1 ? counter++ : counter = 0;      
          }
        };

        directions[direction]();

        animateAll(counter).done(() => flag = true);    
      }

    };

    this.move = direction => {
      moveSlide(direction);
    };

  }

  init() {
    this.prevBtn.on('tap', e => {
      e.preventDefault();
      this.move('prev');    
    });
    this.nextBtn.on('tap', e => {
      e.preventDefault();
      this.move('next');
    });
  }
  
}

