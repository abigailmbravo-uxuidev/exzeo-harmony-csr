export const WAIT_TIME_MS = 2000;
export const RETRY_MAX = 60;
export const TRANSACTION_STATUS = 'Complete';

export const TAX_CLASSIFICATION = [
  { answer: 'Corporation', label: 'Corporation' },
  { answer: 'Disregarded Entity', label: 'Disregarded Entity' },
  { answer: 'Individual/Sole Proprietor', label: 'Individual/Sole Proprietor' },
  { answer: 'LLC - C', label: 'LLC - C' },
  { answer: 'LLC – I/SP', label: 'LLC – I/SP' },
  { answer: 'LLC - P', label: 'LLC - P' },
  { answer: 'LLC - S', label: 'LLC - S' },
  { answer: 'Other', label: 'Other' },
  { answer: 'Partnership', label: 'Partnership' },
  { answer: 'S-Corporation', label: 'S-Corporation' },
  { answer: 'Tax Exempt', label: 'Tax Exempt' }
];

export const STATUS = [
  { answer: 'Active', label: 'Active' },
  { answer: 'Service Only', label: 'Service Only' },
  { answer: 'Pending', label: 'Pending' },
  { answer: 'Terminated', label: 'Terminated' }
];

export const OK_TO_PAY = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

export const LICENSE_TYPE = [
  { answer: 'Resident', label: 'Resident' },
  { answer: 'Non-Resident', label: 'Non-Resident' }
];

export const MAIL_ANSWERS = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];
