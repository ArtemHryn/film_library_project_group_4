import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ref, get, getDatabase } from 'firebase/database';
import { userInfo } from './auth';
import { hideSpinner } from '../spinner';
const db = getDatabase();

export function getTaskFromFirebaseStorage(id) {
  const url = id
    ? `films/${userInfo.UserID}/${id}`
    : `films/${userInfo.UserID}/`;
  return get(ref(db, url))
    .then(snapshot => {
      if (snapshot.exists()) {
        if (id) {
          return snapshot.val();
        }
        return Object.values(snapshot.val());
      } else {
        Notify.failure('No data available');
        setInterval(() => hideSpinner(), 2000);
      }
    })
    .catch(error => {
      setInterval(() => hideSpinner(), 2000);
      Notify.failure(error);
    });
}
