// Functions used to navigate each tab of the app

import user from '../fixtures/stockData/user.json';
import pH1 from '../fixtures/stockData/pH1.json';
import underwritingDefault from '../fixtures/stockData/underwriting.json';

// Function to find and navigate to the next tab
export const goToNav = name =>
  cy.get('.loader.modal').should('not.exist')
    .findDataTag(`nav-${name}`).find('a').click({ force: true });

export const navNewQuote = (address = user.address1) => {
  cy.findDataTag('searchType').select('address')
    .findDataTag('address').type(address)
    .clickSubmit().wait('@fetchAddresses')
  // This is going to get rewritten once we refactor this in the app itself
    .findDataTag(address).then($a => {
      $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
  });
};

export const navCoverage = (customerInfo = pH1, updates, useConfig) => {
  if (!updates) {
    updates = ['policyHolders',
        [{
          firstName: pH1.pH1FirstName,
          lastName: pH1.pH1LastName,
          primaryPhoneNumber: pH1.pH1phone,
          emailAddress: pH1.pH1email
        }]
    ];
  };
  goToNav('coverage');

  Object.entries(customerInfo).forEach(([field, value]) =>
    cy.findDataTag(field).type(`{selectall}{backspace}${value}`)
  );
  cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', updates, useConfig)
    .findDataTag('coverage-submit').click();
};

export const navUnderwriting = (data = underwritingDefault, updates, useConfig) => {
  if (!updates) {
    updates = ['underwritingAnswers', { rented: { answer: "Never" } } ];
  };
  goToNav('underwriting');
  Object.entries(data).forEach(([name, value]) => {
    cy.get(`input[name="${name}"][value="${value}"] + span`).click();
  });
  cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', updates, useConfig)
    .clickSubmit();
};

export const navAdditionalInterests = () => goToNav('additionalInterests');

export const navMailingBilling = (updates, useConfig) => {
  if (!updates) {
    const { address1, address2, city, state, zip, country } = user;
    updates = ['policyHolderMailingAddress', { address1, address2, city, state, zip, country } ];
  };
  goToNav('billing');
  cy.get('.segmented-switch').click(30, 10)
    .setFx('stubs/start/csrGetQuoteWithUnderwriting', updates, useConfig)
    .clickSubmit();
};

export const navNotesFiles = (updates, useConfig) =>
  cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', updates, useConfig).then(() => 
    goToNav('notes')
  )


export const navSummary = (updates, useConfig) =>
  cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', updates, useConfig).then(() => {
    goToNav('summary');
    cy.wait('@csrGetQuoteWithUnderwriting');
  })

export const navApplication = (updates, useConfig) =>
  cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', updates, useConfig).then(() => {
    goToNav('application');
    cy.wait('@csrGetQuoteWithUnderwriting');
  })

export const navDocusign = () =>
  cy.get('.basic-footer button[data-test="submit"]:not([disabled])').click()
    .wait(1000).get('.modal.quote-summary').should('exist')
    .get('.modal.quote-summary button[type="submit"]').click({ force: true }).wait('@csrGetQuoteWithUnderwriting')
    .reload();
