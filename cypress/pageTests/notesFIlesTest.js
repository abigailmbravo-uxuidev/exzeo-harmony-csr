const addNoteCheck = text => cy.findDataTag('new-note').click({ force: true })
  .get('.new-note-file textarea[name="noteContent"]').type(text)
  .get('button[aria-label="submit-btn form-newNote"]').click().wait('@fetchNotes')
  .goToNav('notes').get('div').contains(text);

export default () => {
  addNoteCheck('newNote');

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

    // TODO: COLIN - Add this in once this fixed

  // addNoteCheck('another note');
};
