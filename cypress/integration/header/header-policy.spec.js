import { checkFullHeader } from './utils';
import { goToNav } from '../../support/navigation';

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
    effDate: '03/02/2019',
    expDate: '03/02/2020'
  };

  before(() => {
    cy.workflow('newQuote')._submit('#SearchBar')
      .findDataTag('policy-list').find('> div section ul li > a').then($a => {
      $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
    });
  });
  
  it('Policy Number and Quote Status', () => {
    checkFullHeader(data, undefined, false);
  });

  it('Policyholder / Agent Page', () => {
    goToNav('policyholder');
    checkFullHeader(data, undefined, false);
  });

  it('Mortgage / Billing Page', () => {
    goToNav('billing');
    checkFullHeader(data, undefined, false);
  });

  it('Notes / Files Page', () => {
    goToNav('notes');
    checkFullHeader(data, undefined, false);
  });

  it('Cancel Policy Page', () => {
    goToNav('cancel');
    checkFullHeader(data, undefined, false);
  });

  it('Endorsements Page', () => {
    goToNav('endorsements');
    checkFullHeader(data, undefined, false);
  });
});
