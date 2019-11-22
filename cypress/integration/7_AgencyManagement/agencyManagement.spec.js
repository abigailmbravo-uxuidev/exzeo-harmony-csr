import { setRouteAliases } from '../../helpers';

describe('Agency Management testing', () => {
  before('Login', () => cy.login());

  beforeEach('Set route aliases', () => {
    setRouteAliases();
  });

  it('POS:Agency Management Test', () => {
    cy.visit('/')
      .findDataTag('agency-link')
      .click();

    cy.url().should('eq', '/agency'); ////'eq' = equal, 'contain' = containstext
  });
});
