const addNoteCheck = (text, rowCount) => {
  cy.findDataTag('new-note')
    .click({ force: true })
    .wait('@getNoteOptions')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
  cy.findDataTag('noteContent')
    .should('be.visible')
    .type(`{selectall}{backspace}${text}`, { force: true })
    .findDataTag('submit-button')
    .click();

  cy.wait('@fetchNotes').then(({ response }) => {
    expect(response.body.status).to.equal(200);
  });

  cy.goToNav('notes')
    .wait('@fetchNotes')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });

  cy.get('.table tbody tr')
    .should('have.length', rowCount)
    .find('div')
    .should('contain', text);
};

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

  addNoteCheck('test note one', 4);

  cy.findDataTag('new-diary')
    .click({ force: true })
    .wait(1000)
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

  addNoteCheck('another note', 5);
};
