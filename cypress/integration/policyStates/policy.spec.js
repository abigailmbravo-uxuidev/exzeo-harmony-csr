import { goToNav, checkHeaderSection } from '../../helpers';
import stubAllRoutes from '../../support/stubAllRoutes';

describe('Policy: Policy States + Effective/Cancellation Date', () => {
  const expirationPolicyStatuses = ['Policy Issued', 'In Force', 'Not In Force'];

  const canceledPolicyStatuses = [
    'Cancelled',
    'Pending Voluntary Cancellation',
    'Pending Underwriting Cancellation',
    'Pending Underwriting Non-Renewal'
  ];

  const baseBillingCodes = [
    { code: 0, displayText: 'No Payment Received' },
    { code: 1, displayText: 'Full Payment Received'},
    { code: 2, displayText: 'Over Payment Received' },
    { code: 3, displayText: 'Partial Payment Received' },
    { code: 6, displayText: 'Payment Invoice Issued' },
    { code: 9, displayText: 'Non-Payment Notice Issued' }
  ];

  const goToBilling = (home = true) => {
    if (home) { cy.visit(''); }

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
    if (billingStatus.code === 9) {
      checkHeaderSection('finalPaymentDetail', ['Final Payment Date', '']);
    };

    if (canceledPolicyStatuses.includes(policyStatus) || billingStatus.code === 9) {
      checkHeaderSection('cancellationDetail', ['Cancellation Effective Date', '']);
    } else if (expirationPolicyStatuses.includes(policyStatus)) {
      checkHeaderSection('cancellationDetail', ['Expiration Date', '']);
    };

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
    cy.setFx('stubs/fetchSummaryLedger', ['result.status', ledgerStatus]);
    applyPayment();
    checkPolicyDetail(policyStatus, ledgerStatus);
  };

  before(() => {
    stubAllRoutes();
    cy.login();
  });

  beforeEach(() => stubAllRoutes());

  it('"Policy Issued" Policy State', () => {
    goToBilling(false);

    baseBillingCodes.slice(0, 4).forEach(code => modifyLedgerAndRecheck('Policy Issued', code));
  });

  it('"In Force" Policy State', () => {
    cy.setFx('stubs/fetchPolicy', ['status', 'In Force']);
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('In Force', code));
  });

  it('"Pending Voluntary Cancellation" Policy State', () => {
    cy.setFx('stubs/fetchPolicy', ['status', 'Pending Voluntary Cancellation']);
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Voluntary Cancellation', code));
  });

  it('"Pending Underwriting Cancellation" Policy State', () => {
    cy.setFx('stubs/fetchPolicy', ['status', 'Pending Underwriting Cancellation']);
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Underwriting Cancellation', code));
  });

  it('"Pending Underwriting Non-Renewal" Policy State', () => {
    cy.setFx('stubs/fetchPolicy', ['status', 'Pending Underwriting Non-Renewal']);
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Underwriting Non-Renewal', code));
  });

  it('"Cancelled" Policy State', () => {
    const cancelledBillingCodes = [
      { code: 12, displayText: 'Voluntary Cancellation' },
      { code: 13, displayText: 'Non-Payment Cancellation' },
      { code: 14, displayText: 'Underwriting Cancellation' },
      { code: 15, displayText: 'Underwriting Non-Renewal' }
    ];

    cy.setFx('stubs/fetchPolicy', ['status', 'Cancelled']);
    goToBilling();

    cancelledBillingCodes.forEach(code => modifyLedgerAndRecheck('Cancelled', code));
  });

  it('"Not In Force" Policy State', () => {
    cy.setFx('stubs/fetchPolicy', ['status', 'Not In Force']);
    goToBilling();

    modifyLedgerAndRecheck('Not In Force', { code: 99, displayText: 'Policy Expired' });
  });
});
