const addNoteCheck = (text, rowCount) => {
  cy.findDataTag('new-note')
    .click({ force: true })
    .findDataTag('noteContent')
    .should('be.visible')
    .wait('@getNoteOptions')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });

  cy.findDataTag('noteContent')
    .focus()
    .type('{selectall}{backspace}')
    .should('have.value', '')
    .wait(1000)
    .type(text, { delay: 100 })
    .should('have.value', text)
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
  const diary = 'This Diary was added at ' + new Date();
  cy.wrap(diary)
    .as('diaryText')
    .findDataTag('new-diary')
    .click({ force: true })
    .wait(1000)
    .findDataTag('message')
    .should('be.visible')
    .findDataTag('reason')
    .select('estate')
    .findDataTag('assignee')
    .select('TTIC CSR')
    .findDataTag('due')
    .type('2021-01-01')
    .findDataTag('message')
    .type(diary)
    .findDataTag('diary-submit')
    .click()
    .get('.new-diary-file')
    .should('not.exist')
    .get('button')
    .contains('Diaries')
    .click()
    .checkQuoteState('Application Started')
    .goToNav('coverage');

  addNoteCheck('another note', 5);
};
