import _ from 'lodash'; //eslint-disable-line
import pH1 from '../../fixtures/stockData/pH1.json';
import user from '../../fixtures/stockData/user.json';
import { stubQuoteWithUnderwriting,
  checkHeaderSection,
  checkFullHeader,
  _newQuote,
  _coverage,
  _underwriting,
  _mailingBilling,
  _additionalInterests,
  _notesFiles,
  _summary,
  _application
} from '../../helpers';
import routes from '../../support/routes.js';

describe('Quote Header Testing', () => {
  // Construct our UI data structure
  const name = `${pH1.pH1FirstName} ${pH1.pH1LastName}`;
  const digits = pH1.pH1phone.replace(/[^\d]/g, '');
  const phone = `(${digits.substr(0, 3)}) ${digits.substr(3, 3)}-${digits.substr(6, 4)}`;
  const mAddress = user.address1;
  const mCity = 'SARASOTA';
  const mSt = 'FL';
  const mZip = '00001';
  const territory = '715-51';
  const today = new Date();
  const effectiveDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
    .toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const quoteData = { name, phone, mAddress, mCity, mSt, mZip, territory, effectiveDate };

  // Create an options object we udpate as we move through app
  const options = { premium: false, mailingComplete: false, application: false };

  // Our current fixture will exist outside tests and be updated from inside so we can track our
  // current stubbed server response
  let currentFixture = {};

  before(() => {
    routes();
    cy.login();
    _newQuote();
  });

  beforeEach(() => routes());

  it('Coverage/Rating Page', () => {
    cy.wait('@fetchAgencies')
      .fixture('stubs/csrGetQuoteWithUnderwriting').then(fx => {
      checkHeaderSection('policyHolderDetail', ['Policy Holder', '', '']);

      const coverageRes = {
        effectiveDate,
        policyHolders: [{
          firstName: pH1.pH1FirstName,
          lastName: pH1.pH1LastName,
          primaryPhoneNumber: pH1.pH1phone,
          emailAddress: pH1.pH1email
        }]
      };
      currentFixture = _.cloneDeep(fx);
      _coverage(pH1, currentFixture, coverageRes);
      checkFullHeader(quoteData, options);
    });
  });

  it('Underwriting Page', () => {
    const underwritingRes = {
      effectiveDate,
      rating: { totalPremium: 100 } ,
      underwritingAnswers: { rented: { answer: "Never" } }
    };
    _underwriting(undefined, currentFixture, underwritingRes);
    options['premium'] = true;
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });

  it('Additional Interest Page', () => {
    stubQuoteWithUnderwriting(currentFixture);
    _additionalInterests();
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });

  it('Mailing/Billing Page', () => {
    _mailingBilling(currentFixture);
    options['mailingComplete'] = true;
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });

  it('Notes/Files Page', () => {
    stubQuoteWithUnderwriting(currentFixture, { quoteState: 'Application Started' });
    _notesFiles();
    options['application'] = true;
    checkFullHeader(quoteData, options);
  });

  it('Quote Summary Page', () => {
    stubQuoteWithUnderwriting(currentFixture);
    _summary();
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });

    it('Application Page', () => {
    stubQuoteWithUnderwriting(currentFixture);
    _application();
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });
});
