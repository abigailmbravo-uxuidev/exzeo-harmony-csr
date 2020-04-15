import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting
} from '../../helpers';
import { unQuestionsBAD } from '../../fixtures';

describe('Underwriting Error Testing', () => {
  beforeEach('Set route aliases', () => {
    cy.login();
    setRouteAliases();
    navigateThroughNewQuote();
    fillOutCoverage();
  });

  it('Underwriting Error', () => {
    // Fill out underwriting with bad data.
    fillOutUnderwriting(unQuestionsBAD, 'Quote Stopped');
    // Check for an error.
    cy.get('section.msg-caution .fa-ul li')
      .should(
        'contain',
        'Due to previous claims history, additional review is required.'
      )
      // TODO find a better way to handle the fact that we need to 'wait' on network requests. We have put the 'wait' in 'fillOutUnderwriting' for now, since it is used in a lot of places. But in this one case, we never leave the page so the next time we use 'fillOutUnderwriting' it is waiting on a call to 'getZipCodeSettings' that doesn't happen and is not expected to happen.
      .goToNav('coverage');

    // Give good data.
    fillOutUnderwriting();
    // Check that the error is gone.
    cy.get('section.msg-caution').should('not.exist');
  });

  it('Overwriting UW Exception', () => {
    // Fill out underwriting with bad data.
    fillOutUnderwriting(unQuestionsBAD, 'Quote Stopped');
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
      })
      .findDataTag('quoteDetails')
      .contains('Quote Qualified')
      .should('have.text', 'Quote Qualified');
  });
});
