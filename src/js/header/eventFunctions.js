import { refs } from '../refs/index';
import { addClass, removeClass, toggleClass } from '../utils/changeclass';
import {
  addLibraryListener,
  removeLibraryListener,
  addFormListener,
  removeFormListener,
} from './listerners';
import { markupLibraryBtn, markupSearchQuery, clearContainer } from './markup';

import {
  onShowWatched,
  onShowQueue,
} from '../addingFilmToWeb';



import {
  onYouTubeIframeAPIReady,
  gety,
  deleteyt,
} from '../youtubeApi/YTplayer'; // youtube
import { changeAPI } from '../pagination/paginationBth';
import { trending, searchFilm } from '../addingFilmToWeb';
import { filmContainer } from "../refs/index";



import {
  onYouTubeIframeAPIReady,
  gety,
  deleteyt,
} from '../youtubeApi/YTplayer'; // youtube

export function onHomeClick(e) {
  removeLibraryListener();
  clearContainer();
  markupSearchQuery();
  addClass(refs.home, 'current-page');
  removeClass(refs.library, 'current-page');
  removeClass(refs.header, 'header-library');
  addClass(refs.header, 'header-home');
    addClass(refs.container, 'search-form__margn');
  // toggleClass(refs.container, 'search-form__margn');
  addFormListener();

  //filmer()
    changeAPI.resetALLpage();
    // const searchFilm = searchFilm;
    changeAPI.Page = true;
    changeAPI.changetrendingApi();
}

export function onLibraryClick(e) {
  clearContainer();
  markupLibraryBtn();
  addClass(refs.library, 'current-page');
  removeClass(refs.home, 'current-page');
  removeClass(refs.header, 'header-home');
  addClass(refs.header, 'header-library');
  // toggleClass(refs.container, 'search-form__margn');
    removeClass(refs.container, 'search-form__margn');
  addLibraryListener();
  onQueueClick();
  removeFormListener();
  onShowQueue(e);
  deleteyt(); // youtube
}

export function onQueueClick(e) {
  addClass(refs.queue, 'lib-btn-current');
  removeClass(refs.wached, 'lib-btn-current');
  onShowQueue(e);
}

export function onWachedClick(e) {
  addClass(refs.wached, 'lib-btn-current');
  removeClass(refs.queue, 'lib-btn-current');
  onShowWatched(e);
}

export function onFormSubmit(e) {
  e.preventDefault();
  let onSearchText = e.currentTarget.elements.searchQuery.value.trim();
  if (!onSearchText) {
    removeClass(refs.erorr, 'visually-hidden');
    return;
  }
  addClass(refs.erorr, 'visually-hidden');
  // onSearchFilm(e);


  searchFilm.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  changeAPI.resetALLpage()
  // const searchFilm = searchFilm;
  changeAPI.Page = false;
  changeAPI.changetrendingApi()

}
