import { Pagination } from './paginationclass';
import { throttle } from 'throttle-debounce';
import { refs } from '../refs/index';
import { renderPages } from './renderNumPage';
// import { changetrendingApi } from './changeApi';
import { ChangeApi } from './changeApi';

export const pagination = new Pagination();

export const changeAPI = new ChangeApi
changeAPI.changetrendingApi()
// changetrendingApi();

refs.paginationContainerRef.addEventListener('click', throttle(700, onChangePage));
refs.prevBtnRef.addEventListener('click', throttle(700, onPrevPage));
refs.nextBtnRef.addEventListener('click', throttle(700, onNextPage));


function onChangePage(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  if (!evt.target.closest('[data-page]')) {
    return
  }
  const li = evt.target.closest('[data-page]');
  pagination.currentPage = +li.dataset.page;
  renderPages();
changeAPI.changetrendingApi();
}

function onPrevPage() {
  if (pagination.currentPage <= 1) {
    return;
  }
  pagination.currentPage -= 1;
  renderPages();
changeAPI.changetrendingApi();
}

function onNextPage() {
    if (pagination.currentPage === pagination.totalPages) {
      return;
    }
  pagination.currentPage += 1;
  renderPages();
changeAPI.changetrendingApi();
}


renderPages();


function changeApi(params) {
  
}