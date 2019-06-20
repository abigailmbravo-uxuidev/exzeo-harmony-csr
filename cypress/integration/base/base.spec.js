import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting,
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
    coverageRatingTest();

    fillOutUnderwriting();
    underwritingTest();

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

    navigateThroughDocusign();
    afterDocuSignTest();
  });
});
