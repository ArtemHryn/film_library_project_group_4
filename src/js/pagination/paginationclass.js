import { pagination } from './paginationBth';
import { refs } from '../refs/index';

export class Pagination {
  constructor() {
    this.CurrentPage = 1;
    this.TotalPages = 50;
    this.FirstPage = 1;
  }
  renderPages() {
  let itemsTemplate = '';
  let totalPaginatinMarkup = '';
  let firstmarkup = '';
  let lastmarkup = '';

  if (pagination.currentPage >= 6) {
    firstmarkup = `<li data-page="${pagination.FirstPage}" 
    class="pagination-item">
    <button type="button" class="pagination-btn ">${pagination.FirstPage}
    </button>
    </li>
    <li 
    class="pagination-item ">
    <button type="button" class="pagination-btn pagi">...
    </button>
    </li>`;
  } 

  if (pagination.currentPage <= pagination.totalPages - 5) {

    lastmarkup = `<li 
    class="pagination-item ">
    <button type="button" class="pagination-btn pagin">...
    </button>
    </li>
    <li data-page="${pagination.totalPages}" 
    class="pagination-item">
    <button type="button" class="pagination-btn">${pagination.totalPages}
    </button>
    </li>
    `;
  }

if (pagination.totalPages <= 5 ) {
  for (
    let i =
      ((pagination.currentPage >= (pagination.totalPages - 3)) ?
    (pagination.currentPage >= (pagination.totalPages - 2)
          ? pagination.totalPages <=4 ? pagination.firstPage :
          pagination.currentPage - (4 - (pagination.totalPages - pagination.currentPage))
        : pagination.firstPage )
      :
      (pagination.currentPage <= 3
        ? pagination.currentPage - (pagination.currentPage - 1)
        : pagination.currentPage - 2));
    i <= pagination.totalPages;
    i += 1
  ) {
    const template = `<li data-page="${i}" class="pagination-item ${
      i === pagination.currentPage ? 'active' : ''
    }">
    <button type="button" class="pagination-btn">${i}</button></li>`;
    itemsTemplate += template;
  }
} else {
  for (
    let i =
      (
        (pagination.currentPage >= (pagination.totalPages - 3)) ? 
        (pagination.currentPage >= (pagination.totalPages - 2)   
          ? pagination.currentPage - (4 -(pagination.totalPages-pagination.currentPage))
          :  pagination.currentPage- 2)
        :
        (pagination.currentPage <= 3
          ? pagination.currentPage - (pagination.currentPage - 1)
          : pagination.currentPage - 2));
    i <=
    ((pagination.currentPage >= (pagination.totalPages - 3)) ?
      (pagination.currentPage >= (pagination.totalPages - 2)
        ? pagination.currentPage + (pagination.totalPages-pagination.currentPage)
        : pagination.currentPage + 2)
      :
      (pagination.currentPage <= 3
        ? pagination.currentPage + (5 - pagination.currentPage)
        : pagination.currentPage + 2));
    i += 1
  ) {
    const template = `<li data-page="${i}" class="pagination-item ${
      i === pagination.currentPage ? 'active' : ''
    }">
    <button type="button" class="pagination-btn">${i}</button></li>`;
    itemsTemplate += template;
  }
  }
  if (window.screen.width < 481) {
    totalPaginatinMarkup = itemsTemplate ;
  } else {
      totalPaginatinMarkup = firstmarkup + itemsTemplate + lastmarkup;
  }

  refs.paginationContainerRef.innerHTML = totalPaginatinMarkup;
}

  get currentPage() {
    return this.CurrentPage;
  }

  set currentPage(newPage) {
    this.CurrentPage = newPage;
  }

  get totalPages() {
    return this.TotalPages;
  }

  set totalPages(page) {
    this.TotalPages = page;
  }
  get firstPage() {
    return this.FirstPage;
  }

  set firstPage(Page) {
    this.FirstPage = Page;
  }
  resetPage() {
    this.CurrentPage = 1;
  }
}
