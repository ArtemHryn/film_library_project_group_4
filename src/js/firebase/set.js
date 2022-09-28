import { ref, set, getDatabase } from 'firebase/database';
import {userInfo} from './auth'

const db = getDatabase();

export function addToFirebaseStorage(task) {
  try {
    // task.uid = USER_ID;
    // set(ref(db, "tasks/" + task.id), task);
    set(ref(db, `films/${userInfo.UserID}/${task.id}`), task);
  } catch (error) {
    console.log(error);
  }
}
