import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { UserInfo } from '../firebase/user';
import { refs } from '../change-page';

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
    })
    .catch(error => {
      console.log('somesing wrong');
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    
    console.log('~ user', user);
    userInfo.USER_ID = user.uid;
    userInfo.userName = user.displayName;
    userInfo.IsLogIn = true;
    changeBtnLabel(userInfo.userName);
  } else {
    console.log(user);
  }
});


function changeBtnLabel(e) {
  refs.login.textContent = e;
}