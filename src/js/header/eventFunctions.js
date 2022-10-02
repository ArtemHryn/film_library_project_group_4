import { refs } from '../refs/index';
import { addClass, removeClass } from '../utils/changeclass';
import {
  addLibraryListener,
  removeLibraryListener,
  addFormListener,
  removeFormListener,
} from './listerners';
import { markupLibraryBtn, markupSearchQuery, clearContainer } from './markup';
// import { onShowWatched, onShowQueue } from '../addingFilmToWeb';

import { changeAPI } from '../pagination/paginationBth';
import { searchFilm } from '../addingFilmToWeb';

export function onHomeClick(e) {
  e.currentTarget.blur();
  removeLibraryListener();
  clearContainer();
  markupSearchQuery();
  addClass(refs.home, 'current-page');
  removeClass(refs.library, 'current-page');
  removeClass(refs.header, 'header-library');
  addClass(refs.header, 'header-home');
  addFormListener();
  changeAPI.resetALLpage();
  changeAPI.Page = 'trending';
  changeAPI.changetrendingApi();
  // removeClass(refs.pagination, 'visually-hidden');
}

export function onLibraryClick(e) {
  clearContainer();
  markupLibraryBtn();
  addClass(refs.library, 'current-page');
  removeClass(refs.home, 'current-page');
  removeClass(refs.header, 'header-home');
  addClass(refs.header, 'header-library');
  addLibraryListener();
  e.target.blur();
  onQueueClick();
  removeFormListener();
      changeAPI.resetALLpage();
      changeAPI.Page = 'queue';
      changeAPI.changetrendingApi();
  // onShowQueue(e);
  // addClass(refs.pagination, 'visually-hidden');
}

export function onQueueClick(e) {
  addClass(refs.queue, 'lib-btn-current');
  removeClass(refs.wached, 'lib-btn-current');

  // onShowQueue(e);
    changeAPI.resetALLpage();
    changeAPI.Page = 'queue';
    changeAPI.changetrendingApi();
}

export function onWachedClick(e) {
  addClass(refs.wached, 'lib-btn-current');
  removeClass(refs.queue, 'lib-btn-current');
  // onShowWatched(e);

      changeAPI.resetALLpage();
      changeAPI.Page = 'wached';
      changeAPI.changetrendingApi();
}

export function onFormSubmit(e) {
  e.preventDefault();
  let onSearchText = e.currentTarget.elements.searchQuery.value.trim();
  if (!onSearchText) {
    removeClass(refs.erorr, 'visually-hidden');
    return;
  }
  addClass(refs.erorr, 'visually-hidden');

  searchFilm.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  changeAPI.resetALLpage();
  changeAPI.Page = 'search';
  changeAPI.changetrendingApi();
}
