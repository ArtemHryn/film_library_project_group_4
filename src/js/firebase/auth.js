import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { UserInfo } from '../firebase/user';
import { refs } from '../refs/index';
import {
  addLogoutListener,
  changeBtnLabel,
  removeLogoutListener,
} from '../user/logout';
import { insertPhotoUrl } from '../user/login';
import { toggleClass } from '../utils/changeclass';

export const userInfo = new UserInfo();

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function singIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      document.querySelector('#audio').play();
      // console.log(user);
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      userInfo.USER_ID = 0;
      userInfo.userName = '';
      userInfo.IsLogIn = false;
      changeBtnLabel('LOG IN');
      toggleClass(refs.login, 'login-text');
      removeLogoutListener();
    })
    .catch(error => {
      console.log('somesing wrong');
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    userInfo.USER_ID = user.uid;
    userInfo.userName = user.displayName;
    userInfo.IsLogIn = true;
    userInfo.userImg = user.photoURL;

    insertPhotoUrl(userInfo.userImg, userInfo.userName);
    addLogoutListener();
    toggleClass(refs.login, 'login-text');
  }
});
