/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} className - Classname to verify in workflow
 */
Cypress.Commands.add('checkWorkflowSection', ({ name, status = 'disabled' }) =>
  cy.findDataTag(name).find('a').should('have.attr', 'class', status));

/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} text - Text to check exists in label
 */
Cypress.Commands.add('checkLabel', (tag, text) =>
  cy.findDataTag(tag).find('label').should('contain', text));

/**
 * @param {Object} header - Header object
 * @param {string} header.name - Name of the wrapping data-test tag
 * @param {string} header.text - Text of the header
 * @param {string} header.icon - Icon classname
 */
Cypress.Commands.add('checkHeader', ({ name, text, icon }) =>
  cy.findDataTag(name).should('contain', text).find('i').should('have.attr', 'class', icon));

/**
 * @param {string} tag - String name of data-test tag.
 * @param {string} text - Check this text is now in value of input
 */
Cypress.Commands.add('checkText', (tag, text = '(99') =>
  cy.findDataTag(tag).find('input').type(`{selectall}{backspace}${text}`, { force: true }).should('have.attr', 'value', text));

/**
 * Checks that every radio has values as described
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 * @param {array} field.values - Array of values for each radio.
 */
Cypress.Commands.add('checkRadios', ({ name, values }) =>
  cy.findDataTag(name).find('.segmented-answer-wrapper > div').each(($div, index) =>
    cy.wrap($div).find('label span').should('contain', values[index].formatted || values[index])));

/**
 * Clicks each radio and confirms it has the 'selected' class, then afterwards confirms only one is selected
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 */
Cypress.Commands.add('clickEachRadio', ({ name }) =>
  cy.findDataTag(name).find('.segmented-answer-wrapper > div').each($div =>
    cy.wrap($div).click().find('label').should('have.attr', 'class', 'label-segmented selected')
  ).filter('.selected').should('have.length', 1));

/**
 * Checks a switch
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 * @param {string} field.defaultValue - boolean determining starting value of the switch
 */
Cypress.Commands.add('checkSwitch', ({ name, defaultValue }) =>
  cy.findDataTag(name).find('.switch-div').should('have.attr', 'data-value', `${defaultValue}`)
    .click().should('have.attr', 'data-value', `${!defaultValue}`)
    .click().should('have.attr', 'data-value', `${!!defaultValue}`));

/**
 * Confirms the submit button exists in the form
 * @param {string} form - Name of the form within which to check for submit button.
 */
Cypress.Commands.add('checkSubmitButton', ((form = 'body') =>
  cy.get(form).findDataTag('submit').should('exist').and('have.attr', 'type', 'button')));

/**
 * @param {string} tag - Name of the data test tag wrapping the select
 * @param {number} option - Index of the option to select
 */
Cypress.Commands.add('chooseSelectOption', (tag, option = 0) =>
  cy.findDataTag(tag).find('input')
    .type(' ', { force: true })
    .get('div.Select-menu div[role="option"]').then($arr => cy.wrap($arr[option]).click()));

/**
 * @param {string} tag - Name of the data test tag wrapping the select
 * @param {string} placeholder - Placeholder text
 */
Cypress.Commands.add('resetSelectOption', (tag, placeholder = 'Select...') =>
  cy.findDataTag(tag).find('span.Select-clear').click()
    .findDataTag(tag).find('.Select-control .Select-placeholder').should('contain', placeholder));

/**
 * Checks the values in a slider
 * @param {Object} field - An input switch field
 * @param {string} field.name - Name of the wrapping data-test tag
 */
Cypress.Commands.add('checkSlider', tag =>
  cy.findDataTag(tag).find('.range-control-wrapper > input[type="range"]').then($slider => {
    const min = parseInt($slider.attr('min'));
    const max = parseInt($slider.attr('max'));

    cy.nativeSetSliderValue($slider[0], min)
      .findDataTag(tag).find('span.range-value > input').should('have.attr', 'value', `$ ${min.toLocaleString()}`)
      .nativeSetSliderValue($slider[0], max)
      .findDataTag(tag).find('span.range-value > input').should('have.attr', 'value', `$ ${max.toLocaleString()}`);
  }));
