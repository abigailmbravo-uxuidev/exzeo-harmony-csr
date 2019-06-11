export default () =>
  cy.checkQuoteState('Quote Started')
    .get('button span').contains('Premium Finance').click()
    .get('#AdditionalInterestModal .react-select__input input').type('A', { force: true })
    .get('.react-select__option').first().click({ force: true })
    .findDataTag('name1').should('have.attr', 'value', 'P1 FINANCE COMPANY')
    .findDataTag('ai-modal-submit').click()
    .get('.loader.modal').should('not.exist')
    .checkQuoteState('Application Started');
