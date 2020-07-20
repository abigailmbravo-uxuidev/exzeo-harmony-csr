import { login } from '../../fixtures';

describe('Login Testing', () => {
  it('POS: Test Login', () => {
    cy.login(login).then(() => {
      cy.url().should('include', Cypress.config().baseUrl);
      cy.get('div#SearchBar').should('exist');
    });
  });
});
