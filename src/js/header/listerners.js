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

export function addLibraryListener() {
  // refs.wached = document.querySelector('[data-value="wached"]');
  // refs.queue = document.querySelector('[data-value="queue"]');
  // refs.queue.addEventListener('click', onQueueClick);
  // refs.wached.addEventListener('click', onWachedClick);
}

export function removeLibraryListener() {
  // if (!refs.queue) {
  //   return;
  // }
  // refs.queue.removeEventListener('click', onQueueClick);
  // refs.wached.removeEventListener('click', onWachedClick);
}

// addFormListener();

export function addFormListener() {
  // refs.form = document.querySelector('#search-form');
  // refs.erorr = document.querySelector('.search-error');
  // refs.form.addEventListener('submit', onFormSubmit);
}

export function removeFormListener() {
  // refs.form.removeEventListener('submit', onFormSubmit);
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
    // case 'search':
    //   console.log(e.target.dataset.value);
    //   onFormSubmit()
    //   break;
    case 'wached':
      // console.log(e.target);
      onWachedClick(e)
      break;
    case 'queue':
      // console.log(e.target);
      onQueueClick(e)
      break;
  }
}

refs.container.addEventListener('submit', onFormSubmit);

// function onSubmitDeleg(e) {
//   e.preventDefault()
 
//   //   if (e.target.nodeName !== 'BUTTON') {
//   //     return;
//   // }
//   // if (e.target.dataset.value !== 'search') {
//   //  return
//   // }
// //  console.log(e);
// onFormSubmit(e);
// }