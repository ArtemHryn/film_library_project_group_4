import { ref, set, getDatabase } from 'firebase/database';

const db = getDatabase();

export function addToFirebaseStorage(task) {
  try {
    task.uid = USER_ID;
    // set(ref(db, "tasks/" + task.id), task);
    set(ref(db, `tasks/${USER_ID}/${task.id}`), task);
  } catch (error) {
    console.log(error);
  }
}
