describe('Оформление заказа', () => {
  const ID_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
  const ID_FILLING = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'orderResponse.json' }).as(
      'createOrder'
    );

    cy.visit('/');
    cy.viewport(1440, 800);
    cy.get('#modals').as('modal');

    // авторизация через токены
    window.localStorage.setItem('refreshToken', 'ipsum');
    cy.setCookie('accessToken', 'lorem');

    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('exist');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();

    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Отправка заказа c проверкой корректности ответа', () => {
    // 1) Добавление ингредиентов в конструктор
    cy.get(ID_BUN).children('button').click();
    cy.get(ID_FILLING).children('button').click();

    cy.get('[data-cy="constructor-bun-top"]').should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
    cy.get('[data-cy="constructor-fillings"]')
      .find('[data-cy="constructor-filling"]')
      .should('have.length.at.least', 1);

    // 2) Оформление заказа
    cy.get('[data-cy="order-button"]').click();

    // ждём ответ createOrder
    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

    // 3) Отображение корректного номера заказа в модальном окне
    cy.fixture('orderResponse.json').then((order) => {
      const expectedNumber = order.order.number;

      cy.get('@modal').find('[data-cy="modal-window"]').should('be.visible');

      cy.get('[data-cy="order-number"]')
        .should('be.visible')
        .and('have.text', String(expectedNumber));
    });

    // 4) Закрытие модалки и проверка, что конструктор очищен
    cy.get('@modal').find('[data-cy="modal-window"]').find('button').click();

    cy.get('@modal').find('[data-cy="modal-window"]').should('not.exist');

    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    cy.get('[data-cy="constructor-fillings"]')
      .find('[data-cy="constructor-filling"]')
      .should('have.length', 0);
  });
});
