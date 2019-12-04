import { setRouteAliases } from '../../helpers';

describe('Bulk Payments Test', () => {
  before('Login and set route aliases', () => {
    setRouteAliases();
    cy.login();
  });

  it('Apply Payment', () => {
    createToBindQuote();
    cy.visit(`/`);

    cy.task('log', 'Test Bulk Payments Batch Form')
      .get('@boundQuote')
      .then(quote => {
        cy.findDataTag('bulk-payments-link')
          .click()
          .get('h3.title')
          .should('contain', 'Bulk Payments')

          // .findAnyDataTag('startButton')
          // .should('be.disabled')

          .findDataTag('cashDate')
          .type('2019-11-20')
          .findDataTag('batchNumber')
          .type('-99')
          .findDataTag('cashType')
          .select('Paper Deposit')

          .findDataTag('startButton')
          .click({ force: true })
          .findDataTag('policyNumber')
          .type(`{selectall}{backspace}${quote.transaction.policyNumber}`)
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
          .type(`{selectall}{backspace}${quote.transaction.policyNumber}`)
          .blur()
          .wait('@fetchPolicy')
          .wait('@fetchSummaryLedger')

          .get('#root')
          .scrollTo('right')
          .findDataTag('amount')

          .type(`{selectall}{backspace}${500}`)
          .findDataTag('payment-form-submit')
          .click({ force: true })
          .wait('@postPaymentTransaction');

        // .findDataTag('download-payments')
        // .click({ force: true })

        // .findDataTag('stopButton')
        // .click({ force: true });
      });
  });
});
