/**
 * @param {array} fields - Fields to fill out.
 * @param {Object} data - Data to fill out with keys corresponding to each entry in fields.
 */
Cypress.Commands.add('fillFields', (
  fields = [],
  data ////array of field and it will fill out the form, look at this file!!!!!
) =>
  cy.wrap(fields).each(field =>
    cy.findDataTag(`${field.name}`).then($el =>
      // Sometimes the dom structure nests inputs
      $el.find('input').length
        ? cy
            .wrap($el)
            .find('input')
            .type(data ? data[field.name] : field.data, { force: true })
        : cy
            .wrap($el)
            .type(data ? data[field.name] : field.data, { force: true })
    )
  )
);

/**
 * @param {string} name - Field name to find.
 * @param {string} error - Expected error message.
 */
Cypress.Commands.add('checkError', ({ name, error = 'Field Required' }) =>
  cy
    .findDataTag(name)
    .find('> span')
    .should('contain', error)
);

/**
 * @param {array} fields - Fields to fill check that errors exist.
 * @param {Object} options - Options object to use.
 * @param {array} options.errors - Array of errors to use in order for each field.
 * @param {string} options.form - Form to submit.
 * @param {bool} options.checkForSnackbar - Whether or not the snackbar appears when the form has errors.
 */
Cypress.Commands.add(
  'submitAndCheckValidation',
  (fields = [], options = {}) => {
    const {
      form = 'body',
      checkForSnackbar = false,
      button = 'submit'
    } = options;
    cy.clickSubmit(form, button);
    checkForSnackbar && cy.get('.snackbar').should('be.visible');
    cy.wrap(fields).each(field => cy.checkError(field));
  }
);

/**
 * @param {array} fields - Array of field objects corresponding to data-test tags to clear.
 */
Cypress.Commands.add('clearAllText', fields =>
  cy.wrap(fields).each(({ name }) =>
    cy.findDataTag(name).then($el =>
      // Sometimes the dom structure nests inputs
      $el.find('input').length
        ? cy
            .wrap($el)
            .find('input')
            .then(
              $input =>
                $input.val() &&
                cy.wrap($input).type('{selectall}{backspace}', { force: true })
            )
        : $el.val() &&
          cy.wrap($el).type('{selectall}{backspace}', { force: true })
    )
  )
);

/**
 * Clear inputs, fill out inputs, and check validation on form
 * @param {array} baseFields - Fields to fill out in the form.
 * @param {array} fieldsLeftBlank - Fields to skip when filling out the form.
 * @param {Object} data - Data to use when filling out the form.
 * @param {Object} submitOptions - Options object used above in submitAndCheckValidation().
 */
Cypress.Commands.add(
  'verifyForm',
  (baseFields = [], fieldsLeftBlank = [], data, submitOptions) =>
    cy
      .clearAllText(baseFields)
      .fillFields(
        baseFields.filter(field => fieldsLeftBlank.indexOf(field) === -1),
        data
      )
      .submitAndCheckValidation(
        fieldsLeftBlank.length ? fieldsLeftBlank : baseFields,
        submitOptions
      )
);

/**
 * Uses the native slider setter, instead of React's
 * @param {Object} slider - Native DOM node for the slider.
 * @param {value} number - A number to which to set the slider value.
 */
Cypress.Commands.add('nativeSetSliderValue', (slider, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set;
  nativeInputValueSetter.call(slider, value);
  slider.dispatchEvent(new Event('change', { value, bubbles: true }));
});

/**
 * This function is used for any non-standard inputs, ie not select > options.
 * @param {string} tag - Name of the data test tag wrapping the select
 * @param {number} searchTerm - The term to search for.
 */
Cypress.Commands.add(
  'chooseReactSelectOption',
  (tag, searchTerm, selector = '') =>
    cy
      .findDataTag(tag)
      .find(`${selector || 'input[type="text"]'}`)
      .should('exist')
      .type(searchTerm, { force: true })
      .get('div.react-select__option')
      .should('exist')
      .then($arr => cy.wrap($arr[0]).click())
);

/**
 * Helper to clear an input using React-Select
 * @param {string} tag - Name of data test tag wrapping the select
 */
Cypress.Commands.add('clearReactSelectField', tag =>
  cy.findDataTag(tag).within(() => {
    cy.get('[class~="react-select__clear-indicator"]').click();
  })
);
