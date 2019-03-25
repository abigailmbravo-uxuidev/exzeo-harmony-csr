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
   * Confirms each option in a select contains given data.
   * @param {Object} field - A select field
   * @param {string} field.name - Name of the wrapping data-test tag
   * @param {array} field.options - Array of strings containng the expected data
   */
Cypress.Commands.add('checkSelect', ({ name, options }) =>
  cy.findDataTag(name).find('option').then($els => {
    expect($els, `${name} options`).to.have.length(options.length);
    cy.wrap($els).each(($el, i) => cy.wrap($el).should('contain', options[i]));
  }));

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

/**
 * Checks all values on a search result card
 * @param {Object} card - The DOM element of the whole card
 * @param {Object} data - Data object to check against
 * @param {string} data.icon - Full classname of the icon
 * @param {string} data.cardName - Top name of card
 * @param {array} data.headerData - Array of string labels for the headers
 * @param {array} data.cardData - Array of string data for each section
*/

Cypress.Commands.add('checkResultsCard', (card, { icon, cardName = '', headerData, cardData }) => {
  cy.wrap(card).find('div.icon-name > i').should('have.attr', 'class', icon)
    .parent().next().find('.card-name').should('contain', cardName)
    .next().find('li').first().children().then($els => {
      expect($els).to.have.length(headerData.length);
      cy.wrap($els).each(($el, i) => cy.wrap($el).should('contain', headerData[i]));
    })
    .parent().next().find('span').then($spans => {
      expect($spans).to.have.length(cardData.length);
      cy.wrap($spans).each(($span, i) => cy.wrap($span).should('contain', cardData[i]));
    })
  });
