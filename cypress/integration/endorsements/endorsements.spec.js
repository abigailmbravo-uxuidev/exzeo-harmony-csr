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
        const quoteNumber = xhr.request.body.data.quoteNumber;
        cy.task('log', 'quoteNumber')
        cy.task('log', quoteNumber)


        const endpointURL = Cypress.env('SVC_URL');

        cy.task('log', 'endpointURL')
        cy.task('log', endpointURL)


        cy.task('log', 'cookie.value')
        cy.task('log', cookie.value)


        bindPolicyRequest(quoteNumber, cookie.value, endpointURL).then(response => {
          cy.task('log', 'bindPolicyRequest')
          cy.task('log', response.result.policyNumber)

          cy.visit(`/policy/${response.result.policyNumber}/endorsements`);
        });
      });
    });
    
    

  });

  it('Test Endorsement Page', () => {
    
    cy.task('log', 'Filling out Endorsements')
    .findDataTag('coverageLimits.dwelling.value').type(`{selectall}{backspace}${400000}`)
    .findDataTag('coverageLimits.personalProperty.value').select('50')

    cy.first('.scroll').scrollTo(0,500)

    .findDataTag('coverageOptions.sinkholePerilCoverage.answer').select('false')
    .findDataTag('property.burglarAlarm_true').click({ force: true })

    .findDataTag('home-scroll-section').click({ force: true })

    .findDataTag('property.windMitigation.roofCovering').select('FBC')
    .findDataTag('property.windMitigation.roofGeometry').select('Hip')
    .findDataTag('property.protectionClass').select('7')

    .findDataTag('policyholder-scroll-section').click({ force: true })

    .findDataTag('policyHolders[0].primaryPhoneNumber').type(`{selectall}{backspace}${'2224445555'}`)
    .findDataTag('policyHolders[0].secondaryPhoneNumber').type(`{selectall}{backspace}${'3337778888'}`)

    .findDataTag('address-scroll-section').click({ force: true })

    .findDataTag('policyHolderMailingAddress.address2').type(`{selectall}{backspace}${'APT 101'}`)
    .findDataTag('property.physicalAddress').type(`{selectall}{backspace}${'APT 101'}`)

  })
});
