import _ from 'lodash'; //eslint-disable-line
import {
  _newQuote,
  _coverage,
  _underwriting,
  _additionalInterests,
  _mailingBilling,
  _notesFiles,
  _summary,
  _application,
  _docusign
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
      _newQuote(address1);

      const coverageRes = {
        policyHolders: [{
          firstName: pH1.pH1FirstName,
          lastName: pH1.pH1LastName,
          primaryPhoneNumber: pH1.pH1phone,
          emailAddress: pH1.pH1email
        }]
      };
      const coverageFx = _.cloneDeep(fx);
      _coverage(pH1, coverageFx, coverageRes, true);

      const underwritingFx = _.cloneDeep(coverageFx);
      const underwritingRes = { underwritingAnswers: { rented: { answer: "Never" } } };
      _underwriting(underwritingData, underwritingFx, underwritingRes, true);

      _additionalInterests();

      const mailingBillingFx = _.cloneDeep(underwritingFx);
      const mailingBillingRes = { policyHolderMailingAddress: { address1, address2, city, zip, country }};
      _mailingBilling(mailingBillingFx, mailingBillingRes, true);

      _notesFiles();
      _summary();
      _application();
      _docusign();
    });
  });
});
