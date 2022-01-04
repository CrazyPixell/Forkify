class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('input').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('input').value = '';
  }

  addSearchHandler(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();