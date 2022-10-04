import { addClass, removeClass } from './utils/changeClass';
import { setThemeToLocal } from './localstorage';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('.switch');
toggleRef.addEventListener('change', onChange);

getThemeFromLocal();
addClass(bodyRef, Theme.LIGHT);

function onChange() {
  if (bodyRef.classList.contains(Theme.DARK)) {
    removeClass(bodyRef, Theme.DARK);
    addClass(bodyRef, Theme.LIGHT);
    setThemeToLocal(bodyRef, Theme);
  } else if (document.body.classList.contains(Theme.LIGHT)) {
    removeClass(bodyRef, Theme.LIGHT);
    addClass(bodyRef, Theme.DARK);
    setThemeToLocal(bodyRef, Theme);
  }
}

function getThemeFromLocal() {
  if (localStorage.getItem('theme') === Theme.DARK) {
    addClass(bodyRef, Theme.DARK);
    toggleRef.checked = true;
  }
}
