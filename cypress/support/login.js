import { login } from '../fixtures';

Cypress.Commands.add('login', (loginInfo = login) => {
  const useMockAuth0 = Cypress.env('USE_MOCK_AUTH0');

  cy.visit('/logout')
    .visit('/', {
      onBeforeLoad: win => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      }
    });

  if (useMockAuth0) {
    cy.get('#userType').select(loginInfo.userType)
      .get('#submit').click();
  } else {
    cy.get('.auth0-loading-screen').should('not.exist')
      .get('input[name="username"]').type(loginInfo.username, { force: true })
      .get('input[name="password"]').type(loginInfo.password, { force: true })
      .get('.auth0-label-submit').click({ force: true });
  }
});
