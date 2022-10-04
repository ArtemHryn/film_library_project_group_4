import { refs } from '../refs/index';
import { toggleClass } from '../utils/changeClass';
import { onYouTubeIframeAPIReady, deleteYt } from './youtubePlayer';
import { removeCloseListener, addCloseListeners } from '../addingFilmToWeb';

// export function addTrailerListener() {
//   refs.backdrop.addEventListener('click', onWatchClick);
//   refs.trailerModal.addEventListener('click', onBackdropClick);
// }

// export function removeTrailerListener() {
//   refs.backdrop.removeEventListener('click', onWatchClick);
// }

function addBackdropListener() {
  refs.trailerModal.addEventListener('click', onBackdropClick);
}

export function removeBackdropListener() {
  refs.trailerModal.removeEventListener('click', onBackdropClick);
}

export function onWatchClick(e) {
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
    deleteYt();
    document.removeEventListener('keydown', onEscClick);
    removeBackdropListener();
    setTimeout(() => {
      addCloseListeners();
    }, 100);
  }
}

function onEscClick(e) {
  if (e.code == 'Escape') {
    toggleClass(refs.trailerModal, 'is-hidden');
    deleteYt();
    document.removeEventListener('keydown', onEscClick);
    removeBackdropListener();
    setTimeout(() => {
      addCloseListeners();
    }, 100);
  }
}
