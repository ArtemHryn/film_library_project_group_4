import { ref, remove, getDatabase } from 'firebase/database';
import { userInfo } from './auth';
const db = getDatabase();

export function removeFromFirebase(id, param) {
  if (param) {
    try {
      return remove(ref(db, `films/${userInfo.UserID}/${id}`));
    } catch (error) {
      console.log(error);
    }
  }
}
