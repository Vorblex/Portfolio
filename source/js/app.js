'use strict';

//================================================================//
//*********** app.js ***********//
//*********** © Vorobey Alexander - Vorblex
//================================================================//

//------------ import

import preloader from './preloader.js';
import mainNav from './main-nav.js';
import flipper from './flipper.js';
import Slider from './slider.js';
import map from './map';

//------------ init

svg4everybody();
preloader();
flipper();

if($('.main-nav').length) {
  mainNav($('.main-nav'), $('.hamburger'));
}

if($('.slider').length) {
  let slider = new Slider($('.slider'), 700);
  slider.init();
}

if($('#map').length) {
  map();
}
