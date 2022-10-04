import { refs } from '../refs/index';
import { singIn } from '../firebase/auth';
import { userInfo } from '../firebase/auth';

refs.login.addEventListener('click', onLoginClick);

function onLoginClick(e) {
  e.target.blur();
  if (userInfo.IsLogIn) {
    return;
  }
  singIn();
}
