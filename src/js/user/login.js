import { refs } from '../change-page';
import { singIn, signOutUser } from '../firebase/auth';
import { userInfo } from '../firebase/auth';

refs.login.addEventListener('click', onLoginClick);

function onLoginClick(e) {
  if (userInfo.IsLogIn) {
    signOutUser();
    return;
  }
  singIn();
}
