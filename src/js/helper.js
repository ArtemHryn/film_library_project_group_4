import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getTaskFromFirebaseStorage } from './firebase/get';
import { getFilmFromLocalStorage } from './localstorage';
import { userInfo } from './firebase/auth';

export function getlistOfFilmsPerPage(films, lastIndex) {
  return films.reduce((listOfFims, film, index) => {
    if (index > lastIndex - 20 && index <= lastIndex) {
      listOfFims.push(film);
      return listOfFims;
    }
    return listOfFims;
  }, []);
}

export async function getFilms() {
  try {
    if (userInfo.isLogIn) {
      return await getTaskFromFirebaseStorage();
    }

    return JSON.parse(getFilmFromLocalStorage());
  } catch (error) {
    Notify.failure('error');
  }
}

export function filterForLibrary(films, searchBy) {
  return films.filter(film => film[searchBy]);
}
