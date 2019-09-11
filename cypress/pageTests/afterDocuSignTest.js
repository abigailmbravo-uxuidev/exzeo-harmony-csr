const aiButtons = [
  'mortgagee',
  'additionalInsured',
  'additionalInterest',
  'premiumFinance',
  'billPayer'
];

export default () =>
  cy
    .goToNav('additionalInterests')
    .wait(20000)
    .reload()
    .checkQuoteState('Application Sent DocuSign')
    .wrap(aiButtons)
    .each(button => cy.get(`[data-test=${button}]`).should('be.disabled'));
