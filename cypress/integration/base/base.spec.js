import _ from 'lodash'; //eslint-disable-line
import {
  navNewQuote,
  navCoverage,
  navUnderwriting,
  navAdditionalInterests,
  navMailingBilling,
  navNotesFiles,
  navSummary,
  navApplication,
  navDocusign
} from '../../helpers';
import routes from '../../support/routes';
import user from '../../fixtures/stockData/user.json';
import pH1 from '../../fixtures/stockData/pH1.json';
import underwritingData from '../../fixtures/stockData/underwriting.json';

describe('Base Path', () => {
  const { address1, address2, city, zip, country } = user;
  before(() => {
    routes(true);
    cy.login();
  });

  it('Navigate through base app', () => {
    cy.fixture('stubs/csrGetQuoteWithUnderwriting').then(fx => {
      navNewQuote(address1);

      const coverageFx = _.cloneDeep(fx);
      const coverageRes = {
        policyHolders: [{
          firstName: pH1.pH1FirstName,
          lastName: pH1.pH1LastName,
          primaryPhoneNumber: pH1.pH1phone,
          emailAddress: pH1.pH1email
        }]
      };
      navCoverage(pH1, coverageFx, coverageRes, true);

      const underwritingFx = _.cloneDeep(coverageFx);
      const underwritingRes = { underwritingAnswers: { rented: { answer: "Never" } } };
      navUnderwriting(underwritingData, underwritingFx, underwritingRes, true);

      navAdditionalInterests();

      const mailingBillingFx = _.cloneDeep(underwritingFx);
      const mailingBillingRes = { policyHolderMailingAddress: { address1, address2, city, zip, country }};
      navMailingBilling(mailingBillingFx, mailingBillingRes, true);

      navNotesFiles();
      navSummary();
      navApplication();
      navDocusign();
    });
  });
});
