import _ from 'lodash'; //eslint-disable-line
import {
  navigateThroughNewQuote,
  navigateThroughCoverage,
  navigateThroughUnderwriting,
  navigateThroughAdditionalInterests,
  navigateThroughMailingBilling,
  navigateThroughNotesFiles,
  navigateThroughSummary,
  navigateThroughApplication,
  navigateThroughDocusign
} from '../../helpers';
import stubAllRoutes from '../../support/stubAllRoutes';
import user from '../../fixtures/stockData/user.json';
import pH1 from '../../fixtures/stockData/pH1.json';
import underwritingData from '../../fixtures/stockData/underwriting.json';

describe('Base Path', () => {
  const { address1, address2, city, zip, country, state } = user;

  before(() => {
    stubAllRoutes(true);
    cy.login();
  });

  it('Navigate through base app', () => {
    navigateThroughNewQuote(address1);
    const coverageRes = [
      'data.previousTask.value.result.policyHolders', [{
        firstName: pH1.pH1FirstName,
        lastName: pH1.pH1LastName,
        primaryPhoneNumber: pH1.pH1phone,
        emailAddress: pH1.pH1email
      }]
    ];
    navigateThroughCoverage(pH1, coverageRes, true);
    navigateThroughUnderwriting(underwritingData, undefined, true);
    navigateThroughAdditionalInterests();
    navigateThroughMailingBilling(undefined, true);
    navigateThroughNotesFiles();
    navigateThroughSummary();
    navigateThroughApplication();
    navigateThroughDocusign();
  });
});
