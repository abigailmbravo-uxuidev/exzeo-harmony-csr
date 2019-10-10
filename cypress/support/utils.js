// General, small, helpful functions can be added here.

/**
 * @param {string} name - String name of data-test tag.
 * @param {Object} options - Native cy.get options.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('findDataTag', (name, { timeout = 15000, ...rest } = {}) =>
  cy.get(`[data-test="${name}"]:not([disabled])`, { timeout, ...rest })
);

/**
 * @param {string} name - String name of data-test tag.
 * @param {Object} options - Native cy.get options.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add(
  'findAnyDataTag',
  (name, { timeout = 15000, ...rest } = {}) =>
    cy.get(`[data-test="${name}"]`, { timeout, ...rest })
);

/**
 * @param {string} form - Name of form to submit.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('clickSubmit', (form = 'body', button = 'submit') =>
  cy.get(form).within(() => cy.findDataTag(button).click({ force: true }))
);

/**
 * Function to go to a nav tab if we're not currently there
 * @param {string} name - The route name and tab nav name.
 */
Cypress.Commands.add('goToNav', name =>
  cy
    .location()
    .then(
      loc =>
        !loc.pathname.includes(name) &&
        cy
          .get('.spinner')
          .should('not.exist')
          .findDataTag(`nav-${name}`)
          .find('a')
          .click({ force: true })
          .get('.spinner')
          .should('not.exist')
    )
    .wait(1000)
);
