import { signOutUser } from '../firebase/auth';
import { refs } from '../refs/index';

export function addLogoutListener() {
  refs.logout = document.querySelector('[data-value="logout"]');
  refs.logout.addEventListener('click', onLogoutClick);
}

export function removeLogoutListener() {
  refs.logout.removeEventListener('click', onLogoutClick);
}

function onLogoutClick(e) {
  console.log('hhh');
  signOutUser();
}

export function changeBtnLabel(e) {
  refs.login.textContent = e;
}
