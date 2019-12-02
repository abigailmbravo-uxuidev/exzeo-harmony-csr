import { defaultQuote, testDefaultQuote } from '../fixtures';

// export async function serviceRequest(data, idToken, endpointURL) {
//   const response = await axios({
//     url: endpointURL,
//     method: 'POST',
//     data,
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: 'bearer ' + idToken
//     }
//   });
//
//   return response.data;
// }

export function createQuote(apiUrl, token) {
  const requestBody = {
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.createQuote',
    data: {
      companyCode: 'TTIC',
      state: 'FL',
      product: 'HO3',
      propertyId: '12000000000000001',
      runUnderwriting: true
    }
  };

  return cy.request({
    url: `${apiUrl}/svc`,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: requestBody
  });
}

export function updateQuote(quote, apiUrl, token) {
  const requestBody = {
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.updateQuote',
    data: {
      alwaysRunUnderwriting: true,
      quote
    }
  };
  return cy.log('Update Quote').request({
    url: `${apiUrl}/svc`,
    method: 'POST',
    auth: { bearer: `bearer ${token}` },
    body: requestBody
  });
}

export function verifyQuote(quoteNumber, apiUrl, token) {
  const requestBody = {
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.verifyQuote',
    data: {
      quoteNumber
    }
  };

  return cy
    .log('Verify Quote')
    .request({
      url: `${apiUrl}/svc`,
      method: 'POST',
      auth: { bearer: `${token}` },
      body: requestBody
    })
    .then(res => {
      return res;
    });
}

export function sendApplication(quoteNumber, apiUrl, token) {
  const requestBody = {
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.sendApplication',
    data: {
      quoteNumber,
      sendType: 'docusign'
    }
  };

  cy.log('Send Application')
    .request({
      url: `${apiUrl}/svc`,
      method: 'POST',
      auth: { bearer: `${token}` },
      body: requestBody
    })
    .then(res => res);
}

export function retrieveQuote(quoteNumber, apiUrl, token) {
  const requestBody = {
    exchangeName: 'harmony',
    routingKey: 'harmony.quote.retrieveQuote',
    data: {
      quoteNumber
    }
  };

  cy.log('Retrieve Quote').request({
    url: `${apiUrl}/svc`,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: requestBody
  });
}

export function envelopeIdCheck(quoteNumber, apiUrl, token) {
  return retrieveQuote(quoteNumber, apiUrl, token).then(res => {
    if (res.status === 200 && res.result.envelopId) {
      return;
    }
    cy.wait(2000).log("No 'envelopeId', checking again.");
    envelopeIdCheck(quoteNumber, apiUrl, token);
  });
}

// export async function bindPolicyRequest(quoteNumber, idToken, endpointURL) {
//   cy.task('log', 'Bind Policy Request');
//   const data = JSON.stringify({
//     exchangeName: 'harmony',
//     routingKey: 'harmony.policy.bindPolicy',
//     data: {
//       quoteId: quoteNumber,
//       force: true
//     }
//   });
//
//   // return await serviceRequest(data, idToken, endpointURL);
// }

// export async function quoteToBindRequest() {
//   const idToken = localStorage.getItem('id_token');
//   const endpointURL = Cypress.env('API_URL');
//
//   const URL = `${endpointURL}/svc`;
//
//   const { result: quote } = await createQuoteRequest(idToken, URL);
//   await updateQuoteRequest({ ...quote, ...quoteDefaults }, idToken, URL);
//   await verifyQuoteRequest(quote.quoteNumber, idToken, URL);
//   await sendApplicationRequest(quote.quoteNumber, idToken, URL);
//   // wait for docusign to do some things on the backend before its ready to bind
//   cy.task('log', 'Retreive Quote for Envelope ID');
//   await envelopeIdCheck(quote.quoteNumber, idToken, URL);
//   cy.task('log', 'Envelope ID');
//   // force a policy to bind
//   const result = await bindPolicyRequest(quote.quoteNumber, idToken, URL);
//   return result;
// }

let quote;
export function quoteWorkflowMock() {
  const token = localStorage.getItem('id_token');
  const apiUrl = Cypress.env('API_URL');

  createQuote(apiUrl, token).then(res => {
    quote = res.data.result;
  });
  updateQuote({ ...quote, testDefaultQuote }, apiUrl, token);
  verifyQuote(quote.quoteNumber, apiUrl, token);
  sendApplication(quote.quoteNumber, apiUrl, token);
  cy.log('Check for envelopeId to determine when quote is ready to bind');
  envelopeIdCheck(quote.quoteNumber, apiUrl, token);
  return retrieveQuote(quote.quoteNumber, apiUrl, token);
}
