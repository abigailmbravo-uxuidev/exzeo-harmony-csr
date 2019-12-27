// Functions used to navigate each tab of the app

import { user, pH1, underwriting, coveragevalues } from '../fixtures';

export const navigateThroughNewQuote = (address = user.address1) => {
  cy.task('log', 'Navigating through Quote')
    .findDataTag('searchType')
    .select('address')
    .findDataTag('product')
    .select('HO3')
    .findDataTag('address')
    .type(address)
    .clickSubmit()
    .wait('@fetchAddresses')
    // This makes it so we don't open up a new window
    .findDataTag(address)
    .then($a => {
      $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
      cy.wait('@createQuote')
        .wait('@retrieveQuote')
        .wait('@getZipcodeSettings');
    });
};

export const fillOutCoverage = (customerInfo = pH1) =>
  cy
    .task('log', 'Filling out Coverage')
    .goToNav('coverage')
    .wrap(Object.entries(customerInfo))
    .each(([field, value]) =>
      cy.findDataTag(field).type(`{selectall}{backspace}${value}`)
    )
    .clickSubmit()
    .wait('@updateQuote');

export const changeCoverage = (limits = coveragevalues) =>
  cy
    .task('log', 'Changing coverege values')
    .goToNav('coverage')
    .wait('@updateQuote')
    .then(({ response }) => {
      const premium = response.body.result.rating.totalPremium;
      cy.log(premium).wait(5000);
      cy.wrap(Object.entries(limits)).each(([field, value]) => {
        cy.findDataTag(field)
          .find('input')
          .type(`{selectall}{backspace}${value}`);
      });
      cy.clickSubmit()
        .wait('@updateQuote')
        .then(({ response }) => {
          expect(response.body.result.rating.totalPremium).not.to.eq(premium);
        });
    });

export const fillOutUnderwriting = (data = underwriting) =>
  cy
    .task('log', 'Filling out Underwriting')
    .goToNav('underwriting')
    .wrap(Object.entries(data))
    .each(([name, value]) =>
      cy.findDataTag(`${name}_${value}`).click({ force: true })
    )
    .clickSubmit();
// .wait('@updateQuote');

export const fillOutAdditionalInterests = () =>
  cy.task('log', 'Filling out AIs').goToNav('additionalInterests');

export const fillOutMailingBilling = () =>
  cy
    .task('log', 'Filling out Mailing Billing')
    .goToNav('billing')
    .findDataTag('sameAsPropertyAddress')
    .click('left')
    .findDataTag('billPlan_Annual')
    .click({ force: true })
    .clickSubmit()
    .wait('@updateQuote');

export const fillOutNotesFiles = () =>
  cy.task('log', 'Filling out Notes and Files').goToNav('notes');

export const fillOutSummary = () =>
  cy.task('log', 'Filling out Summary').goToNav('summary');

export const fillOutApplication = () =>
  cy.task('log', 'Filling out Application Page').goToNav('application');

export const navigateThroughDocusign = () =>
  cy
    .task('log', "Navigating through 'Send to Docusign'")
    .clickSubmit('body', 'send-application')
    .wait('@verifyQuote')
    .checkQuoteState('Application Ready')
    .clickSubmit('#sendApplicationForm', 'modal-submit')
    .wait('@sendApplication')
    .get('button[data-test="send-application"]')
    .should('be.disabled');
