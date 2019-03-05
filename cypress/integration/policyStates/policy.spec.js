import merge from 'lodash/merge'; //eslint-disable-line

import { goToNav, checkHeaderSection } from '../../helpers';
import routes from '../../support/routes';

describe('Policy: Policy States + Effective/Cancellation Date', () => {
  const cancellationPolicyStates = [
    'In Force',
    'Pending Voluntary Cancellation',
    'Pending Underwriting Cancellation',
    'Pending Underwriting Non-Renewal',
    'Cancelled'
  ];
  const baseBillingCodes = [
    { code: 0, displayText: 'No Payment Received' },
    { code: 1, displayText: 'Full Payment Received'},
    { code: 2, displayText: 'Over Payment Received' },
    { code: 3, displayText: 'Partial Payment Received' },
    { code: 6, displayText: 'Payment Invoice Issued' },
    { code: 9, displayText: 'Non-Payment Notice Issued' }
  ];
  const cancelledBillingCodes = [
    { code: 12, displayText: 'Voluntary Cancellation' },
    { code: 13, displayText: 'Non-Payment Cancellation' },
    { code: 14, displayText: 'Underwriting Cancellation' },
    { code: 15, displayText: 'Underwriting Non-Renewal Cancellation' }
  ];

  const modFixtureStubRoute = (stubName, modification) =>
    cy.fixture(`stubs/${stubName}`).then(fx => {
      cy.route('POST', `/svc?${stubName}`, merge(fx, modification));
    });

  const goToBilling = (home = true) => {
    if (home) { cy.home(); }

    cy.clickSubmit('#SearchBar')
      .findDataTag('policy-list').find('> div section ul li > a').then($a => {
        $a.prop('onclick', () => cy.visit($a.prop('dataset').url)).click();
      });
    goToNav('billing');
  };

  const applyPayment = () => cy.findDataTag('batchNumber').type('00', { force: true })
    .findDataTag('cashType').select('Paper Deposit')
    .findDataTag('cashDescription').select('Misapplied Payment')
    .get('#MortgageBilling').submit();

  const checkPolicyDetail = (policyStatus, billingStatus) => {
    // Policy detail check
    checkHeaderSection('policyDetails', ['', '', `${policyStatus} / ${billingStatus.displayText}`]);

    // Checks for different policy/billing combos
    // Waiting on bugfix:
    // if (cancellationPolicyStates.splice(0, 3).contains(policyStatus) && billingStatus.code === 9) {
    //   checkHeaderSection('cancellationDetail', ['Cancellation Effective Date', '']);
    //   checkHeaderSection('finalPaymentDetail', ['Final Payment Date', '']);
    // }
    if (policyStatus === 'In Force' && billingStatus.code === 9) {
      cy.log('here')
      checkHeaderSection('cancellationDetail', ['Cancellation Effective Date', '']);
      checkHeaderSection('finalPaymentDetail', ['Final Payment Date', '']);
    } 
    // End bugfix await
    else if (cancellationPolicyStates.includes(policyStatus) || billingStatus.code === 9) {
      cy.log(policyStatus, billingStatus.code)
      checkHeaderSection('cancellationDetail', ['Cancellation Effective Date', '']);
    } else { checkHeaderSection('cancellationDetail', ['Expiration Date', '']); }

    // Check the cancellation reinstatement modal
    if (policyStatus === 'Cancelled') {
      cy.findDataTag('cancellationDetail').find('dl > div > dt > button')
        .should('contain', 'Reinstate')
        .click()
        .get('.modal#reinstate-policy').should('exist')
        .find('.card-footer > .btn-footer > .btn-secondary').click();
    };
  };

  const modifyLedgerAndRecheck = (policyStatus, ledgerStatus)  => {
    modFixtureStubRoute('fetchSummaryLedger', { result: { status: ledgerStatus }});
    applyPayment();
    checkPolicyDetail(policyStatus, ledgerStatus);
  };

  before(() => {
    routes();
    cy.login();
  });

  beforeEach(() => routes());

  // it('"Policy Issued" Policy State', () => {
  //   goToBilling(false);

  //   baseBillingCodes.slice(0, 4).forEach(code => modifyLedgerAndRecheck('Policy Issued', code));
  // });

  it('"In Force" Policy State', () => {
    modFixtureStubRoute('fetchPolicy', { status: 'In Force' });
    goToBilling(false);

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('In Force', code));
  });

  // it('"Pending Voluntary Cancellation" Policy State', () => {
  //   modFixtureStubRoute('fetchPolicy', { status: 'Pending Voluntary Cancellation' });
  //   goToBilling();

  //   baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Voluntary Cancellation', code));
  // });

  // it('"Pending Underwriting Cancellation" Policy State', () => {
  //   modFixtureStubRoute('fetchPolicy', { status: 'Pending Underwriting Cancellation' });
  //   goToBilling();

  //   baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Underwriting Cancellation', code));
  // });

  // it('"Pending Underwriting Non-Renewal" Policy State', () => {
  //   modFixtureStubRoute('fetchPolicy', { status: 'Pending Underwriting Non-Renewal' });
  //   goToBilling();

  //   baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Underwriting Non-Renewal', code));
  // });

  // it('"Cancelled" Policy State', () => {
  //   modFixtureStubRoute('fetchPolicy', { status: 'Cancelled' });
  //   goToBilling();

  //   cancelledBillingCodes.forEach(code => modifyLedgerAndRecheck('Cancelled', code));
  // });

  // it('"Not In Force" Policy State', () => {
  //   modFixtureStubRoute('fetchPolicy', { status: 'Not In Force' });
  //   goToBilling();

  //   modifyLedgerAndRecheck('Not In Force', { code: 99, displayText: 'Policy Expired' });
  // });
});
