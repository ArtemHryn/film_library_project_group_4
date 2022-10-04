import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { UserInfo } from '../firebase/user';
import { refs } from '../refs/index';
import { toggleClass } from '../utils/changeClass';
import { addListenerLogout, removeListenerLogout } from '../user/logout';

export const userInfo = new UserInfo();

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function singIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      document.querySelector('#audio').play();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      userInfo.USER_ID = 0;
      userInfo.userName = '';
      userInfo.IsLogIn = false;
      toggleClass(refs.containerLogout, 'visually-hidden');
      toggleClass(refs.login, 'visually-hidden');
      removeListenerLogout();
    })
    .catch(error => {
      Notify.failure('something wrong');
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    userInfo.USER_ID = user.uid;
    userInfo.userName = user.displayName;
    userInfo.IsLogIn = true;
    userInfo.userImg = user.photoURL;
    refs.userImg.src = userInfo.userImg;
    refs.userName.textContent = userInfo.userName;
    toggleClass(refs.containerLogout, 'visually-hidden');
    toggleClass(refs.login, 'visually-hidden');
    addListenerLogout();
  }
});
