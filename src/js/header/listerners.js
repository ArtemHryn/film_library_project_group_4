import { refs } from '../refs/index';
import {
  onHomeClick,
  onLibraryClick,
  onQueueClick,
  onWachedClick,
  onFormSubmit,
} from './eventFunctions';
import { onAddToWatched, onAddToQueue, onCloseModal } from '../addingFilmToWeb';

refs.logo.addEventListener('click', onHomeClick);
refs.home.addEventListener('click', onHomeClick);
refs.library.addEventListener('click', onLibraryClick);

addFormListener();

export function addFormListener() {
  refs.container.addEventListener('submit', onFormSubmit);
}

export function removeFormListener() {
  refs.container.removeEventListener('submit', onFormSubmit);
}

export function addModalListeres() {
  refs.addToWatched = document.querySelector('.js-add-to-watched');
  refs.addtoQueue = document.querySelector('.js-add-to-queue');
  refs.closeModalFilm = document.querySelector('[data-modal-close]');
  refs.addToWatched.addEventListener('click', onAddToWatched);
  refs.addtoQueue.addEventListener('click', onAddToQueue);
  refs.closeModalFilm.addEventListener('click', onCloseModal);
}

refs.container.addEventListener('click', onHeaderDeleg);

function onHeaderDeleg(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  switch (e.target.dataset.value) {
    case 'wached':
      onWachedClick(e);
      break;
    case 'queue':
      onQueueClick(e);
      break;
  }
}
