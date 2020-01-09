import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting,
  changeCoverageAndAgency,
  fillOutAdditionalInterests,
  fillOutMailingBilling,
  fillOutNotesFiles,
  fillOutSummary,
  fillOutApplication,
  navigateThroughDocusign,
  sendQuote,
  changeBillTo
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
    navigateThroughNewQuote('HO3');

    fillOutCoverage();
    coverageRatingTest();

    fillOutUnderwriting('HO3');
    underwritingTest();
    changeCoverageAndAgency('HO3');

    fillOutAdditionalInterests();
    aiTest();

    fillOutMailingBilling();
    mailingBillingTest();

    fillOutNotesFiles();
    notesFilesTest();

    fillOutSummary();
    quoteSummaryTest();
    sendQuote();

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
