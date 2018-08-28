export const USERS = [
  { userId: 'auth0|59419e3a43e76f16f68c3349', userName: 'tticcsr' }
].map(user => ({ answer: user.userId, label: user.userName }));

export const TYPES = [
  { answer: 'additional_interest', label: 'Additional Interest' },
  { answer: 'billing', label: 'Billing' },
  { answer: 'cancellation', label: 'Cancellation' },
  { answer: 'coverage_endorsement', label: 'Coverage Endorsement' },
  { answer: 'estate', label: 'Estate' },
  { answer: 'follow_up', label: 'Follow-up' },
  { answer: 'home_location_endorsement', label: 'Home/Location Endorsement' },
  { answer: 'inspection', label: 'Inspection' },
  { answer: 'mailing_address', label: 'Mailing Address' },
  { answer: 'needs_security', label: 'Needs Security' },
  { answer: 'new_policy', label: 'New Policy' },
  { answer: 'occupancy', label: 'Occupancy' },
  { answer: 'ownership_change', label: 'Ownership Change' },
  { answer: 'policyholder_endorsement', label: 'Policyholder Endorsement' },
  { answer: 'property_address', label: 'Property Address' },
  { answer: 'reinstatement', label: 'Reinstatement' },
  { answer: 'wind_mitigation', label: 'Wind Mitigation' }
];

export const REASONS = [
  { answer: 'none', label: 'N/A' },
  { answer: 'billing', label: 'Billing' },
  { answer: 'docusign_exp', label: 'DocuSign Expiring' },
  { answer: 'estate', label: 'Estate' },
  { answer: 'follow_up', label: 'Follow-up' },
  { answer: 'inspection', label: 'Inspection' },
  { answer: 'needs_security', label: 'Needs Security' },
  { answer: 'new_policy', label: 'New Policy' },
  { answer: 'no_response', label: 'No response' },
  { answer: 'occupancy', label: 'Occupancy' },
  { answer: 'order_inspection', label: 'Order Inspection' },
  { answer: 'other', label: 'Other' },
  { answer: 'ownership_change', label: 'Ownership Change' },
  { answer: 'reinstatement', label: 'Reinstatement' },
  { answer: 'underwriting_letter', label: 'Underwriting Condition Letter' },
  { answer: 'vacant', label: 'Vacant' }
];
