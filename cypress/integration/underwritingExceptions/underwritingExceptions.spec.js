import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting
} from '../../helpers';
import { underwriting } from '../../fixtures';

describe('Underwriting Error Testing', () => {
  before('Login and go to search', () => {
    cy.login();
    setRouteAliases();
    navigateThroughNewQuote();
    fillOutCoverage();
  });

  beforeEach('Set route aliases', () => setRouteAliases());

  it('Underwriting Error', () => {
    // Fill out underwriting with bad data.
    fillOutUnderwriting({
      ...underwriting,
      'previousClaims': '3-5 Years'
    });
    // Check for an error.
    cy.get('section.msg-caution .fa-ul li').should('contain', 'Due to previous claims history, additional review is required.');
    // Give good data.
    fillOutUnderwriting();
    // Check that the error is gone.
    cy.get('section.msg-caution').should('not.exist');
  });

  it('Overwriting UW Exception', () => {
    // Fill out underwriting with bad data.
    fillOutUnderwriting({
      ...underwriting,
      'previousClaims': '3-5 Years'
    });
    cy.get('section.msg-caution .fa-ul li label').should('contain', 'Override')
    // Override the exception manually.
      .find('input').should('have.attr', 'value', 'false').click()
      .get('.msg-caution button[type="submit"]').click()
      .wait('@saveUnderwritingExceptions').then(({ response }) =>
        // Confirm that there exists an overridden exception.
        expect(response.body.result.underwritingExceptions.filter(({ overridden }) => overridden).length).to.equal(1)
      );
  });
});
