export const QUOTE_STATE = {
  QuoteStarted: 'Quote Started',
  QuoteQualified: 'Quote Qualified',
  ApplicationStarted: 'Application Started',
  ApplicationReady: 'Application Ready',
  ApplicationSentDocusign: 'Application Sent Docusign',
  DocumentsReceived: 'Documents Received',
  PolicyIssued: 'Policy Issued',
  QuoteStopped: 'Quote Stopped',
  QuoteExpired: 'Quote Expired',
  QuoteDeclined: 'Quote Declined',
  ApplicationObstructed: 'Application Obstructed'
};

export const QUOTE_INPUT_STATE = {
  InitialData: 'Initial Data',
  Underwriting: 'Underwriting',
  Qualified: 'Qualified',
  Ready: 'Ready'
};

export const UNQUALIFIED_STATE = [
  QUOTE_INPUT_STATE.InitialData,
  QUOTE_INPUT_STATE.Underwriting
];

export const isApplicationReady = quoteState =>
  quoteState === QUOTE_STATE.ApplicationReady;
