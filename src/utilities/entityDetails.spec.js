import * as entityDetails from './entityDetails';

describe('Test getEntityDetailsDateLabel function for undefined', () => {
  it('should return empty string for unknown values', () => {
    const result = entityDetails.getEntityDetailsDateLabel('', '');
    expect(result).toEqual('');
  });
});

describe('Test getEntityDetailsDateLabel function for Cancellation Date', () => {
  describe('Entity Details Test for Non-Payment Cancellation', () => {
    it('should return Cancellation Date for a Non-Payment Cancellation', () => {
      const result = entityDetails.getEntityDetailsDateLabel('Non-Payment Notice Issued', 'Policy Issued');
      expect(result).toEqual('Cancellation Date');
    });
  });

  describe('Entity Details Tests for Policy Status: Policy Cancelled', () => {
    it(`should return Cancellation Date when Policy
    Status is Cancelled and Billing Status is Non-Payment Notice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Notice Issued',
          'Cancelled'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Cancelled and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'Cancelled'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Cancelled and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'Cancelled'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Cancelled and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'Cancelled'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Cancelled and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'Cancelled'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Cancelled and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'Cancelled'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Cancelled and Billing Status is Non-Payment Cancellation`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Cancellation',
          'Cancelled'
        );
        expect(result).toEqual('Cancellation Date');
      });
  });

  describe('Entity Details Tests for Policy Status:  Pending Voluntary Cancellation', () => {
    it(`should return Cancellation Date when Policy
    Status is Pending Voluntary Cancellation and Billing Status is Non-Payment Notice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Notice Issued',
          'Pending Voluntary Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Voluntary Cancellation and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'Pending Voluntary Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Voluntary Cancellation and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'Pending Voluntary Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Voluntary Cancellation and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'Pending Voluntary Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Voluntary Cancellation and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'Pending Voluntary Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Voluntary Cancellation and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'Pending Voluntary Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Voluntary Cancellation and Billing Status is Non-Payment Cancellation`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Cancellation',
          'Pending Voluntary Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
  });

  describe('Entity Details Tests for Policy Status:  Pending Underwriting', () => {
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting and Billing Status is Non-Payment Notice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Notice Issued',
          'Pending Underwriting'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'Pending Underwriting'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'Pending Underwriting'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'Pending Underwriting'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'Pending Underwriting'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'Pending Underwriting'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting and Billing Status is Non-Payment Cancellation`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Cancellation',
          'Pending Underwriting'
        );
        expect(result).toEqual('Cancellation Date');
      });
  });

  describe('Entity Details Tests for Policy Status:  Cancellation', () => {
    it(`should return Cancellation Date when Policy
    Status is Cancellation and Billing Status is Non-Payment Notice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Notice Issued',
          'Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Cancellation and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Cancellation and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Cancellation and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Cancellation and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Cancellation and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Cancellation and Billing Status is Non-Payment Cancellation`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Cancellation',
          'Cancellation'
        );
        expect(result).toEqual('Cancellation Date');
      });
  });

  describe('Entity Details Tests for Policy Status:  Pending Underwriting Non-Renewal', () => {
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting Non-Renewal and Billing Status is Non-Payment Notice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Notice Issued',
          'Pending Underwriting Non-Renewal'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting Non-Renewal and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'Pending Underwriting Non-Renewal'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting Non-Renewal and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'Pending Underwriting Non-Renewal'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting Non-Renewal and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'Pending Underwriting Non-Renewal'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting Non-Renewal and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'Pending Underwriting Non-Renewal'
        );
        expect(result).toEqual('Cancellation Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting Non-Renewal and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'Pending Underwriting Non-Renewal'
        );
        expect(result).toEqual('Cancellation Date');
      });
    it(`should return Cancellation Date when Policy
    Status is Pending Underwriting Non-Renewal and Billing Status is Non-Payment Cancellation`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Non-Payment Cancellation',
          'Pending Underwriting Non-Renewal'
        );
        expect(result).toEqual('Cancellation Date');
      });
  });
});

describe('Test getEntityDetailsDateLabel function for Expiration Date', () => {
  describe('Entity Details Test for Policy Status: Policy Issued', () => {
    it(`should return Cancellation Date when Policy
    Status is Policy Issued and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'Policy Issued'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
      Status is Policy Issued and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'Policy Issued'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Policy Issued and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'Policy Issued'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
      Status is Policy Issued and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'Policy Issued'
        );
        expect(result).toEqual('Expiration Date');
      });
    it(`should return Cancellation Date when Policy
      Status is Policy Issued and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'Policy Issued'
        );
        expect(result).toEqual('Expiration Date');
      });
    it(`should return Cancellation Date when Policy
      Status is Policy Issued and Billing Status is Policy Expired`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Policy Expired',
          'Policy Issued'
        );
        expect(result).toEqual('Expiration Date');
      });
  });

  describe('Entity Details Test for Policy Status: In Force', () => {
    it(`should return Cancellation Date when Policy
    Status is In Force and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'In Force'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
      Status is In Force and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'In Force'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
    Status is In Force and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'In Force'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
      Status is In Force and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'In Force'
        );
        expect(result).toEqual('Expiration Date');
      });
    it(`should return Cancellation Date when Policy
      Status is In Force and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'In Force'
        );
        expect(result).toEqual('Expiration Date');
      });
    it(`should return Cancellation Date when Policy
      Status is In Force and Billing Status is Policy Expired`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Policy Expired',
          'In Force'
        );
        expect(result).toEqual('Expiration Date');
      });
  });

  describe('Entity Details Test for Policy Status: Not In Force', () => {
    it(`should return Cancellation Date when Policy
    Status is Not In Force and Billing Status is No Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'No Payment Received',
          'Not In Force'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
      Status is Not In Force and Billing Status is Full Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Full Payment Received',
          'Not In Force'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
    Status is Not In Force and Billing Status is Over Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Over Payment Received',
          'Not In Force'
        );
        expect(result).toEqual('Expiration Date');
      });

    it(`should return Cancellation Date when Policy
      Status is Not In Force and Billing Status is Partial Payment Received`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Partial Payment Received',
          'Not In Force'
        );
        expect(result).toEqual('Expiration Date');
      });
    it(`should return Cancellation Date when Policy
      Status is Not In Force and Billing Status is Payment Invoice Issued`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Payment Invoice Issued',
          'Not In Force'
        );
        expect(result).toEqual('Expiration Date');
      });
    it(`should return Cancellation Date when Policy
      Status is Not In Force and Billing Status is Policy Expired`, () => {
        const result = entityDetails.getEntityDetailsDateLabel(
          'Policy Expired',
          'Not In Force'
        );
        expect(result).toEqual('Expiration Date');
      });
  });
});
