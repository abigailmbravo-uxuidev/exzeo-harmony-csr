import _ from 'lodash'; //eslint-disable-line
import { stubQuoteWithUnderwriting, navNewQuote } from '../../helpers';
import routes from '../../support/routes';

describe('Quote State Testing', () => {
  const checkQuoteState = content => cy.findDataTag('quoteDetails').find('.status').should('contain', content);

  before(() => {
    routes();
    cy.login();
    navNewQuote();
  })

  it('Quote State', () => {
    cy.fixture('stubs/csrGetQuoteWithUnderwriting').then(fx => {
      checkQuoteState('Quote Started');

      const stoppedFx = _.cloneDeep(fx);
      stubQuoteWithUnderwriting(stoppedFx, { quoteState: 'Quote Stopped' });
      cy.reload();
      checkQuoteState('Quote Stopped');

      const applicationFx = _.cloneDeep(stoppedFx);
      stubQuoteWithUnderwriting(applicationFx, { quoteState: 'Application Started' });
      cy.reload();
      checkQuoteState('Application Started');

      const sentFx = _.cloneDeep(applicationFx);
      stubQuoteWithUnderwriting(sentFx, { quoteState: 'Application Sent DocuSign' });
      cy.reload();
      checkQuoteState('Application Sent DocuSign');
    });
  });
});
