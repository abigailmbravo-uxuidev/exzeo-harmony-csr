export default () =>
  cy.findDataTag('new-note').click({ force: true })
    .get('.new-note-file textarea[name="noteContent"]').type('new note')
    .get('button[aria-label="submit-btn form-newNote"]').click()
    .get('.new-note-file').should('not.exist')
    // TODO: COLIN -- Uncomment this once fixed
    // .get('div').contains('new note')

    .findDataTag('new-diary').click({ force: true })
    .findDataTag('reason').select('estate')
    .findDataTag('assignee').select('occupancy')
    .findDataTag('due').type('2021-01-01')
    .findDataTag('message').type('new diary')
    .findDataTag('note-submit').click()
    .get('.new-diary-file').should('not.exist')
    .get('button').contains('Diaries').click()
    .get('td.message').contains('new diary')

    .checkQuoteState('Application Ready');
