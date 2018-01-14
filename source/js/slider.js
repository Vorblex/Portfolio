'use strict';

export default class Slider {  
  constructor(sliderContainer, durationTime = 500)     {
    let 
      container = sliderContainer,
      display = container.find('.slider__view'),
      prevBtn = container.find('.slider__control_prev'),
      nextBtn = container.find('.slider__control_next'),
      items = prevBtn.find($('.slider__control-item')),
      itemsLength = items.length,
      title = container.find('.subtitle'),
      description = container.find('.slider__desc'),
      link = container.find('.slider__link'),
      duration = durationTime,
      flag = true,
      timeout,
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

    let generateMarkup = () => {
      let markup = prevBtn.find('.slider__control-list').clone();
        
      nextBtn.append(markup)
        .find('.slider__control-item')
        .removeClass('active')
        .eq(counter + 1)
        .addClass('active');
    };
    
    let setDefault = () => {
      generateMarkup();
      display.find('.slider__img')
        .attr('src', data.pics[counter]);  
        
      items
        .removeClass('active')
        .eq(counter - 1)
        .addClass('active');
    };
    
    setDefault();

    let slidePrev = (slide) => {
      let
        activeItem = items.filter('.active'),
        nextItem = items.eq(slide - 1);

      activeItem.stop(true, true)
                .animate({'top': '100%'}, duration);

      nextItem.stop(true, true)
      .animate({'top': '0%'}, duration, function() {
        $(this).addClass('active')
          .siblings().removeClass('active')
          .css('top', '-100%');
      });          
    };

    let itemsNext = nextBtn.find($('.slider__control-item')); 

    let slideNext = (slide) => {
      slide = slide + 1 > itemsLength - 1 ? 0 : slide + 1;

      let
        activeItem = itemsNext.filter('.active'),
        nextItem = itemsNext.eq(slide);

      activeItem.stop(true, true)
                .animate({'top': '-100%'}, duration);

      nextItem.stop(true, true)
      .animate({'top': '0%'}, duration, function() {
        $(this).addClass('active')
          .siblings().removeClass('active')
          .css('top', '100%');
      });  
    };
    
    let changeDisplay = (slide) => {

    };
    
    let changeText = (slide) => {

    };

    let moveSlide = direction => {

      let directions = {
        prev() {
          counter > 0 ? counter-- : counter = itemsLength - 1;
          console.log(counter);  
        },
        next() {
          counter < itemsLength - 1 ? counter++ : counter = 0;     
          console.log(counter);  
        }
      };

      directions[direction]();

      if(flag) {
        flag = false;

        if(typeof timeout !== undefined) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          flag = true;
        }, duration + 50);

        slidePrev(counter);
        slideNext(counter);
        changeDisplay(counter);
        changeText(counter);
      }

    };

    this.move = function (direction) {
      moveSlide(direction);
    };

    this.prevButton = container.find('.slider__control_prev');
    this.nextButton = container.find('.slider__control_next');
  }
  init() {
    this.prevButton.on('tap', e => {
      e.preventDefault();
      this.move('prev');
    });
    this.nextButton.on('tap', e => {
      e.preventDefault();
      this.move('next');
    });
  }
  
  }
        
  
