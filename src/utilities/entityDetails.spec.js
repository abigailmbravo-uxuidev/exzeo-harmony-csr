// import moment from 'moment-timezone';

// import { STANDARD_DATE_FORMAT } from '../constants/dates';

// import * as entityDetails from './entityDetails';

// describe('Test getEntityDetailsDateLabel function for undefined', () => {
//   it('should return empty string for unknown values', () => {
//     const result = entityDetails.getEntityDetailsDateLabel('', '');
//     expect(result).toEqual('');
//   });
// });

// describe('Test getEntityDetailsDateLabel function for Cancellation Effective Date', () => {
//   describe('Entity Details Test for Non-Payment Cancellation', () => {
//     it('should return Cancellation Effective Date for a Non-Payment Cancellation for a policy status: In Force', () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Notice Issued',
//         'In Force'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return empty string for Cancellation Effective Date for a Non-Payment Cancellation
//      for a policy status: Policy Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Notice Issued',
//         'Policy Issued'
//       );
//       expect(result).toEqual('');
//     });
//   });

//   describe('Entity Details Tests for Policy Status: Policy Cancelled', () => {
//     it(`should return Cancellation Effective Date when Policy
//     Status is Cancelled and Billing Status is Non-Payment Notice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Notice Issued',
//         'Cancelled'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Cancelled and Billing Status is No Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'No Payment Received',
//         'Cancelled'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Cancelled and Billing Status is Full Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Full Payment Received',
//         'Cancelled'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Cancelled and Billing Status is Over Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Over Payment Received',
//         'Cancelled'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Cancelled and Billing Status is Partial Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Partial Payment Received',
//         'Cancelled'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Cancelled and Billing Status is Payment Invoice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Payment Invoice Issued',
//         'Cancelled'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Cancelled and Billing Status is Non-Payment Cancellation`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Cancellation',
//         'Cancelled'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//   });

//   describe('Entity Details Tests for Policy Status:  Pending Voluntary Cancellation', () => {
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Voluntary Cancellation and Billing Status is Non-Payment Notice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Notice Issued',
//         'Pending Voluntary Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Voluntary Cancellation and Billing Status is No Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'No Payment Received',
//         'Pending Voluntary Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Voluntary Cancellation and Billing Status is Full Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Full Payment Received',
//         'Pending Voluntary Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Voluntary Cancellation and Billing Status is Over Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Over Payment Received',
//         'Pending Voluntary Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Voluntary Cancellation and Billing Status is Partial Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Partial Payment Received',
//         'Pending Voluntary Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Voluntary Cancellation and Billing Status is Payment Invoice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Payment Invoice Issued',
//         'Pending Voluntary Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Voluntary Cancellation and Billing Status is Non-Payment Cancellation`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Cancellation',
//         'Pending Voluntary Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//   });

//   describe('Entity Details Tests for Policy Status:  Pending Underwriting', () => {
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Cancellation and Billing Status is Non-Payment Notice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Notice Issued',
//         'Pending Underwriting Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Cancellation and Billing Status is No Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'No Payment Received',
//         'Pending Underwriting Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Cancellation and Billing Status is Full Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Full Payment Received',
//         'Pending Underwriting Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Cancellation and Billing Status is Over Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Over Payment Received',
//         'Pending Underwriting Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Cancellation and Billing Status is Partial Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Partial Payment Received',
//         'Pending Underwriting Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Cancellation and Billing Status is Payment Invoice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Payment Invoice Issued',
//         'Pending Underwriting Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Cancellation and Billing Status is Non-Payment Cancellation`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Cancellation',
//         'Pending Underwriting Cancellation'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//   });

//   describe('Entity Details Tests for Policy Status:  Pending Underwriting Non-Renewal', () => {
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Non-Renewal and Billing Status is Non-Payment Notice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Notice Issued',
//         'Pending Underwriting Non-Renewal'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Non-Renewal and Billing Status is No Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'No Payment Received',
//         'Pending Underwriting Non-Renewal'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Non-Renewal and Billing Status is Full Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Full Payment Received',
//         'Pending Underwriting Non-Renewal'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Non-Renewal and Billing Status is Over Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Over Payment Received',
//         'Pending Underwriting Non-Renewal'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Non-Renewal and Billing Status is Partial Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Partial Payment Received',
//         'Pending Underwriting Non-Renewal'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });

