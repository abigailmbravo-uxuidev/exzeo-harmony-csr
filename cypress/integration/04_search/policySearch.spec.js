import { setRouteAliases, confirmPolicyOrQuote } from '../../helpers';

const fields = [
  { name: 'firstName', data: 'batman' },
  { name: 'lastName', data: 'robin' },
  { name: 'address', data: 'test' }
];

describe('Policy Search testing', () => {
  const selectPolicySearch = () => cy.findDataTag('policy-link').click();
  // TODO unwrap this test suite to run in CI when ready
  if (Cypress.env('CI')) {
    it('Skip test due to environment', () => {
      cy.task('log', 'CI === true: not running search/policy specs');
    });
  } else {
    before('Login', () => cy.login());

    beforeEach('Set route aliases', () => {
      setRouteAliases();
      selectPolicySearch();
    });

    it('POS:Policy Search', () => {
      cy.clickSubmit()
        .wait('@fetchPolicies')
        .findDataTag('policy-list')
        .children()
        .should('exist')

        .findDataTag('firstName')
        .type('{selectall}{backspace}batman', { force: true })
        .clickSubmit()
        .wait('@fetchPolicies')
        .findDataTag('policy-list')
        .children()
        .should('exist')

        .findDataTag('lastName')
        .type('{selectall}{backspace}robin', { force: true })
        .clickSubmit()
        .wait('@fetchPolicies')
        .findDataTag('policy-list')
        .children()
        .should('exist')

        .findDataTag('address')
        .type('{selectall}{backspace}2609', { force: true })
        .clickSubmit()
        .wait('@fetchPolicies')
        .findDataTag('policy-list')
        .children()
        .should('exist')

        .findDataTag('policyNumber')
        .type('{selectall}{backspace}12-1015124-01', { force: true })
        .clickSubmit()
        .wait('@fetchPolicies')
        .findDataTag('policy-list')
        .children()
        .should('exist')

        .findDataTag('policyStatus')
        .select('Cancelled')
        .clickSubmit()
        .wait('@fetchPolicies')
        .findDataTag('policy-list')
        .children()
        .should('exist');
    });

    it('POS:Paginates', () => {
      cy.reload()
        .clickSubmit()
        .wait('@fetchPolicies')
        .findDataTag('page-forward')
        .click()
        .wait('@fetchPolicies')
        .then(({ response }) => expect(response.body.currentPage).to.equal(2));
    });

    it('Policy 3-field search', () => {
      cy.reload()
        .fillFields(fields)
        .clickSubmit('#SearchBar')
        .wait('@fetchPolicies')
        .then(({ response }) =>
          confirmPolicyOrQuote(response.body.policies, fields)
        )
        .findDataTag('page-forward')
        .click()
        .wait('@fetchPolicies')
        .then(({ response }) =>
          confirmPolicyOrQuote(response.body.policies, fields)
        )
        .get('input[name="pageNumber"]')
        .should('have.value', '2');
    });

    // TODO this test relies on some Batman Robin policies, which is not ideal. Once we have sufficient Policy testing, this test should be run on one of the Policies resulting from tests.
    it('Policy Search Sorting', () => {
      cy.clearAllText(fields)
        .fillFields([{ name: 'firstName', data: 'batman' }])
        .findDataTag('sortBy')
        .select('firstName', { force: true })
        .clickSubmit('#SearchBar')
        .wait('@fetchPolicies')
        .then(({ response }) =>
          expect(
            response.body.policies[0].policyHolders[0].firstName.charAt(0)
          ).to.match(/b/i)
        );
    });
  }
});
