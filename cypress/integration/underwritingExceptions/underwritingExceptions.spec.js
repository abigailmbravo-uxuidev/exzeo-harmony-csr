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
      'underwritingAnswers.previousClaims.answer': '3-5 Years'
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
      'underwritingAnswers.previousClaims.answer': '3-5 Years'
    }).then(({ response: { body : { result }}}) => expect(result.quoteState).to.equal('Quote Stopped'));

    cy.get('section.msg-caution .fa-ul li label').should('contain', 'Override')
    // Override the exception manually.
      .get('section.msg-caution .fa-ul li input').should('have.attr', 'value', 'false').click()
      .get('.msg-caution button[type="submit"]').click()
      .wait('@updateQuote').then(({ response: { body: { result }}}) => {
        // Confirm that there exists an overridden exception
        expect(result.underwritingExceptions.filter(({ overridden }) => overridden).length).to.equal(1);
        // and that the quote is in a good state.
        expect(result.quoteState).to.equal('Quote Qualified');
      });
  });
});
