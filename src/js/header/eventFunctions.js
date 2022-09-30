import { refs } from '../refs/index';
import { addClass, removeClass } from '../utils/changeclass';
import {
  addLibraryListener,
  removeLibraryListener,
  addFormListener,
  removeFormListener,
} from './listerners';
import { markupLibraryBtn, markupSearchQuery, clearContainer } from './markup';
import { MoviesSearchAPIService } from '../api-search-movies';


import { onYouTubeIframeAPIReady, gety, deleteyt } from '../youtubeApi/YTplayer';   // youtube

const moviesSearchAPIService = new MoviesSearchAPIService();

export function onHomeClick(e) {
  removeLibraryListener();
  clearContainer();
  markupSearchQuery();
  addClass(refs.home, 'current-page');
  removeClass(refs.library, 'current-page');
  removeClass(refs.header, 'header-library');
  addClass(refs.header, 'header-home');
  addFormListener();
}

export function onLibraryClick(e) {
  clearContainer();
  markupLibraryBtn();
  addClass(refs.library, 'current-page');
  removeClass(refs.home, 'current-page');
  removeClass(refs.header, 'header-home');
  addClass(refs.header, 'header-library');
  addLibraryListener();
  onQueueClick();
  removeFormListener();

  deleteyt(); // youtube
}

export function onQueueClick(e) {
  addClass(refs.queue, 'lib-btn-current');
  removeClass(refs.wached, 'lib-btn-current');
}

export function onWachedClick() {
  addClass(refs.wached, 'lib-btn-current');
  removeClass(refs.queue, 'lib-btn-current');
}

export function onFormSubmit(e) {
  e.preventDefault();
  let onSearchText = e.currentTarget.elements.searchQuery.value.trim();
  if (!onSearchText) {
    removeClass(refs.erorr, 'visually-hidden');
    return;
  }
  addClass(refs.erorr, 'visually-hidden');
  moviesSearchAPIService.query = onSearchText;
}
