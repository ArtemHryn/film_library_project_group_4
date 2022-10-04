import { refs } from '../refs/index';
import {
  onHomeClick,
  onLibraryClick,
  onQueueClick,
  onWachedClick,
  onFormSubmit,
} from './eventFunctions';
import { onAddToWatched, onAddToQueue, onCloseModal } from '../addingFilmToWeb';
import { onWatchClick } from '../youtubeApi/openTrailer';

refs.logo.addEventListener('click', onHomeClick);
refs.home.addEventListener('click', onHomeClick);
refs.library.addEventListener('click', onLibraryClick);
refs.backdrop.addEventListener('click', onModalEvents);

addFormListener();

export function addFormListener() {
  refs.container.addEventListener('submit', onFormSubmit);
}

export function removeFormListener() {
  refs.container.removeEventListener('submit', onFormSubmit);
}

function onModalEvents(e) {
  if (e.target.dataset.open === 'trailer') {
    onWatchClick(e);
    return;
  }
  if (e.target.classList.value.includes('js-add-to-watched')) {
    onAddToWatched(e);
    return;
  }
  if (e.target.classList.value.includes('js-add-to-queue')) {
    onAddToQueue(e);
    return;
  }
  if (e.target.classList.value.includes('js-button-close')) {
    onCloseModal(e);
    return;
  }
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
