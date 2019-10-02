export async function bindPolicyRequest(quoteId, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.bindPolicy',
    data: {
      quoteId,
      force: true
    }
  });

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

export async function updateQuoteRequest(quote, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.updateQuote',
    data: {
      alwaysRunUnderwriting: true,
      quote
    }
  });

  await fetch(endpointURL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      authorization: 'bearer ' + idToken
    }
  });
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

export async function verifyQuoteRequest(quoteNumber, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.verifyQuote',
    data: {
      quoteNumber
    }
  });

  await fetch(endpointURL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      authorization: 'bearer ' + idToken
    }
  });
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

  await fetch(endpointURL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      authorization: 'bearer ' + idToken
    }
  });
}

export async function quoteToBindRequest(quoteDefaults, idToken, endpointURL) {
  const { result: quote } = await createQuoteRequest(idToken, endpointURL);
  await updateQuoteRequest(
    { ...quote, ...quoteDefaults },
    idToken,
    endpointURL
  );
  await verifyQuoteRequest(quote.quoteNumber, idToken, endpointURL);
  await sendApplicationRequest(quote.quoteNumber, idToken, endpointURL);
  return quote._id;
}
