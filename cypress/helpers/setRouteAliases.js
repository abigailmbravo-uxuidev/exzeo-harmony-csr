export const setRouteAliases = () =>
  cy
    .server()
    .route('POST', '/svc?quoteManager.createQuote')
    .as('createQuote')
    .route('POST', '/svc?quoteManager.updateQuote')
    .as('updateQuote')
    .route('POST', '/svc?quoteManager.sendApplication')
    .as('sendApplication')
    .route('POST', '/svc?fetchLists')
    .as('fetchLists')
    .route('POST', '/svc?fetchPostalCodes')
    .as('fetchPostalCodes')
    .route('POST', '/svc?fetchTerritoryManagers')
    .as('fetchTerritoryManagers')
    .route('POST', '/svc?fetchAgencies')
    .as('fetchAgencies')
    .route('POST', '/svc?fetchAgents')
    .as('fetchAgents')
    .route('POST', '/svc?searchAgencies')
    .as('searchAgencies')
    .route('POST', '/svc?fetchDiaries')
    .as('fetchDiaries')
    .route('POST', '/svc?fetchDiaryOptions')
    .as('fetchDiaryOptions')
    .route('POST', '/svc?fetchNotes')
    .as('fetchNotes')
    .route('POST', '/svc?fetchAddresses')
    .as('fetchAddresses')
    .route('POST', '/svc?fetchPolicies')
    .as('fetchPolicies')
    .route('POST', '/svc?fetchQuotes')
    .as('fetchQuotes')
    .route('POST', '/svc?getZipcodeSettings')
    .as('getZipcodeSettings')
    .route('POST', '/svc?UWQuestions')
    .as('getUnderwritingQuestions')
    .route('POST', '/svc?quoteManager.reviewQuote')
    .as('reviewQuote')
    .route('POST', '/svc?rateEndorsement')
    .as('rateEndorsement')
    .route('POST', '/svc?saveEndorsement')
    .as('saveEndorsement')
    .route('POST', '/svc?fetchSummaryLedger')
    .as('fetchSummaryLedger')
    .route('POST', '/svc?fetchPolicies')
    .as('fetchPolicies')
    .route('POST', '/svc?quoteManager.retrieveQuote')
    .as('retrieveQuote')
    .route('POST', '/svc?quoteManager.verifyQuote')
    .as('verifyQuote')
    .route('POST', '/svc?fetchPolicy')
    .as('fetchPolicy')
    .route('POST', '/svc?postPaymentTransaction')
    .as('postPaymentTransaction')
    .route('POST', '/svc?addAdditionalInterest')
    .as('addAdditionalInterest')
    .route('POST', '/svc?updateAdditionalInterest')
    .as('updateAdditionalInterest')
    .route('POST', '/svc?fetchEndorsementHistory')
    .as('fetchEndorsementHistory')
    .route('POST', '/svc?fetchFiles')
    .as('fetchFiles')
    .route('POST', '/svc?getNoteOptions')
    .as('getNoteOptions')
    .route('POST', 'svc?sendQuoteSummary')
    .as('shareQuote')
    .route('POST', '/svc?saveNewAgency')
    .as('saveNewAgency')
    .route('POST', '/svc?fetchAgentsByAgencyCode')
    .as('fetchAgentsByAgencyCode')
    .route('POST', '/svc?fetchAgency')
    .as('fetchAgency')
    .route('POST', '/svc?saveAgency')
    .as('saveAgency')
    .route('POST', '/svc?saveAgent')
    .as('saveAgent')
    .route('POST', '/svc?addNewAgent')
    .as('addNewAgent')
    .route('POST', '/svc?addNote')
    .as('addNote')
    .route('POST', '/svc?getDocumentPacketFiles')
    .as('getDocumentPacketFiles')
    .route('POST', '/svc?postCreateTransaction')
    .as('postCreateTransaction')
    .route('POST', '/svc?cancelPolicy')
    .as('cancelPolicy')
    .route('POST', '/svc?aorTransfer')
    .as('aorTransfer');
