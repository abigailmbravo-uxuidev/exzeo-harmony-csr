import { stub } from '../helpers';

export default (useConfig = false) => cy.server()
  .route('GET', '/mainUserProfile', useConfig ? stub('fx:stubs/mainUserProfile') : 'fx:stubs/mainUserProfile')
  .route('POST', '/svc?getDiaryAssigneeOptions', useConfig ? stub('fx:stubs/getDiaryAssigneeOptions') : 'fx:stubs/getDiaryAssigneeOptions')
  .route('POST', '/questions', useConfig ? stub('fx:stubs/questions') : 'fx:stubs/questions')
  .route('POST', '/svc?getAgencies', useConfig ? stub('fx:stubs/getAgencies') : 'fx:stubs/getAgencies')
  .route('POST', '/svc?fetchAddresses', useConfig ? stub('fx:stubs/fetchAddresses') : 'fx:stubs/fetchAddresses').as('fetchAddresses')
  .route('POST', '/cg/start?csrUnderwriting', useConfig ? stub('fx:stubs/csrUnderwriting') : 'fx:stubs/csrUnderwriting')
  .route('POST', '/cg/start?csrCreateQuote', useConfig ? stub('fx:stubs/csrCreateQuote') : 'fx:stubs/csrCreateQuote')
  .route('POST', '/cg/start?csrCoverage', useConfig ? stub('fx:stubs/csrCoverage') : 'fx:stubs/csrCoverage')
  .route('POST', '/svc?getUnderwritingQuestions', useConfig ? stub('fx:stubs/getUnderwritingQuestions') : 'fx:stubs/getUnderwritingQuestions')
  .route('POST', '/cg/start?csrGetQuoteWithUnderwriting', useConfig ? stub('fx:stubs/csrGetQuoteWithUnderwriting') : 'fx:stubs/csrGetQuoteWithUnderwriting').as('csrGetQuoteWithUnderwriting')
  .route('POST', '/svc?getBillingOptions', useConfig ? stub('fx:stubs/getBillingOptions') : 'fx:stubs/getBillingOptions').as('getBillingOptions')
  .route('POST', '/cg/start?csrMailingAddressBilling', useConfig ? stub('fx:stubs/csrMailingAddressBilling') : 'fx:stubs/csrMailingAddressBilling')
  .route('POST', '/svc?fetchDiaries', useConfig ? stub('fx:stubs/fetchDiaries') : 'fx:stubs/fetchDiaries')
  .route('POST', '/svc?fetchAgencies', useConfig ? stub('fx:stubs/fetchAgencies') : 'fx:stubs/fetchAgencies')
  .route('POST', '/svc?fetchAgentsByAgencyCode', useConfig ? stub('fx:stubs/fetchAgentsByAgencyCode') : 'fx:stubs/fetchAgentsByAgencyCode')
  .route('POST', '/svc?getZipcodeSettings', useConfig ? stub('fx:stubs/getZipcodeSettings') : 'fx:stubs/getZipcodeSettings')
  .route('POST', '/cg/start?csrAdditionalInterest', useConfig ? stub('fx:stubs/csrAdditionalInterest') : 'fx:stubs/csrAdditionalInterest')
  .route('POST', '/svc?fetchEffectiveDateChangeReasons', useConfig ? stub('fx:stubs/fetchEffectiveDateChangeOptions') : 'fx:stubs/fetchEffectiveDateChangeOptions')
  .route('POST', '/svc?fetchPaymentOptionsApplyPayments', useConfig ? stub('fx:stubs/fetchPaymentOptionsApplyPayments') : 'fx:stubs/fetchPaymentOptionsApplyPayments')
  .route('POST', '/svc?fetchCancelOptions', useConfig ? stub('fx:stubs/fetchCancelOptions') : 'fx:stubs/fetchCancelOptions')
  .route('POST', '/svc?fetchEndorsementHistory', useConfig ? stub('fx:stubs/fetchEndorsementHistory') : 'fx:stubs/fetchEndorsementHistory')
  .route('POST', '/svc?fetchPolicies', useConfig ? stub('fx:stubs/fetchPolicies') : 'fx:stubs/fetchPolicies')
  .route('POST', '/svc?fetchPolicy', useConfig ? stub('fx:stubs/fetchPolicy') : 'fx:stubs/fetchPolicy')
  .route('POST', '/svc?getAgents', useConfig ? stub('fx:stubs/getAgents') : 'fx:stubs/getAgents')
  .route('POST', '/svc?getAgency', useConfig ? stub('fx:stubs/getAgency') : 'fx:stubs/getAgency')
  .route('POST', '/svc?fetchNotes', useConfig ? stub('fx:stubs/fetchNotes') : 'fx:stubs/fetchNotes')
  .route('POST', '/svc?fetchDocuments', useConfig ? stub('fx:stubs/fetchDocuments') : 'fx:stubs/fetchDocuments')
  .route('POST', '/svc?fetchBillingOptions', useConfig ? stub('fx:stubs/fetchBillingOptions') : 'fx:stubs/fetchBillingOptions')
  .route('POST', '/svc?addTransaction', useConfig ? stub('fx:stubs/addTransaction') : 'fx:stubs/addTransaction')
  .route('POST', '/svc?fetchSummaryLedger', useConfig ? stub('fx:stubs/fetchSummaryLedger') : 'fx:stubs/fetchSummaryLedger')
  .route('POST', '/svc?fetchPaymentHistory', useConfig ? stub('fx:stubs/fetchPaymentHistory') : 'fx:stubs/fetchPaymentHistory')
  .route('POST', '/svc?fetchAgentList', useConfig ? stub('fx:stubs/fetchAgentList') : 'fx:stubs/fetchAgentList')
  .route('POST', '/svc?fetchAgency', useConfig ? stub('fx:stubs/fetchAgency') : 'fx:stubs/fetchAgency')
  .route('POST', '/svc?summary', useConfig ? stub('fx:stubs/summary') : 'fx:stubs/summary')
  .route('POST', '/cg/start?csrSubmitApplication', useConfig ? stub('fx:stubs/csrSubmitApplication') : 'fx:stubs/csrSubmitApplication');
