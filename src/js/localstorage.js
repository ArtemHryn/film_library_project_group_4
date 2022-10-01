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

export function checkFilmById(id) {
  const filmsFromLocalStorage = getFilmFromLocalStorage();
  if (!filmsFromLocalStorage) {
    return undefined;
  }
  const findFilmById = JSON.parse(filmsFromLocalStorage).find(
    film => film.id === id
  );
  return findFilmById;
}

export function rewriteLocalStorage(films, film) {
  return films.map(e => {
    if (e.id === film.id) return film;
    return e;
  });
}

export function deleteFilmFromLocalStorage(film, param) {
  if (!param) return;
  const parsedLocalStorage = getFilmFromLocalStorage(FILMS);
  if (!parsedLocalStorage) {
    return
  }
  const filteredFilms = JSON.parse(parsedLocalStorage).filter(
    e => e.id !== film.id
  );
  addToLocalStorage(filteredFilms);
}
