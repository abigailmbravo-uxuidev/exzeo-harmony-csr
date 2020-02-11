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
  searchQoute
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
import { coverageAF3, unQuestionsAF3 } from '../../fixtures';

describe('Base Path - AF3', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Navigate through base app', () => {
    navigateThroughNewQuote('AF3');

    fillOutCoverage();
    coverageRatingTest();

    fillOutUnderwriting(unQuestionsAF3);
    underwritingTest();
    changeCoverageAndAgency(coverageAF3);

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
      searchQoute();
      searchPolicy();
      // afterDocuSignTest();
    }
  });
});
