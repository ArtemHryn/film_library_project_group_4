// import { Pagination } from '../js/pagination';
// import { MoviesSearchAPIService } from '../js/api-search-movies';
// import { MoviesFullInfoAPIService } from '../js/api-full-info-movie';
import { MoviesTrendAPIService } from '../js/api-trending';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// const pagination = new Pagination();
// const moviesSearchAPIService = new MoviesSearchAPIService();
// const moviesFullInfoAPIService = new MoviesFullInfoAPIService();
const moviesTrendAPIService = new MoviesTrendAPIService();

let currentPage = 1;

const paginationContainerRef = document.querySelector('.js-pagination-box');
const prevBtnRef = document.querySelector('.js-prev-btn');
const nextBtnRef = document.querySelector('.js-next-btn');
const firstPageBtnRef = document.querySelector('.js-first-page');
const lastPageBtnRef = document.querySelector('.js-last-page');
const infinitLeftBtnRef = document.querySelector('.js-infinit-left');
const infinitRightBtnRef = document.querySelector('.js-infinit-right');

paginationContainerRef.addEventListener('click', onChangePage);
prevBtnRef.addEventListener('click', onPrevPage);
nextBtnRef.addEventListener('click', onNextPage);

firstPageBtnRef.addEventListener('click', onFirstPage);
lastPageBtnRef.addEventListener('click', onLastPage);
infinitLeftBtnRef.addEventListener('click', onInfinitLeft);
infinitRightBtnRef.addEventListener('click', onInfinitRight);

lastPageValue();

function onChangePage(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const li = e.target.closest('[data-page]');
  currentPage = +li.dataset.page;

  if (currentPage < 1) {
    return;
  }

  moviesTrendAPIService.page = +li.dataset.page;
  moviesTrendAPIService.fetchMovies();
  renderPages();
}

function onFirstPage() {
  moviesTrendAPIService.page = 1;
  moviesTrendAPIService.fetchMovies();
}

async function onLastPage() {
  //   moviesTrendAPIService.page = +lastPageBtnRef.textContent;
  //   const movies = await moviesTrendAPIService.fetchMovies();

  paginationContainerRef.innerHTML = '';
  currentPage = +lastPageBtnRef.textContent - 3;
  renderPages();
}

function onPrevPage() {
  if (+currentPage < 2) {
    return;
  }

  currentPage -= 1;

  // moviesTrendAPIService.decrementPage();
  // moviesTrendAPIService.fetchMovies();
  renderPages();

  if (currentPage <= 3) {
    hideBtn();
  }
}

async function onNextPage() {
  currentPage += 1;
  // const movies = await moviesTrendAPIService.fetchMovies();

  moviesTrendAPIService.incrementPage();
  moviesTrendAPIService.fetchMovies();

  if (currentPage > 3) {
    hideBtn();
  }

  // if (currentPage > movies.total_pages) {
  //  return
  // }

  renderPages();
}

function onInfinitLeft() {
  paginationContainerRef.innerHTML = '';
  currentPage -= 5;
  renderPages();
}

async function onInfinitRight() {
  // const movies = await moviesTrendAPIService.fetchMovies();
  paginationContainerRef.innerHTML = '';
  currentPage += 5;

  // if (currentPage > movies.total_pages) {
  //  return
  // }

  renderPages();
}

function renderPages() {
  let itemsTemplate = '';

  for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
    if (i > 0) {
      const template = `<li data-page="${i}" class="pagination-item ${
        i === currentPage ? 'active' : ''
      }"><button type="button" class="pagination-btn">${i}</button></li>`;

      itemsTemplate += template;
    }
    if (currentPage < 3) {
      hideBtn();
    }

    if (currentPage > 3) {
      showBtn();
    }
  }
  paginationContainerRef.innerHTML = itemsTemplate;
}

async function lastPageValue() {
  try {
    const movies = await moviesTrendAPIService.fetchMovies();
    lastPageBtnRef.textContent = movies.total_pages;
    // lastPageBtnRef.textContent = 10;
  } catch (error) {
    Notify.failure(error);
  }
}

function hideBtn() {
  firstPageBtnRef.classList.add('display-none');
  infinitLeftBtnRef.classList.add('display-none');
}

function showBtn() {
  firstPageBtnRef.classList.remove('display-none');
  infinitLeftBtnRef.classList.remove('display-none');
}

renderPages();
