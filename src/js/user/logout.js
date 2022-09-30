import { refs } from '../refs/index';
import {signOutUser} from '../firebase/auth'

export function addLogoutListener() {
  refs.logout = document.querySelector('[data-value="logout"]');
  refs.logout.addEventListener('click', onLogoutClick);
}

export function removeLogoutListener() {
  refs.logout.removeEventListener('click', onLogoutClick);
}

function onLogoutClick(e) {
  signOutUser();
}


export function changeBtnLabel(e) {
  refs.login.textContent = e;
}