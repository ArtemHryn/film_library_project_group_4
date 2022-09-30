import { refs } from '../refs/index';
import { singIn } from '../firebase/auth';
import { userInfo } from '../firebase/auth';

refs.login.addEventListener('click', onLoginClick);

function onLoginClick(e) {
  if (userInfo.IsLogIn) {
    // signOutUser();
    return;
  }
  singIn();
}


export function insertPhotoUrl(e, t) {
  const markup = `<img
        class="user-img"
        src='${e}'
        alt="photo"
      /><ul class='popup'>
      <li class='popup-item'><span class='user-name'>${t}</span></li>
      <li class='popup-item'><button type='button' class='logout-btn' data-value='logout'>Log Out</button></li>
      </ul>`;
  refs.login.innerHTML = markup;
}