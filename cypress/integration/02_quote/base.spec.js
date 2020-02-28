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
  searchDiary
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
import { coverage, unQuestions } from '../../fixtures';

describe('Base Path - HO3', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Navigate through Quote Workflow', () => {
    navigateThroughNewQuote();

    fillOutCoverage();
    coverageRatingTest();

    fillOutUnderwriting(unQuestions);
    underwritingTest();
    changeCoverageAndAgency(coverage);

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

    navigateThroughDocusign();
    searchDiary();
    searchQoute();
    searchPolicy();
  });
});