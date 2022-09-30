import { MoviesTrendAPIService } from './api-trending';
import { MoviesFullInfoAPIService } from './api-full-info-movie';
import { MoviesSearchAPIService } from './api-search-movies';
import { renderFilms } from './rendering/renderFilms';
import { lazyLoad } from './lazy-load';
import { renderFilmModal } from './rendering/renderModalFilm';
import { addToFirebaseStorage } from './firebase/set';
import { userInfo } from './firebase/auth';
import { getTaskFromFirebaseStorage } from './firebase/get';
import { showSpinner, hideSpinner } from './spinner';
import {
  addFilmToLocalStorage,
  getFilmFromLocalStorage,
  checkFilmById,
} from './localstorage';

const trending = new MoviesTrendAPIService();
const MovieInfo = new MoviesFullInfoAPIService();
const searchFilm = new MoviesSearchAPIService();

const filmContainer = document.querySelector('.js-card-collection');
const backdrop = document.querySelector('.js-backdrop');
const myLibrary = document.querySelector('.js-library-btn');
const homeBtn = document.querySelector('.js-home-btn');

filmContainer.addEventListener('click', film);
myLibrary.addEventListener('click', onShowLibrary);
homeBtn.addEventListener('click', filmer);

filmer();

async function film(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const film = e.target.closest('[data-id]');
  const id = +film.dataset.id;
  MovieInfo.movieId = id;
  const filmData = await MovieInfo.fetchMovies();
  const genres = await trending.fetchGenres();
  backdrop.classList.remove('is-hidden');
  const getFilm = await getFilmById(id);
  if (getFilm) {
    const { isQueue, isWatched } = getFilm;
    backdrop.innerHTML = renderFilmModal(
      { ...filmData, isWatched, isQueue },
      genres
    );
  } else {
    backdrop.innerHTML = renderFilmModal(filmData, genres);
  }

  const addToWatched = document.querySelector('.js-add-to-watched');
  const addtoQueue = document.querySelector('.js-add-to-queue');
  addToWatched.addEventListener('click', onAddToWatched);
  addtoQueue.addEventListener('click', onAddToQueue);
  document
    .querySelector('[data-modal-close]')
    .addEventListener('click', onCloseModal);

  //добавив
  window.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);
  document.body.style.overflow = 'hidden';
}

async function getFilmById(id) {
  if (userInfo.isLogIn) {
    return await getTaskFromFirebaseStorage(id);
  }
  return checkFilmById(id);
}

async function filmer() {
  showSpinner();
  const films = await trending.fetchMovies();
  trending.film = films;
  const genres = await trending.fetchGenres();
  filmContainer.innerHTML = renderFilms(films.results, genres);
  lazyLoad();
  hideSpinner();
  const searchEl = document.querySelector('#search-form');
  searchEl.addEventListener('submit', onSearchFilm);
  searchFilm.query = '';
}

async function onAddToWatched(e) {
  const dbInfo = prepareForDBInfo(e, true, false);
  if (userInfo.isLogIn) {
    addToFirebaseStorage(dbInfo);
  } else {
    addFilmToLocalStorage(dbInfo);
  }
  onCloseModal();
}

function onCloseModal() {
  const modal = document.querySelector('.js-film-modal');
  modal.remove();
  backdrop.classList.add('is-hidden');

  // добавив
  window.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onBackdropClick);
  document.body.style.overflow = 'auto';
}

async function onShowQueue() {
  findFilmsInDB('isQueue');
}

async function onShowLibrary() {
  const watchedBtn = document.querySelector('[data-value="wached"]');
  const queueBtn = document.querySelector('[data-value="queue"]');
  watchedBtn.addEventListener('click', onShowWatched);
  queueBtn.addEventListener('click', onShowQueue);
  findFilmsInDB('isQueue');
}

async function onShowWatched() {
  findFilmsInDB('isWatched');
}

function onAddToQueue(e) {
  const dbInfo = prepareForDBInfo(e, false, true);
  if (userInfo.isLogIn) {
    addToFirebaseStorage(dbInfo);
  } else {
    addFilmToLocalStorage(dbInfo);
  }
  onCloseModal();
}

async function onSearchFilm(e) {
  try {
    e.preventDefault();
    searchFilm.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    const lookedForFilms = await searchFilm.fetchMovies();
    searchFilm.films = lookedForFilms.results;
    const genres = await trending.genres;
    filmContainer.innerHTML = renderFilms(searchFilm.films, genres);
    lazyLoad();
  } catch (error) {
    console.log(error);
  }
}

function prepareForDBInfo(el, isWatched, isQueue) {
  const element = el.target.closest('[data-id]');
  const id = +element.dataset.id;
  const filmsList =
    searchFilm.query !== '' ? searchFilm.films : trending.film.results;
  const filmInfo = filmsList.filter(film => film.id === id);
  return { ...filmInfo[0], isWatched, isQueue };
}

async function findFilmsInDB(searchBy) {
  const films = await getFilms();

  if (!films) {
    filmContainer.innerHTML = '';
    return;
  }

  const filteredFilms = films.filter(film => film[searchBy]);
  if (filteredFilms.length === 0) {
    filmContainer.innerHTML = '';
    return;
  }
  filmContainer.innerHTML = renderFilms(
    filteredFilms,
    await trending.fetchGenres()
  );
  lazyLoad();
}

async function getFilms() {
  if (userInfo.isLogIn) {
    return await getTaskFromFirebaseStorage();
  }

  return JSON.parse(getFilmFromLocalStorage());
}

//додав закриття на ESC і бекдроп

function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onBackdropClick(e) {
  if (e.target === backdrop) {
    onCloseModal();
  }
}
