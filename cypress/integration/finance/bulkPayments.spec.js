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
      const endpointURL = `${Cypress.env('API_URL')}/svc`;
      cy.task('log', 'endpointURL');
      cy.task('log', endpointURL);
      cy.task('log', 'cookie.value');
      cy.task('log', idToken);
      bindPolicyRequest(quoteNumber, idToken, endpointURL).then(response => {
        cy.task('log', 'bindPolicyRequest');
        cy.task('log', response.result.policyNumber);
        cy.visit(`/`);
        cy.findDataTag('bulk-payments-link').click();

        cy.task('log', 'Bulk Payments Batch Form');
        cy.get('h3.title')
          .should('contain', 'Bulk Payments')

          .findDisabledDataTag('startButton')

          .findDataTag('cashDate')
          .type('2019-11-20')
          .findDataTag('batchNumber')
          .type('-99')
          .findDataTag('cashType')
          .select('Paper Deposit')

          .findDataTag('startButton')
          .click({ force: true })
          .findDataTag('policyNumber')
          .type(`{selectall}{backspace}${response.result.policyNumber}`)
          .blur()
          .wait('@fetchPolicy')
          .wait('@fetchSummaryLedger')

          .get('#root')
          .scrollTo('right')
          .findDataTag('amount')

          .type(`{selectall}{backspace}${100}`)
          .findDataTag('payment-form-submit')
          .click({ force: true })
          .wait('@postPaymentTransaction')
          .get('#root')
          .scrollTo('left')

          .findDataTag('policyNumber')
          .type(`{selectall}{backspace}${response.result.policyNumber}`)
          .blur()
          .wait('@fetchPolicy')
          .wait('@fetchSummaryLedger')

          .get('#root')
          .scrollTo('right')
          .findDataTag('amount')

          .type(`{selectall}{backspace}${500}`)
          .findDataTag('payment-form-submit')
          .click({ force: true })
          .wait('@postPaymentTransaction')

          .findDataTag('download-payments')
          .click({ force: true })

          .findDataTag('stopButton')
          .click({ force: true });
      });
    });
  });
});
