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
    cy.url().should('contain', `/agency`);
    // This makes it so we don't open up a new window
    cy.findDataTag('add-agency-not-searched').within(() => {
      cy.get('a.btn-primary').then($a => {
        $a.prop('onclick', () => cy.visit('/agency/new/0'));
      });
    });

    // Cypress checks an element's visibility with a special algo, and our
    // sticky footer causes problems with that. https://github.com/cypress-io/cypress/issues/2037
    // Here we are overriding some styling to force the footer to the bottom of its container, keeping it out of the
    // way for testing purposes
    // prettier-ignore
    cy.get('.route-content-wrapper').invoke('attr', 'style', 'overflow-y: auto');
    // prettier-ignore
    cy.get('.route-content').invoke('attr', 'style', 'overflow: unset');

    cy.wait('@fetchLists').then(({ response }) => {
      expect(response.body.status, 'fetchLists: status').to.equal(200);
    });
    cy.wait('@fetchPostalCodes').then(({ response }) => {
      expect(response.body.status, 'fetchPostalCodes: status').to.equal(200);
    });
    cy.wait('@fetchTerritoryManagers').then(({ response }) => {
      expect(response.body.status, 'fetchTerritoryManagers: status').to.equal(
        200
      );
    });
    // create
    cy.findDataTag('agency-details').within(() => {
      cy.findDataTag('displayName')
        .should('be.visible')
        .type(ADD_AGENCY.displayName)
        .findDataTag('legalName')
        .click({ force: true })
        .type(ADD_AGENCY.legalName)
        .findDataTag('status')
        .select(ADD_AGENCY.status)
        .findDataTag('tpaid')
        .type(ADD_AGENCY.tpaid)
        .findDataTag('okToPay_false')
        .click()
        .findDataTag('websiteUrl')
        .click({ force: true })
        .type(ADD_AGENCY.websiteUrl)
        .findDataTag('taxIdNumber')
        .type(ADD_AGENCY.taxIdNumber)
        .findDataTag('taxClassification')
        .select(ADD_AGENCY.taxClassification)
        .findDataTag('eoExpirationDate')
        .type('2020-11-20')
        .findDataTag('primaryPhoneNumber')
        .type(ADD_AGENCY.primaryPhoneNumber)
        .findDataTag('secondaryPhoneNumber')
        .type(ADD_AGENCY.secondaryPhoneNumber)
        .findDataTag('faxNumber')
        .type(ADD_AGENCY.faxNumber)
        .findDataTag('csrEmail')
        .type(ADD_AGENCY.customerServiceEmailAddress);
    });

    cy.findDataTag('agency-address-section').within(() => {
      cy.findDataTag('agency-mailing-address')
        .scrollIntoView()
        .should('be.visible')
        .within(() => {
          cy.findDataTag('address1')
            .type(ADD_AGENCY.mailingAddress.address1)
            .findDataTag('address2')
            .type(ADD_AGENCY.mailingAddress.address2)
            .findDataTag('city')
            .type(ADD_AGENCY.mailingAddress.city)
            .findDataTag('state')
            .select(ADD_AGENCY.mailingAddress.state)
            .findDataTag('zip')
            .type(ADD_AGENCY.mailingAddress.zip);
        });

      cy.findDataTag('agency-physical-address')
        .scrollIntoView()
        .should('be.visible')
        .within(() => {
          cy.findDataTag('sameAsMailing').click({ force: true });
        });
    });

    cy.findDataTag('agency-principal')
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.findDataTag('firstName')
          .type(ADD_AGENCY.principal.firstName)
          .findDataTag('lastName')
          .type(ADD_AGENCY.principal.lastName)
          .findDataTag('emailAddress')
          .type(ADD_AGENCY.principal.emailAddress)
          .findDataTag('primaryPhoneNumber')
          .type(ADD_AGENCY.principal.primaryPhoneNumber, { force: true })
          .findDataTag('primaryPhoneNumberExtension')
          .type(ADD_AGENCY.principal.primaryPhoneNumberExtension);
      });

    cy.findDataTag('agency-contact')
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.findDataTag('title')
          .type(ADD_AGENCY.contact.title)
          .findDataTag('firstName')
          .type(ADD_AGENCY.contact.firstName)
          .findDataTag('lastName')
          .type(ADD_AGENCY.contact.lastName)
          .findDataTag('emailAddress')
          .type(ADD_AGENCY.contact.emailAddress)
          .findDataTag('primaryPhoneNumber')
          .type(ADD_AGENCY.contact.primaryPhoneNumber)
          .findDataTag('primaryPhoneNumberExtension')
          .type(ADD_AGENCY.contact.primaryPhoneNumberExtension);
      });

    cy.findDataTag('agent-of-record').within(() => {
      cy.findDataTag('agentFirstName')
        .type('Cypress')
        .findDataTag('agentLastName')
        .type('Agent')
        .findDataTag('emailAddress')
        .type('exzeoqa@exzeo.com')
        .findDataTag('primaryPhoneNumber')
        .type('4445556666', { force: true })
        .findDataTag('primaryPhoneNumberExtension')
        .type('1111', { force: true })
        .findDataTag('secondaryPhoneNumber')
        .type('4445556667', { force: true })
        .findDataTag('faxNumber')
        .type('4445556668', { force: true })
        .findDataTag('agency-mailing-address')
        .within(() => {
          cy.findDataTag('address1')
            .type('Test AOR Mailing Address 1')
            .findDataTag('address2')
            .type('Test AOR Mailing Address 2')
            .findDataTag('city')
            .type('Tampa')
            .findDataTag('state')
            .select('FL')
            .findDataTag('zip')
            .type('33607', { force: true });
        });

      cy.findDataTag('agency-physical-address')
        .scrollIntoView()
        .should('be.visible')
        .within(() => {
          cy.findDataTag('sameAsMailing').click({ force: true });
        });

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
        .findDataTag('add-license')
        .click()
        .findDataTag('agentOfRecord.licenses[1].state')
        .select('FL')
        .findDataTag('agentOfRecord.licenses[1].licenseType')
        .select('Non-Resident')
        .findDataTag('agentOfRecord.licenses[1].licenseNumber')
        .type('23456');
    });

    cy.clickSubmit('body', 'submitButton');

    cy.wait('@saveNewAgency').then(({ response }) => {
      expect(response.body.status, 'Save New Agency: status').to.equal(201);
    });

    cy.wait('@fetchAgentsByAgencyCode').then(({ response }) => {
      expect(
        response.body.status,
        'Fetch Agents By AgencyCode: status'
      ).to.equal(200);
    });

    //   cy.wait('@saveNewAgency').then(({ response }) => {
    //     expect(
    //       response.body.result.agencyCode,
    //       'Overview Page: Details Area: agencyCode'
    //     ).to.match(/^\d+/);
    //     expect(
    //       response.body.result.agentOfRecord,
    //       'Overview Page: Details Area: agentOfRecord'
    //     ).to.match(/^\d+/);
    //     expect(
    //       response.body.result.displayName,
    //       'Overview Page: Details Area: displayName'
    //     ).to.equal(ADD_AGENCY.displayName);
    //     expect(
    //       response.body.result.legalName,
    //       'Overview Page: Details Area: legalName'
    //     ).to.equal(ADD_AGENCY.legalName);
    //     expect(
    //       response.body.result.status,
    //       'Overview Page: Details Area: agency status'
    //     ).to.equal(ADD_AGENCY.status);
    //     expect(
    //       response.body.result.tpaid,
    //       'Overview Page: Details Area: tpaid'
    //     ).to.equal(ADD_AGENCY.tpaid);
    //     expect(
    //       response.body.result.okToPay,
    //       'Overview Page: Details Area: okToPay'
    //     ).to.equal(ADD_AGENCY.okToPay);
    //     expect(
    //       response.body.result.websiteUrl,
    //       'Overview Page: Details Area: websiteUrl'
    //     ).to.equal(ADD_AGENCY.websiteUrl);
    //     expect(
    //       response.body.result.taxIdNumber,
    //       'Overview Page: Details Area: taxIdNumber'
    //     ).to.equal(ADD_AGENCY.taxIdNumber);
    //     expect(
    //       response.body.result.taxClassification,
    //       'Overview Page: Details Area: taxClassification'
    //     ).to.equal(ADD_AGENCY.taxClassification);
    //     expect(
    //       response.body.result.eoExpirationDate,
    //       'Overview Page: Details Area: eoExpirationDate'
    //     ).to.equal(ADD_AGENCY.eoExpirationDate);
    //     expect(
    //       response.body.result.primaryPhoneNumber,
    //       'Overview Page: Details Area: primaryPhoneNumber'
    //     ).to.equal(ADD_AGENCY.primaryPhoneNumber);
    //     expect(
    //       response.body.result.secondaryPhoneNumber,
    //       'Overview Page: Details Area: secondaryPhoneNumber'
    //     ).to.equal(ADD_AGENCY.secondaryPhoneNumber);
    //     expect(
    //       response.body.result.faxNumber,
    //       'Overview Page: Details Area: faxNumber'
    //     ).to.equal(ADD_AGENCY.faxNumber);
    //     expect(
    //       response.body.result.customerServiceEmailAddress,
    //       'Overview Page: Details Area: customerServiceEmailAddress'
    //     ).to.equal(ADD_AGENCY.customerServiceEmailAddress);
    //     expect(
    //       response.body.result.mailingAddress,
    //       'Overview Page: Address Area: mailingAddress'
    //     ).to.eql(ADD_AGENCY.mailingAddress);
    //     expect(
    //       response.body.result.physicalAddress,
    //       'Overview Page: Address Area: physicalAddress'
    //     ).to.eql(ADD_AGENCY.physicalAddress);
    //     expect(
    //       response.body.result.territoryManagerId,
    //       'Overview Page: Address Area: territoryManagerId'
    //     ).to.equal(ADD_AGENCY.territoryManagerId);
    //     expect(
    //       response.body.result.principal,
    //       'Overview Page: Officer Area: principal'
    //     ).to.eql(ADD_AGENCY.principal);
    //     expect(
    //       response.body.result.contact,
    //       'Overview Page: Contact Area: contact'
    //     ).to.eql(ADD_AGENCY.contact);
    //   });

    //   cy.task('log', 'Agency create successfully');

    //   cy.wait('@fetchAgentsByAgencyCode').then(({ response }) => {
    //     expect(
    //       response.body.result[0].firstName,
    //       'Overview Page: Agent Of Record Area: firstName'
    //     ).to.equal(ADD_AGENT.firstName);
    //     expect(
    //       response.body.result[0].lastName,
    //       'Overview Page: Agent Of Record Area: lastName'
    //     ).to.equal(ADD_AGENT.lastName);
    //     expect(
    //       response.body.result[0].mailingAddress,
    //       'Overview Page: Agent Of Record Area: mailingAddress'
    //     ).to.eql(ADD_AGENT.mailingAddress);
    //     expect(
    //       response.body.result[0].status,
    //       'Overview Page: Agent Of Record Area: Agent status'
    //     ).to.equal(ADD_AGENT.status);
    //     expect(
    //       response.body.result[0].primaryPhoneNumber,
    //       'Overview Page: Agent Of Record Area: primaryPhoneNumber'
    //     ).to.equal(ADD_AGENT.primaryPhoneNumber);
    //     expect(
    //       response.body.result[0].primaryPhoneNumberExtension,
    //       'Overview Page: Agent Of Record Area: primaryPhoneNumberExtension'
    //     ).to.equal(ADD_AGENT.primaryPhoneNumberExtension);
    //     expect(
    //       response.body.result[0].secondaryPhoneNumber,
    //       'Overview Page: Agent Of Record Area: secondaryPhoneNumber'
    //     ).to.equal(ADD_AGENT.secondaryPhoneNumber);
    //     expect(
    //       response.body.result[0].faxNumber,
    //       'Overview Page: Agent Of Record Area: faxNumber'
    //     ).to.equal(ADD_AGENT.faxNumber);
    //     expect(
    //       response.body.result[0].emailAddress,
    //       'Overview Page: Agent Of Record Area: emailAddress'
    //     ).to.equal(ADD_AGENT.emailAddress);
    //     //not displayed but sent in the same request
    //     expect(
    //       response.body.result[0].mailingAddress,
    //       'Overview Page: Agent Of Record Area: mailingAddress'
    //     ).to.eql(ADD_AGENT.mailingAddress);
    //     expect(
    //       response.body.result[0].licenses,
    //       'Overview Page: Agent Of Record Area: licenses'
    //     ).to.eql(ADD_AGENT.licenses);
    //   });

    cy.findDataTag('addLicense')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('state')
          .select('FL')
          .findDataTag('licenseNumber')
          .type('99990')
          .findDataTag('licenseType')
          .select('Resident')
          .findDataTag('licenseEffectiveDate')
          .type('2019-11-22');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Add License: status').to.equal(201);
    });

    cy.findDataTag('license-details').within(() => {
      cy.get('.license-header .license-csp strong').contains(
        ADD_LICENSE.licenses[0].licenseNumber
      );
    });

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     expect(
    //       response.body.result.licenses,
    //       'Contracts Page: Verify License Card: licenses'
    //     ).to.eql(ADD_LICENSE.licenses);
    //   });

    cy.findDataTag('addContract')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('state-0')
          .select('FL')
          .chooseReactSelectOption('companyCode_wrapper', 'TTIC')
          .chooseReactSelectOption('contractNumber_wrapper', 'TT FL 01 19')
          .chooseReactSelectOption('addendum_wrapper', 'TT 01 19')
          .findDataTag('product-0')
          .select('AF3')
          .findDataTag('add-product')
          .click()
          .findDataTag('state-1')
          .select('FL')
          .findDataTag('product-1')
          .select('HO3');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Add Contract: status').to.equal(201);
    });

    cy.findDataTag('contract-info').within(() => {
      cy.get('span>div>div').contains(ADD_CONTRACT.contracts[0].contractNumber);
    });

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     const compareContract = ADD_CONTRACT.contracts[0];
    //     const contractResult = response.body.result.contracts[0];
    //     expect(contractResult.companyCode).to.equal(compareContract.companyCode);
    //     expect(contractResult.contractNumber).to.equal(
    //       compareContract.contractNumber
    //     );
    //     expect(contractResult.addendum).to.equal(compareContract.addendum);
    //     expect(contractResult.stateProducts[0]).to.include(
    //       compareContract.stateProducts[0]
    //     );
    //     expect(contractResult.stateProducts[1]).to.include(
    //       compareContract.stateProducts[1]
    //     );
    //   });

    cy.findDataTag('edit-license')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy
          //.findDataTag('licenseNumber')
          //   .type('{selectall}{backspace}99991')
          // .findDataTag('licenseType')
          // .select('Non-Resident')
          .findDataTag('licenseEffectiveDate')
          .type('2019-11-24');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit License: status').to.equal(201);
    });

    cy.wait('@fetchAgency').then(({ response }) => {
      expect(response.body.status, 'Edit License 2: status').to.equal(200);
    });

    cy.get('.spinner').should('not.be.visible');

    // ////cy.findDataTag('license-details').within(() => {
    //  cy.get('[data-test="license-details"] .license-header .license-csp strong')
    //    .contains(EDIT_LICENSE.licenses[0].licenseNumber)
    // ////})
    cy.findDataTag('license-details').within(() => {
      cy.get('span').contains(EDIT_LICENSE.licenses[0].licenseEffectiveDate);
    });

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     expect(
    //       response.body.result.licenses,
    //       'Contracts Page: Licenses Area after Edit: licenses'
    //     ).to.eql(EDIT_LICENSE.licenses);
    //   });

    cy.findDataTag('edit-contract')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.clearReactSelectField('contractNumber_wrapper')
          .chooseReactSelectOption('contractNumber_wrapper', 'TT FL 03 16')
          .clearReactSelectField('addendum_wrapper')
          .chooseReactSelectOption('addendum_wrapper', 'TT 03 16');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contract: status').to.equal(201);
    });

    cy.wait('@fetchAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contract 2: status').to.equal(200);
    });

    ////cy.findDataTag('loader').should('not.be.visible');
    ////cy.findDataTag('spinner').should('not.be.visible');
    cy.get('.spinner').should('not.be.visible');

    // ////cy.findDataTag('contract-info').within(() => {
    //   cy.get('[data-test="contract-info"] .contract-number-wrapper>div')
    //     .contains(EDIT_CONTRACT.contracts[0].contractNumber)
    // ////})

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     const compareContract = EDIT_CONTRACT.contracts[0];
    //     const contractResult = response.body.result.contracts[0];
    //     expect(contractResult.companyCode).to.equal(compareContract.companyCode);
    //     expect(contractResult.contractNumber).to.equal(
    //       compareContract.contractNumber
    //     );
    //     expect(contractResult.addendum).to.equal(compareContract.addendum);
    //     expect(contractResult.stateProducts[0]).to.include(
    //       compareContract.stateProducts[0]
    //     );
    //     expect(contractResult.stateProducts[1]).to.include(
    //       compareContract.stateProducts[1]
    //     );
    //   });

    //   cy.task('log', 'License and contract added/edited successfully');

    //   // overview/edit agency
    cy.get('a.overview').click();

    cy.findDataTag('edit-agency-details')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('displayName')
          .type('{selectall}{backspace}Cypress Agency updated')
          .findDataTag('legalName');
        // .type('{selectall}{backspace}Company updated')
        // .findDataTag('status')
        // .select('Active')
        // .findDataTag('tpaid')
        // .type('{selectall}{backspace}2')
        // .findDataTag('okToPay_true')
        // .click()
        // .findDataTag('websiteUrl')
        // .type('{selectall}{backspace}https://csr.harmony-ins.com/')
        // .findDataTag('taxIdNumber')
        // .type('{selectall}{backspace}99999')
        // .findDataTag('taxClassification')
        // .select('Partnership')
        // .findDataTag('eoExpirationDate')
        // .type('2020-11-22')
        // .findDataTag('primaryPhoneNumber')
        // .type('{selectall}{backspace}(444)555-7777')
        // .findDataTag('secondaryPhoneNumber')
        // .type('{selectall}{backspace}(444)555-7778')
        // .findDataTag('faxNumber')
        // .type('{selectall}{backspace}(444)555-7779')
        // .findDataTag('csrEmail')
        // .type('{selectall}{backspace}exzeoqa2@exzeo.com');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contract: status').to.equal(201);
    });

    cy.findDataTag('agency-name').within(() => {
      cy.get('div').contains(EDIT_AGENCY.displayName);
    });

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     expect(
    //       response.body.result.displayName,
    //       'Overview Page: Details Area After Edit: status'
    //     ).to.equal(EDIT_AGENCY.displayName);
    //     expect(
    //       response.body.result.legalName,
    //       'Overview Page: Details Area After Edit: legalName'
    //     ).to.equal(EDIT_AGENCY.legalName);
    //     expect(
    //       response.body.result.status,
    //       'Overview Page: Details Area After Edit: Agency status'
    //     ).to.equal(EDIT_AGENCY.status);
    //     expect(
    //       response.body.result.tpaid,
    //       'Overview Page: Details Area After Edit: tpaid'
    //     ).to.equal(EDIT_AGENCY.tpaid);
    //     expect(
    //       response.body.result.okToPay,
    //       'Overview Page: Details Area After Edit: okToPay'
    //     ).to.equal(EDIT_AGENCY.okToPay);
    //     expect(
    //       response.body.result.websiteUrl,
    //       'Overview Page: Details Area After Edit: websiteUrl'
    //     ).to.equal(EDIT_AGENCY.websiteUrl);
    //     expect(
    //       response.body.result.taxIdNumber,
    //       'Overview Page: Details Area After Edit: taxIdNumber'
    //     ).to.equal(EDIT_AGENCY.taxIdNumber);
    //     expect(
    //       response.body.result.taxClassification,
    //       'Overview Page: Details Area After Edit: taxClassification'
    //     ).to.equal(EDIT_AGENCY.taxClassification);
    //     expect(
    //       response.body.result.eoExpirationDate,
    //       'Overview Page: Details Area After Edit: eoExpirationDate'
    //     ).to.equal(EDIT_AGENCY.eoExpirationDate);
    //     expect(
    //       response.body.result.primaryPhoneNumber,
    //       'Overview Page: Details Area After Edit: primaryPhoneNumber'
    //     ).to.equal(EDIT_AGENCY.primaryPhoneNumber);
    //     expect(
    //       response.body.result.secondaryPhoneNumber,
    //       'Overview Page: Details Area After Edit: secondaryPhoneNumber'
    //     ).to.equal(EDIT_AGENCY.secondaryPhoneNumber);
    //     expect(
    //       response.body.result.faxNumber,
    //       'Overview Page: Details Area After Edit: faxNumber'
    //     ).to.equal(EDIT_AGENCY.faxNumber);
    //     expect(
    //       response.body.result.customerServiceEmailAddress,
    //       'Overview Page: Details Area After Edit: customerServiceEmailAddress'
    //     ).to.equal(EDIT_AGENCY.customerServiceEmailAddress);
    //   });

    cy.findDataTag('edit-agency-address')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('agency-mailing-address').within(() => {
          cy.findDataTag('address1').type(
            '{selectall}{backspace}Test Mailing Address 1 Updated'
          );
          //.findDataTag('address2')
          // .type('{selectall}{backspace}Test Mailing Address 2 Updated')
          // .findDataTag('city')
          // .type('{selectall}{backspace}Clearwater')
          // .findDataTag('state')
          // .select('FL')
          // .findDataTag('zip')
          // .type('{selectall}{backspace}33624');
        });

        cy.findDataTag('agency-physical-address').within(() => {
          cy.findDataTag('address1')
            // .type('{selectall}{backspace}Test Physical Address 1 Updated')
            // .findDataTag('address2')
            // .type('{selectall}{backspace}Test Physical Address 2 Updated')
            // .findDataTag('city')
            // .type('{selectall}{backspace}Clearwater')
            // .findDataTag('state')
            // .select('FL')
            // .chooseReactSelectOption('zip_wrapper', '33607')
            .findDataTag('sameAsMailing')
            .click();
        });
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(
        response.body.status,
        'Edit Mailing/Physical Address: status'
      ).to.equal(201);
    });

    cy.findDataTag('mailing-address').within(() => {
      cy.get('div>div').contains(EDIT_AGENCY_ADDRESS.mailingAddress.address1);
    });

    cy.findDataTag('physical-address').within(() => {
      cy.get('div:nth-child(2)>div').contains(
        EDIT_AGENCY_ADDRESS.physicalAddress.address1
      );
    });

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     expect(
    //       response.body.result.mailingAddress,
    //       'Overview Page: Agency Address Area After Edit: mailingAddress'
    //     ).to.eql(EDIT_AGENCY_ADDRESS.mailingAddress);
    //     expect(
    //       response.body.result.physicalAddress,
    //       'Overview Page: Agency Address Area After Edit: physicalAddress'
    //     ).to.eql(EDIT_AGENCY_ADDRESS.physicalAddress);
    //     expect(
    //       response.body.result.territoryManagerId,
    //       'Overview Page: Agency Address Area After Edit: territoryManagerId'
    //     ).to.equal(EDIT_AGENCY_ADDRESS.territoryManagerId);
    //   });

    cy.get('.agency-principal').within(() => {
      cy.findDataTag('edit-contact')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });
    cy.get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('firstName').type('{selectall}{backspace}Cypress2');
        // .findDataTag('lastName')
        // .type('{selectall}{backspace}Officer2')
        // .findDataTag('emailAddress')
        // .type('{selectall}{backspace}exzeoqa2@exzeo.com')
        // .findDataTag('primaryPhoneNumber')
        // .type('{selectall}{backspace}(444) 555-6677')
        // .findDataTag('primaryPhoneNumberExtension')
        // .type('{selectall}{backspace}5555');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Officer: status').to.equal(201);
    });

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     expect(
    //       response.body.result.principal,
    //       'Overview Page: Officer Area After Edit: principal'
    //     ).to.eql(EDIT_OFFICER.principal);
    //   });

    cy.get('.agency-contact').within(() => {
      cy.findDataTag('edit-contact')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });

    cy.get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('title').type('{selectall}{backspace}Jr.');
        // .findDataTag('firstName')
        // .type('{selectall}{backspace}Cypress2')
        // .findDataTag('lastName')
        // .type('{selectall}{backspace}Contact2')
        // .findDataTag('emailAddress')
        // .type('{selectall}{backspace}exzeoqa2@exzeo.com')
        // .findDataTag('primaryPhoneNumber')
        // .type('{selectall}{backspace}(444) 555-6688')
        // .findDataTag('primaryPhoneNumberExtension')
        // .type('{selectall}{backspace}9999');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contact: status').to.equal(201);
    });

    //   cy.wait('@saveAgency').then(({ response }) => {
    //     expect(
    //       response.body.result.contact,
    //       'Overview Page: Contact Area After Edit: contact'
    //     ).to.eql(EDIT_CONTACT.contact);
    //   });

    //   cy.task('log', 'Agency edited successfully');

    cy.get('.agency-aor').within($el => {
      cy.findDataTag('edit-agent')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });

    cy.get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('firstName').type('{selectall}{backspace}Cypress2');
        //     .findDataTag('lastName')
        //     .type('{selectall}{backspace}Agent2')
        //     .findDataTag('primaryPhoneNumber')
        //     .type('{selectall}{backspace}4445556699')
        //     .findDataTag('primaryPhoneNumberExtension')
        //     .type('{selectall}{backspace}1111')
        //     .findDataTag('secondaryPhoneNumber')
        //     .type('{selectall}{backspace}4445556667')
        //     .findDataTag('faxNumber')
        //     .type('{selectall}{backspace}4445556668')
        //     .findDataTag('emailAddress')
        //     .type('{selectall}{backspace}exzeoqa2@exzeo.com');

        //   cy.findDataTag('agency-mailing-address').within(() => {
        //     cy.findDataTag('address1')
        //       .type('{selectall}{backspace}Test Mailing Address 1 Updated')
        //       .findDataTag('address2')
        //       .type('{selectall}{backspace}Test Mailing Address 2 Updated')
        //       .findDataTag('city')
        //       .type('{selectall}{backspace}Clearwater')
        //       .findDataTag('state')
        //       .select('FL')
        //       .get('[name="mailingAddress.zip"]')
        //       .type('{selectall}{backspace}33624');
        //   });

        //   cy.findDataTag('agency-physical-address').within(() => {
        //     cy.findDataTag('address1')
        //       .type('{selectall}{backspace}Test Physical Address 1 Updated')
        //       .findDataTag('address2')
        //       .type('{selectall}{backspace}Test Physical Address 2 Updated')
        //       .findDataTag('city')
        //       .type('{selectall}{backspace}Clearwater')
        //       .findDataTag('state')
        //       .select('FL')
        //       .chooseReactSelectOption('zip_wrapper', '33607');
        //   });

        //   cy.findDataTag('licenses[0].state')
        //     .select('FL')
        //     .findDataTag('licenses[0].licenseType')
        //     .select('Non-Resident')
        //     .findDataTag('licenses[0].licenseNumber')
        //     .type('{selectall}{backspace}23456')
        //     .findDataTag('licenses[0].appointed')
        //     .click()
        //     .should('not.be.checked')
        //     .findDataTag('rm-license-1')
        //     .click();
      })
      .clickSubmit('.modal', 'submit-modal');

    cy.wait('@saveAgent').then(({ response }) => {
      expect(response.body.status, 'Edit Agent Of Record: status').to.equal(
        200
      );
    });

    //   cy.wait('@saveAgent').then(({ response }) => {
    //     expect(
    //       response.body.result.firstName,
    //       'Overview Page: Agent Of Record Area: firstName'
    //     ).to.equal(EDIT_AGENT.firstName);
    //     expect(
    //       response.body.result.lastName,
    //       'Overview Page: Agent Of Record Area: lastName'
    //     ).to.equal(EDIT_AGENT.lastName);
    //     expect(
    //       response.body.result.mailingAddress,
    //       'Overview Page: Agent Of Record Area: mailingAddress'
    //     ).to.eql(EDIT_AGENT.mailingAddress);
    //     expect(
    //       response.body.result.status,
    //       'Overview Page: Agent Of Record Area: Agent status'
    //     ).to.equal(EDIT_AGENT.status);
    //     expect(
    //       response.body.result.primaryPhoneNumber,
    //       'Overview Page: Agent Of Record Area: primaryPhoneNumber'
    //     ).to.equal(EDIT_AGENT.primaryPhoneNumber);
    //     expect(
    //       response.body.result.primaryPhoneNumberExtension,
    //       'Overview Page: Agent Of Record Area: primaryPhoneNumberExtension'
    //     ).to.equal(EDIT_AGENT.primaryPhoneNumberExtension);
    //     expect(
    //       response.body.result.secondaryPhoneNumber,
    //       'Overview Page: Agent Of Record Area: secondaryPhoneNumber'
    //     ).to.equal(EDIT_AGENT.secondaryPhoneNumber);
    //     expect(
    //       response.body.result.faxNumber,
    //       'Overview Page: Agent Of Record Area: faxNumber'
    //     ).to.equal(EDIT_AGENT.faxNumber);
    //     expect(
    //       response.body.result.emailAddress,
    //       'Overview Page: Agent Of Record Area: emailAddress'
    //     ).to.equal(EDIT_AGENT.emailAddress);
    //     //not displayed but sent in the same request
    //     expect(
    //       response.body.result.mailingAddress,
    //       'Overview Page: Agent Of Record Area: mailingAddress'
    //     ).to.eql(EDIT_AGENT.mailingAddress);
    //     expect(
    //       response.body.result.licenses,
    //       'Overview Page: Agent Of Record Area: licenses'
    //     ).to.eql(EDIT_AGENT.licenses);
    //   });

    //   cy.task('log', 'Edit agent of record successfully');

    cy.get('a.agents').click();

    cy.get('.card:nth-child(1) .agent-name').contains(EDIT_AGENT.firstName);

    cy.findDataTag('add-new-agent')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('firstName')
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

        cy.findDataTag('agency-mailing-address').within(() => {
          cy.findDataTag('address1')
            .type('Test Mailing Address 3')
            .findDataTag('address2')
            .type('Test Mailing Address 4')
            .findDataTag('city')
            .type('Tampa')
            .findDataTag('state')
            .select('FL')
            .findDataTag('zip')
            .type('33624');
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
          .type('45678');
      })
      .clickSubmit('.modal', 'submit-modal');

    cy.wait('@addNewAgent').then(({ response }) => {
      expect(response.body.status, 'Add New Agent: status').to.equal(201);
    });

    ////cy.findDataTag('physical-address').within(() => {
    cy.get('.card:nth-child(2) .agent-name').contains(
      ADD_ANOTHER_AGENT.firstName
    );
    ////})

    //   cy.wait('@addNewAgent').then(({ response }) => {
    //     expect(
    //       response.body.result.firstName,
    //       'Agents Page: Verify New Agent after Adding New Agent: firstName'
    //     ).to.equal(ADD_ANOTHER_AGENT.firstName);
    //     expect(
    //       response.body.result.lastName,
    //       'Agents Page: Verify New Agent after Adding New Agent: lastName'
    //     ).to.equal(ADD_ANOTHER_AGENT.lastName);
    //     expect(
    //       response.body.result.mailingAddress,
    //       'Agents Page: Verify New Agent after Adding New Agent: mailingAddress'
    //     ).to.eql(ADD_ANOTHER_AGENT.mailingAddress);
    //     expect(
    //       response.body.result.status,
    //       'Agents Page: Verify New Agent after Adding New Agent: Agent status'
    //     ).to.equal(ADD_ANOTHER_AGENT.status);
    //     expect(
    //       response.body.result.primaryPhoneNumber,
    //       'Agents Page: Verify New Agent after Adding New Agent: primaryPhoneNumber'
    //     ).to.equal(ADD_ANOTHER_AGENT.primaryPhoneNumber);
    //     expect(
    //       response.body.result.primaryPhoneNumberExtension,
    //       'Agents Page: Verify New Agent after Adding New Agent: primaryPhoneNumberExtension'
    //     ).to.equal(ADD_ANOTHER_AGENT.primaryPhoneNumberExtension);
    //     expect(
    //       response.body.result.secondaryPhoneNumber,
    //       'Agents Page: Verify New Agent after Adding New Agent: secondaryPhoneNumber'
    //     ).to.equal(ADD_ANOTHER_AGENT.secondaryPhoneNumber);
    //     expect(
    //       response.body.result.faxNumber,
    //       'Agents Page: Verify New Agent after Adding New Agent: faxNumber'
    //     ).to.equal(ADD_ANOTHER_AGENT.faxNumber);
    //     expect(
    //       response.body.result.emailAddress,
    //       'Agents Page: Verify New Agent after Adding New Agent: emailAddress'
    //     ).to.equal(ADD_ANOTHER_AGENT.emailAddress);
    //     //not displayed but sent in the same request
    //     expect(
    //       response.body.result.mailingAddress,
    //       'Agents Page: Verify New Agent after Adding New Agent: mailingAddress'
    //     ).to.eql(ADD_ANOTHER_AGENT.mailingAddress);
    //     expect(
    //       response.body.result.licenses,
    //       'Agents Page: Verify New Agent after Adding New Agent: licenses'
    //     ).to.eql(ADD_ANOTHER_AGENT.licenses);
    //   });

    //   cy.task('log', 'Add new agent successfully');

    cy.get('a.notes').click();

    cy.wait('@fetchNotes').then(({ response }) => {
      expect(response.body.status).to.equal(200, 'Fetch notes for policy');
    });

    cy.findDataTag('new-note')
      .click()
      .get('[class~="new-note-file"]')
      .findDataTag('contactType')
      .select('Other')
      .findDataTag('noteContent')
      .type('This is a note content for Other Contact', { force: true })
      .findDataTag('fileType')
      .select('Finance')
      .findDataTag('submit-button')
      .click();

    cy.wait('@addNote').then(({ response }) => {
      expect(response.body.status, 'Add New Agent: status').to.equal(200);
    });

    cy.get('.table [tabindex="5"]>div').contains(ADD_NOTE.noteContent);

    //   cy.wait('@addNote').then(({ response }) => {
    //     expect(
    //       response.body.result.createdDate,
    //       'Notes / Files Page: Verify Adding a New Note: createdDate'
    //     ).to.exist;
    //     expect(
    //       response.body.result.createdBy,
    //       'Notes / Files Page: Verify Adding a New Note: createdBy'
    //     ).to.eql(ADD_NOTE.createdBy);
    //     expect(
    //       response.body.result.contactType,
    //       'Notes / Files Page: Verify Adding a New Note: contactType'
    //     ).to.equal(ADD_NOTE.contactType);
    //     expect(
    //       response.body.result.noteType,
    //       'Notes / Files Page: Verify Adding a New Note: noteType'
    //     ).to.equal(ADD_NOTE.noteType);
    //     expect(
    //       response.body.result.noteContent,
    //       'Notes / Files Page: Verify Adding a New Note: noteContent'
    //     ).to.equal(ADD_NOTE.noteContent);
    //   });
  });
});
