'use strict';

//================================================================//
//*********** app.js ***********//
//*********** © Vorobey Alexander - Vorblex
//================================================================//

//------------ import
// import map from './map';
import Slider from './slider.js';
let slider = new Slider($('.slider'), 700);
slider.init();

// map();
svg4everybody();

let hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('tap', (e) => {
  e.preventDefault();
  let nav = document.querySelector('.main-nav');
  if(!nav.classList.contains('active')) {
    hamburger.classList.add('active');
    nav.classList.add('active');
  } else {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  }
});