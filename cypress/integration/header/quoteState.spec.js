import _ from 'lodash'; //eslint-disable-line
import { navigateThroughNewQuote } from '../../helpers';
import stubAllRoutes from '../../support/stubAllRoutes';

describe('Quote State Testing', () => {
  const checkQuoteState = content => cy.findDataTag('quoteDetails').find('.status').should('contain', content);

  before(() => {
    stubAllRoutes();
    cy.login();
    navigateThroughNewQuote();
  });

  it('Quote State', () => {
    checkQuoteState('Quote Started');

    cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', ['quoteState', 'Quote Stopped'])
      .reload();
    checkQuoteState('Quote Stopped');

    cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', ['quoteState', 'Application Started'])
      .reload();
    checkQuoteState('Application Started');

    cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', ['quoteState', 'Application Sent DocuSign'])
      .reload();
    checkQuoteState('Application Sent DocuSign');
  });
});
