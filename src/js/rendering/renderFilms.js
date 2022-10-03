export function renderFilms(films, genres) {
  let poster =
    'https://c8.alamy.com/comp/2BHX492/empty-space-for-posters-for-coming-movie-attractions-2BHX492.jpg';
  return films
    .map(
      ({
        id,
        poster_path,
        title,
        vote_average,
        release_date,
        genre_ids = [16],
      }) => {
        const date = new Date(release_date);
        const release = date.getFullYear();
        const rating = parseFloat(vote_average).toFixed(1);
        const listOfGenres = genres.filter(genreID =>
          genre_ids.includes(genreID.id)
        );
        if (poster_path) {
          poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        }
        return `<li class="card-collection__item" data-id="${id}">
        <div style="position: relative">
      <img
        class="card-collection__image"
        src="${poster}"
        alt="${poster}"
        loading="lazy"
      />
      <span class="card-collection__vote">${rating}</span>
      </div>
      <div class="card-collection__description">
        <h2 class="card-collection__name">${title}</h2>
        <p class="card-collection__text">
          <span"> ${listOfGenres.map(name => name.name).join(', ')}</span>
      |
          <span">${release}</span>
         
        </p>
      </div>
    </li>`;
      }
    )
    .join('');
}
