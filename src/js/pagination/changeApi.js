import { refs } from '../refs/index';
import { pagination } from '../pagination/paginationBth';
import { trending, searchFilm, getListOfFilmsByPage } from '../addingFilmToWeb';
import { renderFilms } from '../rendering/renderFilms';
import { showSpinner, hideSpinner } from '../spinner';
import { lazyLoad } from '../lazy-load';
import { renderPages } from './renderNumPage';
// import { onShowWatched, onShowQueue } from '../addingFilmToWeb';
import { renderFilms } from '../rendering/renderFilms';


export class ChangeApi {
  constructor() {
    this.page = 'trending';
  }
  changetrendingApi() {
    switch (this.page) {
      case 'trending':
        this.trending();
        break;
      case 'search':
        this.saerch();
        break;
      case 'wached':
        this.wached();
        break;
      case 'queue':
        this.queue();
        break;
      default:
        this.trending();
        break;
    }
  }
  // if (!this.page) {
  //   this.saerch();
  // } else {
  //   this.trending()
  // }
  // }
  async saerch() {
    showSpinner();
    searchFilm.Page = pagination.currentPage; //searchpage set paginationpage
    const lookedForFilms = await searchFilm.fetchMovies();
    pagination.TotalPages = lookedForFilms.total_pages; // set to pagination totalfetchpage
    renderPages(); // rerenderpage to apply totalfetchpage
    searchFilm.films = lookedForFilms.results;
    const genres = await trending.genres;
    refs.filmContainer.innerHTML = renderFilms(searchFilm.films, genres);
    lazyLoad();
    setTimeout(() => {
      hideSpinner();
    }, 1000);
  }
  async trending() {
    showSpinner();
    trending.Page = pagination.currentPage; // trendingpage set paginationpage
    const films = await trending.fetchMovies();
    pagination.TotalPages = films.total_pages; // set to pagination totalfetchpage
    renderPages(); // rerenderpage to apply totalfetchpage
    trending.film = films;
    const genres = await trending.fetchGenres();

    refs.filmContainer.innerHTML = renderFilms(films.results, genres);

    lazyLoad();
    setTimeout(() => {
      hideSpinner();
    }, 1000);
  }
  async wached() {
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
    renderPages();
  }
  async queue() {
    const response = await getListOfFilmsByPage(
      pagination.CurrentPage,
      'isQueue'
    );
    refs.filmContainer.innerHTML = renderFilms(
      response.data,
      await trending.fetchGenres()
    );
    lazyLoad()
    pagination.totalPages = response.totalPages;
    renderPages();
  }
  set Page(newQuery) {
    this.page = newQuery;
  }
  get Page() {
    return this.page;
  }

  resetALLpage() {
    pagination.resetPage();
    // searchFilm.resetPage;
    // trending.resetPage;
  }
}

// export async function changetrendingApi() {
//     showSpinner();
//     trending.Page = pagination.currentPage;

//     const films = await trending.fetchMovies();
//     pagination.TotalPages = films.total_pages;  // set to pagination totalfetchpage
//     renderPages();                              // rerenderpage to apply totalfetchpage
//     console.log("~ films", films)
//     trending.film = films;
//     const genres = await trending.fetchGenres();
//     filmContainer.innerHTML = renderFilms(films.results, genres);
//     lazyLoad();
//     hideSpinner();

//     searchFilm.resetPage; // reset page onsearch
// }

// export async function changeSearchApi() {
//   showSpinner();
//   searchFilm.Page = pagination.currentPage;

//   const films = await trending.fetchMovies();
//   pagination.TotalPages = searchFilm.total_pages; // set to pagination totalfetchpage
//   renderPages(); // rerenderpage to apply totalfetchpage
//   console.log('~ films', films);
//   searchFilm.film = films;
//   const genres = await searchFilm.fetchGenres();
//   filmContainer.innerHTML = renderFilms(films.results, genres);
//   lazyLoad();
//   hideSpinner();

//   trending.resetPage; // reset page onsearch
// }
