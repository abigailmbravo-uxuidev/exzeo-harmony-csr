import quoteDefaults from '../fixtures/quoteDefaults';

export async function serviceRequest(data, idToken, endpointURL) {
  const result = await fetch(endpointURL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      authorization: 'bearer ' + idToken
    }
  });

  return result.json();
}

export async function bindPolicyRequest(quoteNumber, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.policy.bindPolicy',
    data: {
      quoteId: quoteNumber,
      force: true
    }
  });

  return await serviceRequest(data, idToken, endpointURL);
}

export async function updateQuoteRequest(quote, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.updateQuote',
    data: {
      alwaysRunUnderwriting: true,
      quote
    }
  });

  return await serviceRequest(data, idToken, endpointURL);
}

export async function createQuoteRequest(idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.createQuote',
    data: {
      companyCode: 'TTIC',
      state: 'FL',
      product: 'HO3',
      propertyId: '12000000000000001',
      runUnderwriting: true
    }
  });

  return await serviceRequest(data, idToken, endpointURL);
}

export async function verifyQuoteRequest(quoteNumber, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.verifyQuote',
    data: {
      quoteNumber
    }
  });

  return await serviceRequest(data, idToken, endpointURL);
}

export async function sendApplicationRequest(
  quoteNumber,
  idToken,
  endpointURL
) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.sendApplication',
    data: {
      quoteNumber,
      sendType: 'docusign'
    }
  });

  return await serviceRequest(data, idToken, endpointURL);
}

export async function quoteToBindRequest() {
  const idToken = localStorage.getItem('id_token');
  const endpointURL = Cypress.env('API_URL');

  cy.task('log', 'endpointURL');
  cy.task('log', endpointURL);
  cy.task('log', 'idToken');
  cy.task('log', idToken);

  const URL = `${endpointURL}/svc`;
  // create quote
  const { result: quote } = await createQuoteRequest(idToken, URL);
  // update quote with defaults passed in to finish a quote
  await updateQuoteRequest({ ...quote, ...quoteDefaults }, idToken, URL);
  // verify quote
  await verifyQuoteRequest(quote.quoteNumber, idToken, URL);
  // send to docusign
  await sendApplicationRequest(quote.quoteNumber, idToken, URL);
  // wait for docusign to do some things on the backend before its ready to bind
  await new Promise(resolve => setTimeout(resolve, 20000));
  // force a policy to bind
  const result = await bindPolicyRequest(quote.quoteNumber, idToken, URL);
  return result;
}
