import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addSwitchHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // Page 1, and there are NO other pages
    if ((curPage === 1 && numPages === 1) || numPages === 0) {
      return ``;
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // Other page
    if (curPage > 1 && curPage < numPages) {
      return `${this._generateMarkupButton(
        'prev',
        curPage
      )}${this._generateMarkupButton('next', curPage)}`;
    }
  }

  _generateMarkupButton(type, curPage) {
    return `
          <button data-goto="${
            type === 'next' ? curPage + 1 : curPage - 1
          }" class="btn--inline pagination__btn--${type}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
            ${
              type === 'prev'
                ? `<span>Страница ${curPage - 1}</span>`
                : `<span>Страница ${curPage + 1}</span>`
            }
          </button>`;
  }
}

export default new PaginationView();
