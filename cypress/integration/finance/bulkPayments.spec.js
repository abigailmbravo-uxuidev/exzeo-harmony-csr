import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting,
  fillOutMailingBilling,
  fillOutApplication,
  navigateThroughDocusign
} from '../../helpers';
import { bindPolicyRequest } from '../endorsements/bindPolicyRequest';

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
        cy.findDataTag('bulk-payments-link').click();

        cy.task('log', 'Bulk Payments Batch Form');
        cy.get('h3.title')
          .should('contain', 'Bulk Payments')
          .get('button[data-test="startButton"]')
          .should('be.disabled')

          .findDataTag('cashDate')
          .type('2019-11-20')
          .findDataTag('batchNumber')
          .type('-99')
          .findDataTag('cashType')
          .select('Paper Deposit')

          .get('button[data-test="startButton"]')
          .should('be.enabled')
          .click()
          .findDataTag('policyNumber')
          .type('12-0000000-01')
          .blur();
      });
    });
  });
});
