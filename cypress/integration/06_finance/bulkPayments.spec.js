import { setRouteAliases, createToBindQuote } from '../../helpers';

describe('Bulk Payments Test', () => {
  before('Login and set route aliases', () => {
    setRouteAliases();
    cy.login();
  });

  it('Apply Payment', () => {
    createToBindQuote();
    cy.visit(`/`);
    cy.viewport(1375, 768);

    cy.task('log', 'Test Bulk Payments Batch Form')
      .get('@boundQuote')
      .then(quote => {
        cy.findDataTag('bulk-payments-link')
          .click()
          .get('h3.title')
          .should('contain', 'Bulk Payments')
          .findDataTag('cashDate')
          .type('2019-11-20')
          .findDataTag('batchNumber')
          .type('-99')
          .findDataTag('cashType')
          .select('Paper Deposit')
          .findDataTag('startButton')
          .click()
          .findDataTag('policyNumber')
          .type(`{selectall}{backspace}${quote.transaction.policyNumber}`)
          .blur()
          .wait('@fetchPolicy')
          .wait('@fetchSummaryLedger')

          .findDataTag('amount')
          .type(`{selectall}{backspace}${100}`)
          .findDataTag('payment-form-submit')
          .click()
          .wait('@postPaymentTransaction')

          .findDataTag('policyNumber')
          .type(`{selectall}{backspace}${quote.transaction.policyNumber}`)
          .blur()
          .wait('@fetchPolicy')
          .wait('@fetchSummaryLedger')

          .findDataTag('amount')
          .type(`{selectall}{backspace}${500}`)
          .findDataTag('payment-form-submit')
          .click()
          .wait('@postPaymentTransaction');
      });
  });
});
