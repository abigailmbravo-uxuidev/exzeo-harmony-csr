import stubAllRoutes from '../../support/stubAllRoutes';
import createResults from './utils';
import { fields, resultsCard } from './quoteSearchFields';

describe('Policy Search testing', () => {
  const selectQuoteSearch = () => cy.findDataTag('searchType').select('quote');

  before(() => {
    stubAllRoutes();
    cy.login();
  });

  beforeEach(() => {
    stubAllRoutes();
    selectQuoteSearch();
  });

  const textFields = fields.filter(({ type }) => type === 'text');
  const selectFields = fields.filter(({ type }) => type === 'select');

  it('POS:Quote Search Input Text / Label', () => {
    cy.wrap(fields).each(({ name, label }) =>
      cy.findDataTag(`${name}_label`).should('contain', label)
    ).wrap(textFields).each(({ name, placeholder }) =>
      cy.findDataTag(name).should('have.attr', 'placeholder', placeholder)
    ).wrap(selectFields).each(({ name, placeholder }) =>
      cy.findDataTag(name).find('.placeholder').should('contain', placeholder)
    );
  });

  it('POS:Quote Search Button', () =>
    cy.findDataTag('submit').should('have.attr', 'type', 'submit')
      .checkHeader({ name: 'submit', text: 'Search', icon: 'fa fa-search' })
  );

  it('POS:Quote Search Dropdown', () =>
    cy.wrap(selectFields).each(field => cy.checkSelect(field))
  );

  it('POS:Quote Search', () => {
    createResults('quotes', 30, 1);
    cy.findDataTag('submit').click()
      .get('.quote-list').children().each($card =>
        cy.checkResultsCard($card, resultsCard)
    ).then(() => {
      createResults('quotes', 30, 2);
      cy.findDataTag('page-forward').click()
        .get('.quote-list').children().should('have.length', 5)
        .get('[data-test="pageNumber"]').should('have.attr', 'value', '2');
    });
  });
});
