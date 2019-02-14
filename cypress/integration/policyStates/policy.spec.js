import { _newQuote, goToNav, checkHeaderSection } from '../../helpers';

describe('Policy: Policy States + Effective/Cancellation Date', () => {
  const cancellationPolicyStates = [
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

  const goToBilling = (home = true) => {
    if (home) { cy.home(); }

    cy._submit('#SearchBar')
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
    // Date checks for different policy/billing combos
    // TODO: Ask vinny if this is right on final payment detail
    if (policyStatus === 'In Force' && billingStatus.code === 9) {
      checkHeaderSection('cancellationDetail', ['Cancellation Effective Date', '']);
      checkHeaderSection('finalPaymentDetail', ['Final Payment Date', '']);
    } else if (cancellationPolicyStates.includes(policyStatus) || billingStatus.code === 9) {
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
    cy._fixtureAndStubRoute('fetchSummaryLedger', { result: { status: ledgerStatus }});
    applyPayment();
    checkPolicyDetail(policyStatus, ledgerStatus);
  };

  before(() => cy.workflow('newQuote'));

  it('"Policy Issued" Policy State', () => {
    goToBilling(false);

    baseBillingCodes.slice(0, 4).forEach(code => modifyLedgerAndRecheck('Policy Issued', code));
  });

  it('"In Force" Policy State', () => {
    cy._fixtureAndStubRoute('fetchPolicy', { status: 'In Force' });
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('In Force', code));

  });

  it('"Pending Voluntary Cancellation" Policy State', () => {
    cy._fixtureAndStubRoute('fetchPolicy', { status: 'Pending Voluntary Cancellation' });
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Voluntary Cancellation', code));
  });

  it('"Pending Underwriting Cancellation" Policy State', () => {
    cy._fixtureAndStubRoute('fetchPolicy', { status: 'Pending Underwriting Cancellation' });
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Underwriting Cancellation', code));
  });

  it('"Pending Underwriting Non-Renewal" Policy State', () => {
    cy._fixtureAndStubRoute('fetchPolicy', { status: 'Pending Underwriting Non-Renewal' });
    goToBilling();

    baseBillingCodes.forEach(code => modifyLedgerAndRecheck('Pending Underwriting Non-Renewal', code));
  });

  it('"Cancelled" Policy State', () => {
    cy._fixtureAndStubRoute('fetchPolicy', { status: 'Cancelled' });
    goToBilling();

    cancelledBillingCodes.forEach(code => modifyLedgerAndRecheck('Cancelled', code));
  });

  it('"Not In Force" Policy State', () => {
    cy._fixtureAndStubRoute('fetchPolicy', { status: 'Not In Force' });
    goToBilling();

    modifyLedgerAndRecheck('Not In Force', { code: 99, displayText: 'Policy Expired' });
  });
});
