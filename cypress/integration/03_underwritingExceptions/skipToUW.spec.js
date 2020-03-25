import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting
} from '../../helpers';
import { unQuestionsBAD } from '../../fixtures';

describe('Skip to UW Testing', () => {
  beforeEach('Login and get a quote', () => {
    cy.login();
    setRouteAliases();
    navigateThroughNewQuote();
  });

  it('Can fill out UW before Coverage', () => {
    // Fills out UW with good data
    fillOutUnderwriting();
    fillOutCoverage();
  });

  it('Quote does update to Quote Stopped after Bad UW and blank coverage', () => {
    // Fill out UW first with bad data
    fillOutUnderwriting(unQuestionsBAD, 'Quote Stopped');
  });
});
