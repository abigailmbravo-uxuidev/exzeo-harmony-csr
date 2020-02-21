import { aiOptions } from '../fixtures';

export default (aiButtons = aiOptions) =>
  cy
    .goToNav('additionalInterests')
    .reload()
    .checkQuoteState('Policy Issued')
    .wrap(aiButtons)
    .each(type => cy.get(`[data-test=${type}]`).should('be.disabled'));
