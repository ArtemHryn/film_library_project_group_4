function addFilmToLocalStorage(value, key) {
  const FilmsInLocalStorage = getFilmsFromLocalStorage(key);

  const parsedFilms = FilmsInLocalStorage
    ? JSON.parse(FilmsInLocalStorage)
    : [];
  const checkFilm = parsedFilms.find(e => {
    return e === value;
  });
  if (checkFilm) {
    console.log('You added this film recently');
    return;
  }
  parsedFilms.push(value);

  localStorage.setItem(key, JSON.stringify(parsedFilms));
}

function getFilmsFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function deleteFilmFromLocaleStorage(id, key) {
  const FilmsInLocalStorage = getFilmsFromLocalStorage(key);
  const parsedFilms = JSON.parse(FilmsInLocalStorage);
  const filtredFilms = parsedFilms.filter(e => e.id !== id);
  localStorage.setItem(key, JSON.stringify(filtredFilms));
}

export {
  addFilmToLocalStorage,
  getFilmsFromLocalStorage,
  deleteFilmFromLocaleStorage,
};
