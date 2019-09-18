import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting,
  fillOutMailingBilling,
  fillOutApplication,
  navigateThroughDocusign
} from '../../helpers';
import { bindPolicyRequest } from './bindPolicyRequest';

describe('Bulk Payments Test', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Apply Payment', () => {
    navigateThroughNewQuote();
    fillOutCoverage();
    fillOutUnderwriting();
    fillOutMailingBilling();
    fillOutApplication();
    navigateThroughDocusign();
    const idToken = localStorage.getItem('id_token');
    cy.wait(20000);

    cy.get('@sendApplication').then(function(xhr) {
      const quoteNumber = xhr.request.body.data.quoteNumber;
      cy.task('log', 'quoteNumber');
      cy.task('log', quoteNumber);
      const endpointURL = Cypress.env('SVC_URL');
      cy.task('log', 'endpointURL');
      cy.task('log', endpointURL);
      cy.task('log', 'cookie.value');
      cy.task('log', idToken);
      bindPolicyRequest(quoteNumber, idToken, endpointURL).then(response => {
        cy.task('log', 'bindPolicyRequest');
        cy.task('log', response.result.policyNumber);
        //cy.visit(`/policy/${response.result.policyNumber}/endorsements`)
        cy.visit(`/`);
        cy.task('log', 'Search Policy and open')
          .findDataTag('searchType')
          .select('policy')
          // This will be relevant once ALL users can see the product dropdown
          .findDataTag('policyNumber')
          .type(response.result.policyNumber)
          .clickSubmit()
          .wait('@fetchPolicies')
          // This makes it so we don't open up a new window
          .findDataTag(response.result.policyNumber)
          .then($a => {
            $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
            cy.goToNav('bulkPayments');
          });
      });
    });
  });
});
