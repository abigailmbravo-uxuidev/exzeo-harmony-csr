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

describe('CSR_policyEnd_happyPath_multiEnd1', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Bind a quote to a policy for Address 4131 Test Address, Sarasota, FL 00001 using default coverages on the quote', () => {
    navigateThroughNewQuote();
    fillOutCoverage();
    fillOutUnderwriting();
    fillOutMailingBilling();
    fillOutApplication();

    cy.task('log', 'Navigating through \'Send to Docusign\'').clickSubmit('body', 'send-application')
    .clickSubmit('#sendApplicationForm', 'modal-submit').wait('@sendApplication')
    .wait('@reviewQuote').get('button[data-test="send-application"]').should('be.disabled');
    
    cy.goToNav('coverage')
    .wait(20000)
    .reload();
  });

  it('Select Policy', () => {
      
    cy.task('log', 'Select Policy').findDataTag('selectPolicy').click({ force: true })
    
  })
});
