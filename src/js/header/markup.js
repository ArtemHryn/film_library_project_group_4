import { refs } from '../refs/index';

export function markupLibraryBtn() {
  refs.container.innerHTML = `<div class='btn-flex'>
  <button type="button" class="lib-btn" data-value="wached" aria-label="Watched">Watched</button>
    <button type="button" class="lib-btn lib-btn-current" data-value="queue" aria-label="Queue">queue</button>
    </div>`;
}

export function markupSearchQuery() {
  refs.container.innerHTML = `<form class="search-form" id="search-form">
      <input
        type="text"
        name="searchQuery"
        autocomplete="off"
        placeholder="Movie search"
        class="input-search"
        aria-label="Input search"
      />
      <button type="submit" class="submit-btn" aria-label="Search" data-value="search">

      </button>
    </form>
    <p class="search-error visually-hidden">
      Search result is not successful. Enter the correct movie name, please.
    </p>`;
}

export function clearContainer() {
  refs.container.innerHTML = '';
}


        // <svg width="12" height="12" fill="none">
        //   <path
        //     d="M5.5 9.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM10.5 10.5 8.325 8.325"
        //     stroke="#fff"
        //     stroke-linecap="round"
        //     stroke-linejoin="round"
        //   />
        // </svg>;