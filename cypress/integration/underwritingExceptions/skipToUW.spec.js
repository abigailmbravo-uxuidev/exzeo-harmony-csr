import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting
} from '../../helpers';

describe('Skip to UW Testing', () => {
  before('Login and get a quote', () => {
    cy.login();
    setRouteAliases();
    navigateThroughNewQuote();
  });
  
  it('Can fill out UW before Coverage', () => {
    fillOutUnderwriting();
    fillOutCoverage();
  });
});
