import { addClass, removeClass } from '../js/utils/changeclass';

const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('.switch');

toggleRef.addEventListener('change', onChange);

function onChange() {
  if (bodyRef.classList.contains('dark-theme')) {
    removeClass(bodyRef, 'dark-theme');
    addClass(bodyRef, 'light-theme');
  } else {
    removeClass(bodyRef, 'light-theme');
    addClass(bodyRef, 'dark-theme');
  }
}
