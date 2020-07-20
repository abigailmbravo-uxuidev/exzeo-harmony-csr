export function retrieveQuote(quoteNumber, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.retrieveQuote',
      data: {
        quoteNumber
      }
    }
  });
}

// Total retry time limit ~2 min
const WAIT_TIME_MS = 2000;
const RETRY_MAX = 60;

export function envelopeIdCheck(quoteNumber, apiUrl, token, attemptNumber = 0) {
  // Custom functions should return a 'cy chain' to be able to enforce order of ops
  return retrieveQuote(quoteNumber, apiUrl, token).then(res => {
    if (res.status === 200 && res.body.result.envelopeId) {
      // must wrap a var to make it chainable
      return cy.wrap(res);
    }

    assert.isBelow(
      attemptNumber,
      RETRY_MAX,
      "Number of retries to 'retrieveQuote' waiting for envelopeId to exist on quote"
    );
    cy.wait(WAIT_TIME_MS);
    envelopeIdCheck(quoteNumber, apiUrl, token, attemptNumber + 1);
  });
}

export function manualBindPolicy(quoteNumber, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.bindPolicy',
      data: {
        quoteId: quoteNumber,
        force: true
      }
    }
  });
}

export function getToken() {
  return cy.request({
    url: `https://${Cypress.env('AUTH0_URL')}/oauth/token`,
    method: 'POST',
    body: {
      grant_type: 'password',
      username: 'tticcsr',
      password: 'Password1',
      audience: Cypress.env('AUTH0_AUDIENCE'),
      client_id: Cypress.env('AUTH0_CLIENT_ID'),
      scope: 'openid email profile',
      client_secret: Cypress.env('AUTH0_CLIENT_SECRET')
    }
  });
}
