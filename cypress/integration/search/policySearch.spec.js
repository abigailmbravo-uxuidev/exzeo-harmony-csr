import stubAllRoutes from '../../support/stubAllRoutes';
import createResults from './utils';
import { searchFields, advancedSearchFields, resultsCard } from './policySearchFields';

describe('Policy Search testing', () => {
  before(() => {
    stubAllRoutes();
    cy.login();
  });

  beforeEach(() => stubAllRoutes());

  const toggleAdvancedSearch = (dir = 'on') => {
    cy.findDataTag('policy-advanced-search').find('i').then($i => {
      if (($i.hasClass('fa-chevron-down') && dir === 'on')
      || ($i.hasClass('fa-chevron-up') && dir === 'down')) { $i.click(); }
    });
  };

  const selectFields = searchFields.filter(({ type }) => type === 'select');
  const advancedSelectFields = advancedSearchFields.filter(({ type }) => type === 'select');

  it('POS:Policy Search Input Text / Label', () => {
    const textFields = searchFields.filter(({ type }) => type === 'text');

    cy.get('div[role="banner"] > nav').find('a[aria-current="true"]').should('contain', 'Policy')
      .wrap(selectFields).each(({ name, label, selected }) =>
        cy.findDataTag(`${name}_label`).should('contain', label)
          .findDataTag(name).should('have.attr', 'data-selected', selected)
      ).wrap(textFields).each(({ name, label, placeholder }) =>
        cy.findDataTag(`${name}_label`).should('contain', label)
          .findDataTag(name).should('have.attr', 'placeholder', placeholder)
      );
  });

  it('POS:Policy Search Button', () =>
    cy.findDataTag('submit').should('have.attr', 'type', 'submit')
      .checkHeader({ name: 'submit', text: 'Search', icon: 'fa fa-search' })
  );

  it('POS:Policy Search Dropdown Testing', () =>
    cy.wrap(selectFields).each(({ name, options }) =>
      cy.checkSelect({ name, options })
    )
  );

  it('POS:Policy Advanced Search Open Arrow', () =>
    cy.findDataTag('policy-advanced-search').find('i').should('have.attr', 'class', 'fa fa-chevron-down')
  );

  it('POS:Advanced Search Input / Label', () => {
    toggleAdvancedSearch();
    cy.wrap(advancedSearchFields).each(field => {
      cy.findDataTag(`${field.name}_label`).should('contain', field.label);
      if (field.type === 'text') {
        cy.findDataTag(field.name).should('have.attr', 'placeholder', field.placeholder);
      };
    });
  });

  it('POS:Policy Advanced Search Dropdown', () =>
    cy.wrap(advancedSelectFields).each(field => cy.checkSelect(field))
  );

  it('POS:Policy Search', () => {
    createResults('policies', 30, 1);
    cy.findDataTag('submit').click()
      .findDataTag('policy-list').children().each($card =>
        cy.checkResultsCard($card, resultsCard)
      ).then(() => {
        createResults('policies', 30, 2);
        cy.findDataTag('page-forward').click()
          .findDataTag('policy-list').children().should('have.length', 5)
          .get('[data-test="pageNumber"]').should('have.attr', 'value', '2');
      });
  });

  it('POS:Policy Advanced Search Close Arrow', () => {
    toggleAdvancedSearch();
    cy.findDataTag('policy-advanced-search').find('i').should('have.attr', 'class', 'fa fa-chevron-up');
    toggleAdvancedSearch('off');
  });
});