//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Non-Renewal and Billing Status is Payment Invoice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Payment Invoice Issued',
//         'Pending Underwriting Non-Renewal'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//     it(`should return Cancellation Effective Date when Policy
//     Status is Pending Underwriting Non-Renewal and Billing Status is Non-Payment Cancellation`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Non-Payment Cancellation',
//         'Pending Underwriting Non-Renewal'
//       );
//       expect(result).toEqual(entityDetails.CANCELLATION_DATE);
//     });
//   });
// });

// describe('Test getEntityDetailsDateLabel function for Expiration Date', () => {
//   describe('Entity Details Test for Policy Status: Policy Issued', () => {
//     it(`should return Expiration Date when Policy
//     Status is Policy Issued and Billing Status is No Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'No Payment Received',
//         'Policy Issued'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//       Status is Policy Issued and Billing Status is Full Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Full Payment Received',
//         'Policy Issued'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//     Status is Policy Issued and Billing Status is Over Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Over Payment Received',
//         'Policy Issued'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//       Status is Policy Issued and Billing Status is Partial Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Partial Payment Received',
//         'Policy Issued'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//     it(`should return Expiration Date when Policy
//       Status is Policy Issued and Billing Status is Payment Invoice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Payment Invoice Issued',
//         'Policy Issued'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//     it(`should return Expiration Date when Policy
//       Status is Policy Issued and Billing Status is Policy Expired`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Policy Expired',
//         'Policy Issued'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//   });

//   describe('Entity Details Test for Policy Status: In Force', () => {
//     it(`should return Expiration Date when Policy
//     Status is In Force and Billing Status is No Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'No Payment Received',
//         'In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//       Status is In Force and Billing Status is Full Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Full Payment Received',
//         'In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//     Status is In Force and Billing Status is Over Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Over Payment Received',
//         'In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//       Status is In Force and Billing Status is Partial Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Partial Payment Received',
//         'In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//     it(`should return Expiration Date when Policy
//       Status is In Force and Billing Status is Payment Invoice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Payment Invoice Issued',
//         'In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//     it(`should return Expiration Date when Policy
//       Status is In Force and Billing Status is Policy Expired`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Policy Expired',
//         'In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//   });

//   describe('Entity Details Test for Policy Status: Not In Force', () => {
//     it(`should return Expiration Date when Policy
//     Status is Not In Force and Billing Status is No Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'No Payment Received',
//         'Not In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//       Status is Not In Force and Billing Status is Full Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Full Payment Received',
//         'Not In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//     Status is Not In Force and Billing Status is Over Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Over Payment Received',
//         'Not In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });

//     it(`should return Expiration Date when Policy
//       Status is Not In Force and Billing Status is Partial Payment Received`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Partial Payment Received',
//         'Not In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//     it(`should return Expiration Date when Policy
//       Status is Not In Force and Billing Status is Payment Invoice Issued`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Payment Invoice Issued',
//         'Not In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//     it(`should return Expiration Date when Policy
//       Status is Not In Force and Billing Status is Policy Expired`, () => {
//       const result = entityDetails.getEntityDetailsDateLabel(
//         'Policy Expired',
//         'Not In Force'
//       );
//       expect(result).toEqual(entityDetails.EXPIRATION_DATE);
//     });
//   });
// });

// describe('Test getCancellationDate', () => {
//   it('should return end date for a Policy Expired billing status ', () => {
//     const summaryLedger = {
//       equityDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Policy Expired' }
//     };
//     const policyStatus = 'Not In Force';
//     const endDate = '2019-10-23T04:00:00.000Z';
//     const cancelDate = null;

//     const result = entityDetails.getCancellationDate(
//       summaryLedger,
//       policyStatus,
//       endDate,
//       cancelDate
//     );

//     expect(result).toEqual(moment(endDate).format(STANDARD_DATE_FORMAT));
//   });

//   it('should return equityDate date for a Non-Payment Notice Issued billing status for a policy: In Force', () => {
//     const summaryLedger = {
//       equityDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Non-Payment Notice Issued' }
//     };
//     const policyStatus = 'In Force';
//     const endDate = '2019-10-23T04:00:00.000Z';
//     const cancelDate = null;

