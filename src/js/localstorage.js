// function addFilmToLocalStorage(value, key) {
//   const FilmsInLocalStorage = getFilmsFromLocalStorage(key);

//   const parsedFilms = FilmsInLocalStorage
//     ? JSON.parse(FilmsInLocalStorage)
//     : [];
//   const checkFilm = parsedFilms.find(e => {
//     return e === value;
//   });
//   if (checkFilm) {
//     console.log('You added this film recently');
//     return;
//   }
//   parsedFilms.push(value);

//   localStorage.setItem(key, JSON.stringify(parsedFilms));
// }

// function getFilmsFromLocalStorage(key) {
//   return localStorage.getItem(key);
// }

// function deleteFilmFromLocaleStorage(id, key) {
//   const FilmsInLocalStorage = getFilmsFromLocalStorage(key);
//   const parsedFilms = JSON.parse(FilmsInLocalStorage);
//   const filtredFilms = parsedFilms.filter(e => e.id !== id);
//   localStorage.setItem(key, JSON.stringify(filtredFilms));
// }

// export {
//   addFilmToLocalStorage,
//   getFilmsFromLocalStorage,
//   deleteFilmFromLocaleStorage,
// };



const FILMS = 'films'


export function createFilm(film, wached = false, queue = false) {
  film.isWached = wached;
  film.isQueue = queue;
  return film
}


export function addFilmToLocalStorage(film) {
  const parsedLocalStorage = getFilmFromLocalStorage(FILMS);
  const films = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  films.push(film);
  addToLocalStorage(films);
}

export function getFilmFromLocalStorage(key = FILMS) {
  return localStorage.getItem(key);
}

export function addToLocalStorage(films) {
  localStorage.setItem(FILMS, JSON.stringify(films));
}

export function filterTasks(films, id) {
  return films.filter(film => film.id !== id);
}

// export function rewriteLocalStorage(films, id) {
//   return films.map(film => {
//     if (film.id === id) {
//       film.isChecked = !film.isChecked;
//       return film;
//     }
//     return film;
//   });
// }