import Cypress from 'cypress';

describe('Добавление булок и начинок в конструктор', () => {
  const ID_BUN = `[data-cy='643d69a5c3f7b9001cfa093c']`;
  const ID_FILLING = `[data-cy='643d69a5c3f7b9001cfa0941']`;

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
    cy.viewport(1440, 800);
    cy.get('#modals').as('modal');
  });

  it('Добавление ингредиента', () => {
    cy.get(ID_FILLING).children('button').click();
  });

  it('Добавление булки и начинки в конструктор', () => {
    cy.get(ID_BUN).children('button').click();
    cy.get(ID_FILLING).children('button').click();
  });
});
