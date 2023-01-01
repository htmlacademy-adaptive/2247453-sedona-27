let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');
let navToggleICONmenu = document.querySelector('.toggle__icon-menu');
let navToggleICONcross = document.querySelector('.toggle__icon-cross');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggleICONmenu.classList.add('visually-hidden')
    navToggleICONcross.classList.remove('visually-hidden')
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggleICONmenu.classList.remove('visually-hidden')
    navToggleICONcross.classList.add('visually-hidden')
  }
});
