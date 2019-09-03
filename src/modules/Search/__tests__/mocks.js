jest.mock('../data', () => ({
  __esModule: true,
  getPaymentOptions: jest.fn(() => [
    {
      paymentType: 'Paper Deposit',
      paymentDescription: [
        'Duplicate Payment Applied in Error',
        'Misapplied Payment',
        'Misapplied Transfer',
        'Payment Received',
        'Payment Removed from Deposit',
        'Payment Transfer'
      ]
    },
    {
      paymentType: 'Electronic Deposit',
      paymentDescription: [
        'Duplicate Payment Applied in Error',
        'Misapplied Payment',
        'Misapplied Transfer',
        'Payment Received',
        'Payment Removed from Deposit',
        'Payment Transfer'
      ]
    },
    {
      paymentType: 'Paper Deposit Charge Back',
      paymentDescription: [
        'Account Closed',
        'Bank Adjustment',
        'Currency Conversion',
        'No Account',
        'NSF Payment',
        'Payment Stopped',
        'Refer to Maker',
        'Unable to Locate Account'
      ]
    },
    {
      paymentType: 'Electronic Deposit Charge Back',
      paymentDescription: [
        'Account Closed',
        'Bank Adjustment',
        'Currency Conversion',
        'No Account',
        'NSF Payment',
        'Payment Stopped',
        'Refer to Maker',
        'Unable to Locate Account'
      ]
    }
  ])
}));
