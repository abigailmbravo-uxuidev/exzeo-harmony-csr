import { setRouteAliases, confirmPolicyOrQuote } from '../../helpers';

describe('Quote Search testing', () => {
  const fields = [
    { name: 'firstName', data: 'batman' },
    { name: 'lastName', data: 'robin' },
    { name: 'address', data: 'test' },
  ];

  const selectQuoteSearch = () => cy.findDataTag('searchType').select('quote');

  before('Login', () => cy.login());

  beforeEach('Set aliases and go to quote search', () => {
    setRouteAliases();
    selectQuoteSearch();
  });

  it('POS:Quote Search', () =>
    cy.clickSubmit().wait('@fetchQuotes')
      .get('.quote-list').children().should('exist')

      .findDataTag('firstName').type('{selectall}{backspace}batman', { force: true })
      .clickSubmit().wait('@fetchQuotes')
      .get('.quote-list').children().should('exist')

      .findDataTag('lastName').type('{selectall}{backspace}robin', { force: true })
      .clickSubmit().wait('@fetchQuotes')
      .get('.quote-list').children().should('exist')

      .findDataTag('address').type('{selectall}{backspace}2113', { force: true })
      .clickSubmit().wait('@fetchQuotes')
      .get('.quote-list').children().should('exist')

      .findDataTag('quoteNumber').type('{selectall}{backspace}12-5168124-01', { force: true })
      .clickSubmit().wait('@fetchQuotes')
      .get('.quote-list').children().should('exist')

      .findDataTag('quoteState').select('Quote Qualified')
      .clickSubmit().wait('@fetchQuotes')
      .get('.quote-list').children().should('exist')
  );

  it('POS:Quote 3-field retrieve search', () =>
    cy.fillFields(fields).clickSubmit('#SearchBar')
      .wait('@fetchQuotes').then(({ response }) => confirmPolicyOrQuote(response.body.result.quotes, fields))
      // Click the pagination button.
      .findDataTag('page-forward').click({ force: true })
      .wait('@fetchQuotes').then(({ response }) => confirmPolicyOrQuote(response.body.result.quotes, fields))
      .get('input[name="pageNumber"]').should('have.value', '2')
  );
});
