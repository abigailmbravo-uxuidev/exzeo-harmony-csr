const aiButtons = [
  'mortgagee', 'additionalInsured', 'additionalInterest',
  'premiumFinance', 'billPayer'
];

export default () =>
  cy.goToNav('additionalInterests')
    .wait(20000)
    .reload()
    .checkQuoteState('Application Sent DocuSign')
    // TODO: Colin -- when this is fixed add this
    // .wrap(aiButtons).each(button => cy.findDataTag(button).should('be.disabled'));
