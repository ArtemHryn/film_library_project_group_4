import { refs } from './refs/index';
import { toggleClass } from './utils/changeclass';
import { onYouTubeIframeAPIReady, deleteyt } from './youtubeApi/YTplayer';

export function addTrailerListener() {
  refs.dataOpenTrailer = document.querySelector('[data-open-trailer]');
  
  refs.dataOpenTrailer.addEventListener('click', onWatchClick);
  refs.trailerModal.addEventListener('click', onBackdropClick);
}

export function removeTrailerListener() {
  refs.dataOpenTrailer.removeEventListener('click', onWatchClick);
}

function addBackdropListener() {
  refs.trailerModal.addEventListener('click', onBackdropClick);
}

function removeBackdropListener() {
  refs.trailerModal.removeEventListener('click', onBackdropClick);
}

function onWatchClick(e) {
  toggleClass(refs.trailerModal, 'is-hidden');
  toggleClass(refs.body, 'no-scroll');
  addBackdropListener();
  const Id = e.target.closest('[data-trailerId]');
  onYouTubeIframeAPIReady(Id.dataset.trailerid);
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    toggleClass(refs.trailerModal, 'is-hidden');
    toggleClass(refs.body, 'no-scroll');
    deleteyt();
    removeBackdropListener();
  }
}
