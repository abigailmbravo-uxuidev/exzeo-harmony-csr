// Functions used to navigate each tab of the app

import _ from 'lodash'; //eslint-disable-line
import { stub } from '.';
import user from '../fixtures/stockData/user.json';
import pH1 from '../fixtures/stockData/pH1.json';
import underwritingDefault from '../fixtures/stockData/underwriting.json';
import quoteFx from '../fixtures/stubs/csrGetQuoteWithUnderwriting.json';

export const stubQuoteWithUnderwriting = (fixture, result, useConfig = false) => {
  const updatedInfo = {
    data: {
      previousTask: {
        value: {
          result
        }
      }
    }
  };
  _.merge(fixture, updatedInfo);
  cy.route('POST', '/cg/start?csrGetQuoteWithUnderwriting', useConfig ? stub(fixture) : fixture).as('csrGetQuoteWithUnderwriting');
};

// Function to find and navigate to the next tab
export const goToNav = name =>
  cy.get('.loader.modal').should('not.exist')
    .findDataTag(`nav-${name}`).find('a').click({ force: true });

export const _newQuote = (address = user.address1) => {
  cy.findDataTag('searchType').select('address')
    .findDataTag('address').type(address)
    .clickSubmit().wait('@fetchAddresses')
  // This is going to get rewritten once we refactor this in the app itself
    .findDataTag(address).then($a => {
      $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
  });
};

export const _coverage = (customerInfo = pH1, fixture, updates, useConfig) => {
  if (!fixture) {
    fixture = _.cloneDeep(quoteFx);
  };
  if (!updates) {
    updates = {
      policyHolders: [{
        firstName: pH1.pH1FirstName,
        lastName: pH1.pH1LastName,
        primaryPhoneNumber: pH1.pH1phone,
        emailAddress: pH1.pH1email
      }]
    };
  };
  goToNav('coverage');

  Object.entries(customerInfo).forEach(([field, value]) =>
    cy.findDataTag(field).type(`{selectall}{backspace}${value}`)
  );
  stubQuoteWithUnderwriting(fixture, updates, useConfig);
  cy.findDataTag('coverage-submit').click();
};

export const _underwriting = (underwritingData = underwritingDefault, fixture, updates, useConfig) => {
  if (!fixture) {
    fixture = _.cloneDeep(quoteFx);
  };
  if (!updates) {
    updates = { underwritingAnswers: { rented: { answer: "Never" } } };
  };
  goToNav('underwriting');
  Object.entries(underwritingData).forEach(([name, value]) => {
    cy.get(`input[name="${name}"][value="${value}"] + span`).click();
  });
  stubQuoteWithUnderwriting(fixture, updates, useConfig);
  cy.clickSubmit();
};

export const _additionalInterests = () => goToNav('additionalInterests');

export const _mailingBilling = (fixture, updates, useConfig) => {
  if (!fixture) {
    fixture = _.cloneDeep(quoteFx);
  };
  if (!updates) {
    const { address1, address2, city, state, zip, country } = user;
    updates = { policyHolderMailingAddress: { address1, address2, city, state, zip, country } };
  };
  goToNav('billing');
  cy.get('.segmented-switch').click(30, 10);
  stubQuoteWithUnderwriting(fixture, updates, useConfig);
  cy.clickSubmit();
};

export const _notesFiles = () => goToNav('notes');

export const _summary = () => goToNav('summary');

export const _application = () => goToNav('application');

export const _docusign = () => {
  cy.get('.basic-footer button[data-test="submit"]:not([disabled])').click()
    .wait(1000).get('.modal.quote-summary').should('exist')
    .get('.modal.quote-summary button[type="submit"]').click({ force: true }).wait('@csrGetQuoteWithUnderwriting')
    .reload();
};
