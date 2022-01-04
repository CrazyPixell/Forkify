import View from './View';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Рецепт был успешно загружен';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addShowWindowHandler();
    this._addHideWindowHandler();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addShowWindowHandler() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHideWindowHandler() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addUploadHandler(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentEl)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
