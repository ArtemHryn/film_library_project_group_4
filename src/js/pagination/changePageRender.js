import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from '../refs/index';
import { pagination } from './paginationBth';
import { trending, searchFilm, getListOfFilmsByPage } from '../addingFilmToWeb';
import { renderFilms } from '../rendering/renderFilms';
import { showSpinner, hideSpinner } from '../spinner';
import { lazyLoad } from '../lazyLoad';
import { renderFilms } from '../rendering/renderFilms';

export class ChangePageRender {
  constructor() {
    this.page = 'trending';
  }
  changePage() {
    switch (this.page) {
      case 'trending':
        this.trendingPage();
        break;
      case 'search':
        this.saerchPage();
        break;
      case 'wached':
        this.wachedPage();
        break;
      case 'queue':
        this.queuePage();
        break;
      default:
        this.trendingPage();
        break;
    }
  }

  async saerchPage() {
    try {
      showSpinner();
      searchFilm.Page = pagination.currentPage;
      const lookedForFilms = await searchFilm.fetchMovies();
      pagination.TotalPages = lookedForFilms.total_pages;
      pagination.renderPages();
      searchFilm.films = lookedForFilms.results;
      const genres = await trending.genres;
      refs.filmContainer.innerHTML = renderFilms(searchFilm.films, genres);
      lazyLoad();
      setTimeout(() => {
        hideSpinner();
      }, 1000);
    } catch (error) {
      Notify.failure(error);
    }
  }

  async trendingPage() {
    try {
      showSpinner();
      trending.Page = pagination.currentPage;
      const films = await trending.fetchMovies();
      pagination.TotalPages = films.total_pages;
      pagination.renderPages();
      trending.film = films;
      const genres = await trending.fetchGenres();
      refs.filmContainer.innerHTML = renderFilms(films.results, genres);

      lazyLoad();
      setTimeout(() => {
        hideSpinner();
      }, 1000);
    } catch (error) {
      Notify.failure(error);
    }
  }

  async wachedPage() {
    try {
      const response = await getListOfFilmsByPage(
        pagination.CurrentPage,
        'isWatched'
      );
      refs.filmContainer.innerHTML = renderFilms(
        response.data,
        await trending.fetchGenres()
      );
      refs.filmContainer.innerHTML = renderFilms(
        response.data,
        await trending.fetchGenres()
      );
      lazyLoad();
      pagination.totalPages = response.totalPages;
      pagination.renderPages();
    } catch (error) {
      Notify.failure(error);
    }
  }

  async queuePage() {
    try {
      const response = await getListOfFilmsByPage(
        pagination.CurrentPage,
        'isQueue'
      );
      refs.filmContainer.innerHTML = renderFilms(
        response.data,
        await trending.fetchGenres()
      );
      lazyLoad();
      pagination.totalPages = response.totalPages;
      pagination.renderPages();
    } catch (error) {
      Notify.failure(error);
    }
  }

  set Page(newQuery) {
    this.page = newQuery;
  }

  get Page() {
    return this.page;
  }

  resetAllPage() {
    pagination.resetPage();
  }
}
