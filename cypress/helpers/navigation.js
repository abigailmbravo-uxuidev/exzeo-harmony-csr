// Functions used to navigate each tab of the app
// import { envelopeIdCheck } from '../../helpers/requests';
import { envelopeIdCheck } from '../helpers';
import {
  user,
  pH1,
  underwriting,
  coverageValues,
  shareQuote,
  addInsured,
  unQuestionsHO3,
  unQuestionsAF3,
  coverageHO3,
  coverageAF3
} from '../fixtures';

export const navigateThroughNewQuote = (product, address = user.address1) => {
  let prod = product === 'AF3' ? 'AF3' : 'HO3';
  cy.task('log', 'Navigating through Quote')
    .findDataTag('searchType')
    .select('address')
    .findDataTag('product')
    .select(prod)
    .findDataTag('address')
    .type(address)
    .clickSubmit()
    .wait('@fetchAddresses');

  // This makes it so we don't open up a new window
  cy.findDataTag(address).then($a => {
    $a.prop('onСlick', () => cy.visit($a.prop('dataset').url)).click();
    cy.wait('@createQuote')
      .wait('@retrieveQuote')
      .wait('@getZipcodeSettings');
  });
  // });

  // This makes it so we don't open up a new window
  // .findDataTag(address)
  // .then($a => {
  //   $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();

  // });
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

export const changeCoverageAndAgency = product => {
  const coverageProd = product === 'AF3' ? coverageAF3 : coverageHO3;
  cy.task('log', 'Changing coverege values')
    .goToNav('coverage')
    .wait('@updateQuote')
    .then(({ response }) => {
      const premium = response.body.result.rating.totalPremium;
      const agencyCode = response.body.result.agencyCode;

      cy.get("div[data-test='agencyCode_wrapper'] input[id*='react-s']")
        .click({ force: true })
        .chooseReactSelectOption('agencyCode_wrapper', 20003)
        .get("div[data-test='agentCode_wrapper'] input[id*='react-s']")
        .click({ force: true })
        .chooseReactSelectOption('agentCode_wrapper', 60586)
        .wrap(Object.entries(coverageProd))
        .each(([field, value]) => {
          cy.findDataTag(field).type(`{selectall}{backspace}${value}`, {
            force: true
          });
        });

      cy.clickSubmit()

        .wait('@updateQuote')
        .then(({ response }) => {
          expect(response.body.result.rating.totalPremium).not.to.eq(premium);
          expect(response.body.result.agencyCode).not.to.eq(agencyCode);
        });
    });
};

export const fillOutUnderwriting = product => {
  const data = product === 'AF3' ? unQuestionsAF3 : unQuestionsHO3;
  cy.task('log', 'Filling out Underwriting')
    .goToNav('underwriting')
    .wrap(Object.entries(data))
    .each(([name, value]) =>
      cy.findDataTag(`${name}_${value}`).click({ force: true })
    )
    .clickSubmit();
};

export const fillOutAdditionalInterests = (data = addInsured) =>
  cy
    .task('log', 'Filling out AIs')
    .goToNav('additionalInterests')
    .findDataTag('additionalInsured')
    .click({ force: true })
    .wrap(Object.entries(data))
    .each(([field, value]) =>
      cy
        .findDataTag(`${field}`)
        .type(`{selectall}{backspace}${value}`, { force: true })
    )
    .findDataTag('ai-modal-submit')
    .click({ force: true });

export const fillOutMailingBilling = () =>
  cy
    .task('log', 'Filling out Mailing Billing')
    .goToNav('billing')
    .findDataTag('sameAsPropertyAddress')
    .click('left')
    .findDataTag('billToId')
    .select('Additional Insured: BATMAN ROBIN', { force: true })
    .findDataTag('billPlan_Annual')
    .click({ force: true })
    .clickSubmit()
    .wait('@updateQuote');

export const fillOutNotesFiles = () =>
  cy.task('log', 'Filling out Notes and Files').goToNav('notes');

export const fillOutSummary = () =>
  cy.task('log', 'Filling out Summary').goToNav('summary');

export const sendQuote = (data = shareQuote) =>
  cy
    .wrap(Object.entries(data))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .type(`{selectall}{backspace}${value}`, { force: true })
    )
    .findDataTag('share-footer-submit')
    .click({ force: true })
    .wait('@shareQuote')
    .then(({ response }) => {
      expect(response.body.message).to.equal('success');
    });

export const fillOutApplication = () =>
  cy.task('log', 'Filling out Application Page').goToNav('application');

export const navigateThroughDocusign = () =>
  cy
    .task('log', "Navigating through 'Send to Docusign'")
    .clickSubmit('body', 'send-application')
    .clickSubmit('#sendApplicationForm', 'modal-submit')
    .checkQuoteState('Application Ready')
    .wait('@sendApplication')
    .get('button[data-test="send-application"]')
    .should('be.disabled')
    .wait('@verifyQuote')
    .then(({ request }) => {
      const token = localStorage.getItem('id_token');
      const apiUrl = Cypress.env('API_URL') + '/svc';
      const quoteNumber = request.body.data.quoteNumber;
      envelopeIdCheck(quoteNumber, apiUrl, token).then(response => {
        expect(response.body.result.envelopeId).to.not.be.empty;
      });
    });
