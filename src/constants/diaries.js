export const USERS = [
  { userId: '59419e3a43e76f16f68c3349', userName: 'tticcsr' }
].map(user => ({ answer: user.userId, label: user.userName }));

export const TYPES = [
  'Additional Interest',
  'Billing',
  'Cancellation',
  'Coverage Endorsement',
  'Estate',
  'Follow-up',
  'Home/Location Endorsement',
  'Inspection',
  'Mailing Address',
  'Needs Security',
  'New Policy',
  'Occupancy',
  'Ownership Change',
  'Policyholder Endorsement',
  'Property Address',
  'Reinstatement',
  'Wind Mitigation'
].map(type => ({ answer: type, label: type }));

export const REASONS = [
  'N/A',
  'Billing',
  'DocuSign Expiring',
  'Estate',
  'Follow-up',
  'Inspection',
  'Needs Security',
  'New Policy',
  'No response',
  'Occupancy',
  'Order Inspection',
  'Other',
  'Ownership Change',
  'Reinstatement',
  'Underwriting Condition Letter',
  'Vacant'
].map(reason => ({ answer: reason, label: reason }));
