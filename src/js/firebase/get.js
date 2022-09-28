import { ref, get, getDatabase } from 'firebase/database';
import { userInfo } from './auth';

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
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
