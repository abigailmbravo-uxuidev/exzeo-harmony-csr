import { stub } from './functions';

export const goToNav = name => {
  cy.get('.loader.modal').should('not.exist')
    .findDataTag(`nav-${name}`).find('a').click({ force: true });
};

export const _newQuote = address => {
  cy.findDataTag('searchType').select('address');
  cy.findDataTag('address').type(address);
  cy._submit()
    .wait('@fetchAddresses');
  // This is going to get rewritten once we refactor this in the app itself
  cy.findDataTag(address).then($a => {
    $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
  });
};

export const _coverage = customerInfo => {
  Object.entries(customerInfo).forEach(([field, value]) => {
    cy.findDataTag(field).type(value);
  });
  cy.findDataTag('coverage-submit').click();
};

export const _underwriting = data => {
  goToNav('underwriting');
  Object.entries(data).forEach(([name, value]) => {
    cy.get(`input[name="${name}"][value="${value}"] + span`).click();
  });
  cy._submit();
};

export const _additionalInterests = () => goToNav('additionalInterests');

export const _mailingBilling = () => {
  goToNav('billing');
  cy.get('.loader.modal').should('not.exist')
  // This is going away on ui update
    .wait(2000).get('.segmented-switch').click(30, 10)
  //
  ._submit();
};

export const _notesFiles = () => goToNav('notes');

export const _summary = () => goToNav('summary');

export const _application = () => goToNav('application');

export const _docusign = () => {
  cy.route('POST', '/cg/start?csrGetQuoteWithUnderwriting', stub('fx:stubs/csrGetQuoteWithUnderwriting')).as('csrGetQuoteWithUnderwriting');

  cy.wait('@summary')
    .get('.basic-footer button[data-test="submit"]').click()
    .get('.modal.quote-summary').should('exist')
    .get('.modal.quote-summary button[type="submit"]').click({ force: true })
    .wait('@csrGetQuoteWithUnderwriting')
    .reload().wait('@csrGetQuoteWithUnderwriting');
};
