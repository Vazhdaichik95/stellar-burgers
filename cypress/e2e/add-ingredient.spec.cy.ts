describe('Добавление булок и начинок в конструктор', () => {
  const ID_BUN = `[data-cy='643d69a5c3f7b9001cfa093c']`;
  const ID_FILLING = `[data-cy='643d69a5c3f7b9001cfa0941']`;

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
    cy.viewport(1440, 800);
    cy.get('#modals').as('modal');
  });

  it('Добавление ингредиента', () => {
    cy.get(ID_FILLING).children('button').click();

    // проверяем, что начинка появилась в зоне конструктора
    cy.get('[data-cy="constructor-fillings"]')
      .find('[data-cy="constructor-filling"]')
      .should('have.length', 1);
  });

  it('Добавление булки и начинки в конструктор', () => {
    cy.get(ID_BUN).children('button').click();
    cy.get(ID_FILLING).children('button').click();

    // булка должна появиться сверху и снизу
    cy.get('[data-cy="constructor-bun-top"]').should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('exist');

    // минимум одна начинка в списке
    cy.get('[data-cy="constructor-fillings"]')
      .find('[data-cy="constructor-filling"]')
      .should('have.length.at.least', 1);
  });
});
