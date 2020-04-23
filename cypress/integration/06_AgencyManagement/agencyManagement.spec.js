import { setRouteAliases } from '../../helpers/setRouteAliases';
import {
  ADD_AGENCY,
  ADD_AGENT,
  ADD_LICENSE,
  ADD_CONTRACT,
  EDIT_LICENSE,
  EDIT_CONTRACT,
  EDIT_AGENCY,
  ADD_ANOTHER_AGENT,
  ADD_NOTE
} from '../../fixtures';

describe('Agency Management testing', () => {
  before('Login and set route aliases', () => {
    cy.login();
  });

  beforeEach('Set route aliases for network requests', () => {
    setRouteAliases();
  });

  it('POS: Add a New Agency', () => {
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
        .click()
        .type(ADD_AGENCY.legalName)
        .findDataTag('status')
        .select(ADD_AGENCY.status)
        .findDataTag('tpaid')
        .type(ADD_AGENCY.tpaid)
        .findDataTag('okToPay_false')
        .click()
        .findDataTag('websiteUrl')
        .click()
        .type(ADD_AGENCY.websiteUrl)
        .findDataTag('taxIdNumber')
        .type(ADD_AGENCY.taxIdNumber)
        .findDataTag('taxClassification')
        .select(ADD_AGENCY.taxClassification)
        .findDataTag('eoExpirationDate')
        .type(ADD_AGENCY.eoExpirationDate)
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
          cy.findDataTag('sameAsMailing').click();
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
          .type(ADD_AGENCY.principal.primaryPhoneNumber)
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
        .type(ADD_AGENT.firstName)
        .findDataTag('agentLastName')
        .type(ADD_AGENT.lastName)
        .findDataTag('emailAddress')
        .type(ADD_AGENT.emailAddress)
        .findDataTag('primaryPhoneNumber')
        .type(ADD_AGENT.primaryPhoneNumber)
        .findDataTag('primaryPhoneNumberExtension')
        .type(ADD_AGENT.primaryPhoneNumberExtension)
        .findDataTag('secondaryPhoneNumber')
        .type(ADD_AGENT.secondaryPhoneNumber)
        .findDataTag('faxNumber')
        .type(ADD_AGENT.faxNumber)
        .findDataTag('agency-mailing-address')
        .within(() => {
          cy.findDataTag('address1')
            .type(ADD_AGENT.mailingAddress.address1)
            .findDataTag('address2')
            .type(ADD_AGENT.mailingAddress.address2)
            .findDataTag('city')
            .type(ADD_AGENT.mailingAddress.city)
            .findDataTag('state')
            .select(ADD_AGENT.mailingAddress.state)
            .findDataTag('zip')
            .type(ADD_AGENT.mailingAddress.zip);
        });

      cy.findDataTag('agency-physical-address')
        .scrollIntoView()
        .should('be.visible')
        .within(() => {
          cy.findDataTag('sameAsMailing').click();
        });

      cy.findDataTag('agentOfRecord.licenses[0].licenseNumber_label')
        .scrollIntoView()
        .should('be.visible')
        .findDataTag('agentOfRecord.licenses[0].state')
        .select(ADD_AGENT.licenses[0].state)
        .findDataTag('agentOfRecord.licenses[0].licenseType')
        .select(ADD_AGENT.licenses[0].licenseType)
        .findDataTag('agentOfRecord.licenses[0].licenseNumber')
        .type(ADD_AGENT.licenses[0].licenseNumber)
        .findDataTag('agentOfRecord.licenses[0].appointed')
        .click()
        .findDataTag('add-license')
        .click()
        .findDataTag('agentOfRecord.licenses[1].state')
        .select(ADD_AGENT.licenses[1].state)
        .findDataTag('agentOfRecord.licenses[1].licenseType')
        .select(ADD_AGENT.licenses[1].licenseType)
        .findDataTag('agentOfRecord.licenses[1].licenseNumber')
        .type(ADD_AGENT.licenses[1].licenseNumber);
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
  });

  it('POS: Add a New License', () => {
    cy.findDataTag('addLicense')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('state')
          .select(ADD_LICENSE.licenses[0].state)
          .findDataTag('licenseNumber')
          .type(ADD_LICENSE.licenses[0].licenseNumber)
          .findDataTag('licenseType')
          .select(ADD_LICENSE.licenses[0].licenseType)
          .findDataTag('licenseEffectiveDate')
          .type(ADD_LICENSE.licenses[0].licenseEffectiveDate);
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Add License: status').to.equal(201);
    });

    cy.findDataTag('license-details').within(() => {
      cy.contains(ADD_LICENSE.licenses[0].licenseNumber);
    });
  });

  it('POS: Add a New Contract', () => {
    cy.findDataTag('addContract')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('state-0')
          .select('FL')
          .chooseReactSelectOption(
            'companyCode_wrapper',
            ADD_CONTRACT.contracts[0].companyCode
          )
          .chooseReactSelectOption(
            'contractNumber_wrapper',
            ADD_CONTRACT.contracts[0].contractNumber
          )
          .chooseReactSelectOption(
            'addendum_wrapper',
            ADD_CONTRACT.contracts[0].addendum
          )
          .findDataTag('product-0')
          .select(ADD_CONTRACT.contracts[0].stateProducts[0].product)
          .findDataTag('add-product')
          .click()
          .findDataTag('state-1')
          .select(ADD_CONTRACT.contracts[0].stateProducts[1].state)
          .findDataTag('product-1')
          .select(ADD_CONTRACT.contracts[0].stateProducts[1].product);
      });

    cy.clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Add Contract: status').to.equal(201);
    });

    cy.findDataTag('contract-info').within(() => {
      cy.contains(ADD_CONTRACT.contracts[0].contractNumber);
    });
  });

  it('POS: Edit License', () => {
    cy.findDataTag('edit-license')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('licenseEffectiveDate').type(
          EDIT_LICENSE.licenses[0].licenseEffectiveDate1
        );
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit License: status').to.equal(201);
    });

    cy.wait('@fetchAgency').then(({ response }) => {
      expect(response.body.status, 'Edit License 2: status').to.equal(200);
    });

    cy.get('.spinner').should('not.be.visible');

    cy.findDataTag('license-details').within(() => {
      cy.contains(EDIT_LICENSE.licenses[0].licenseEffectiveDate2);
    });
  });

  it('POS: Edit Contract', () => {
    cy.findDataTag('edit-contract')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.clearReactSelectField('contractNumber_wrapper')
          .chooseReactSelectOption(
            'contractNumber_wrapper',
            EDIT_CONTRACT.contracts[0].contractNumber
          )
          .clearReactSelectField('addendum_wrapper')
          .chooseReactSelectOption(
            'addendum_wrapper',
            EDIT_CONTRACT.contracts[0].addendum
          );
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contract: status').to.equal(201);
    });

    cy.wait('@fetchAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contract 2: status').to.equal(200);
    });

    cy.get('.spinner').should('not.be.visible');

    cy.findDataTag('contract-info').within(() => {
      cy.get('.contract-number-wrapper').contains(
        EDIT_CONTRACT.contracts[0].contractNumber
      );
    });
  });

  it('POS: Edit Agency', () => {
    cy.get('a.overview').click();

    cy.findDataTag('edit-agency-details')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('displayName').type(
          '{selectall}{backspace}Cypress Agency updated'
        );
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Agency: status').to.equal(201);
    });

    cy.findDataTag('agency-name').within(() => {
      cy.get('div').contains(EDIT_AGENCY.displayName);
    });
  });

  it('POS: Add a New Agent', () => {
    cy.get('a.agents').click();

    cy.get('.card').contains(ADD_AGENT.firstName);

    cy.findDataTag('add-new-agent')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('firstName')
          .type(ADD_ANOTHER_AGENT.firstName)
          .findDataTag('lastName')
          .type(ADD_ANOTHER_AGENT.lastName)
          .findDataTag('primaryPhoneNumber')
          .type(ADD_ANOTHER_AGENT.primaryPhoneNumber)
          .findDataTag('primaryPhoneNumberExtension')
          .type(ADD_ANOTHER_AGENT.primaryPhoneNumberExtension)
          .findDataTag('secondaryPhoneNumber')
          .type(ADD_ANOTHER_AGENT.secondaryPhoneNumber)
          .findDataTag('faxNumber')
          .type(ADD_ANOTHER_AGENT.faxNumber)
          .findDataTag('status')
          .select(ADD_ANOTHER_AGENT.status)
          .findDataTag('emailAddress')
          .type(ADD_ANOTHER_AGENT.emailAddress);

        cy.findDataTag('agency-mailing-address').within(() => {
          cy.findDataTag('address1')
            .type(ADD_ANOTHER_AGENT.mailingAddress.address1)
            .findDataTag('address2')
            .type(ADD_ANOTHER_AGENT.mailingAddress.address2)
            .findDataTag('city')
            .type(ADD_ANOTHER_AGENT.mailingAddress.city)
            .findDataTag('state')
            .select(ADD_ANOTHER_AGENT.mailingAddress.state)
            .findDataTag('zip')
            .type(ADD_ANOTHER_AGENT.mailingAddress.zip);
        });

        cy.findDataTag('sameAsMailing').click();

        cy.findDataTag('licenses[0].licenseNumber_label')
          .scrollIntoView()
          .should('be.visible')
          .findDataTag('licenses[0].state')
          .select(ADD_ANOTHER_AGENT.licenses[0].state)
          .findDataTag('licenses[0].licenseType')
          .select(ADD_ANOTHER_AGENT.licenses[0].licenseType)
          .findDataTag('licenses[0].licenseNumber')
          .type(ADD_ANOTHER_AGENT.licenses[0].licenseNumber)
          .findDataTag('licenses[0].appointed')
          .click()
          .get('[class~="add-license"]')
          .click()
          .findDataTag('licenses[1].state')
          .select(ADD_ANOTHER_AGENT.licenses[1].state)
          .findDataTag('licenses[1].licenseType')
          .select(ADD_ANOTHER_AGENT.licenses[1].licenseType)
          .findDataTag('licenses[1].licenseNumber')
          .type(ADD_ANOTHER_AGENT.licenses[1].licenseNumber);
      })
      .clickSubmit('.modal', 'submit-modal');

    cy.wait('@addNewAgent').then(({ response }) => {
      expect(response.body.status, 'Add New Agent: status').to.equal(201);
    });

    cy.get('.card:nth-child(2)').contains(ADD_ANOTHER_AGENT.firstName);
  });

  it('POS: Add a New Note', () => {
    cy.get('a.notes').click();

    cy.wait('@fetchNotes').then(({ response }) => {
      expect(response.body.status).to.equal(200, 'Fetch notes for policy');
    });

    cy.findDataTag('new-note')
      .click()
      .get('[class~="new-note-file"]')
      .findDataTag('contactType')
      .select(ADD_NOTE.contactType)
      .findDataTag('noteContent')
      .type(ADD_NOTE.noteContent)
      .findDataTag('fileType')
      .select(ADD_NOTE.fileType)
      .findDataTag('submit-button')
      .click();

    cy.wait('@addNote').then(({ response }) => {
      expect(response.body.status, 'Add New Agent: status').to.equal(200);
    });

    cy.get('.table').contains(ADD_NOTE.noteContent);
  });
});
