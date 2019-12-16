import { login } from '../../fixtures';

describe('Login Testing', () => {
  before('Logout', () => {});

  it('POS: Test Login', () => {
    cy.visit('/logout').visit('/', {
      onBeforeLoad: win => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      }
    });

    cy.get('input[name="username"]')
      .should('exist')
      .get('input[name="password"]')
      .should('exist');

    cy.get('a.auth0-lock-alternative-link').should('exist');

    cy.get(
      'img[src="https://s3.amazonaws.com/exzeo-typtap-wordpress/images/typtap.svg"]'
    ).should('exist');

    cy.get('.auth0-loading-screen')
      .should('not.exist')
      .get('input[name="username"]')
      .type(login.username, { force: true })
      .get('input[name="password"]')
      .type(login.password, { force: true })
      .get('.auth0-label-submit')
      .click({ force: true });

    cy.get('div#SearchBar').should('exist');
  });
});
