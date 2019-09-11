export const setRouteAliases = () =>
  cy
    .server()
    .route('POST', '/svc?quoteManager.createQuote')
    .as('createQuote')
    .route('POST', '/svc?quoteManager.updateQuote')
    .as('updateQuote')
    .route('POST', '/svc?quoteManager.sendApplication')
    .as('sendApplication')
    .route('POST', '/svc?fetchAgencies')
    .as('fetchAgencies')
    .route('POST', '/svc?fetchAgents')
    .as('fetchAgents')
    .route('POST', '/svc?fetchDiaries')
    .as('fetchDiaries')
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
    .route('POST', '/svc?quoteManager.verifyQuote')
    .as('verifyQuote');
