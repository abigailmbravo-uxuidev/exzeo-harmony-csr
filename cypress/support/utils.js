import merge from 'lodash/merge'; //eslint-disable-line
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
 */
Cypress.Commands.add('_submit', (form = 'body') =>
  cy.get(form).within(() => cy.get('[data-test="submit"]:not([disabled])').click({ force: true })));

/**
 * Navigates to the base route
 */
Cypress.Commands.add('home', () => cy.visit(''));

/**
 * @param {string} stubName - String of the stub file name (should also be route name)
 * @param {Object} modification - What, if anything, to modify in the base stub
 * @param {string} url - The url to stub, if not using the /svc/{stubName} style
 */
Cypress.Commands.add('_fixtureAndStubRoute', (stubName, modification = {}, url) =>
  cy.fixture(`stubs/${stubName}`).then(fixture => {
    cy.route('POST', url || `/svc?${stubName}`, merge(fixture, modification));
  })
);
