export const POLICY_RESOURCE_TYPE = 'Policy';
export const QUOTE_RESOURCE_TYPE = 'Quote';

export const TAGS = [
  { answer: 'new_policy', label: 'New Policy', type: 'tag' },
  { answer: 'occupancy', label: 'Occupancy', type: 'tag' },
  { answer: 'processing', label: 'Processing', type: 'tag' },
  { answer: 'renewal_processing', label: 'Renewal Processing', type: 'tag' },
  { answer: 'underwriting', label: 'Underwriting', type: 'tag' }

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
  { answer: 'false', label: 'Closed' }
];

export const DIARY_DEFAULTS = {
  additional_interest: {
    daysFromDueDate: 2, assignee: '', reason: 'follow_up', message: 'Additional Interest:'
  },
  billing: {
    daysFromDueDate: 2, assignee: '', reason: 'billing', message: 'Billing:'
  },
  cancellation: {
    daysFromDueDate: 7, assignee: '', reason: 'follow_up', message: 'Cancellation:'
  },
  coverage_endorsement: {
    daysFromDueDate: 7, assignee: '', reason: 'follow_up', message: 'Coverage Endorsement:'
  },
  estate: {
    daysFromDueDate: -145, assignee: 'Occupancy', reason: 'estate', message: 'Estate:'
  },
  follow_up: {
    daysFromDueDate: 0, assignee: '', reason: 'follow_up', message: 'Follow-up:'
  },
  home_location_endorsement: {
    daysFromDueDate: 7, assignee: '', reason: 'follow_up', message: 'Home/Location Endorsement:'
  },
  inspection: {
    daysFromDueDate: 14, assignee: '', reason: 'inspection', message: 'Inspection:'
  },
  mailing_address: {
    daysFromDueDate: 7, assignee: '', reason: 'follow_up', message: 'Mailing Address:'
  },
  needs_security: {
    daysFromDueDate: 0, assignee: 'Underwriting', reason: 'needs_security', message: 'Needs Security:'
  },
  new_policy: {
    daysFromDueDate: 0, assignee: 'New Policy', reason: 'new_policy', message: 'New Policy:'
  },
  occupancy: {
    daysFromDueDate: 30, assignee: '', reason: 'occupancy', message: 'Occupancy:'
  },
  ownership_change: {
    daysFromDueDate: 0, assignee: 'Occupancy', reason: 'ownership_change', message: 'Ownership Change:'
  },
  policyholder_endorsement: {
    daysFromDueDate: 7, assignee: '', reason: 'follow_up', message: 'Policyholder Endorsement:'
  },
  property_address: {
    daysFromDueDate: 7, assignee: '', reason: 'follow_up', message: 'Property Address:'
  },
  reinstatement: {
    daysFromDueDate: 2, assignee: '', reason: 'reinstatement', message: 'Reinstatement:'
  },
  wind_mitigation: {
    daysFromDueDate: 7, assignee: '', reason: 'follow_up', message: 'Wind Mitigation:'
  }
};

