export const POLICY_RESOURCE_TYPE = 'Policy';
export const QUOTE_RESOURCE_TYPE = 'Quote';

export const TAGS = [
  { answer: 'new_policy', label: 'New Policy', type: 'tag' },
  { answer: 'occupancy', label: 'Occupancy', type: 'tag' },
  { answer: 'processing', label: 'Processing', type: 'tag' },
  { answer: 'renewal_processing', label: 'Renewal Processing', type: 'tag' },
  { answer: 'underwriting', label: 'Underwriting', type: 'tag' },
  // TODO: PLEASE REMOVE THIS BEFORE MERGING. TESTING PURPOSES ONLY
  { answer: 'auth0|CSR1234567890', label: 'TEST USER', type: 'user' }

];

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

export const STATUS_ANSWERS = [
  { answer: 'true', label: 'Open' },
  { answer: 'false', label: 'Closed'}
];
