import { login } from '../../fixtures';

describe('Login Testing', () => {
  before('Logout', () => cy.visit('/logout').visit('/'));

  it('POS:Login Image', () =>
    cy.get('img[src="https://s3.amazonaws.com/exzeo-typtap-wordpress/images/typtap.svg"]')
      .should('exist')
  );

  it('POS:Login Input', () =>
    cy.get('input[name="username"]')
      .should('exist')
      .get('input[name="password"]')
      .should('exist')
  );

  it('POS:Login Text', () =>
    cy.get('a.auth0-lock-alternative-link')
      .should('exist')
  );

  it('POS:Login Button', () =>
    cy.get('button.auth0-lock-submit[type="submit"]')
      .should('exist')
      .get('input[name="username"]')
      .type(login.username, { force: true })
      .get('input[name="password"]')
      .type(login.password, { force: true })
      .get('.auth0-label-submit')
      .click({ force: true })
      .get('div#SearchBar').should('exist')
  );
});
