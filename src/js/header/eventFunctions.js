import { refs } from '../refs/index';
import { addClass, removeClass } from '../utils/changeClass';
import { addFormListener, removeFormListener } from './listerners';
import { markupLibraryBtn, markupSearchQuery, clearContainer } from './markup';
import { сhangePageRender } from '../pagination/paginationBth';
import { searchFilm } from '../addingFilmToWeb';

export function onHomeClick(e) {
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
  if (!e) {
    return;
  }
  e.currentTarget.blur();
}

export function onLibraryClick(e) {
  clearContainer();
  markupLibraryBtn();
  addClass(refs.library, 'current-page');
  removeClass(refs.home, 'current-page');
  removeClass(refs.header, 'header-home');
  addClass(refs.header, 'header-library');
  e.target.blur();
  onQueueClick();
  removeFormListener();
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'queue';
  сhangePageRender.changePage();
}

export function onQueueClick(e) {
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'queue';
  сhangePageRender.changePage();
  if (!e) {
    return;
  }
  addClass(e.target, 'lib-btn-current');
  removeClass(e.target.previousElementSibling, 'lib-btn-current');
}

export function onWachedClick(e) {
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'wached';
  сhangePageRender.changePage();
  if (!e) {
    return;
  }
  addClass(e.target, 'lib-btn-current');
  removeClass(e.target.nextElementSibling, 'lib-btn-current');
}

export function onFormSubmit(e) {
  e.preventDefault();
  let onSearchText = e.target.elements.searchQuery.value.trim();
  if (!onSearchText) {
    removeClass(e.target.nextElementSibling, 'visually-hidden');
    return;
  }
  addClass(e.target.nextElementSibling, 'visually-hidden');
  searchFilm.searchQuery = onSearchText;
  сhangePageRender.resetAllPage();
  сhangePageRender.Page = 'search';
  сhangePageRender.changePage();
}
