import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting
} from '../../helpers';
import { unQuestionsBAD } from '../../fixtures';

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
    fillOutUnderwriting(unQuestionsBAD);
    // Check for an error.
    cy.get('section.msg-caution .fa-ul li').should(
      'contain',
      'Due to previous claims history, additional review is required.'
    );
    // Give good data.
    fillOutUnderwriting();
    // Check that the error is gone.
    cy.get('section.msg-caution').should('not.exist');
  });

  it('Overwriting UW Exception', () => {
    // Fill out underwriting with bad data.
    fillOutUnderwriting(unQuestionsBAD);
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteState).to.equal(
        'Quote Stopped',
        'Quote State'
      );
    });

    cy.get('section.msg-caution .fa-ul li label')
      .should('contain', 'Override')
      // Override the exception manually.
      .get('section.msg-caution .fa-ul li input')
      .check()
      .get('.uw-validation-header button[type="submit"]')
      .click()
      .wait('@updateQuote')
      .then(({ response }) => {
        // Confirm that there exists an overridden exception
        const overriddenExceptions = response.body.result.underwritingExceptions.filter(
          ({ overridden }) => overridden
        );
        expect(overriddenExceptions.length).to.equal(
          1,
          'Underwriting Exceptions count'
        );
        // and that the quote is in a good state.
        expect(response.body.result.quoteState).to.equal(
          'Quote Qualified',
          'Quote State'
        );
      });
  });
});
