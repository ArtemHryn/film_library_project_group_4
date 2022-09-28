import { MoviesSearchAPIService } from './api-search-movies';

const moviesSearchAPIService = new MoviesSearchAPIService();

export const refs = {
  header: document.querySelector('.header'),
  logo: document.querySelector('[data-value="logo"]'),
  home: document.querySelector('[data-value="home"]'),
  library: document.querySelector('[data-value="library"]'),
  login: document.querySelector('[data-value="login"]'),
  container: document.querySelector('#container-js'),
};

refs.logo.addEventListener('click', onHomeClick);
refs.home.addEventListener('click', onHomeClick);
refs.library.addEventListener('click', onLibraryClick);


function addLibraryListener() {
  refs.wached = document.querySelector('[data-value="wached"]');
  refs.queue = document.querySelector('[data-value="queue"]');
  refs.queue.addEventListener('click', onQueueClick);
  refs.wached.addEventListener('click', onWachedClick);
}

function removeLibraryListener() {
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
  addCurrentPageClass(refs.home, 'current-page');
  removeCurrentPageClass(refs.library, 'current-page');
    removeCurrentPageClass(refs.header, 'header-library');
    addCurrentPageClass(refs.header, 'header-home');
  addFormListener();
}

function onLibraryClick(e) {
  clearContainer();
  markupLibraryBtn();
  addCurrentPageClass(refs.library, 'current-page');
  removeCurrentPageClass(refs.home, 'current-page');
  removeCurrentPageClass(refs.header, 'header-home');
  addCurrentPageClass(refs.header, 'header-library');
  addLibraryListener();
  onQueueClick();
  removeFormListener();
}


function onQueueClick(e) {
  addCurrentPageClass(refs.queue, 'lib-btn-current');
  removeCurrentPageClass(refs.wached, 'lib-btn-current');
}

function onWachedClick() {
  addCurrentPageClass(refs.wached, 'lib-btn-current');
  removeCurrentPageClass(refs.queue, 'lib-btn-current');
}

function onFormSubmit(e) {
  e.preventDefault();
  let onSearchText = e.currentTarget.elements.searchQuery.value.trim();
  if (!onSearchText) {
    removeCurrentPageClass(refs.erorr, 'visually-hidden');
    return;
  }
  addCurrentPageClass(refs.erorr, 'visually-hidden');
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

function addCurrentPageClass(elem, cls) {
  if (elem.classList.contains(cls)) {
    return;
  }
  elem.classList.add(cls);
}

function removeCurrentPageClass(elem, cls) {
  if (!elem.classList.contains(cls)) {
    return;
  }
  elem.classList.remove(cls);
}
