
import { addClass, removeClass } from './utils/changeClass';
import { refs } from './refs/index';

export function showSpinner() {
  if (refs.spinner.classList.contains('loader')) {
    return;
  }
  addClass(refs.spinner, 'loader');
  removeClass(refs.spinner, 'visually-hidden');
}

export function hideSpinner() {
  if (!refs.spinner.classList.contains('loader')) {
    return;
  }
  addClass(refs.spinner, 'visually-hidden');
  removeClass(refs.spinner, 'loader');
}
