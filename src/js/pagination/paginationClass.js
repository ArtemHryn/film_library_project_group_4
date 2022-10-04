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

  if (this.CurrentPage >= 6) {
    firstmarkup = `<li data-page="${this.FirstPage}" 
    class="pagination-item">
    <button type="button" class="pagination-btn ">${this.FirstPage}
    </button>
    </li>
    <li 
    class="pagination-item ">
    <button type="button" class="pagination-btn pagi">...
    </button>
    </li>`;
  } 

  if (this.CurrentPage <= this.TotalPages - 5) {

    lastmarkup = `<li 
    class="pagination-item ">
    <button type="button" class="pagination-btn pagin">...
    </button>
    </li>
    <li data-page="${this.TotalPages}" 
    class="pagination-item">
    <button type="button" class="pagination-btn">${this.TotalPages}
    </button>
    </li>
    `;
  }

if (this.TotalPages <= 5 ) {
  for (
    let i =
      ((this.CurrentPage >= (this.TotalPages - 3)) ?
    (this.CurrentPage >= (this.TotalPages - 2)
          ? this.TotalPages <=4 ? this.FirstPage :
          this.CurrentPage - (4 - (this.TotalPages - this.CurrentPage))
        : this.FirstPage )
      :
      (this.CurrentPage <= 3
        ? this.CurrentPage - (this.CurrentPage - 1)
        : this.CurrentPage - 2));
    i <= this.TotalPages;
    i += 1
  ) {
    const template = `<li data-page="${i}" class="pagination-item ${
      i === this.CurrentPage ? 'active' : ''
    }">
    <button type="button" class="pagination-btn">${i}</button></li>`;
    itemsTemplate += template;
  }
} else {
  for (
    let i =
      (
        (this.CurrentPage >= (this.TotalPages - 3)) ? 
        (this.CurrentPage >= (this.TotalPages - 2)   
          ? this.CurrentPage - (4 -(this.TotalPages-this.CurrentPage))
          :  this.CurrentPage- 2)
        :
        (this.CurrentPage <= 3
          ? this.CurrentPage - (this.CurrentPage - 1)
          : this.CurrentPage - 2));
    i <=
    ((this.CurrentPage >= (this.TotalPages - 3)) ?
      (this.CurrentPage >= (this.TotalPages - 2)
        ? this.CurrentPage + (this.TotalPages-this.CurrentPage)
        : this.CurrentPage + 2)
      :
      (this.CurrentPage <= 3
        ? this.CurrentPage + (5 - this.CurrentPage)
        : this.CurrentPage + 2));
    i += 1
  ) {
    const template = `<li data-page="${i}" class="pagination-item ${
      i === this.CurrentPage ? 'active' : ''
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
