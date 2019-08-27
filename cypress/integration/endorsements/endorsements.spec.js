import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting,
  fillOutMailingBilling,
  fillOutApplication,
  navigateThroughDocusign
} from '../../helpers';
import {
  afterDocuSignTest
} from '../../pageTests';
import { bindPolicyRequest } from './bindPolicyRequest';

describe('CSR_policyEnd_happyPath_multiEnd1', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Bind a quote to a policy for Address 4131 Test Address, Sarasota, FL 00001 using default coverages on the quote', () => {
    navigateThroughNewQuote();
    fillOutCoverage();
    fillOutUnderwriting();
    fillOutMailingBilling();
    fillOutApplication();
    navigateThroughDocusign();

    cy.wait(20000);

    cy.getCookie('id_token').then(cookie => {
      cy.get('@reviewQuote').then(function (xhr) {
        //const quoteId = xhr.response.body.result._id;
        const quoteNumber = xhr.request.body.data.quoteNumber;

        const endpointURL = Cypress.env('SVC_URL');

        bindPolicyRequest(quoteNumber, cookie.value, endpointURL).then(response => {
          cy.goToNav('coverage').reload();
        });
      });
    });
    
    

  });

  it('Select Policy', () => {
    cy.task('log', 'Select Policy').findDataTag('selectPolicy').click({ force: true })
  })
});
