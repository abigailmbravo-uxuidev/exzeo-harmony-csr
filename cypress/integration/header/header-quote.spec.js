import pH1 from '../../fixtures/stockData/pH1.json';
import user from '../../fixtures/stockData/user.json';
import {
  checkHeaderSection,
  checkFullHeader,
  navNewQuote,
  navCoverage,
  navUnderwriting,
  navAdditionalInterests,
  navMailingBilling,
  navNotesFiles,
  navSummary,
  navApplication
} from '../../helpers';
import stubAllRoutes from '../../support/stubAllRoutes';

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

  // Create a track of our current stub state so it is saved
  let currentStub;

  before(() => {
    stubAllRoutes();
    cy.login();
    navNewQuote();
  });

  beforeEach(() => stubAllRoutes());

  it('Coverage/Rating Page', () => {
    cy.wait('@fetchAgencies');
      checkHeaderSection('policyHolderDetail', ['Policyholder', '', '']);

    currentStub = [
        ['data.previousTask.value.result.effectiveDate', effectiveDate],
        ['data.previousTask.value.result.policyHolders', [{
          firstName: pH1.pH1FirstName,
          lastName: pH1.pH1LastName,
          primaryPhoneNumber: pH1.pH1phone,
          emailAddress: pH1.pH1email
        }]]
      ];
    navCoverage(pH1, currentStub);
    checkFullHeader(quoteData, options);
  });

  it('Underwriting Page', () => {
    currentStub = [...currentStub,
      ['data.previousTask.value.result.effectiveDate', effectiveDate],
      ['data.previousTask.value.result.rating', { totalPremium: 100 }],
      ['data.previousTask.value.result.underwritingAnswers', { rented: { answer: "Never" } }]
    ];
    navUnderwriting(undefined, currentStub);
    options['premium'] = true;
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });

  it('Additional Interest Page', () => {
    cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', currentStub);
    navAdditionalInterests();
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });

  it('Mailing/Billing Page', () => {
    const { address1, address2, city, state, zip, country } = user;
    currentStub = [...currentStub,
      ['data.previousTask.value.result.policyHolderMailingAddress', { address1, address2, city, state, zip, country }]
    ];
    navMailingBilling(currentStub);
    options['mailingComplete'] = true;
    cy.wait('@csrGetQuoteWithUnderwriting');
    checkFullHeader(quoteData, options);
  });

  it('Notes/Files Page', () => {
    currentStub = [...currentStub, ['data.previousTask.value.result.quoteState', 'Application Started']];
    navNotesFiles(currentStub);
    options['application'] = true;
    checkFullHeader(quoteData, options);
  });

  it('Quote Summary Page', () => {
    navSummary(currentStub);
    checkFullHeader(quoteData, options);
  });

  it('Application Page', () => {
    navApplication(currentStub);
    checkFullHeader(quoteData, options);
  });
});
