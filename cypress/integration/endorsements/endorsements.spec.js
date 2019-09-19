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
            cy.goToNav('endorsements');

            cy.task('log', 'Filling out Endorsements')

              .findDataTag('coverageLimits.dwelling.value')
              .type(`{selectall}{backspace}${400000}`)
              .findDataTag('coverageLimits.personalProperty.value')
              .select('50')

              .findDataTag('property.burglarAlarm_true')
              .click({ force: true })

              .get('#root')
              .scrollTo('left')

              .findDataTag(
                'coverageOptions.sinkholePerilCoverage.answer_wrapper'
              )
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('coverageOptions.sinkholePerilCoverage.answer')
              .select('false')

              .findDataTag('property.windMitigation.roofCovering_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('property.windMitigation.roofCovering')
              .select('FBC')

              .findDataTag('property.windMitigation.roofGeometry_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('property.windMitigation.roofGeometry')
              .select('Hip')

              .findDataTag('property.protectionClass_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('property.protectionClass')
              .select('7')

              .findDataTag('policyHolders[0].emailAddress_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('policyHolders[0].primaryPhoneNumber')
              .type(`{selectall}{backspace}${'2224445555'}`)
              .findDataTag('policyHolders[0].secondaryPhoneNumber')
              .type(`{selectall}{backspace}${'3337778888'}`)

              .findDataTag('policyHolderMailingAddress.city_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('policyHolderMailingAddress.address2')
              .type(`{selectall}{backspace}${'APT 101'}`)

              .findDataTag('property.physicalAddress.city_wrapper')
              .scrollIntoView()
              .should('be.visible')
              .findDataTag('property.physicalAddress.address2')
              .type(`{selectall}{backspace}${'APT 101'}`)

              .findDataTag('modal-submit')
              .click({ force: true })
              .wait('@rateEndorsement')

              .findDisabledDataTag('endorsementAmount')
              .should('have.value', '-$ 211')
              .findDisabledDataTag('newCurrentPremium')
              .should('have.value', '$ 2,456')
              .findDisabledDataTag('newAnnualPremium')
              .should('have.value', '$ 2,456')

              .get('#root')
              .scrollTo('right')

              .findDataTag('modal-submit')
              .click({ force: true })
              .wait('@saveEndorsement')
              .wait('@fetchPolicy')
              .wait('@fetchSummaryLedger')

              .wait(3000)

              .findDataTag('currentPremiumDetail')
              .get('dl div dd')
              .contains('$ 2,456')

              .findDataTag('policyHolderDetail')
              .get('dl div')
              .find('dd')
              .contains('(222) 444-5555')

              .findDataTag('propertyAddressDetail')
              .get('dl div')
              .find('dd')
              .contains('APT 101')

              .findDataTag('mailingAddressDetail')
              .get('dl div')
              .find('dd')
              .contains('APT 101')

              .get('.table tbody')
              .find('tr')
              .find('td')
              .contains(
                response.result.transaction.effectiveDate.substring(0, 10)
              )

              .get('.table tbody')
              .find('tr')
              .find('td')
              .contains('-$211.00')

              .get('.table tbody')
              .find('tr')
              .find('td')
              .contains('Multiple Endorsements Endorsement')

              .get('.table tbody')
              .find('tr')
              .find('td')
              .contains(response.result.transaction.issueDate.substring(0, 10));
          });
      });
    });
  });

  //it('Test Endorsement Page', () => {
  // cy.visit(`/policy/12-1019697-01/endorsements`);

  // .findDisabledDataTag('endorsementAmount')
  // .should('have.value', '-$ 211')
  // .findDisabledDataTag('newCurrentPremium')
  // .should('have.value', '$ 2,456')
  // .findDisabledDataTag('newAnnualPremium')
  // .should('have.value', '$ 2,456');

  // .findDisabledDataTag('endorsementAmount').should('have.value', '$ 548')
  // .findDisabledDataTag('newCurrentPremium').should('have.value', '$ 2,233')
  // .findDisabledDataTag('newAnnualPremium').should('have.value', '$ 1,685')
  //});
});
