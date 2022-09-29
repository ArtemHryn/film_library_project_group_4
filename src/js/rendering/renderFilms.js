export function renderFilms(films, genres) {
  return films
    .map(({id, poster_path, title, vote_average, release_date, genre_ids }) => {
      const date = new Date(release_date);
      const release = date.getFullYear();
      const rating = parseFloat(vote_average).toFixed(1);
        const listOfGenres = genres.filter(genreID => genre_ids.includes(genreID.id) )
      return `<li class="card-collection__item" data-id="${id}">
      <img
        class="card-collection__image"
        src="https://image.tmdb.org/t/p/w500/${poster_path}"
        alt="${poster_path}"
        loading="lazy"
      />
      <div class="card-collection__description">
        <h2 class="card-collection__name">${title}</h2>
        <p class="card-collection__genre">
          ${listOfGenres.map(name => name.name).join(', ')}
          <span class="card-collection__year">${release}</span>
          <span class="card-collection__year">${rating}</span>
        </p>
      </div>
    </li>`;
    })
    .join('');
}
