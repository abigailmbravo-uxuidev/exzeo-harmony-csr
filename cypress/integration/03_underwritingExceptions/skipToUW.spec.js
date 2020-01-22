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
    navigateThroughNewQuote('HO3');
  });

  it('Can fill out UW before Coverage', () => {
    // Fills out UW with good data
    fillOutUnderwriting('HO3');
    fillOutCoverage().then(({ response: { body: { result } } }) =>
      expect(result.quoteState).to.equal('Quote Qualified')
    );
  });
});

describe('Giving Bad UW Data First', () => {
  before('Login and get a quote', () => {
    cy.login();
    setRouteAliases();
    navigateThroughNewQuote('HO3');
  });

  it('Quote does not update to Quote Stopped after Bad UW and blank coverage', () => {
    // Fill out UW first with bad data
    fillOutUnderwriting('BAD');
    // Confirm that the quote goes to quote stopped after coverage is filled out
    fillOutCoverage().then(({ response: { body: { result } } }) =>
      expect(result.quoteState).to.equal('Quote Stopped')
    );
  });
});
