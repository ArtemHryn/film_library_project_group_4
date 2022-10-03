import { addClass, removeClass } from '../js/utils/changeclass';

const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('.switch');
toggleRef.addEventListener('change', onChange);

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

getThemeFromLocal();
addClass(bodyRef, Theme.LIGHT);

function onChange() {
  if (bodyRef.classList.contains(Theme.DARK)) {
    removeClass(bodyRef, Theme.DARK);
    addClass(bodyRef, Theme.LIGHT);
    setThemeToLocal();
  } else if (document.body.classList.contains(Theme.LIGHT)) {
    removeClass(bodyRef, Theme.LIGHT);
    addClass(bodyRef, Theme.DARK);
    setThemeToLocal();
  }
}

function getThemeFromLocal() {
  if (localStorage.getItem('theme') === Theme.DARK) {
    addClass(bodyRef, Theme.DARK);
    toggleRef.checked = true;
  }
}

function setThemeToLocal() {
  if (bodyRef.classList.contains(Theme.LIGHT)) {
    localStorage.setItem('theme', Theme.LIGHT);
  } else if (bodyRef.classList.contains(Theme.DARK)) {
    localStorage.setItem('theme', Theme.DARK);
  }
}
