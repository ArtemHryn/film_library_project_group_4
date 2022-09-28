import { MoviesTrendAPIService } from './api-trending';
import { MoviesFullInfoAPIService } from './api-full-info-movie';
import { renderFilms } from './rendering/renderFilms';
import { lazyLoad } from './lazy-load';
import { renderFilmModal } from './rendering/renderModalFilm';
import { addToFirebaseStorage } from './firebase/set';
import { userInfo } from './firebase/auth';
import { getTaskFromFirebaseStorage } from './firebase/get';

const trending = new MoviesTrendAPIService();
const MovieInfo = new MoviesFullInfoAPIService();

const filmContainer = document.querySelector('.js-card-collection');
const backdrop = document.querySelector('.js-backdrop');

filmContainer.addEventListener('click', film);

filmer();

async function film(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const film = e.target.closest('[data-id]');
  MovieInfo.movieId = +film.dataset.id;
  const filmData = await MovieInfo.fetchMovies();
  genres = await trending.fetchGenres();
  backdrop.classList.remove('is-hidden');
  backdrop.innerHTML = renderFilmModal(filmData, genres);
  const addToWatched = document.querySelector('.js-add-to-watched');
  addToWatched.addEventListener('click', onAddToWatched);
  document
    .querySelector('[data-modal-close]')
    .addEventListener('click', onCloseModal);
}

async function filmer() {
  const films = await trending.fetchMovies();
  trending.film = films;
  genres = await trending.fetchGenres();
  filmContainer.innerHTML = renderFilms(films.results, genres);
  lazyLoad();
}

async function onAddToWatched(e) {
  const element = e.target.closest('[data-id]');
  const id = +element.dataset.id;
  const filmInfo = trending.film.results.filter(film => film.id === id);
  const dbInfo = filmInfo[0];
  dbInfo.isWatched = true;
  addToFirebaseStorage(dbInfo);
  onCloseModal();
}

function onCloseModal() {
  const modal = document.querySelector('.js-film-modal');
  modal.remove();
  backdrop.classList.add('is-hidden');
}
