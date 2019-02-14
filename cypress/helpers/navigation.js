// Functions used to navigate each tab of the app

import merge from 'lodash/merge'; //eslint-disable-line

let underwritingStub = {};

const stubQuote = modification =>
  cy.server().fixture('stubs/csrGetQuoteWithUnderwriting').then(fx => {
    underwritingStub = merge(fx, modification);
    cy.route('POST', '/cg/start?csrGetQuoteWithUnderwriting', underwritingStub).as('csrGetQuoteWithUnderwriting');  
  });

// Function to find and navigate to the next tab
export const goToNav = name =>
  cy.get('.loader.modal').should('not.exist')
    .findDataTag(`nav-${name}`).find('a').click({ force: true });

export const _newQuote = (address = ' ') => {
  cy.findDataTag('searchType').select('address')
    .findDataTag('address').type(address)
    ._submit().wait('@fetchAddresses')
  // This is going to get rewritten once we refactor this in the app itself
    .findDataTag(address).then($a => {
      $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
  });
};

export const _coverage = customerInfo => {
  const updatedInfo = {
    data: {
      previousTask: {
        value: {
          result: {
            policyHolders: [{
              firstName: customerInfo.pH1FirstName,
              lastName: customerInfo.pH1LastName,
              primaryPhoneNumber: customerInfo.pH1phone,
              emailAddress: customerInfo.pH1email
            }]
          }
        }
      }
    }
  };
  stubQuote(updatedInfo)
  Object.entries(customerInfo).forEach(([field, value]) =>
    cy.findDataTag(field).type(`{selectall}{backspace}${value}`)
  );

  cy.findDataTag('coverage-submit').click().wait('@csrGetQuoteWithUnderwriting');
};

export const _underwriting = data => {
  goToNav('underwriting');
  const updatedInfo = {
    data: {
      previousTask: {
        value: {
          result: {
            underwritingAnswers: {
              rented: { answer: "Never" }
            }
          }
        }
      }
    }
  };
  stubQuote(updatedInfo);
  Object.entries(data).forEach(([name, value]) => {
    cy.get(`input[name="${name}"][value="${value}"] + span`).click();
  });

  cy._submit().wait('@csrGetQuoteWithUnderwriting');
};

export const _additionalInterests = () => goToNav('additionalInterests');

export const _mailingBilling = policyHolderMailingAddress => {
  goToNav('billing');
  cy.wait('@getBillingOptions').get('.segmented-switch').click(30, 10);
  stubQuote({ data: { previousTask: { value: { result: { policyHolderMailingAddress } } } } });
  
  cy._submit().wait('@csrGetQuoteWithUnderwriting');
};

export const _notesFiles = () => goToNav('notes');

export const _summary = () => goToNav('summary');

export const _application = () => goToNav('application');

export const _docusign = () => {
  stubQuote()
  cy.get('.basic-footer button[data-test="submit"]:not([disabled])').click();

  cy.wait(1000).get('.modal.quote-summary').should('exist')
    .get('.modal.quote-summary button[type="submit"]').click({ force: true }).wait('@csrGetQuoteWithUnderwriting')
    .reload();
};
