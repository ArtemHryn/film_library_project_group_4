import { ref, set, getDatabase } from 'firebase/database';
import {userInfo} from './auth'

const db = getDatabase();

export function addToFirebaseStorage(task) {
  try {
    set(ref(db, `films/${userInfo.UserID}/${task.id}`), task);
  } catch (error) {
    console.log(error);
  }
}
