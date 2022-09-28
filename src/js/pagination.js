export class Pagination {
  constructor() {
    this.CurrentPage = 1;
    this.TotalPages = 1;
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

    resetPage() {
        this.CurrentPage = 1;
    }
    
  //   init() {
  //     this.render();
  //     this.setEvents();
  //   }

  // //   render() {
  // //     let itemsTemplate = '';

  // //     for (let i = this.currentPage - 2; i <= this.currentPage + 2; i += 1) {
  // //       const template = `<li data-page="${i}" class="pagination-item ${
  // //         i === this.currentPage ? 'active' : ''
  // //       }"><button type="button" class="pagination-btn">${i}</button></li>`;

  // //       itemsTemplate += template;
  // //     }

  // //     const fullPaginationTemplate = `<ul class="pagination-list">${itemsTemplate}</ul>`;

  // //     this.containerSelector.insertAdjacentHTML(
  // //       'afterbegin',
  // //       fullPaginationTemplate
  // //     );
  // //   }

  //   setEvents() {
  //     this.container.addEventListener('click', evt => {
  //       const { target } = evt;
  //       const li = target.closest('[data-page]');
  //       const pageNumber = li.dataset.page;
  //       const activeLi = this.container.querySelector('.active');
  //       activeLi.classList.remove('active');
  //       this.currentPage = Number(pageNumber);
  //       li.classList.add('active');
  //       console.log;
  //       if (typeof this.onPageChange === 'function') {
  //         this.onPageChange(this.currentPage);
  //       }
  //     });
  //   }
}
