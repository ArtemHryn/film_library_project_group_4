import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ref, set, getDatabase } from 'firebase/database';
import { userInfo } from './auth';

const db = getDatabase();

export function addToFirebaseStorage(task) {
  try {
    set(ref(db, `films/${userInfo.UserID}/${task.id}`), task);
  } catch (error) {
    Notify.failure(error);
  }
}
