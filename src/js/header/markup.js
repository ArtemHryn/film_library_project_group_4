import { refs } from '../refs/index';

export function markupLibraryBtn() {
  refs.container.innerHTML = `<div class='btn-flex'>
  <button type="button" class="lib-btn" data-value="wached">Watched</button>
    <button type="button" class="lib-btn" data-value="queue">queue</button>
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
      />
      <button type="submit" class="submit-btn">
        <svg width="15" height="15" class='search-svg'>
          <use href="./images/sprite.svg#icon-search"></use>
        </svg>
      </button>
    </form>
    <p class="search-error visually-hidden">
      Search result not successful. Enter the correct movie name and
    </p>`;
}

export function clearContainer() {
  refs.container.innerHTML = '';
}
