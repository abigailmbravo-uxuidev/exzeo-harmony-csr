export async function bindPolicyRequest(quoteNumber, idToken, endpointURL) {
  var data = JSON.stringify({
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.bindPolicy',
    data: {
      quoteId: quoteNumber,
      force: true
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

export async function quoteToBindRequest(quote, idToken, endpointURL) {
  await updateQuoteRequest(quote, idToken, endpointURL);
  await verifyQuoteRequest(quote.quoteNumber, idToken, endpointURL);
  await sendApplicationRequest(quote.quoteNumber, idToken, endpointURL);
  await new Promise(resolve => setTimeout(resolve, 20000));
  return await bindPolicyRequest(quote.quoteNumber, idToken, endpointURL);
}
