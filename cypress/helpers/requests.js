import { baseQuoteResponse } from '../fixtures';

export function createQuote(apiUrl, token) {
  // return 'cy' chain so that we can continue to chain off of this function
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.createQuote',
      data: {
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3',
        propertyId: '12000000000000001',
        runUnderwriting: true
      }
    }
  });
}

export function updateQuote(quote, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.updateQuote',
      data: {
        alwaysRunUnderwriting: true,
        quote
      }
    }
  });
}

export function verifyQuote(quoteNumber, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.verifyQuote',
      data: {
        quoteNumber
      }
    }
  });
}

export function sendApplication(quoteNumber, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.sendApplication',
      data: {
        quoteNumber,
        sendType: 'docusign'
      }
    }
  });
}

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

const WAIT_TIME_MS = 2000;
const RETRY_MAX = 60;

export function envelopeIdCheck(quoteNumber, apiUrl, token, attemptNumber = 0) {
  // Custom functions should return a 'cy chain' to be able to enforce order of ops
  return retrieveQuote(quoteNumber, apiUrl, token).then(res => {
    if (res.status === 200 && res.body.result.envelopeId) {
      // must wrap a var to make it chainable
      return cy.wrap(res);
    }
    // We are retrying for roughly 1 minute max
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

export function createToBindQuote() {
  const token = localStorage.getItem('id_token');
  const apiUrl = Cypress.env('API_URL') + '/svc';

  cy.task('log', 'CreateQuote for endorsement test');
  createQuote(apiUrl, token).then(res => {
    expect(res.status).to.equal(200);
    const quote = res.body.result;

    cy.task('log', 'UpdateQuote for endorsement test');
    updateQuote({ ...quote, ...baseQuoteResponse }, apiUrl, token).then(res => {
      expect(res.status).to.equal(200);

      cy.task('log', 'VerifyQuote for endorsement test');
      verifyQuote(quote.quoteNumber, apiUrl, token).then(res => {
        expect(res.status).to.equal(200);

        cy.task('log', 'Send Application for endorsement test');
        sendApplication(quote.quoteNumber, apiUrl, token).then(res => {
          expect(res.status).to.equal(200);
          cy.task(
            'log',
            'Check for envelopeId to determine when quote is ready to bind'
          );
          envelopeIdCheck(quote.quoteNumber, apiUrl, token).then(res => {
            expect(res.status).to.equal(200);

            cy.task('log', 'Submit request to bind quote');
            manualBindPolicy(quote.quoteNumber, apiUrl, token).then(res => {
              expect(res.status).to.equal(200);
              const quote = res.body.result;
              // Wrap the response to make it 'chainable', then create an
              // aliased variable that will then be available through
              // 'cy.get('@boundQuote') within the same test context.
              cy.wrap(quote).as('boundQuote');
            });
          });
        });
      });
    });
  });
}
