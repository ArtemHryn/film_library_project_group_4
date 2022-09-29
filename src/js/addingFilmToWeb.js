import { MoviesTrendAPIService } from './api-trending';
import { MoviesFullInfoAPIService } from './api-full-info-movie';
import { renderFilms } from './rendering/renderFilms';
import { lazyLoad } from './lazy-load';
import { renderFilmModal } from './rendering/renderModalFilm';
import { addToFirebaseStorage } from './firebase/set';
import { userInfo } from './firebase/auth';
import { getTaskFromFirebaseStorage } from './firebase/get';
import { showSpinner, hideSpinner } from './spinner';

const trending = new MoviesTrendAPIService();
const MovieInfo = new MoviesFullInfoAPIService();

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
  const id = film.dataset.id;
  MovieInfo.movieId = +film.dataset.id;
  const filmData = await MovieInfo.fetchMovies();
  genres = await trending.fetchGenres();
  backdrop.classList.remove('is-hidden');
  const getFilm = await getTaskFromFirebaseStorage(id);

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
 
}

async function filmer() {
  showSpinner();
  const films = await trending.fetchMovies();
  trending.film = films;
  const genres = await trending.fetchGenres();
  filmContainer.innerHTML = renderFilms(films.results, genres);
  lazyLoad();
   hideSpinner();
}

async function onAddToWatched(e) {
  const dbInfo = prepareForDBInfo(e, true, false);
  addToFirebaseStorage(dbInfo);
  onCloseModal();
}

function onCloseModal() {
  const modal = document.querySelector('.js-film-modal');
  modal.remove();
  backdrop.classList.add('is-hidden');
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
  addToFirebaseStorage(dbInfo);
  onCloseModal();
}

function prepareForDBInfo(el, isWatched, isQueue) {
  const element = el.target.closest('[data-id]');
  const id = +element.dataset.id;
  const filmInfo = trending.film.results.filter(film => film.id === id);
  return { ...filmInfo[0], isWatched, isQueue };
}

async function findFilmsInDB(searchBy) {
  const films = await getTaskFromFirebaseStorage();
  const filteredFilms = films.filter(film => film[searchBy]);
  filmContainer.innerHTML = renderFilms(
    filteredFilms,
    await trending.fetchGenres()
  );
  lazyLoad();
}
