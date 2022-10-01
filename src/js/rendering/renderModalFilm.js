import { changeBackdrop } from '../addBackdrop';

export function renderFilmModal({
  id,
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
  isWatched = false,
  isQueue = false,
  backdrop_path,
  isTreiler = true,
  trailerId = 'R4bkJYAy4Ws',
}) {
  changeBackdrop(backdrop_path);
  const genresListEl = genres.map(genre => genre.name);
  return ` <div class="film-modal js-film-modal" data-id='${id}'>
    <div class="poster-container">
      <img
        src="https://image.tmdb.org/t/p/w500/${poster_path}"
        alt="${original_title}"
        class="poster-image"
      />
    </div>
    <div class="info-container">
      <h2 class="film-title">${original_title}</h2>
      <table class="info-table">
        <tbody>
          <tr>
            <td class="info-table__head">Vote / Votes</td>
            <td class="info-table__value">
              <span class="rating-text">${parseFloat(vote_average).toFixed(
                1
              )}</span> /
              <span class="rating-votes"> ${vote_count}</span>
            </td>
          </tr>
          <tr>
            <td class="info-table__head">Popularity</td>
            <td class="info-table__value">${popularity}</td>
          </tr>
          <tr>
            <td class="info-table__head">Original Title</td>
            <td class="info-table__value">${original_title}</td>
          </tr>
          <tr>
            <td class="info-table__head">Genre</td>
            <td class="info-table__value">${genresListEl.join(', ')}</td>
          </tr>
        </tbody>
      </table>
      <div class="about">
        <p class="about__title">About</p>
        <p class="about__text">
          ${overview}
        </p>
      </div>
      <div class="btn-wraper">
        <button type="button" class="film-modal__btn js-add-to-watched">${
          isWatched ? 'Added to wathced' : 'Add to Watched'
        }</button>
        <button type="button" class="film-modal__btn js-add-to-queue">${
          isQueue ? 'Added to queue' : 'Add to queue'
        }</button>
        <button type="button" class="film-modal__btn" ${
          isTreiler ? '' : disabled
        } data-open-trailer data-trailerId='${trailerId}'>
        ${isTreiler ? 'Watch Treiler' : 'Treiler isn`t available'}
        </button>
      </div>
    </div>
    <button class="close-btn " data-modal-close>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 8L22 22" stroke="black" stroke-width="2" />
        <path d="M8 22L22 8" stroke="black" stroke-width="2" />
      </svg>
    </button>
  </div>`;
}
