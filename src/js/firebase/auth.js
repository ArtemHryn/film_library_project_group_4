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
      toggleClass(refs.login, 'login-text');
      
    })
    .catch(error => {
      console.log('somesing wrong');
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    
    // console.log('~ user', user);
    userInfo.USER_ID = user.uid;
    userInfo.userName = user.displayName;
    userInfo.IsLogIn = true;
    userInfo.userImg = user.photoURL;
    // changeBtnLabel(userInfo.userName);
    insertPhotoUrl(userInfo.userImg, userInfo.userName);
    addLogoutListener();
    toggleClass(refs.login, 'login-text');
  } else {
    console.log(user);
  }
});


function changeBtnLabel(e) {
  refs.login.textContent = e;
}


//  function insertPhotoUrl(e,t) {
//    const markup = `<img
//         class="user-img"
//         src='${e}'
//         alt="photo"
//       /><span class='user-name'>${t}</span>`;
//   //  refs.login.insertAdjacentHTML('afterbegin',markup);
//    refs.login.innerHTML = markup;
// }


 function insertPhotoUrl(e, t) {
   const markup = `<img
        class="user-img"
        src='${e}'
        alt="photo"
      /><ul class='popup'>
      <li class='popup-item'><span class='user-name'>${t}</span></li>
      <li class='popup-item'><button type='button' class='logout-btn' data-value='logout'>Log Out</button></li>
      </ul>`;
   //  refs.login.insertAdjacentHTML('afterbegin',markup);
   refs.login.innerHTML = markup;
}
 
function addLogoutListener() {
  refs.logout = document.querySelector('[data-value="logout"]');
  refs.logout.addEventListener('click', onLogoutClick);
}

function onLogoutClick(e) {
signOutUser();
}

function addClass(elem, cls) {
  if (elem.classList.contains(cls)) {
    return;
  }
  elem.classList.add(cls);
}

function removeClass(elem, cls) {
  if (!elem.classList.contains(cls)) {
    return;
  }
  elem.classList.remove(cls);
}


function toggleClass(elem,cls) {
  elem.classList.toggle(cls);
}