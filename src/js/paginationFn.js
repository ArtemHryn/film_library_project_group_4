import { Pagination } from '../js/pagination';

const pagination = new Pagination();

const paginationContainerRef = document.querySelector('.js-pagination-box');
const prevBtnRef = document.querySelector('.js-prev-btn');
const nextBtnRef = document.querySelector('.js-next-btn');

paginationContainerRef.addEventListener('click', onChangePage);
prevBtnRef.addEventListener('click', onPrevPage);
nextBtnRef.addEventListener('click', onNextPage);

function onChangePage(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  const li = evt.target.closest('[data-page]');
  pagination.currentPage = +li.dataset.page;
    if (pagination.currentPage < 1) { 
      return;
  }
  renderPages();
}

function onPrevPage() {
    pagination.currentPage -= 1;
    // if (pagination.currentPage < 1) {
    //     prevBtnRef.setAttribute('disabled', 'disabled')
    //   return;
    // }
  renderPages();
}

function onNextPage() {
  pagination.currentPage += 1;
  renderPages();
}

function renderPages() {
  let itemsTemplate = '';

  for (
    let i = pagination.currentPage - 2;
    i <= pagination.currentPage + 2;
    i += 1
  ) {
    const template = `<li data-page="${i}" class="pagination-item ${
      i === pagination.currentPage ? 'active' : ''
    }"><button type="button" class="pagination-btn">${i}</button></li>`;

    itemsTemplate += template;
  }

  paginationContainerRef.innerHTML = itemsTemplate;
}

renderPages();
