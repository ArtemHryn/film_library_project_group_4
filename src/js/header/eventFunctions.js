import { refs } from '../refs/index';
import { addClass, removeClass } from '../utils/changeclass';
import {
  addLibraryListener,
  removeLibraryListener,
  addFormListener,
  removeFormListener,
} from './listerners';
import { markupLibraryBtn, markupSearchQuery, clearContainer } from './markup';
import { сhangePageRender } from '../pagination/paginationBth';
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
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'trending';
  сhangePageRender.changePage();
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
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'queue';
  сhangePageRender.changePage();
}

export function onQueueClick(e) {
  addClass(refs.queue, 'lib-btn-current');
  removeClass(refs.wached, 'lib-btn-current');
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'queue';
  сhangePageRender.changePage();
}

export function onWachedClick(e) {
  addClass(refs.wached, 'lib-btn-current');
  removeClass(refs.queue, 'lib-btn-current');
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'wached';
  сhangePageRender.changePage();
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
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'search';
  сhangePageRender.changePage();
}
