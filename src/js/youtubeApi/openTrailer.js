import { refs } from '../refs/index';
import { toggleClass } from '../utils/changeclass';
import { onYouTubeIframeAPIReady, deleteyt } from './YTplayer';
import { removeCloseListener, addCloseListeners } from '../addingFilmToWeb';

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

export function removeBackdropListener() {
  refs.trailerModal.removeEventListener('click', onBackdropClick);
}

function onWatchClick(e) {
  console.log(window.screen.width);
  if (window.screen.width < 1280) {
    const id = e.target.dataset.trailerid;
    parent.open(`https://www.youtube.com/watch?v=${id}`);
    return;
  }
  removeCloseListener();
  toggleClass(refs.trailerModal, 'is-hidden');
  toggleClass(refs.body, 'no-scroll');
  addBackdropListener();
  const Id = e.target.closest('[data-trailerId]');
  onYouTubeIframeAPIReady(Id.dataset.trailerid);
  document.addEventListener('keydown', onEscClick);
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    toggleClass(refs.trailerModal, 'is-hidden');
    toggleClass(refs.body, 'no-scroll');
    deleteyt();
    removeBackdropListener();
    setTimeout(() => {
      addCloseListeners();
    }, 100);
  }
}

function onEscClick(e) {
  if (e.code == 'Escape') {
    toggleClass(refs.trailerModal, 'is-hidden');
    deleteyt();
    document.removeEventListener('keydown', onEscClick);
    removeBackdropListener();
    setTimeout(() => {
      addCloseListeners();
    }, 100);
  }
}
