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
            $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
            cy.goToNav('endorsements');

            cy.viewport(1375, 768);

            cy.task('log', 'Filling out Endorsements')
              .findDataTag('coverageLimits.dwelling.value')
              .type(`{selectall}{backspace}${400000}`)
              .findDataTag('coverageLimits.personalProperty.value')
              .select('50', { force: true })

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
              .select('false', { force: true })

              .findDataTag('property.windMitigation.roofCovering_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('property.windMitigation.roofCovering')
              .select('FBC', { force: true })

              .findDataTag('property.windMitigation.roofGeometry_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('property.windMitigation.roofGeometry')
              .select('Hip', { force: true })

              .findDataTag('property.protectionClass_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('property.protectionClass')
              .select('7', { force: true })

              .findDataTag('policyHolders[0].primaryPhoneNumber')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('policyHolders[0].primaryPhoneNumber')
              .type(`{selectall}{backspace}${'2224445555'}`, { force: true })
              .findDataTag('policyHolders[0].secondaryPhoneNumber')
              .type(`{selectall}{backspace}${'3337778888'}`, { force: true })

              .get('#root')
              .scrollTo('right')

              .findDataTag('policyHolders[1].emailAddress')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('policyHolders[1].firstName')
              .type(`{selectall}{backspace}${'Batman 2'}`, { force: true })

              .findDataTag('policyHolders[1].lastName')
              .type(`{selectall}{backspace}${'Robin 2'}`, { force: true })

              .findDataTag('policyHolders[1].emailAddress')
              .type(`{selectall}{backspace}${'exzeoqa@exzeo.com'}`, {
                force: true
              })

              .findDataTag('policyHolders[1].primaryPhoneNumber')
              .type(`{selectall}{backspace}${'9994445555'}`, { force: true })

              .findDataTag('policyHolders[1].secondaryPhoneNumber')
              .type(`{selectall}{backspace}${'3337776543'}`, { force: true })

              .get('#root')
              .scrollTo('left')

              .findDataTag('policyHolderMailingAddress.city_wrapper')
              .scrollIntoView()
              .should('be.visible')

              .findDataTag('policyHolderMailingAddress.address2')
              .type(`{selectall}{backspace}${'APT 101'}`, { force: true })

              .findDataTag('property.physicalAddress.city_wrapper')
              .scrollIntoView()
              .should('be.visible')
              .findDataTag('property.physicalAddress.address2')
              .type(`{selectall}{backspace}${'APT 101'}`, { force: true })

              .findDataTag('modal-submit')
              .click({ force: true })
              .wait('@rateEndorsement')

              .get('#root')
              .scrollTo('right')

              .findDataTag('modal-submit')
              .click({ force: true })
              .wait('@saveEndorsement')

              .wait(5000)

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
              .contains(quote.transaction.effectiveDate.substring(0, 10))

              .get('.table tbody')
              .find('tr')
              .find('td')
              .contains('Multiple Endorsements Endorsement')

              .get('.table tbody')
              .find('tr')
              .find('td')
              .contains(quote.transaction.issueDate.substring(0, 10))

              .goToNav('notes')
              .wait('@fetchFiles');

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
});
