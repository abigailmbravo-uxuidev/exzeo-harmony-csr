import stubAllRoutes from '../../support/stubAllRoutes';
import { fields, diaryCard } from './diariesSearchFields';

describe('Diaries Search Testing', () => {
  const selectDiariesSearch = () => cy.findDataTag('diaries-link').click();

  before(() => {
    stubAllRoutes();
    cy.login();
  });

  beforeEach(() => {
    stubAllRoutes();
    selectDiariesSearch();
  });

  const selectFields = fields.filter(({ type }) => type === 'select');
  const typeAheadFields = fields.filter(({ type }) => type === 'select-typeahead');

  it('POS:Diaries Search Input / Text', () =>
    cy.get('div[role="banner"] > nav').find('a[aria-current="true"]').should('contain', 'Diaries')
      .wrap(fields).each(({ name, label }) => cy.findDataTag(`${name}_label`).should('contain', label))
      .wrap(selectFields).each(({ name, selected }) =>
        cy.findDataTag(name).should('have.attr', 'data-selected', selected)
      ).wrap(typeAheadFields).each(field => cy.checkSelectTypeahead(field))
  );

  it('POS:Diaries Search Button', () =>
    cy.findDataTag('submit').should('have.attr', 'type', 'submit')
      .checkHeader({ name: 'submit', text: 'Search', icon: 'fa fa-search' })
  );

  it('Diaries Search Dropown Text', () =>
    cy.wrap(selectFields).each(field => cy.checkSelect(field))
  );

  it('POS:Diaries Search', () =>
    cy.findDataTag('submit').click()
      .get('.diary-list').children().each($card =>
        cy.checkDiaryCard($card, diaryCard)
      )
  );
});
