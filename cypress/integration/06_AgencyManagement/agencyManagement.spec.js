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
  });

  it('POS: Add a New License', () => {
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
  });

  it('POS: Add a New Contract', () => {
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
  });

  it('POS: Edit License', () => {
    cy.findDataTag('edit-license')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('licenseEffectiveDate').type('2019-11-24');
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
      cy.get('span').contains(EDIT_LICENSE.licenses[0].licenseEffectiveDate);
    });
  });

  it('POS: Edit Contract', () => {
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

    cy.get('.spinner').should('not.be.visible');

    cy.findDataTag('contract-info').within(() => {
      cy.get('.contract-number-wrapper>div').contains(
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
        cy.findDataTag('displayName')
          .type('{selectall}{backspace}Cypress Agency updated')
          .findDataTag('legalName');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contract: status').to.equal(201);
    });

    cy.findDataTag('agency-name').within(() => {
      cy.get('div').contains(EDIT_AGENCY.displayName);
    });

    cy.findDataTag('edit-agency-address')
      .click()
      .get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('agency-mailing-address').within(() => {
          cy.findDataTag('address1').type(
            '{selectall}{backspace}Test Mailing Address 1 Updated'
          );
        });

        cy.findDataTag('agency-physical-address').within(() => {
          cy.findDataTag('address1')
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

    cy.get('.agency-principal').within(() => {
      cy.findDataTag('edit-contact')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });
    cy.get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('firstName').type('{selectall}{backspace}Cypress2');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Officer: status').to.equal(201);
    });

    cy.get('.agency-contact').within(() => {
      cy.findDataTag('edit-contact')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });

    cy.get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('title').type('{selectall}{backspace}Jr.');
      })
      .clickSubmit('.modal', 'modal-submit');

    cy.wait('@saveAgency').then(({ response }) => {
      expect(response.body.status, 'Edit Contact: status').to.equal(201);
    });

    cy.get('.agency-aor').within($el => {
      cy.findDataTag('edit-agent')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });

    cy.get('[class~="modal"]')
      .within(() => {
        cy.findDataTag('firstName').type('{selectall}{backspace}Cypress2');
      })
      .clickSubmit('.modal', 'submit-modal');

    cy.wait('@saveAgent').then(({ response }) => {
      expect(response.body.status, 'Edit Agent Of Record: status').to.equal(
        200
      );
    });
  });

  it('POS: Add a New Agency', () => {
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

    cy.get('.card:nth-child(2) .agent-name').contains(
      ADD_ANOTHER_AGENT.firstName
    );
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
  });
});
