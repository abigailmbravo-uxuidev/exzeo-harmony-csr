import _ from 'lodash'; //eslint-disable-line
import { navNewQuote } from '../../helpers';
import stubAllRoutes from '../../support/stubAllRoutes';

describe('Quote State Testing', () => {
  const checkQuoteState = content => cy.findDataTag('quoteDetails').find('.status').should('contain', content);

  const createRes = value => ['data.previousTask.value.result.quoteState', value];

  before(() => {
    stubAllRoutes();
    cy.login();
    navNewQuote();
  });

  it('Quote State', () => {
    checkQuoteState('Quote Started');

    cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', createRes('Quote Stopped'));
    cy.reload();
    checkQuoteState('Quote Stopped');

    cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', createRes('Application Started'));
    cy.reload();
    checkQuoteState('Application Started');

    cy.setFx('stubs/start/csrGetQuoteWithUnderwriting', createRes('Application Sent DocuSign'));
    cy.reload();
    checkQuoteState('Application Sent DocuSign');
  });
});
