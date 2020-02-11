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
  changeBillTo,
  searchPolicy,
  searchQoute,
  veriFyDiary
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
import { coverageHO3, unQuestionsHO3 } from '../../fixtures';

describe('Base Path', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Navigate through base app', () => {
    navigateThroughNewQuote();

    fillOutCoverage();
    coverageRatingTest();

    fillOutUnderwriting(unQuestionsHO3);
    underwritingTest();
    changeCoverageAndAgency(coverageHO3);

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
      veriFyDiary();
      searchQoute();
      searchPolicy();
    }
  });
});
