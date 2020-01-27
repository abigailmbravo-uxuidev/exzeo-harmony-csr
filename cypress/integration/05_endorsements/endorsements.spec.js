import { setRouteAliases, createToBindQuote } from '../../helpers';

describe('Endorsements Happy Path', () => {
  before('Login and set route aliases', () => {
    setRouteAliases();
    cy.login();
  });

  it('Bind a quote to a policy for Address 4131 Test Address, Sarasota, FL 00001 using default coverages on the quote', () => {
    createToBindQuote();
    cy.visit('/');
    cy.task('log', 'Search Policy and open')
      .get('@boundQuote')
      .then(quote => {
        cy.findDataTag('searchType')
          .select('policy')
          // This will be relevant once ALL users can see the product dropdown
          .findDataTag('policyNumber')
          .type(quote.transaction.policyNumber)
          .clickSubmit()
          .wait('@fetchPolicies')
          // This makes it so we don't open up a new window
          .findDataTag(quote.transaction.policyNumber)
          .then($a => {
            $a.prop('onclick', () => cy.visit($a.prop('dataset').url));
          });

        cy.goToNav('endorsements');
        // Cypress checks an element's visibility with a special algo, and our
        // sticky footer causes problems with that. https://github.com/cypress-io/cypress/issues/2037
        // Here we are overriding some styling to force the footer to the bottom of its container, keeping it out of the
        // way for testing purposes
        // prettier-ignore
        cy.get('.content-wrapper').invoke('attr', 'style', 'overflow-y: auto');
        // prettier-ignore
        cy.get('.route-content').invoke('attr', 'style', 'overflow: unset');

        cy.task('log', 'Filling out Endorsements')
          .findDataTag('coverageLimits.dwelling.value')
          .type(`{selectall}{backspace}${400000}`)
          .findDataTag('coverageLimits.personalProperty.value')
          .select('50')
          .findDataTag('property.burglarAlarm_true')
          .click()
          .findDataTag('coverageOptions.sinkholePerilCoverage.answer')
          .select('false')
          .findDataTag('property.windMitigation.roofCovering')
          .select('FBC')
          .findDataTag('property.windMitigation.roofGeometry')
          .select('Hip')
          .findDataTag('property.protectionClass')
          .select('7')
          .findDataTag('policyHolders[0].primaryPhoneNumber')
          .type(`{selectall}{backspace}${'2224445555'}`)
          .findDataTag('policyHolders[0].secondaryPhoneNumber')
          .type(`{selectall}{backspace}${'3337778888'}`)
          .findDataTag('policyHolders[1].firstName')
          .type(`{selectall}{backspace}${'Batman 2'}`)
          .findDataTag('policyHolders[1].lastName')
          .type(`{selectall}{backspace}${'Robin 2'}`)
          .findDataTag('policyHolders[1].emailAddress')
          .type(`{selectall}{backspace}${'exzeoqa@exzeo.com'}`)
          .findDataTag('policyHolders[1].primaryPhoneNumber')
          .type(`{selectall}{backspace}${'9994445555'}`)
          .findDataTag('policyHolders[1].secondaryPhoneNumber')
          .type(`{selectall}{backspace}${'3337776543'}`)
          .findDataTag('policyHolderMailingAddress.address2')
          .type(`{selectall}{backspace}${'APT 101'}`)
          .findDataTag('property.physicalAddress.address2')
          .type(`{selectall}{backspace}${'APT 101'}`)
          .findDataTag('modal-submit')
          .click()
          .wait('@rateEndorsement')
          .findDataTag('modal-submit')
          .click()
          .wait('@saveEndorsement')
          // Have to wait here, 'saveEndorsement' resolves before some async work is finished on the backend.
          .wait(5000);
        cy.findDataTag('policyHolderDetail')
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
          .contains(quote.transaction.effectiveDate.substring(0, 10))
          .get('.table tbody')
          .find('tr')
          .find('td')
          .contains('Multiple Endorsements Endorsement')
          .get('.table tbody')
          .find('tr')
          .find('td')
          .contains(quote.transaction.issueDate.substring(0, 10));

        cy.goToNav('notes').wait('@fetchFiles');
        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains('System');
        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains('tticcsr');
        cy.get('.table tbody')
          .contains('div', `Multiple Endorsements Endorsement`)
          .then($div => {
            expect($div).to.have.length(1);
          });
      });
  });
});
