'use strict';

//================================================================//
//*********** app.js ***********//
//*********** © Vorobey Alexander - Vorblex
//================================================================//

//------------ import
import pageScroll from './pageScroll.js';
import preloader from './preloader.js';
import parallax from './parallax.js';
import mainNav from './main-nav.js';
import flipper from './flipper.js';
import Slider from './slider.js';
import blur from './blur.js';
import map from './map';

//------------ init

preloader();
svg4everybody();

if($('.main-nav').length) {
  mainNav($('.hamburger'));
}

if($('#blur').length) {
  $(window).on('load', blur);
  $(window).on('resize', blur);
}

if($('.slider').length) {
  let slider = new Slider($('.slider'), 700);
  slider.init();
}

if($('.welcome').length) {
  $(window).on('mousemove', parallax.mouse);
  flipper();
} else {
  $(window).on('scroll', parallax.scroll);
  pageScroll();
}

if($('#map').length) {
  map();
}
