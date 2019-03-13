// This file is to persist and rehydrate local storage.
// We save the local changes to whitelisted cookies that we rehydrate before each test.

import { AUTH_TOKENS } from './constants';

Cypress.Commands.add('persistSession', (keys) =>
  cy.wrap(keys).each(key => {
    const value = localStorage.getItem(key);
    if (value) { cy.setCookie(key, value); }
  })
);

Cypress.Commands.add('restoreSession', (keys) =>
  cy.wrap(keys).each(key =>
    cy.getCookie(key).then(cookie => {
      if (cookie && cookie.value) { localStorage.setItem(key, cookie.value); }
    })
  )
);

Cypress.Cookies.defaults({
  whitelist: AUTH_TOKENS
});
