import { baseQuoteResponse } from '../fixtures';

// export function createQuote(apiUrl, token) {
//   // return 'cy' chain so that we can continue to chain off of this function
//   return cy.request({
//     url: apiUrl,
//     method: 'POST',
//     auth: { bearer: `${token}` },
//     body: {
//       exchangeName: 'harmony',
//       routingKey: 'harmony.quote.createQuote',
//       data: {
//         companyCode: 'TTIC',
//         state: 'FL',
//         product: 'HO3',
//         propertyId: '12000000000000001',
//         runUnderwriting: true
//       }
//     }
//   });
// }
//
// export function updateQuote(quote, apiUrl, token) {
//   return cy.request({
//     url: apiUrl,
//     method: 'POST',
//     auth: { bearer: `${token}` },
//     body: {
//       exchangeName: 'harmony',
//       routingKey: 'harmony.quote.updateQuote',
//       data: {
//         alwaysRunUnderwriting: true,
//         quote
//       }
//     }
//   });
// }

// export function verifyQuote(quoteNumber, apiUrl, token) {
//   return cy.request({
//     url: apiUrl,
//     method: 'POST',
//     auth: { bearer: `${token}` },
//     body: {
//       exchangeName: 'harmony',
//       routingKey: 'harmony.quote.verifyQuote',
//       data: {
//         quoteNumber
//       }
//     }
//   });
// }

// export function sendApplication(quoteNumber, apiUrl, token) {
//   return cy.request({
//     url: apiUrl,
//     method: 'POST',
//     auth: { bearer: `${token}` },
//     body: {
//       exchangeName: 'harmony',
//       routingKey: 'harmony.quote.sendApplication',
//       data: {
//         quoteNumber,
//         sendType: 'docusign'
//       }
//     }
//   });
// }

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
