const FILMS = 'films';

export function createFilm(film, wached = false, queue = false) {
  film.isWached = wached;
  film.isQueue = queue;
  return film;
}

export function addFilmToLocalStorage(film) {
  const parsedLocalStorage = getFilmFromLocalStorage(FILMS);
  const films = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];

  const checkFilmsAtStorage = films.find(e => {
    return e.id === film.id;
  });
  if (!checkFilmsAtStorage) {
    films.push(film);
    addToLocalStorage(films);
    return;
  }
  const rewritedLocalStorage = rewriteLocalStorage(films, film);
  addToLocalStorage(rewritedLocalStorage);
}

export function getFilmFromLocalStorage(key = FILMS) {
  return localStorage.getItem(key);
}

export function addToLocalStorage(films) {
  localStorage.setItem(FILMS, JSON.stringify(films));
}

export async function checkFilmById(id) {
  const filmsFromLocalStorage = await JSON.parse(getFilmFromLocalStorage());
  if (!filmsFromLocalStorage.length) {
    return undefined;
  }
  const findFilmById = filmsFromLocalStorage.find(film => film.id === id);
  return findFilmById;
}

export function rewriteLocalStorage(films, film) {
  return films.map(e => {
    if (e.id === film.id) return film;
    return e;
  });
}
