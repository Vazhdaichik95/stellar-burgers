const BASE_URL = 'https://norma.nomoreparties.space/api';
const ID_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const ID_ANOTHER_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const ID_FILLING = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;

describe('Закрытие модального окна ингредиента по кнопке', () => {
  const ID_FILLING = `[data-cy='643d69a5c3f7b9001cfa0941']`;

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients ', {
      fixture: 'ingredients.json'
    });
    cy.visit('/');
    cy.viewport(1440, 800);
    cy.get('#modals').as('modal');
  });

  it('Открытие и проверка отображения данных модального окна ингредиента', () => {
    cy.get('@modal').should('be.empty');

    // кликаем по конкретному ингредиенту
    cy.get(ID_FILLING).as('ingredientCard');
    cy.get('@ingredientCard').children('a').click();

    // модалка появилась
    cy.get('@modal').find('[data-cy="modal-window"]').should('be.visible');

    // проверяем, что в модалке показаны данные именно этого ингредиента
    cy.get('@ingredientCard')
      .find('[data-cy="ingredient-name"]')
      .invoke('text')
      .then((name) => {
        cy.get('[data-cy="ingredient-modal-name"]')
          .should('be.visible')
          .and('have.text', name.trim());
      });
  });

  it('Закрытие модального окна ингредиента по клику на кнопку', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });
});
