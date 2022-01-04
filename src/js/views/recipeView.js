import View from './View';
import icons from 'url:../../img/icons.svg';
const Fraction = require('fraction.js');

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = `Рецепт не найден.<br/>Попробуйте ещё.`;
  _message;

  addRenderHandler(handler) {
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
  }

  addUpdateServingsHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const updateServings = +btn.dataset.updateTo;
      if (updateServings > 0) handler(updateServings);
    });
  }

  addBookmarkHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    let numServings = 'Порций';
    const regex1 = /[2-4]$/;
    const regex2 = /[2-9]1/;
    if (
      this._data.serving === 1 ||
      +this._data.serving.toString().match(regex2)
    )
      numServings = 'Порция';
    if (+this._data.serving.toString().match(regex1)) numServings = 'Порции';

    return `
      <figure class="recipe__fig">
        <img src="${this._data.img}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

  <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">минут</span>
        </div>

     <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.serving
        }</span>
        <span class="recipe__info-text">${numServings}</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.serving - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.serving + 1
          }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
          </button>
        </div>
      </div>


        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
        </div>

   <div class="recipe__ingredients">
      <h2 class="heading--2">Ингредиенты</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients.map(this._generateMarkupIngredients).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">Как приготовить?</h2>
      <p class="recipe__directions-text">
        Рецепт был создан
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Больше информации на сайте автора
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceURL}"
        target="_blank"
      >
      <span>Указатель</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  _generateMarkupIngredients(ingredient) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ingredient.quantity
          ? new Fraction(ingredient.quantity).toFraction(true)
          : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit || ''}</span>
        ${ingredient.description}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
