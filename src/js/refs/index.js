export const refs = {
  //body
  body: document.querySelector('body'),
  //header
  header: document.querySelector('.header'),
  logo: document.querySelector('[data-value="logo"]'),
  home: document.querySelector('[data-value="home"]'),
  library: document.querySelector('[data-value="library"]'),
  login: document.querySelector('[data-value="login"]'),
  logout :document.querySelector('[data-value="logout"]'),
  container: document.querySelector('#container-js'),
  containerLogout: document.querySelector('.js-logout-cont'),
  //pagination
  pagination: document.querySelector('.js-pagination'),
  paginationContainerRef: document.querySelector('.js-pagination-box'),
  prevBtnRef: document.querySelector('.js-prev-btn'),
  nextBtnRef: document.querySelector('.js-next-btn'),

  filmContainer: document.querySelector('.js-card-collection'),
  backdrop: document.querySelector('.js-backdrop'),
  addToWatched: document.querySelector('.js-add-to-watched'),
  addtoQueue: document.querySelector('.js-add-to-queue'),
  closeModalFilm: document.querySelector('[data-modal-close]'),

  //spinner
  spinner: document.querySelector('.loader'),

  //youtube trailer
  trailerModal: document.querySelector('[data-modal-trailer]'),
};
