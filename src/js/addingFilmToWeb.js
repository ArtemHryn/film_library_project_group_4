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
  deleteFilmFromLocalStorage,
} from './localstorage';
import { refs } from './refs';
import { addModalListeres } from './header/listerners';
import { removeFromFirebase } from './firebase/remove.js';

import { addTrailerListener } from "./openTrailer";

export const trending = new MoviesTrendAPIService();
const MovieInfo = new MoviesFullInfoAPIService();
export const searchFilm = new MoviesSearchAPIService();

refs.filmContainer.addEventListener('click', film);

// filmer();

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
  refs.backdrop.classList.remove('is-hidden');
  const getFilm = await getFilmById(id);

  if (getFilm) {
    const { isQueue, isWatched } = getFilm;
    refs.backdrop.innerHTML = renderFilmModal(
      { ...filmData, isWatched, isQueue },
      genres
      
    );
    
  } else {
    refs.backdrop.innerHTML = renderFilmModal(filmData, genres);
    
  }
  addModalListeres();
addTrailerListener()
  //добавив
  window.addEventListener('keydown', onEscBtnPress);
  refs.backdrop.addEventListener('click', onBackdropClick);
  document.body.style.overflow = 'hidden';
}

async function getFilmById(id) {
  if (userInfo.isLogIn) {
    return await getTaskFromFirebaseStorage(id);
  }
  return checkFilmById(id);
}

export function onCloseModal() {
  const modal = document.querySelector('.js-film-modal');
  modal.remove();
  refs.backdrop.classList.add('is-hidden');

  // добавив
  window.removeEventListener('keydown', onEscBtnPress);
  refs.backdrop.removeEventListener('click', onBackdropClick);
  document.body.style.overflow = 'auto';
}

function prepareForDBInfo(el, isWatched, isQueue) {
  const element = el.target.closest('[data-id]');
  const id = +element.dataset.id;
  const filmInfo = getFilmInfo(id);
  return { ...filmInfo[0], isWatched, isQueue };
}

function getFilmInfo(id) {
  const filmsList =
    searchFilm.query !== '' ? searchFilm.films : trending.film.results;
  return filmsList.filter(film => film.id === id);
}

async function findFilmsInDB(searchBy) {
  try {
    showSpinner();
    const films = await getFilms();

    if (!films) {
      refs.filmContainer.innerHTML = '';
      return;
    }

    const filteredFilms = films.filter(film => film[searchBy]);
    if (filteredFilms.length === 0) {
      refs.filmContainer.innerHTML = '';
      return;
    }
    refs.filmContainer.innerHTML = renderFilms(
      filteredFilms,
      await trending.fetchGenres()
    );
    setInterval(() => hideSpinner(), 2000);
    lazyLoad();
  } catch (error) {
    console.log(error);
  }
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
  if (e.target === refs.backdrop) {
    onCloseModal();
  }
}

//for export
export async function onSearchFilm(e) {
  try {
    showSpinner();
    searchFilm.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    const lookedForFilms = await searchFilm.fetchMovies();
    searchFilm.films = lookedForFilms.results;
    const genres = await trending.genres;
    refs.filmContainer.innerHTML = renderFilms(searchFilm.films, genres);
    hideSpinner();
    lazyLoad();
  } catch (error) {
    console.log(error);
  }
}

export async function onShowWatched() {
  findFilmsInDB('isWatched');
}

export async function onShowQueue() {
  findFilmsInDB('isQueue');
}

export async function filmer() {
  try {
    showSpinner();
    const films = await trending.fetchMovies();
    trending.film = films;
    const genres = await trending.fetchGenres();
    refs.filmContainer.innerHTML = renderFilms(films.results, genres);
    hideSpinner();
    lazyLoad();
    searchFilm.query = '';
  } catch (error) {
    console.log(error);
  }
}

export async function onAddToWatched(e) {
  const dbInfo = prepareForDBInfo(e, true, false);

  const checkFilm = await getFilmById(dbInfo.id);
  console.log(checkFilm);

  if (userInfo.isLogIn && checkFilm && checkFilm.isWatched) {
    removeFromFirebase(checkFilm.id, checkFilm.isWatched);
    onCloseModal();
    return;
  }

  if (!userInfo.isLogIn && checkFilm && checkFilm.isWatched) {
    deleteFilmFromLocalStorage(checkFilm, checkFilm.isWatched);
    onCloseModal();
    return;
  }
  if (userInfo.isLogIn) {
    addToFirebaseStorage(dbInfo);
  } else {
    addFilmToLocalStorage(dbInfo);
  }
  onCloseModal();
}

export async function onAddToQueue(e) {
  const dbInfo = prepareForDBInfo(e, false, true);
  const checkFilm = await getFilmById(dbInfo.id);

  if (userInfo.isLogIn && checkFilm && checkFilm.isQueue) {
    removeFromFirebase(checkFilm.id, checkFilm.isQueue);
    onCloseModal();
    return;
  }

  if (!userInfo.isLogIn && checkFilm && checkFilm.isQueue) {
    deleteFilmFromLocalStorage(checkFilm, checkFilm.isQueue);
    onCloseModal();
    return;
  }

  if (userInfo.isLogIn) {
    addToFirebaseStorage(dbInfo);
  } else {
    addFilmToLocalStorage(dbInfo);
  }
  onCloseModal();
}

// функція для пошуку офф трейлера


 async function checkTreilersArr() {
   try {
     const treilersArr = await MovieInfo.fetchTreiler()    
     const offTreiler = treilersArr.find(treiler => {
       if (treiler.name === "Official Trailer") {
         return treiler
       }
      else if (treiler.name === 'Official Teaser') {
            return treiler;
      }
       
     })
     return offTreiler;
  } catch (error) {
    console.log(error);
  }
}

checkTreilersArr().then(offTreiler => console.log(offTreiler))

