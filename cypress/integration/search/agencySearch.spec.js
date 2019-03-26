import stubAllRoutes from '../../support/stubAllRoutes';
import { searchFields, agencyCard } from './agencySearchFields';

describe('Policy Search testing', () => {
  const selectAgencySearch = () => cy.findDataTag('agency-link').click();

  before(() => {
    stubAllRoutes();
    cy.login();
  });

  beforeEach(() => {
    stubAllRoutes();
    selectAgencySearch();
  });

  const selectFields = searchFields.filter(({ type }) => type === 'select');
  const textFields = searchFields.filter(({ type }) => type === 'text');

  it('POS:Agency Search Input Text / Label', () =>
    cy.get('div[role="banner"] > nav').find('a[aria-current="true"]').should('contain', 'Agency')
      .wrap(selectFields).each(({ name, label, selected }) =>
        cy.findDataTag(`${name}_label`).should('contain', label)
          .findDataTag(name).should('have.attr', 'data-selected', selected)
      ).wrap(textFields).each(({ name, label, placeholder }) =>
        cy.findDataTag(`${name}_label`).should('contain', label)
          .findDataTag(name).should('have.attr', 'placeholder', placeholder)
      )
  );

  it('POS:Agency Search Button', () =>
    cy.findDataTag('submit').should('have.attr', 'type', 'submit')
      .checkHeader({ name: 'submit', text: 'Search', icon: 'fa fa-search' })
  );

  it('POS:Agency Search', () =>
    cy.findDataTag('submit').click()
      .get('.agency-list').children().each($card =>
        cy.checkAgencyCard($card, agencyCard)
      )
  );
});
