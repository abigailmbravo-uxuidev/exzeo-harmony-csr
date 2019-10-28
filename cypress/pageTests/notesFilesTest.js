const addNoteCheck = text =>
  cy
    .findDataTag('new-note')
    .click({ force: true })
    .wait('@getNoteOptions')
    .get('.new-note-file textarea[name="noteContent"]')
    .type(`{selectall}{backspace}${text}`, { force: true })
    .findDataTag('submit-button')
    .click()
    .goToNav('notes')
    .wait('@fetchNotes')
    .get('.table tbody')
    .find('tr')
    .find('td')
    .contains(text);

export default () => {
  //TODO: Check for quote started only
  cy.get('td.note div')
    .should('have.any', [
      'Quote State Changed: Quote Started',
      'Quote State Changed: Quote Created'
    ])
    .get('td.note div')
    .contains('Quote State Changed: Quote Qualified')
    .get('td.note div')
    .contains('Quote State Changed: Application Started');

  addNoteCheck('test note one');

  cy.findDataTag('new-diary')
    .click({ force: true })
    .findDataTag('reason')
    .select('estate')
    .findDataTag('assignee')
    .select('occupancy')
    .findDataTag('due')
    .type('2021-01-01')
    .findDataTag('message')
    .type('new diary')
    .findDataTag('note-submit')
    .click()
    .get('.new-diary-file')
    .should('not.exist')
    .get('button')
    .contains('Diaries')
    .click()
    .get('td.message')
    .contains('new diary')
    .checkQuoteState('Application Started')
    .goToNav('coverage');

  addNoteCheck('another note');
};
