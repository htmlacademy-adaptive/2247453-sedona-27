let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');
let navToggleICONmenu = document.querySelector('.main-nav__toggle-icon');
let navToggleICONcross = document.querySelector('.main-nav__toggle-cross');
let mainHeader = document.querySelector('.main-header');
let mainHeaderLogo = document.querySelector('.main-header__logo');

mainHeader.classList.remove('main-header--nojs');
mainHeaderLogo.classList.remove('main-header__logo--nojs');
navMain.classList.remove('main-nav--nojs');
navMain.classList.add('main-nav--closed');

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