//     const result = entityDetails.getCancellationDate(
//       summaryLedger,
//       policyStatus,
//       endDate,
//       cancelDate
//     );

//     expect(result).toEqual(
//       moment(summaryLedger.equityDate).format(STANDARD_DATE_FORMAT)
//     );
//   });

//   it('should return cancelDate date for a Non-Payment Notice Issued billing status for a canceled policy', () => {
//     const summaryLedger = {
//       equityDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Non-Payment Notice Issued' }
//     };
//     const policyStatus = 'Cancelled';
//     const endDate = '2019-10-23T04:00:00.000Z';
//     const cancelDate = '2019-10-23T04:00:00.000Z';

//     const result = entityDetails.getCancellationDate(
//       summaryLedger,
//       policyStatus,
//       endDate,
//       cancelDate
//     );

//     expect(result).toEqual(moment(cancelDate).format(STANDARD_DATE_FORMAT));
//   });
// });

// describe('Test getFinalPaymentDate', () => {
//   it('should return end date for a Policy Expired billing status ', () => {
//     const summaryLedger = {
//       equityDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Policy Expired' }
//     };
//     const policyStatus = 'Not In Force';
//     const endDate = '2019-10-23T04:00:00.000Z';
//     const cancelDate = null;

//     const result = entityDetails.getCancellationDate(
//       summaryLedger,
//       policyStatus,
//       endDate,
//       cancelDate
//     );

//     expect(result).toEqual(moment(endDate).format(STANDARD_DATE_FORMAT));
//   });

//   it('should return invoiceDueDate date for a Non-Payment Notice Issued billing status for a policy: In Force', () => {
//     const summaryLedger = {
//       invoiceDueDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Non-Payment Notice Issued' }
//     };
//     const policyStatus = 'In Force';

//     const result = entityDetails.getFinalPaymentDate(
//       summaryLedger,
//       policyStatus
//     );

//     expect(result.value).toEqual(
//       moment(summaryLedger.invoiceDueDate).format(STANDARD_DATE_FORMAT)
//     );
//   });

//   it('should return no date date for a Non-Payment Notice Issued billing status for a policy: In Force', () => {
//     const summaryLedger = {
//       invoiceDueDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Non-Payment Notice Issued' }
//     };
//     const policyStatus = 'Not In Force';

//     const result = entityDetails.getFinalPaymentDate(
//       summaryLedger,
//       policyStatus
//     );

//     expect(result.date).toBeFalsy();
//   });

//   it('should return invoiceDueDate date for a Non-Payment Notice Issued billing status for a policy: Pending Voluntary Cancellation', () => {
//     const summaryLedger = {
//       invoiceDueDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Non-Payment Notice Issued' }
//     };
//     const policyStatus = 'Pending Voluntary Cancellation';

//     const result = entityDetails.getFinalPaymentDate(
//       summaryLedger,
//       policyStatus
//     );

//     expect(result.value).toEqual(
//       moment(summaryLedger.invoiceDueDate).format(STANDARD_DATE_FORMAT)
//     );
//   });

//   it('should return invoiceDueDate date for a Non-Payment Notice Issued billing status for a policy: Pending Underwriting Cancellation', () => {
//     const summaryLedger = {
//       invoiceDueDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Non-Payment Notice Issued' }
//     };
//     const policyStatus = 'Pending Underwriting Cancellation';

//     const result = entityDetails.getFinalPaymentDate(
//       summaryLedger,
//       policyStatus
//     );

//     expect(result.value).toEqual(
//       moment(summaryLedger.invoiceDueDate).format(STANDARD_DATE_FORMAT)
//     );
//   });

//   it('should return invoiceDueDate date for a Non-Payment Notice Issued billing status for a policy: Pending Underwriting Non-Renewal', () => {
//     const summaryLedger = {
//       invoiceDueDate: '2018-10-23T04:00:00.000Z',
//       status: { displayText: 'Non-Payment Notice Issued' }
//     };
//     const policyStatus = 'Pending Underwriting Non-Renewal';

//     const result = entityDetails.getFinalPaymentDate(
//       summaryLedger,
//       policyStatus
//     );

//     expect(result.value).toEqual(
//       moment(summaryLedger.invoiceDueDate).format(STANDARD_DATE_FORMAT)
//     );
//   });
// });
