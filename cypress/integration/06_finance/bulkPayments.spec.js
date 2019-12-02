import { setRouteAliases } from '../../helpers';
import { quoteToBindRequest } from '../../helpers/requests';

describe('Bulk Payments Test', () => {
  let response;

  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Apply Payment', async () => {
    response = await quoteToBindRequest();

    cy.visit(`/`);
    cy.findDataTag('bulk-payments-link')
      .click()
      .task('log', 'Bulk Payments Batch Form')
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
      .type(`{selectall}{backspace}${response.result.transaction.policyNumber}`)
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
      .type(`{selectall}{backspace}${response.result.transaction.policyNumber}`)
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