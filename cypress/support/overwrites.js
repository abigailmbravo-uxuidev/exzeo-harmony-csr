Cypress.Commands.overwrite('visit', (orig, url, { failOnStatusCode = false, ...rest } = {}) =>
  orig(url, { failOnStatusCode, ...rest })
);
