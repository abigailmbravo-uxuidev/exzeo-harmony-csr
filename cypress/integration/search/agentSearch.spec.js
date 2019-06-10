import stubAllRoutes from '../../support/stubAllRoutes';
import { fields, agentCard } from './agentSearchFields';

describe('Agent Search Testing', () => {
  const selectAgencySearch = () =>
    cy.findDataTag('agency-link').click()
      .findDataTag('searchType').select('agent', { force: true });

  before(() => {
    stubAllRoutes();
    cy.login();
  });

  beforeEach(() => {
    stubAllRoutes();
    selectAgencySearch();
  });

  const selectFields = fields.filter(({ type }) => type === 'select');
  const textFields = fields.filter(({ type }) => type === 'text');

  it('POS:Agent Search Input Text / Label', () =>
    cy.wrap(fields).each(({ name, label }) => cy.findDataTag(`${name}_label`).should('contain', label))
      .wrap(selectFields).each(({ name, selected }) =>
        cy.findDataTag(name).should('have.attr', 'data-selected', selected)
    ).wrap(textFields).each(({ name, placeholder }) =>
      cy.findDataTag(name).should('have.attr', 'placeholder', placeholder)
    )
  );

  it('POS:Agent Search Button', () =>
    cy.findDataTag('submit').should('have.attr', 'type', 'submit')
      .checkHeader({ name: 'submit', text: 'Search', icon: 'fa fa-search' })
  );

  it('POS:Agent Search', () =>
    cy.findDataTag('submit').click()
      .get('.agent-list').children().each($card =>
        cy.checkAgentCard($card, agentCard)
      )
  );
});
