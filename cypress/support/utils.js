// General, small, helpful functions can be added here.

/**
 * @param {string} name - String name of data-test tag.
 * @param {Object} options - Native cy.get options.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('findDataTag', (name, { timeout = 15000, ...rest } = {}) =>
  cy.get(`[data-test="${name}"]:not([disabled])`, { timeout, ...rest }));

/**
 * @param {string} form - Name of form to submit.
 * @returns {Object} DOM element(s) found.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('clickSubmit', (form = 'body') =>
  cy.get(form).within(() => cy.get('[data-test="submit"]:not([disabled])').click({ force: true })));
