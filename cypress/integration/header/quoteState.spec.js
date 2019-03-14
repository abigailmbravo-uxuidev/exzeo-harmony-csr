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

    cy.setFx('stubs/csrGetQuoteWithUnderwriting', createRes('Quote Stopped'), false, '/cg/start?csrGetQuoteWithUnderwriting');
    cy.reload();
    checkQuoteState('Quote Stopped');

    cy.setFx('stubs/csrGetQuoteWithUnderwriting', createRes('Application Started'), false, '/cg/start?csrGetQuoteWithUnderwriting');
    cy.reload();
    checkQuoteState('Application Started');

    cy.setFx('stubs/csrGetQuoteWithUnderwriting', createRes('Application Sent DocuSign'), false, '/cg/start?csrGetQuoteWithUnderwriting');
    cy.reload();
    checkQuoteState('Application Sent DocuSign');
  });
});
