import { refs } from './refs/index';
import { MoviesSearchAPIService } from './api-search-movies';
import { addClass, removeClass } from './changeclass';
import { onYouTubeIframeAPIReady, gety, deleteyt } from './YTplayer';

// onYouTubeIframeAPIReady('R4bkJYAy4Ws');

const moviesSearchAPIService = new MoviesSearchAPIService();

refs.logo.addEventListener('click', onHomeClick);
refs.home.addEventListener('click', onHomeClick);
refs.library.addEventListener('click', onLibraryClick);
refs.yt.addEventListener('click', onytClick);

function onytClick(e) {
  onYouTubeIframeAPIReady('R4bkJYAy4Ws');
// gety()
}

function addLibraryListener() {
  refs.wached = document.querySelector('[data-value="wached"]');
  refs.queue = document.querySelector('[data-value="queue"]');
  refs.queue.addEventListener('click', onQueueClick);
  refs.wached.addEventListener('click', onWachedClick);
}

function removeLibraryListener() {
  if (!refs.queue) {
    return;
  }
  refs.queue.removeEventListener('click', onQueueClick);
  refs.wached.removeEventListener('click', onWachedClick);
}

addFormListener();

function addFormListener() {
  refs.form = document.querySelector('#search-form');
  refs.erorr = document.querySelector('.search-error');
  refs.form.addEventListener('submit', onFormSubmit);
}

function removeFormListener() {
  refs.form.removeEventListener('submit', onFormSubmit);
}

function onHomeClick(e) {
  removeLibraryListener();
  clearContainer();
  markupSearchQuery();
  addClass(refs.home, 'current-page');
  removeClass(refs.library, 'current-page');
  removeClass(refs.header, 'header-library');
  addClass(refs.header, 'header-home');
  addFormListener();
  // onYouTubeIframeAPIReady('R4bkJYAy4Ws');
}

function onLibraryClick(e) {
  clearContainer();
  markupLibraryBtn();
  addClass(refs.library, 'current-page');
  removeClass(refs.home, 'current-page');
  removeClass(refs.header, 'header-home');
  addClass(refs.header, 'header-library');
  addLibraryListener();
  onQueueClick();
  removeFormListener();

 deleteyt()
}

function onQueueClick(e) {
  addClass(refs.queue, 'lib-btn-current');
  removeClass(refs.wached, 'lib-btn-current');
}

function onWachedClick() {
  addClass(refs.wached, 'lib-btn-current');
  removeClass(refs.queue, 'lib-btn-current');
}

function onFormSubmit(e) {
  e.preventDefault();
  let onSearchText = e.currentTarget.elements.searchQuery.value.trim();
  if (!onSearchText) {
    removeClass(refs.erorr, 'visually-hidden');
    return;
  }
  addClass(refs.erorr, 'visually-hidden');
  moviesSearchAPIService.query = onSearchText;
}

function clearContainer() {
  refs.container.innerHTML = '';
}

function markupLibraryBtn() {
  refs.container.innerHTML = `<div class='btn-flex'>
  <button type="button" class="lib-btn" data-value="wached">Watched</button>
    <button type="button" class="lib-btn" data-value="queue">queue</button>
    </div>`;
}

function markupSearchQuery() {
  refs.container.innerHTML = `<form class="search-form" id="search-form">
      <input
        type="text"
        name="searchQuery"
        autocomplete="off"
        placeholder="Movie search"
        class="input-search"
      />
      <button type="submit" class="submit-btn">
        <svg width="15" height="15">
          <use href="./images/sprite.svg#icon-search"></use>
        </svg>
      </button>
    </form>
    <p class="search-error visually-hidden">
      Search result not successful. Enter the correct movie name and
    </p>`;
}
