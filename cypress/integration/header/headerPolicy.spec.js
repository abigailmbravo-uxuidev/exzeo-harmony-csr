import { checkFullHeader, goToNav } from '../../helpers';
import stubAllRoutes from '../../support/stubAllRoutes';

describe('Policy Header Testing', () => {
  const data = {
    name: 'Batman Robin CSR004',
    phone: '(727) 123-1234',
    mAddress: 'TEST MAILING ADDRESS1',
    m2Address: 'TEST MAILING ADDRESS2',
    mCity: 'ORLANDO',
    mSt: 'FL',
    mZip: '32789',
    pAddress: '726 TEST ADDRESS',
    p2Address: 'TEST ADDRESS TWO',
    pCity: 'HIALEAH',
    pSt: 'FL',
    pZip: '00017',
    territory: '033-0',
    county: 'MIAMI-DADE',
    effectiveDate: '03/02/2019',
    expDate: '03/02/2020'
  };

  before(() => {
    stubAllRoutes();
    cy.login()
      .clickSubmit('#SearchBar')
      .findDataTag('policy-list')
      .find('> div section ul li > a')
      .then($a => {
        $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
      });
  });

  beforeEach(() => stubAllRoutes());

  it('Policy Number and Quote Status', () => {
    cy.wait('@questions');
    checkFullHeader(data, undefined, false);
  });

  it('Policyholder / Agent Page', () => {
    goToNav('policyholder');
    cy.wait('@fetchAgency');
    checkFullHeader(data, undefined, false);
  });

  it('Mortgage / Billing Page', () => {
    goToNav('billing');
    cy.wait('@questions');
    checkFullHeader(data, undefined, false);
  });

  it('Notes / Files Page', () => {
    goToNav('notes');
    cy.wait('@fetchNotes');
    checkFullHeader(data, undefined, false);
  });

  it('Cancel Policy Page', () => {
    goToNav('cancel');
    checkFullHeader(data, undefined, false);
  });

  it('Endorsements Page', () => {
    goToNav('endorsements');
    cy.wait('@questions');
    checkFullHeader(data, undefined, false);
  });
});
