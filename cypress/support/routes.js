import { stub } from '../helpers';

export default () => cy.server()
  .route('GET', '/mainUserProfile', stub('mainUserProfile'))
  .route('POST', '/svc?getDiaryAssigneeOptions', stub('getDiaryAssigneeOptions'))
  .route('POST', '/questions', stub('questions'))
  .route('POST', '/svc?getAgencies', stub('getAgencies'))
  .route('POST', '/svc?fetchAddresses', stub('fetchAddresses')).as('fetchAddresses')
  .route('POST', '/cg/start?csrUnderwriting', stub('csrUnderwriting'))
  .route('POST', '/cg/start?csrCreateQuote', stub('csrCreateQuote'))
  .route('POST', '/cg/start?csrCoverage', stub('csrCoverage'))
  .route('POST', '/svc?getUnderwritingQuestions', stub('getUnderwritingQuestions'))
  .route('POST', '/cg/start?csrGetQuoteWithUnderwriting', stub('csrGetQuoteWithUnderwriting')).as('csrGetQuoteWithUnderwriting')
  .route('POST', '/svc?getBillingOptions', stub('getBillingOptions')).as('getBillingOptions')
  .route('POST', '/cg/start?csrMailingAddressBilling', stub('csrMailingAddressBilling'))
  .route('POST', '/svc?fetchDiaries', stub('fetchDiaries'))
  .route('POST', '/svc?fetchAgencies', stub('fetchAgencies'))
  .route('POST', '/svc?fetchAgentsByAgencyCode', stub('fetchAgentsByAgencyCode'))
  .route('POST', '/svc?getZipcodeSettings', stub('getZipcodeSettings'))
  .route('POST', '/cg/start?csrAdditionalInterest').as('csrAdditionalInterest')
  .route('POST', '/svc?fetchEffectiveDateChangeReasons', stub('fetchEffectiveDateChangeOptions'))
  .route('POST', '/svc?fetchPaymentOptionsApplyPayments', stub('fetchPaymentOptionsApplyPayments'))
  .route('POST', '/svc?fetchCancelOptions', stub('fetchCancelOptions'))
  .route('POST', '/svc?fetchEndorsementHistory', stub('fetchEndorsementHistory'))
  .route('POST', '/svc?fetchPolicies', 'fx:stubs/fetchPolicies')
  .route('POST', '/svc?fetchPolicy', 'fx:stubs/fetchPolicy')
  .route('POST', '/svc?getAgents', stub('getAgents'))
  .route('POST', '/svc?getAgency', stub('getAgency'))
  .route('POST', '/svc?fetchNotes', stub('fetchNotes'))
  .route('POST', '/svc?fetchDocuments', stub('fetchDocuments'))
  .route('POST', '/svc?fetchBillingOptions', stub('fetchBillingOptions'))
  .route('POST', '/svc?addTransaction', 'fx:stubs/addTransaction')
  .route('POST', '/svc?fetchSummaryLedger', 'fx:stubs/fetchSummaryLedger')
  .route('POST', '/svc?fetchPaymentHistory', 'fx:stubs/fetchPaymentHistory')
  .route('POST', '/svc?fetchAgentList', 'fx:stubs/fetchAgentList')
  .route('POST', '/svc?fetchAgency', 'fx:stubs/fetchAgency')
  .route('POST', '/svc?summary', stub('summary'))
  .route('POST', '/cg/start?csrSubmitApplication', stub('csrSubmitApplication'));
