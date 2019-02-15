import _ from 'lodash'; //eslint-disable-line
// import { stubQuoteWithUnderwriting, _underwriting, _newQuote, _coverage, _mailingBilling } from '../../helpers';
import { stubQuoteWithUnderwriting, _newQuote } from '../../helpers';
import routes from '../../support/routes';
// import pH1 from '../../fixtures/stockData/underwriting.json';

describe('Quote State Testing', () => {
  // const underwritingData = {
  //   "rented": "Yes",
  //   "previousClaims": "No claims ever filed",
  //   "monthsOccupied": "10+",
  //   "business": "No"
  // };
  const checkQuoteState = content => cy.findDataTag('quoteDetails').find('.status').should('contain', content);

  before(() => {
    routes();
    cy.login();
    _newQuote();
  })

  it('Quote State', () => {
    cy.fixture('stubs/csrGetQuoteWithUnderwriting').then(fx => {
      checkQuoteState('Quote Started');

      const stoppedFx = _.cloneDeep(fx);
      stubQuoteWithUnderwriting(stoppedFx, { quoteState: 'Quote Stopped' });
      cy.reload();
      checkQuoteState('Quote Stopped');

      const applicationFx = _.cloneDeep(stoppedFx);
      stubQuoteWithUnderwriting(applicationFx, { quoteState: 'Application Started' });
      cy.reload();
      checkQuoteState('Application Started');

      const sentFx = _.cloneDeep(applicationFx);
      stubQuoteWithUnderwriting(sentFx, { quoteState: 'Application Sent DocuSign' });
      cy.reload();
      checkQuoteState('Application Sent DocuSign');
    });


    // cy.workflow('underwriting', 'coverage');
    // _underwriting(underwriting);
    // checkQuoteState('Quote Stopped');

    // cy.workflow('mailingBilling', 'underwriting')
    //   .findDataTag('add-additional-interests').find('button').first().click()
    //   .get('.Select.TypeAhead .react-select__value-container .react-select__input input').type('amer', { force: true })
    //   .get('.react-select__menu-list div').first().click()
    //   .findDataTag('ai-modal-submit').click();
    // checkQuoteState('Application Started');

    // cy.get('.card .Delete-btn').click().wait('@csrAdditionalInterest')
    //   .workflow('notesFiles', 'additionalInterests');
    // checkQuoteState('Application Started');

    // cy.workflow(undefined, 'notesFiles');
    // checkQuoteState('Application Sent DocuSign');
  });
});
