import { setRouteAliases } from '../../helpers';

describe('Diaries Search Testing', () => {
  const selectDiariesSearch = () => cy.findDataTag('diaries-link').click();

  before('Login', () => cy.login());

  beforeEach('Set aliases and go to diaries search', () => {
    setRouteAliases();
    selectDiariesSearch();
  });

  it('POS:Diaries Search', () =>
    cy.clickSubmit().wait('@fetchDiaries')
      .get('.diary-list').children().should('exist')

      .findDataTag('status').select('false')
      .clickSubmit().wait('@fetchDiaries')
      .get('.diary-list').children().should('exist')

      .findDataTag('reason').select('information_needed')
      .clickSubmit().wait('@fetchDiaries')
      .get('.diary-list').children().should('exist')

      .findDataTag('date-range-min').type('2010-01-01')
      .findDataTag('date-range-max').type('2020-01-01')
      .clickSubmit().wait('@fetchDiaries')
      .get('.diary-list').children().should('exist')
  );
});
