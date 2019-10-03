import { setRouteAliases } from '../../helpers';
import { quoteToBindRequest } from '../../helpers/requests';
import quoteDefaults from '../../fixtures/quoteDefaults';

describe('CSR_policyEnd_happyPath_multiEnd1', () => {
  let idToken;
  let endpointURL;
  let response;

  before('Login', () => cy.login());

  beforeEach('Set aliases', async () => {
    setRouteAliases();

    idToken = localStorage.getItem('id_token');
    endpointURL = Cypress.env('API_URL');

    cy.task('log', 'endpointURL');
    cy.task('log', endpointURL);
    cy.task('log', 'cookie.value');
    cy.task('log', idToken);
    response = await quoteToBindRequest(quoteDefaults, idToken, endpointURL);
  });

  it('Bind a quote to a policy for Address 4131 Test Address, Sarasota, FL 00001 using default coverages on the quote', () => {
    cy.visit(`/`);
    cy.task('log', 'Search Policy and open')
      .findDataTag('searchType')
      .select('policy')
      // This will be relevant once ALL users can see the product dropdown
      .findDataTag('policyNumber')
      .type(response.result.transaction.policyNumber)
      .clickSubmit()
      .wait('@fetchPolicies')
      // This makes it so we don't open up a new window
      .findDataTag(response.result.transaction.policyNumber)
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

          .findDataTag('coverageOptions.sinkholePerilCoverage.answer_wrapper')
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

          .get('#root')
          .scrollTo('right')

          .findDataTag('policyHolders[1].emailAddress')
          .scrollIntoView()
          .should('be.visible')

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

          .get('#root')
          .scrollTo('left')

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

          .wait(5000)

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
          .contains(response.result.transaction.effectiveDate.substring(0, 10))

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
          .contains(response.result.transaction.issueDate.substring(0, 10))

          .goToNav('notes')
          .wait('@fetchFiles');

        const effectiveDate = new Date(
          response.result.transaction.effectiveDate
        ).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });

        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains(
            `Multiple Endorsements Endorsement Effective ${effectiveDate}.`
          );

        const created = new Date(
          response.result.transaction.issueDate
        ).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });

        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains(created);

        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains('System');

        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains('tticcsr');

        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains(
            `Multiple Endorsements Endorsement Effective ${effectiveDate}.`
          );

        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains(
            'Prior - Dwelling (A): 314000, Other Structures (B): 6280, Personal Property (C): 78500, Loss of Use (D): 31400, Sinkhole Deductible: Yes, Sinkhole Deductible: 10, Burglar Alarm: No, Roof Covering: Other, Roof Geometry: Other, Protection Class: 3, PH 1 Primary Phone: 1234567890, PH 1 Secondary Phone: , PH 2 First Name: Null, PH 2 Last Name: Null, PH 2 Primary Phone: Null, PH 2 Secondary Phone: Null, PH 2 Email Address: Null, Mailing Address 2: , Property 2: Null.'
          );

        cy.get('.table tbody')
          .find('tr')
          .find('td')
          .contains(
            'New - Dwelling (A): 400000, Other Structures (B): 8000, Personal Property (C): 200000, Loss of Use (D): 40000, Sinkhole Deductible: No, Sinkhole Deductible: Null, Burglar Alarm: Yes, Roof Covering: FBC, Roof Geometry: Hip, Protection Class: 7, PH 1 Primary Phone: 2224445555, PH 1 Secondary Phone: 3337778888, PH 2 First Name: Batman 2, PH 2 Last Name: Robin 2, PH 2 Primary Phone: 9994445555, PH 2 Secondary Phone: 3337776543, PH 2 Email Address: exzeoqa@exzeo.com, Mailing Address 2: APT 101, Property 2: APT 101'
          );
      });
  });
});
