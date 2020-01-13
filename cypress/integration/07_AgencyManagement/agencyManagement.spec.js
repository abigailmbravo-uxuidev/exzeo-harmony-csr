import { setRouteAliases } from '../../helpers/setRouteAliases';
import {
  ADD_AGENCY,
  ADD_AGENT,
  ADD_LICENSE,
  ADD_CONTRACT,
  EDIT_LICENSE,
  EDIT_CONTRACT,
  EDIT_AGENCY,
  EDIT_AGENCY_ADDRESS,
  EDIT_OFFICER,
  EDIT_CONTACT,
  EDIT_AGENT,
  ADD_ANOTHER_AGENT,
  ADD_NOTE
} from '../../fixtures';

describe('Agency Management testing', () => {
  before('Login and set route aliases', () => {
    setRouteAliases();
    cy.login();
  });

  it('POS:Agency Management Test', () => {
    cy.findDataTag('agency-link').click();

    cy.viewport(1366, 768);

    cy.url().should('contain', `/agency`);

    // This makes it so we don't open up a new window
    cy.findDataTag('add-agency-not-searched').within(() => {
      cy.get('a.btn-primary').then($a => {
        $a.prop('onclick', () => cy.visit('/agency/new/0')).click();
      });
    });

    cy.findDataTag('displayName')
      .type('Cypress Agency')

      .findDataTag('legalName')
      .click({ force: true })
      .type('Company')

      .findDataTag('status')
      .select('Service Only')

      .findDataTag('tpaid')
      .type('1')

      .findDataTag('okToPay_false')
      .click()

      .findDataTag('websiteUrl')
      .click({ force: true })
      .type('https://agency.harmony-ins.com/')

      .findDataTag('taxIdNumber')
      .type('9999')

      .findDataTag('taxClassification')
      .select('Corporation')

      .findDataTag('eoExpirationDate')
      .type('2020-11-20')

      .findDataTag('branchName')
      .click({ force: true })
      .type('Tampa Branch')

      .get('[class="agency-details"]')
      .within(() => {
        cy.findDataTag('primaryPhoneNumber')
          .type('4445556666')

          .findDataTag('secondaryPhoneNumber')
          .type('4445556667')

          .findDataTag('faxNumber')
          .type('4445556668');
      });

    cy.findDataTag('customerServiceEmailAddress')
      .click({ force: true })
      .type('exzeoqa@exzeo.com');

    cy.findDataTag('agency-mailing-address')
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.findDataTag('address1')
          .type('Test Mailing Address 1')

          .findDataTag('address2')
          .type('Test Mailing Address 2')

          .findDataTag('city')
          .type('Tampa')

          .findDataTag('state')
          .select('FL')

          .findDataTag('zip')
          .type('33607');
      });

    cy.get('[class~="territoryManagerId"] [class~="react-select__placeholder"]')
      .scrollIntoView()
      .should('be.visible')

      .findDataTag('agency-physical-address')
      .within(() => {
        cy.findDataTag('address1')
          .type('Test Physical Address 1')

          .findDataTag('address2')
          .type('Test Physical Address 2')

          .findDataTag('city')
          .type('Tampa')

          .findDataTag('state')
          .select('FL')

          .chooseReactSelectOption('zip_wrapper', '33624');
      });

    cy.findDataTag('sameAsMailing')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get('[class="agency-contact"]')
      .scrollIntoView()
      .should('be.visible')

      .findDataTag('principal.firstName')
      .type('Cypress')

      .findDataTag('principal.lastName')
      .type('Officer')

      .findDataTag('principal.emailAddress')
      .type('exzeoqa@exzeo.com')

      .findDataTag('principal.primaryPhoneNumber')
      .type('4445556666', { force: true })

      .findDataTag('principal.primaryPhoneNumberExtension')
      .type('7777');

    cy.get('[class="agency-aor"]')
      .scrollIntoView()
      .should('be.visible')

      .findDataTag('contact.title')
      .type('Dr.')

      .findDataTag('contact.firstName')
      .type('Cypress')

      .findDataTag('contact.lastName')
      .type('Contact')

      .findDataTag('contact.emailAddress')
      .type('exzeoqa@exzeo.com')

      .findDataTag('contact.primaryPhoneNumber')
      .type('4445556667')

      .findDataTag('contact.primaryPhoneNumberExtension')
      .type('8888');

    cy.findDataTag('aor-mailing-address')
      .scrollIntoView()
      .should('be.visible')
      .findDataTag('agentCode')

      .findDataTag('agentFirstName')
      .type('Cypress')

      .findDataTag('agentLastName')
      .type('Agent')

      .findDataTag('emailAddress')
      .type('exzeoqa@exzeo.com')

      .get('[class="agent-phone"]')
      .within(() => {
        cy.findDataTag('primaryPhoneNumber')
          .type('4445556666', { force: true })

          .findDataTag('secondaryPhoneNumber')
          .type('4445556667', { force: true })

          .findDataTag('faxNumber')
          .type('4445556668', { force: true });
      });

    cy.findDataTag('aor-physical-address')
      .scrollIntoView()
      .should('be.visible')

      .findDataTag('aor-mailing-address')
      .within(() => {
        cy.findDataTag('address1')
          .type('Test AOR Mailing Address 1')

          .findDataTag('address2')
          .type('Test AOR Mailing Address 2')

          .findDataTag('city')
          .type('Tampa')

          .findDataTag('state')
          .select('FL');
      });

    cy.get('[data-test="aor-mailing-address"] [data-test="address1_label"]')
      .scrollIntoView()
      .should('be.visible');

    cy.findDataTag('aor-mailing-address').within(() => {
      cy.findDataTag('zip')
        .scrollIntoView()
        .should('be.visible')
        .type('33607', { force: true });
    });

    cy.findDataTag('aor-physical-address').within(() => {
      cy.findDataTag('zip_wrapper')
        .scrollIntoView()
        .should('be.visible')

        .findDataTag('address1')
        .type('Test AOR Physical Address 1')

        .findDataTag('address2')
        .type('Test AOR Physical Address 2')

        .findDataTag('city')
        .type('Tampa')

        .findDataTag('state')
        .select('FL');
    });

    cy.findDataTag('agentOfRecord.sameAsMailing')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.findDataTag('agentOfRecord.licenses[0].licenseNumber_label')
      .scrollIntoView()
      .should('be.visible')

      .findDataTag('agentOfRecord.licenses[0].state')
      .select('FL')

      .findDataTag('agentOfRecord.licenses[0].licenseType')
      .select('Resident')

      .findDataTag('agentOfRecord.licenses[0].licenseNumber')
      .type('12345')

      .findDataTag('agentOfRecord.licenses[0].appointed')
      .click()

      .get('[class~="add-license"]')
      .click()

      .findDataTag('agentOfRecord.licenses[1].state')
      .select('FL')

      .findDataTag('agentOfRecord.licenses[1].licenseType')
      .select('Non-Resident')

      .findDataTag('agentOfRecord.licenses[1].licenseNumber')
      .type('23456')

      .clickSubmit('body', 'submitButton');

    cy.wait('@saveNewAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Overview Page: Details Area: status'
      ).to.equal(201);

      expect(
        response.body.result.displayName,
        'Overview Page: Details Area: displayName'
      ).to.equal(ADD_AGENCY.displayName);
      expect(
        response.body.result.legalName,
        'Overview Page: Details Area: legalName'
      ).to.equal(ADD_AGENCY.legalName);
      expect(
        response.body.result.status,
        'Overview Page: Details Area: agency status'
      ).to.equal(ADD_AGENCY.status);
      expect(
        response.body.result.tpaid,
        'Overview Page: Details Area: tpaid'
      ).to.equal(ADD_AGENCY.tpaid);
      expect(
        response.body.result.okToPay,
        'Overview Page: Details Area: okToPay'
      ).to.equal(ADD_AGENCY.okToPay);
      expect(
        response.body.result.websiteUrl,
        'Overview Page: Details Area: websiteUrl'
      ).to.equal(ADD_AGENCY.websiteUrl);
      expect(
        response.body.result.taxIdNumber,
        'Overview Page: Details Area: taxIdNumber'
      ).to.equal(ADD_AGENCY.taxIdNumber);
      expect(
        response.body.result.taxClassification,
        'Overview Page: Details Area: taxClassification'
      ).to.equal(ADD_AGENCY.taxClassification);
      expect(
        response.body.result.eoExpirationDate,
        'Overview Page: Details Area: eoExpirationDate'
      ).to.equal(ADD_AGENCY.eoExpirationDate);
      expect(
        response.body.result.primaryPhoneNumber,
        'Overview Page: Details Area: primaryPhoneNumber'
      ).to.equal(ADD_AGENCY.primaryPhoneNumber);
      expect(
        response.body.result.secondaryPhoneNumber,
        'Overview Page: Details Area: secondaryPhoneNumber'
      ).to.equal(ADD_AGENCY.secondaryPhoneNumber);
      expect(
        response.body.result.faxNumber,
        'Overview Page: Details Area: faxNumber'
      ).to.equal(ADD_AGENCY.faxNumber);
      expect(
        response.body.result.customerServiceEmailAddress,
        'Overview Page: Details Area: customerServiceEmailAddress'
      ).to.equal(ADD_AGENCY.customerServiceEmailAddress);

      expect(
        response.body.result.mailingAddress,
        'Overview Page: Address Area: mailingAddress'
      ).to.eql(ADD_AGENCY.mailingAddress);
      expect(
        response.body.result.physicalAddress,
        'Overview Page: Address Area: physicalAddress'
      ).to.eql(ADD_AGENCY.physicalAddress);
      expect(
        response.body.result.territoryManagerId,
        'Overview Page: Address Area: territoryManagerId'
      ).to.equal(ADD_AGENCY.territoryManagerId);

      expect(
        response.body.result.principal,
        'Overview Page: Officer Area: principal'
      ).to.eql(ADD_AGENCY.principal);

      expect(
        response.body.result.contact,
        'Overview Page: Contact Area: contact'
      ).to.eql(ADD_AGENCY.contact);
    });

    cy.get('[data-test="agency-code"]>div').contains(/^\d+/);

    cy.get('[class="agent-code"]').contains(/^\d+/);

    cy.wait('@fetchAgentsByAgencyCode').then(({ response }) => {
      expect(
        response.body.status,
        'Overview Page: Agent Of Record Area: status'
      ).to.equal(200);

      expect(
        response.body.result[0].firstName,
        'Overview Page: Agent Of Record Area: firstName'
      ).to.equal(ADD_AGENT.firstName);
      expect(
        response.body.result[0].lastName,
        'Overview Page: Agent Of Record Area: lastName'
      ).to.equal(ADD_AGENT.lastName);
      expect(
        response.body.result[0].mailingAddress,
        'Overview Page: Agent Of Record Area: mailingAddress'
      ).to.eql(ADD_AGENT.mailingAddress);

      expect(
        response.body.result[0].status,
        'Overview Page: Agent Of Record Area: Agent status'
      ).to.equal(ADD_AGENT.status);

      expect(
        response.body.result[0].primaryPhoneNumber,
        'Overview Page: Agent Of Record Area: primaryPhoneNumber'
      ).to.equal(ADD_AGENT.primaryPhoneNumber);
      /*expect(response.body.result[0].primaryPhoneNumberExtension).to.equal(
        ADD_AGENT.primaryPhoneNumberExtension
      );*/
      expect(
        response.body.result[0].secondaryPhoneNumber,
        'Overview Page: Agent Of Record Area: secondaryPhoneNumber'
      ).to.equal(ADD_AGENT.secondaryPhoneNumber);
      expect(
        response.body.result[0].faxNumber,
        'Overview Page: Agent Of Record Area: faxNumber'
      ).to.equal(ADD_AGENT.faxNumber);
      expect(
        response.body.result[0].emailAddress,
        'Overview Page: Agent Of Record Area: emailAddress'
      ).to.equal(ADD_AGENT.emailAddress);

      //not displayed but sent in the same request
      expect(
        response.body.result[0].mailingAddress,
        'Overview Page: Agent Of Record Area: mailingAddress'
      ).to.eql(ADD_AGENT.mailingAddress);
      expect(
        response.body.result[0].licenses,
        'Overview Page: Agent Of Record Area: licenses'
      ).to.eql(ADD_AGENT.licenses);
    });

    cy.get('[class="side-navigation"] [class~="contracts"]').click();

    cy.findDataTag('addLicense')
      .click()
      .get('[class~="modal"]')

      .findDataTag('state')
      .select('FL')

      .findDataTag('licenseNumber')
      .type('99990')

      .findDataTag('licenseType')
      .select('Resident')

      .findDataTag('licenseEffectiveDate')
      .type('2019-11-22')

      .get('[class~="modal"] [type="submit"]')
      .click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Contracts Page: Verify License Card: status'
      ).to.equal(201);

      expect(
        response.body.result.licenses,
        'Contracts Page: Verify License Card: licenses'
      ).to.eql(ADD_LICENSE.licenses);
    });

    cy.findDataTag('addContract')
      .click()
      .get('[class~="modal"]')

      .findDataTag('state-0')
      .select('FL')
      .get('[data-test="state-0"][data-selected="FL"]')

      .get(
        '[data-test="companyCode_wrapper"] [class~="react-select__value-container"]'
      )
      .type('TTIC{enter}')

      .get(
        '[data-test="contractNumber_wrapper"] [class~="react-select__value-container"]'
      )
      .type('TT FL 01 19{enter}')

      .get(
        '[data-test="addendum_wrapper"] [class~="react-select__value-container"]'
      )
      .type('TT 01 19{enter}')

      .findDataTag('product-0')
      .select('AF3')
      .get('[data-test="product-0"][data-selected="AF3"]')

      .findDataTag('add-product')
      .click()

      .findDataTag('state-1')
      .select('FL')

      .findDataTag('product-1')
      .select('HO3')

      .get('[class~="modal"] [class="btn-footer"] [class~="btn-primary"]')
      .click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Contracts Page: Licenses Area: status'
      ).to.equal(201);

      expect(
        response.body.result.contracts,
        'Contracts Page: Licenses Area: contracts'
      ).to.eql(ADD_CONTRACT.contracts);
    });

    cy.get('[class="license card"] [data-test="delete-contract"]')
      .click()
      .get('[class~="modal"]')

      .findDataTag('licenseNumber')
      .type('{selectall}{backspace}99991')

      .findDataTag('licenseType')
      .select('Non-Resident')

      .findDataTag('licenseEffectiveDate')
      .type('2019-11-24')

      .get('[class~="modal"] [type="submit"]')
      .click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Contracts Page: Licenses Area after Edit: status'
      ).to.equal(201);

      expect(response.body.result.licenses).to.eql(
        EDIT_LICENSE.licenses,
        'Contracts Page: Licenses Area after Edit: licenses'
      );
    });

    cy.get('[data-test="contracts"] [data-test="delete-contract"]')
      .click()
      .get('[class~="modal"]')

      .get(
        '[data-test="contractNumber_wrapper"] [class~="react-select__clear-indicator"]'
      )
      .click()

      .get(
        '[data-test="contractNumber_wrapper"] [class~="react-select__value-container"]'
      )
      .type('TT FL 03 16{enter}')

      .get(
        '[data-test="addendum_wrapper"] [class~="react-select__clear-indicator"]'
      )
      .click()

      .get(
        '[data-test="addendum_wrapper"] [class~="react-select__value-container"]'
      )
      .type('TT 03 16{enter}')

      .get('[class~="modal"] [class="btn-footer"] [class~="btn-primary"]')
      .click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Contracts Page: Licenses Area: status'
      ).to.equal(201);

      expect(
        response.body.result.contracts,
        'Contracts Page: Licenses Area: contracts'
      ).to.eql(EDIT_CONTRACT.contracts);
    });

    cy.get('[class~="overview"]')
      .click()

      .get('[data-test="agency-details"]>button')
      .should('not.have.class', 'modal')
      .click()
      .get('[class~="modal"]')

      .findDataTag('displayName')
      .type('{selectall}{backspace}Cypress Agency updated')

      .findDataTag('legalName')
      .type('{selectall}{backspace}Company updated')

      .get('[class~="modal"] [data-test="status"]')
      .select('Active')

      .get('[class~="modal"] [data-test="tpaid"]')
      .type('{selectall}{backspace}2')

      .findDataTag('okToPay_true')
      .click()

      .findDataTag('websiteUrl')
      .type('{selectall}{backspace}https://csr.harmony-ins.com/')

      .findDataTag('taxIdNumber')
      .type('{selectall}{backspace}99999')

      .findDataTag('taxClassification')
      .select('Partnership')

      .findDataTag('eoExpirationDate')
      .type('2020-11-22')

      .findDataTag('branchName')
      .type('{selectall}{backspace}Ocala Branch')

      .findDataTag('primaryPhoneNumber')
      .type('{selectall}{backspace}(444)555-7777')

      .findDataTag('secondaryPhoneNumber')
      .type('{selectall}{backspace}(444)555-7778')

      .findDataTag('faxNumber')
      .type('{selectall}{backspace}(444)555-7779')

      .findDataTag('customerServiceEmailAddress')
      .type('{selectall}{backspace}exzeoqa2@exzeo.com')

      .get('[class~="btn-primary"][type="submit"]')
      .click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Overview Page: Details Area After Edit: status'
      ).to.equal(201);

      expect(
        response.body.result.displayName,
        'Overview Page: Details Area After Edit: status'
      ).to.equal(EDIT_AGENCY.displayName);
      expect(
        response.body.result.legalName,
        'Overview Page: Details Area After Edit: legalName'
      ).to.equal(EDIT_AGENCY.legalName);
      expect(
        response.body.result.status,
        'Overview Page: Details Area After Edit: Agency status'
      ).to.equal(EDIT_AGENCY.status);
      expect(
        response.body.result.tpaid,
        'Overview Page: Details Area After Edit: tpaid'
      ).to.equal(EDIT_AGENCY.tpaid);
      expect(
        response.body.result.okToPay,
        'Overview Page: Details Area After Edit: okToPay'
      ).to.equal(EDIT_AGENCY.okToPay);
      expect(
        response.body.result.websiteUrl,
        'Overview Page: Details Area After Edit: websiteUrl'
      ).to.equal(EDIT_AGENCY.websiteUrl);
      expect(
        response.body.result.taxIdNumber,
        'Overview Page: Details Area After Edit: taxIdNumber'
      ).to.equal(EDIT_AGENCY.taxIdNumber);
      expect(
        response.body.result.taxClassification,
        'Overview Page: Details Area After Edit: taxClassification'
      ).to.equal(EDIT_AGENCY.taxClassification);
      expect(
        response.body.result.eoExpirationDate,
        'Overview Page: Details Area After Edit: eoExpirationDate'
      ).to.equal(EDIT_AGENCY.eoExpirationDate);
      expect(
        response.body.result.primaryPhoneNumber,
        'Overview Page: Details Area After Edit: primaryPhoneNumber'
      ).to.equal(EDIT_AGENCY.primaryPhoneNumber);
      expect(
        response.body.result.secondaryPhoneNumber,
        'Overview Page: Details Area After Edit: secondaryPhoneNumber'
      ).to.equal(EDIT_AGENCY.secondaryPhoneNumber);
      expect(
        response.body.result.faxNumber,
        'Overview Page: Details Area After Edit: faxNumber'
      ).to.equal(EDIT_AGENCY.faxNumber);
      expect(
        response.body.result.customerServiceEmailAddress,
        'Overview Page: Details Area After Edit: customerServiceEmailAddress'
      ).to.equal(EDIT_AGENCY.customerServiceEmailAddress);
    });

    cy.get('[data-test="agency-address"]>button')
      .should('not.have.class', 'modal')
      .click()
      .get('[class~="modal"]')

      .findDataTag('edit-agency-mailing-address')
      .within(() => {
        cy.findDataTag('address1')
          .type('{selectall}{backspace}Test Mailing Address 1 Updated')

          .findDataTag('address2')
          .type('{selectall}{backspace}Test Mailing Address 2 Updated')

          .findDataTag('city')
          .type('{selectall}{backspace}Clearwater')

          .findDataTag('state')
          .select('FL')

          .findDataTag('zip')
          .type('{selectall}{backspace}33624');
      });

    cy.findDataTag('edit-agency-physical-address').within(() => {
      cy.findDataTag('address1')
        .type('{selectall}{backspace}Test Physical Address 1 Updated')

        .findDataTag('address2')
        .type('{selectall}{backspace}Test Physical Address 2 Updated')

        .findDataTag('city')
        .type('{selectall}{backspace}Clearwater')

        .findDataTag('state')
        .select('FL')

        .chooseReactSelectOption('zip_wrapper', '33607');
    });

    cy.findDataTag('sameAsMailing').click();

    cy.get('[class~="modal"] [class~="btn-primary"]').click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Overview Page: Agency Address Area After Edit: status'
      ).to.equal(201);

      expect(
        response.body.result.mailingAddress,
        'Overview Page: Agency Address Area After Edit: mailingAddress'
      ).to.eql(EDIT_AGENCY_ADDRESS.mailingAddress);
      expect(
        response.body.result.physicalAddress,
        'Overview Page: Agency Address Area After Edit: physicalAddress'
      ).to.eql(EDIT_AGENCY_ADDRESS.physicalAddress);
      expect(
        response.body.result.territoryManagerId,
        'Overview Page: Agency Address Area After Edit: territoryManagerId'
      ).to.equal(EDIT_AGENCY_ADDRESS.territoryManagerId);
    });

    cy.get('.agency-principal [data-test="edit-contact"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })

      .get('[name="principal.title"]')
      .type('{selectall}{backspace}Jr.')

      .get('[name="principal.firstName"]')
      .type('{selectall}{backspace}Cypress2')

      .get('[name="principal.lastName"]')
      .type('{selectall}{backspace}Officer2')

      .get('[name="principal.emailAddress"]')
      .type('{selectall}{backspace}exzeoqa2@exzeo.com')

      .get('[name="principal.primaryPhoneNumber"]')
      .type('{selectall}{backspace}(444) 555-6677')

      .get('[name="principal.primaryPhoneNumberExtension"]')
      .type('{selectall}{backspace}5555')

      .get('[class="card-footer"] [class~="btn-primary"]')
      .click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Overview Page: Officer Area After Edit: status'
      ).to.equal(201);
      expect(
        response.body.result.principal,
        'Overview Page: Officer Area After Edit: principal'
      ).to.eql(EDIT_OFFICER.principal);
    });

    cy.get('.agency-contact [data-test="edit-contact"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })

      .get('[name="contact.title"]')
      .type('{selectall}{backspace}Jr.')

      .get('[name="contact.firstName"]')
      .type('{selectall}{backspace}Cypress2')

      .get('[name="contact.lastName"]')
      .type('{selectall}{backspace}Contact2')

      .get('[name="contact.emailAddress"]')
      .type('{selectall}{backspace}exzeoqa2@exzeo.com')

      .get('[name="contact.primaryPhoneNumber"]')
      .type('{selectall}{backspace}(444) 555-6688')

      .get('[name="contact.primaryPhoneNumberExtension"]')
      .type('{selectall}{backspace}9999')

      .get('[class="card-footer"] [class~="btn-primary"]')
      .click();

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Overview Page: Contact Area After Edit: status'
      ).to.equal(201);
      expect(
        response.body.result.contact,
        'Overview Page: Contact Area After Edit: contact'
      ).to.eql(EDIT_CONTACT.contact);
    });

    cy.get('.contact-actions [data-test="edit-agent"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.findDataTag('firstName')
      .type('{selectall}{backspace}Cypress2')

      .findDataTag('lastName')
      .type('{selectall}{backspace}Agent2')

      .findDataTag('primaryPhoneNumber')
      .type('{selectall}{backspace}4445556699')

      .findDataTag('primaryPhoneNumberExtension')
      .type('{selectall}{backspace}1111')

      .findDataTag('secondaryPhoneNumber')
      .type('{selectall}{backspace}4445556667')

      .findDataTag('faxNumber')
      .type('{selectall}{backspace}4445556668')

      .findDataTag('emailAddress')
      .type('{selectall}{backspace}exzeoqa2@exzeo.com');

    cy.findDataTag('agent-mailing-address').within(() => {
      cy.get('[name="mailingAddress.zip"]')
        .scrollIntoView()
        .should('be.visible')

        .findDataTag('address1')
        .type('{selectall}{backspace}Test Mailing Address 1 Updated')

        .findDataTag('address2')
        .type('{selectall}{backspace}Test Mailing Address 2 Updated')

        .findDataTag('city')
        .type('{selectall}{backspace}Clearwater')

        .findDataTag('state')
        .select('FL')

        .get('[name="mailingAddress.zip"]')
        .type('{selectall}{backspace}33624');
    });

    cy.findDataTag('agent-physical-address').within(() => {
      cy.findDataTag('address1')
        .type('{selectall}{backspace}Test Physical Address 1 Updated')

        .findDataTag('address2')
        .type('{selectall}{backspace}Test Physical Address 2 Updated')

        .findDataTag('city')
        .type('{selectall}{backspace}Clearwater')

        .findDataTag('state')
        .select('FL')

        .chooseReactSelectOption('zip_wrapper', '33607');
    });

    cy.findDataTag('sameAsMailing').click();

    cy.findDataTag('licenses[0].state')
      .select('FL')

      .findDataTag('licenses[0].licenseType')
      .select('Non-Resident')

      .findDataTag('licenses[0].licenseNumber')
      .type('{selectall}{backspace}23456')

      .findDataTag('licenses[0].appointed')
      .click()
      .get('[data-test="licenses[0].appointed"][value="false"]')

      .get(
        '[class="license-wrapper"]:nth-child(3) [class~="btn-remove-wrapper"]>button'
      )
      .click()

      .get('[class="card-footer"] [class~="btn-primary"]')
      .click();

    cy.wait('@saveAgent').then(({ response }) => {
      expect(
        response.body.status,
        'Overview Page: Agent Area After Edit: status'
      ).to.equal(200);

      expect(
        response.body.result.firstName,
        'Overview Page: Agent Of Record Area: firstName'
      ).to.equal(EDIT_AGENT.firstName);
      expect(
        response.body.result.lastName,
        'Overview Page: Agent Of Record Area: lastName'
      ).to.equal(EDIT_AGENT.lastName);
      expect(
        response.body.result.mailingAddress,
        'Overview Page: Agent Of Record Area: mailingAddress'
      ).to.eql(EDIT_AGENT.mailingAddress);
      expect(
        response.body.result.status,
        'Overview Page: Agent Of Record Area: Agent status'
      ).to.equal(EDIT_AGENT.status);

      expect(
        response.body.result.primaryPhoneNumber,
        'Overview Page: Agent Of Record Area: primaryPhoneNumber'
      ).to.equal(EDIT_AGENT.primaryPhoneNumber);
      expect(
        response.body.result.primaryPhoneNumberExtension,
        'Overview Page: Agent Of Record Area: primaryPhoneNumberExtension'
      ).to.equal(EDIT_AGENT.primaryPhoneNumberExtension);
      expect(
        response.body.result.secondaryPhoneNumber,
        'Overview Page: Agent Of Record Area: secondaryPhoneNumber'
      ).to.equal(EDIT_AGENT.secondaryPhoneNumber);
      expect(
        response.body.result.faxNumber,
        'Overview Page: Agent Of Record Area: faxNumber'
      ).to.equal(EDIT_AGENT.faxNumber);
      expect(
        response.body.result.emailAddress,
        'Overview Page: Agent Of Record Area: emailAddress'
      ).to.equal(EDIT_AGENT.emailAddress);

      //not displayed but sent in the same request
      expect(
        response.body.result.mailingAddress,
        'Overview Page: Agent Of Record Area: mailingAddress'
      ).to.eql(EDIT_AGENT.mailingAddress);
      expect(
        response.body.result.licenses,
        'Overview Page: Agent Of Record Area: licenses'
      ).to.eql(EDIT_AGENT.licenses);
    });

    cy.get('[class="side-navigation"] [class~="agents"]')
      .click()

      .findDataTag('add-new-agent')
      .click()
      .get('[class~="agent-crud"]')

      .findDataTag('firstName')
      .type('Cypress3')

      .findDataTag('lastName')
      .type('Agent3')

      .findDataTag('primaryPhoneNumber')
      .type('4445556600')

      .findDataTag('primaryPhoneNumberExtension')
      .type('1110')

      .findDataTag('secondaryPhoneNumber')
      .type('4445556660')

      .findDataTag('faxNumber')
      .type('4445556000')

      .findDataTag('status')
      .select('Service Only')

      .findDataTag('emailAddress')
      .type('exzeoqa@exzeo.com');

    cy.findDataTag('agent-mailing-address').within(() => {
      cy.get('[name="mailingAddress.zip"]')
        .scrollIntoView()
        .should('be.visible')

        .findDataTag('address1')
        .type('Test Mailing Address 3')

        .findDataTag('address2')
        .type('Test Mailing Address 4')

        .findDataTag('city')
        .type('Tampa')

        .findDataTag('state')
        .select('FL')

        .get('[name="mailingAddress.zip"]')
        .type('33624');
    });

    cy.findDataTag('agent-physical-address').within(() => {
      cy.findDataTag('address1')
        .type('Test Physical Address 3')

        .findDataTag('address2')
        .type('Test Physical Address 4')

        .findDataTag('city')
        .type('Clearwater')

        .findDataTag('state')
        .select('FL')

        .chooseReactSelectOption('zip_wrapper', '33607');
    });

    cy.findDataTag('sameAsMailing').click();

    cy.findDataTag('licenses[0].licenseNumber_label')
      .scrollIntoView()
      .should('be.visible')

      .findDataTag('licenses[0].state')
      .select('FL')

      .findDataTag('licenses[0].licenseType')
      .select('Resident')

      .findDataTag('licenses[0].licenseNumber')
      .type('34567')

      .findDataTag('licenses[0].appointed')
      .click()

      .get('[class~="add-license"]')
      .click()

      .findDataTag('licenses[1].state')
      .select('FL')

      .findDataTag('licenses[1].licenseType')
      .select('Non-Resident')

      .findDataTag('licenses[1].licenseNumber')
      .type('45678')

      .findDataTag('submit-modal')
      .click();

    cy.wait('@addNewAgent').then(({ response }) => {
      expect(
        response.body.status,
        'Agents Page: Verify New Agent after Adding New Agent: status'
      ).to.equal(201);

      expect(
        response.body.result.firstName,
        'Agents Page: Verify New Agent after Adding New Agent: firstName'
      ).to.equal(ADD_ANOTHER_AGENT.firstName);
      expect(
        response.body.result.lastName,
        'Agents Page: Verify New Agent after Adding New Agent: lastName'
      ).to.equal(ADD_ANOTHER_AGENT.lastName);
      expect(
        response.body.result.mailingAddress,
        'Agents Page: Verify New Agent after Adding New Agent: mailingAddress'
      ).to.eql(ADD_ANOTHER_AGENT.mailingAddress);
      expect(
        response.body.result.status,
        'Agents Page: Verify New Agent after Adding New Agent: Agent status'
      ).to.equal(ADD_ANOTHER_AGENT.status);

      expect(
        response.body.result.primaryPhoneNumber,
        'Agents Page: Verify New Agent after Adding New Agent: primaryPhoneNumber'
      ).to.equal(ADD_ANOTHER_AGENT.primaryPhoneNumber);
      expect(
        response.body.result.primaryPhoneNumberExtension,
        'Agents Page: Verify New Agent after Adding New Agent: primaryPhoneNumberExtension'
      ).to.equal(ADD_ANOTHER_AGENT.primaryPhoneNumberExtension);
      expect(
        response.body.result.secondaryPhoneNumber,
        'Agents Page: Verify New Agent after Adding New Agent: secondaryPhoneNumber'
      ).to.equal(ADD_ANOTHER_AGENT.secondaryPhoneNumber);
      expect(
        response.body.result.faxNumber,
        'Agents Page: Verify New Agent after Adding New Agent: faxNumber'
      ).to.equal(ADD_ANOTHER_AGENT.faxNumber);
      expect(
        response.body.result.emailAddress,
        'Agents Page: Verify New Agent after Adding New Agent: emailAddress'
      ).to.equal(ADD_ANOTHER_AGENT.emailAddress);

      //not displayed but sent in the same request
      expect(
        response.body.result.mailingAddress,
        'Agents Page: Verify New Agent after Adding New Agent: mailingAddress'
      ).to.eql(ADD_ANOTHER_AGENT.mailingAddress);
      expect(
        response.body.result.licenses,
        'Agents Page: Verify New Agent after Adding New Agent: licenses'
      ).to.eql(ADD_ANOTHER_AGENT.licenses);
    });

    cy.get('[class="side-navigation"] [class~="notes"]').click();

    cy.findDataTag('new-note')
      .click()
      .get('[class~="new-note-file"]')

      .findDataTag('contactType')
      .select('Other')
      .get('[data-test="contactType"][data-selected="Other"]')

      .findDataTag('noteContent')
      .type('This is a note content for Other Contact')

      .findDataTag('fileType')
      .select('Finance')
      .get('[data-test="fileType"][data-selected="Finance"]')

      .findDataTag('submit-button')
      .click();

    const todaysDate = Cypress.moment().format('YYYY-MM-DD');

    cy.wait('@addNote').then(({ response }) => {
      expect(
        response.body.status,
        'Notes / Files Page: Verify Adding a New Note: status'
      ).to.equal(200);

      expect(
        response.body.result.createdDate,
        'Notes / Files Page: Verify Adding a New Note: createdDate'
      ).to.contain(todaysDate);
      expect(
        response.body.result.createdBy,
        'Notes / Files Page: Verify Adding a New Note: createdBy'
      ).to.eql(ADD_NOTE.createdBy);
      expect(
        response.body.result.contactType,
        'Notes / Files Page: Verify Adding a New Note: contactType'
      ).to.equal(ADD_NOTE.contactType);
      expect(
        response.body.result.noteType,
        'Notes / Files Page: Verify Adding a New Note: noteType'
      ).to.equal(ADD_NOTE.noteType);
      expect(
        response.body.result.noteContent,
        'Notes / Files Page: Verify Adding a New Note: noteContent'
      ).to.equal(ADD_NOTE.noteContent);
    });
  });
});
