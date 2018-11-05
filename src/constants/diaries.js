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
  'Additional Interest': {
    daysFromDueDate: 2, assignee: '', reason: 'Follow-up', bodyPrefix: 'Additional Interest:'
  },
  Billing: {
    daysFromDueDate: 2, assignee: '', reason: 'Billing', bodyPrefix: 'Billing:'
  },
  Cancellation: {
    daysFromDueDate: 7, assignee: '', reason: 'Follow-up', bodyPrefix: 'Cancellation:'
  },
  'Coverage Endorsement': {
    daysFromDueDate: 7, assignee: '', reason: 'Follow-up', bodyPrefix: 'Coverage Endorsement:'
  },
  Estate: {
    daysFromDueDate: -145, assignee: 'Occupancy', reason: 'Estate', bodyPrefix: 'Estate:'
  },
  'Follow-up': {
    daysFromDueDate: 0, assignee: '', reason: 'Follow-up', bodyPrefix: 'Follow-up:'
  },
  'Home/Location Endorsement': {
    daysFromDueDate: 7, assignee: '', reason: 'Follow-up', bodyPrefix: 'Home/Location Endorsement:'
  },
  Inspection: {
    daysFromDueDate: 14, assignee: '', reason: 'Inspection', bodyPrefix: 'Inspection:'
  },
  'Mailing Address': {
    daysFromDueDate: 7, assignee: '', reason: 'Follow-up', bodyPrefix: 'Mailing Address:'
  },
  'Needs Security': {
    daysFromDueDate: 0, assignee: 'Underwriting', reason: 'Needs Security', bodyPrefix: 'Needs Security:'
  },
  'New Policy': {
    daysFromDueDate: 0, assignee: 'New Policy', reason: 'New Policy', bodyPrefix: 'New Policy:'
  },
  Occupancy: {
    daysFromDueDate: 30, assignee: '', reason: 'Occupancy', bodyPrefix: 'Occupancy:'
  },
  'Ownership Change': {
    daysFromDueDate: 0, assignee: 'Occupancy', reason: 'Ownership Change', bodyPrefix: 'Ownership Change:'
  },
  'Policyholder Endorsement': {
    daysFromDueDate: 7, assignee: '', reason: 'Follow-up', bodyPrefix: 'Policyholder Endorsement:'
  },
  'Property Address': {
    daysFromDueDate: 7, assignee: '', reason: 'Follow-up', bodyPrefix: 'Property Address:'
  },
  Reinstatement: {
    daysFromDueDate: 2, assignee: '', reason: 'Reinstatement', bodyPrefix: 'Reinstatement:'
  },
  'Wind Mitigation': {
    daysFromDueDate: 7, assignee: '', reason: 'Follow-up', bodyPrefix: 'Wind Mitigation:'
  }
};

