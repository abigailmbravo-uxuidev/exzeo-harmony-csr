import { setRouteAliases } from '../../helpers';

describe('Policy Search testing', () => {
  const selectAgencySearch = () => cy.findDataTag('agency-link').click();

  before('Login', () => cy.login());

  beforeEach('Set aliases and go to agency search', () => {
    setRouteAliases();
    selectAgencySearch();
  });

  it('POS:Agency Search', () =>
    cy.clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')

      .findDataTag('agencyCode').type('{selectall}{backspace}20532', { force: true })
      .clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')

      .findDataTag('displayName').type('{selectall}{backspace}advantage')
      .clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')

      .findDataTag('address').type('{selectall}{backspace}123')
      .clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')

      .findDataTag('displayName').type('{selectall}{backspace}advantage')
      .clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')

      .findDataTag('licenseNumber').type('{selectall}{backspace}L070378')
      .clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')

      .findDataTag('fein').type('{selectall}{backspace}593696')
      .clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')

      .findDataTag('phone').type('{selectall}{backspace}72')
      .clickSubmit().wait('@fetchAgencies')
      .get('.agency-list').children().should('exist')
  );
});
