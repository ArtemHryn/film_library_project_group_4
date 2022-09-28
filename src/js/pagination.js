export class Pagination {
  constructor({
    currentPage = 1,
    totalPages = 1,
      containerSelector = '.pagination-box',
    onPageChange
  }) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
      this.container = document.querySelector(containerSelector);
      this.onPageChange = onPageChange;
  }

  init() {
    this.render();
    this.setEvents();
  }

  render() {
    let itemsTemplate = '';

    for (let i = 1; i <= this.totalPages; i += 1) {
      const template = `<li data-page="${i}" class="pagination-item ${
        i === this.currentPage ? 'active' : ''
      }"><button type="button" class="pagination-btn">${i}</button></li>`;

      itemsTemplate += template;
    }

    const fullPaginationTemplate = `<ul class="pagination-list">${itemsTemplate}</ul>`;

    this.containerSelector.insertAdjacentHTML(
      'afterbegin',
      fullPaginationTemplate
    );
  }

  setEvents() {
      this.container.addEventListener('click', (evt) => {
          const { target } = evt;
          const li = target.closest('[data-page]');
          const pageNumber = li.dataset.page;
          const activeLi = this.container.querySelector('.active');
          activeLi.classList.remove('active');
          this.currentPage = Number(pageNumber);
          li.classList.add('active');

          if (typeof this.onPageChange === "function") {
              this.onPageChange(this.currentPage)
          }
    });
  }
}
