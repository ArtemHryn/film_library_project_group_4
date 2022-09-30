import { refs } from '../refs/index';
import { onYouTubeIframeAPIReady, gety, deleteyt } from '../youtubeApi/YTplayer';   // youtube
import {
  onHomeClick,
  onLibraryClick,
  onQueueClick,
  onWachedClick,
  onFormSubmit,
} from './eventFunctions';



refs.logo.addEventListener('click', onHomeClick);
refs.home.addEventListener('click', onHomeClick);
refs.library.addEventListener('click', onLibraryClick);

refs.yt.addEventListener('click', onytClick); // youtube

function onytClick(e) {
  onYouTubeIframeAPIReady('R4bkJYAy4Ws');

}

export function addLibraryListener() {
  refs.wached = document.querySelector('[data-value="wached"]');
  refs.queue = document.querySelector('[data-value="queue"]');
  refs.queue.addEventListener('click', onQueueClick);
  refs.wached.addEventListener('click', onWachedClick);
}

export function removeLibraryListener() {
  if (!refs.queue) {
    return;
  }
  refs.queue.removeEventListener('click', onQueueClick);
  refs.wached.removeEventListener('click', onWachedClick);
}

addFormListener();

export function addFormListener() {
  refs.form = document.querySelector('#search-form');
  refs.erorr = document.querySelector('.search-error');
  refs.form.addEventListener('submit', onFormSubmit);
}

export function removeFormListener() {
  refs.form.removeEventListener('submit', onFormSubmit);
}
