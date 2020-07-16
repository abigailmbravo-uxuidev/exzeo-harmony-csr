import { setRouteAliases } from '../../helpers';

describe('Agent Search Testing', () => {
  const selectAgentSearch = () =>
    cy
      .findDataTag('agency-link')
      .click()
      .findDataTag('searchType')
      .select('agent', { force: true });

  before('Login', () => cy.login());

  beforeEach('Set aliases and go to agent search', () => {
    setRouteAliases();
    selectAgentSearch();
  });

  it('POS:Agent Search', () =>
    cy
      .clickSubmit()
      .wait('@fetchAgents')
      .findDataTag('agent-list')
      .children()
      .should('exist')

      .findDataTag('agentCode')
      .type('{selectall}{backspace}60033', { force: true })
      .clickSubmit()
      .wait('@fetchAgents')
      .findDataTag('agent-list')
      .children()
      .should('exist')

      .findDataTag('firstName')
      .type('{selectall}{backspace}brian')
      .clickSubmit()
      .wait('@fetchAgents')
      .findDataTag('agent-list')
      .children()
      .should('exist')

      .findDataTag('lastName')
      .type('{selectall}{backspace}chapman')
      .clickSubmit()
      .wait('@fetchAgents')
      .findDataTag('agent-list')
      .children()
      .should('exist')

      .findDataTag('address')
      .type('{selectall}{backspace}tamiami')
      .clickSubmit()
      .wait('@fetchAgents')
      .findDataTag('agent-list')
      .children()
      .should('exist')

      .findDataTag('licenseNumber')
      .type('{selectall}{backspace}E079822')
      .clickSubmit()
      .wait('@fetchAgents')
      .findDataTag('agent-list')
      .children()
      .should('exist'));
});
