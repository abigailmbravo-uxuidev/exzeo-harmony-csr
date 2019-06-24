import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting
} from '../../helpers';
import { underwriting } from '../../fixtures';

describe('Skip to UW Testing', () => {
  before('Login and get a quote', () => {
    cy.login();
    setRouteAliases();
    navigateThroughNewQuote();
  });

  it('Can fill out UW before Coverage', () => {
    // Fills out UW with good data
    fillOutUnderwriting();
    fillOutCoverage()
      .then(({ response: { body: { result }}}) => expect(result.quoteState).to.equal('Quote Qualified'));
  });
});

describe('Giving Bad UW Data First', () => {
  before('Login and get a quote', () => {
    cy.login();
    setRouteAliases();
    navigateThroughNewQuote();
  });

  it('Quote does not update to Quote Stopped after Bad UW and blank coverage', () => {
    // Fill out UW first with bad data
    fillOutUnderwriting({
      ...underwriting,
      'underwritingAnswers.previousClaims.answer': '3-5 Years'
    })
    // Confirm that the quote goes to quote stopped after coverage is filled out
    fillOutCoverage()
      .then(({ response: { body: { result } } }) => expect(result.quoteState).to.equal('Quote Stopped'));
  });
});
