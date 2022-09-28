import { ref, get, getDatabase } from 'firebase/database';

const db = getDatabase();

export function getTaskFromFirebaseStorage(id) {
  const url = id ? `tasks/${USER_ID}/${id}` : `tasks/${USER_ID}/`;

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
