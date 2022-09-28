import { ref, remove, getDatabase } from 'firebase/database';
const db = getDatabase();

export function removeFromFirebase(id) {
  try {
    return remove(ref(db, `tasks/${USER_ID}`));
  } catch (error) {}
}
