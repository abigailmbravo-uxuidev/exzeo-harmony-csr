export default () =>
  cy.goToNav('notes')
    .wait(10000)
    .reload()
    .checkQuoteState('Application Sent DocuSign');
