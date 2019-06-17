const addNoteCheck = text => cy.findDataTag('new-note').click({ force: true })
  .get('.new-note-file textarea[name="noteContent"]').type(text)
  .get('button[aria-label="submit-btn form-newNote"]').click().wait('@fetchNotes')
  .goToNav('notes').get('div').contains(text);

export default () => {
  // TODO: Colin - remove this reload once fix is in
  cy.reload();
  // 💥💥💥
  cy.get('td.note div').contains('Quote State Changed: Quote Created')
    .get('td.note div').contains('Quote State Changed: Quote Qualified')
    .get('td.note div').contains('Quote State Changed: Application Ready')

  addNoteCheck('test note one');

  cy.findDataTag('new-diary').click({ force: true })
    .findDataTag('reason').select('estate')
    .findDataTag('assignee').select('occupancy')
    .findDataTag('due').type('2021-01-01')
    .findDataTag('message').type('new diary')
    .findDataTag('note-submit').click()
    .get('.new-diary-file').should('not.exist')
    .get('button').contains('Diaries').click()
    .get('td.message').contains('new diary')
    .checkQuoteState('Application Ready')
    .goToNav('coverage');

  addNoteCheck('another note');
};
