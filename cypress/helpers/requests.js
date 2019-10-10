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
  cy.task('log', 'Bind Policy Request');
  const data = JSON.stringify({
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
  cy.task('log', 'Update Quote');

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
  cy.task('log', 'Create Quote');

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
  cy.task('log', 'Verify Quote');

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
  cy.task('log', 'Send Application');

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

export async function retrieveQuoteRequest(quoteNumber, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.retrieveQuote',
    data: {
      quoteNumber
    }
  });

  return await serviceRequest(data, idToken, endpointURL);
}

export async function envelopeIdCheck(quoteNumber, idToken, endpointURL) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const { result: quote } = await retrieveQuoteRequest(
    quoteNumber,
    idToken,
    endpointURL
  );

  if (!quote.envelopeId) {
    cy.task('log', 'No Envelope ID, Checking again');
    return await envelopeIdCheck(quoteNumber, idToken, endpointURL);
  } else {
    return quote.envelopeId;
  }
}

export async function quoteToBindRequest() {
  const idToken = localStorage.getItem('id_token');
  const endpointURL = Cypress.env('API_URL');

  const URL = `${endpointURL}/svc`;

  const { result: quote } = await createQuoteRequest(idToken, URL);
  await updateQuoteRequest({ ...quote, ...quoteDefaults }, idToken, URL);
  await verifyQuoteRequest(quote.quoteNumber, idToken, URL);
  await sendApplicationRequest(quote.quoteNumber, idToken, URL);
  // wait for docusign to do some things on the backend before its ready to bind
  cy.task('log', 'Retreive Quote for Envelope ID');
  await envelopeIdCheck(quote.quoteNumber, idToken, URL);
  cy.task('log', 'Envelope ID');
  // force a policy to bind
  const result = await bindPolicyRequest(quote.quoteNumber, idToken, URL);
  return result;
}
