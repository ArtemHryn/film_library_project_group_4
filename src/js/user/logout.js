import { signOutUser } from '../firebase/auth';
import { refs } from '../refs/index';
import { signOutUser } from '../firebase/auth';

export function addListenerLogout(params) {
  refs.logout.addEventListener('click', onLogoutClick);
}

export function removeListenerLogout(params) {
  refs.logout.removeEventListener('click', onLogoutClick);
}

function onLogoutClick(e) {
  console.log('fff');
  signOutUser();
}
