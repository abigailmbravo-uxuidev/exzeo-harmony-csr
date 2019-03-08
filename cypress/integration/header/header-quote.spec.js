import pH1 from '../../fixtures/stockData/pH1.json';
import user from '../../fixtures/stockData/user.json';
import { checkHeaderSection, checkFullHeader } from '../../helpers';

describe('Quote Header Testing', () => {
  const name = `${pH1.pH1FirstName} ${pH1.pH1LastName}`;
  const digits = pH1.pH1phone.replace(/[^\d]/g, '');
  const phone = `(${digits.substr(0, 3)}) ${digits.substr(3, 3)}-${digits.substr(6, 4)}`;
  const mAddress = user.address;
  const mCity = 'SARASOTA';
  const mSt = 'FL';
  const mZip = '00001';
  const territory = '715-51';
  const today = new Date();
  const effDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
    .toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
  const data = { name, phone, mAddress, mCity, mSt, mZip, territory, effDate };
  
  // Create an options object we udpate as we move through app
  const options = { premium: false, mailingComplete: false, application: false };

  before(() => cy.workflow('coverage'));

  it('Coverage/Rating Page', () => {
    checkHeaderSection('policyHolderDetail', ['Policy Holder', '', '']);
    
    cy.workflow('underwriting', 'coverage');
    checkFullHeader(data, options);
  });

  it('Underwriting Page', () => {
    cy.findDataTag('currentPremiumDetail').find('dl > div > dd').should('contain', '--')
      .workflow('additionalInterests', 'underwriting');
    options['premium'] = true;

    checkFullHeader(data, options);
  });

  it('Additional Interest Page', () => {
    cy.workflow('mailingBilling', 'additionalInterests');
    checkFullHeader(data, options);
  });

  it('Mailing/Billing Page', () => {
    checkHeaderSection('mailingAddressDetail', ['Mailing Address']);
    cy.workflow('notesFiles', 'mailingBilling');
    options['mailingComplete'] = true;

    checkFullHeader(data, options);
  });

  it('Notes/Files Page', () => {
    cy.workflow('summary', 'notesFiles');
    options['application'] = true;

    checkFullHeader(data, options);
  });

  it('Quote Summary Page', () => {
    cy.workflow('application', 'summary');

    checkFullHeader(data, options);
  });

  it('Application Page', () => {
    cy.workflow(undefined, 'application');
    
    checkHeaderSection('quoteDetails', ['', '' , 'Application Sent DocuSign']);
  });
});
