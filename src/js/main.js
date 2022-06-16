document.addEventListener('DOMContentLoaded', () => {
  // Burger
  const burger = document.querySelector('.burger');
  const navList = document.querySelector('.nav__links');
  const navLinks = document.querySelectorAll('.nav__link');
  const searchBtn = document.querySelector('.search__btn');
  const searchEl = document.querySelector('.search__wrapper');
  const searchField = document.querySelector('.search__field');
  const searchCloseBtn = document.querySelector('.search__close-btn');
  const contactsCloseBtn = document.querySelector('.contacts__close-btn');
  const contactsShowBtn = document.querySelector('.contacts__info-btn');
  const contactsBlock = document.querySelector('.contacts__info');

  burger.addEventListener('click', event => {
    event._ItsABurger = true;

    event.currentTarget.classList.toggle('burger_active');
    navList.classList.toggle('nav__links_show');
    const bodyOwerflow = document.body.style.overflow;
    document.body.style.overflow = bodyOwerflow === 'auto' || bodyOwerflow === '' ? 'hidden' : 'auto';

    switchTabindex();
  });

  navList.addEventListener('click', event => {
    event._ItsANavList = true;
  })

  navLinks.forEach(navLink => {
    navLink.addEventListener('click', () => {
      closeNavMenu();
    })
  })

  window.addEventListener('click', event => {
    if (event._ItsABurger || event._ItsANavList) return;
    closeNavMenu();
  });

  window.addEventListener('resize', () => {
    if (!navList.classList.contains('nav__links_show')) return;
    closeNavMenu();
    switchTabindex();
  });

  function switchTabindex() {
    if (getComputedStyle(burger).display !== 'none')
      navLinks.forEach(navLink => navLink.tabIndex = '-1');

    else navLinks.forEach(navLink => navLink.tabIndex = '0');

    if (navList.classList.contains('nav__links_show'))
      navLinks.forEach(navLink => navLink.tabIndex = '0');
  }

  function closeNavMenu() {
    navList.classList.remove('nav__links_show');
    burger.classList.remove('burger_active');
    document.body.style.overflow = 'auto';
  }

  // Search
  searchBtn.addEventListener('click', () => {
    searchEl.classList.add('search__wrapper_active');
    searchBtn.classList.add('search__btn_unactive');
  });

  searchCloseBtn.addEventListener('click', () => {
    searchEl.classList.remove('search__wrapper_active');
    searchBtn.classList.remove('search__btn_unactive');
  });

  searchField.addEventListener('blur', () => {
    searchField.placeholder = 'Что будем иcкать?';
  });

  searchField.addEventListener('focus', () => {
    searchField.placeholder = '';
  });

  contactsCloseBtn.addEventListener('click', () => {
    contactsBlock.classList.add('contacts__info_hidden');
    contactsShowBtn.style.display = 'block';
  })

  contactsShowBtn.addEventListener('click', () => {
    contactsBlock.classList.remove('contacts__info_hidden');
    contactsShowBtn.style.display = 'none';
  })
})
