export default () =>
  cy.goToNav('notes')
    .wait(20000)
    .reload()
    .checkQuoteState('Application Sent DocuSign');
