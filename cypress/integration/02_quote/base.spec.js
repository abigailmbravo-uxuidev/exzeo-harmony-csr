import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting,
  changeCoverage,
  fillOutAdditionalInterests,
  fillOutMailingBilling,
  fillOutNotesFiles,
  fillOutSummary,
  fillOutApplication,
  navigateThroughDocusign
} from '../../helpers';
import {
  coverageRatingTest,
  underwritingTest,
  aiTest,
  mailingBillingTest,
  notesFilesTest,
  quoteSummaryTest,
  applicationTest,
  afterDocuSignTest
} from '../../pageTests';

describe('Base Path', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Navigate through base app', () => {
    navigateThroughNewQuote();

    fillOutCoverage();
    // coverageRatingTest();

    fillOutUnderwriting();
    // underwritingTest();
    changeCoverage();

    fillOutAdditionalInterests();
    aiTest();

    fillOutMailingBilling();
    mailingBillingTest();

    fillOutNotesFiles();
    notesFilesTest();

    fillOutSummary();
    quoteSummaryTest();

    fillOutApplication();
    applicationTest();

    if (Cypress.env('CI')) {
      cy.task(
        'log',
        "CI is set to true - not testing for 'Application Sent DocuSign'"
      );
    } else {
      navigateThroughDocusign();
      afterDocuSignTest();
    }
  });
});
