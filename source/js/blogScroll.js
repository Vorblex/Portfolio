export default function() {

  let
    menu = $('.menu'),
    menuToggle = menu.find('.menu__toggle'),
    menuList = menu.find('.menu__list'),
    menuItems = menuList.find('.menu__item'),
    postsContainer = $('.posts-list'),
    posts = postsContainer.find('.posts-list__item'),
    windowHeight,
    postsContainerOffset,
    menuLimit;

  let getVariables = () => {
    windowHeight = $(window).height(),
    postsContainerOffset = postsContainer.offset().top,
    menuLimit = postsContainerOffset;
  };

  getVariables();


  let setFixedMenu = function(scroll) {
    if(scroll >= menuLimit && !menu.hasClass('fixed')) {
      menu.addClass('fixed');
    }
    if(scroll <= menuLimit && menu.hasClass('fixed')) {
      menu.removeClass('fixed');
    }
  };

 
  let scrollToTargetPost = function(e) {
    e.preventDefault();
    let
      linkIndex = $(this).parent().index(),
      targetPost = posts.eq(linkIndex);

    $('html, body').stop().animate({
      scrollTop: targetPost.offset().top
    }, 700);
  };


  let changeActiveLink = function(e) {
    let
      $this = $(this),
      scroll = $this.scrollTop();

    setFixedMenu(scroll);

    posts.each(function(i) {
      if(menuItems.eq(i).hasClass('active')) return true;
 
      let
        $this = $(this),
        itemTopEdge = $this.offset().top,
        itemBottomEdge = itemTopEdge + $this.outerHeight();

      if(itemTopEdge - windowHeight / 3 <= scroll && itemBottomEdge >= scroll) {
        menuItems.eq(i)
                 .addClass('active')
                 .siblings().removeClass('active');
      }
      if(i === posts.length - 1 && itemTopEdge <= scroll + windowHeight / 2.5) {
        menuItems.eq(i)
                 .addClass('active')
                 .siblings().removeClass('active');
      }
    });

  };

  let toggle = () =>{
    menu.toggleClass('active');
    menu.next().toggleClass('active');
  };


  let attachEvents = function() {
    menuList.on('tap', '.menu__link', scrollToTargetPost);
    menuToggle.on('click', toggle);
    $(document).on('scroll', changeActiveLink);
    $(window).on('resize', getVariables);
  };

  return attachEvents();

}


