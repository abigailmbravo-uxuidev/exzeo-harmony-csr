import { goToNav, _underwriting, _mailingBilling } from '../../support/navigation';

describe('Quote State Testing', () => {
  const underwriting = {
    "rented": "Yes",
    "previousClaims": "No claims ever filed",
    "monthsOccupied": "10+",
    "business": "No"
  };
  const checkQuoteState = content => cy.findDataTag('quoteDetails').find('.status').should('contain', content);

  before(() => cy.workflow('coverage'));

  it('Quote State', () => {
    checkQuoteState('Quote Started');

    cy.workflow('underwriting', 'coverage');
    _underwriting(underwriting);
    checkQuoteState('Quote Stopped');

    cy.workflow('mailingBilling', 'underwriting')
      .findDataTag('add-additional-interests').find('button').first().click()
      .get('.Select.TypeAhead .react-select__value-container .react-select__input input').type('amer', { force: true })
      .get('.react-select__menu-list div').first().click()
      .findDataTag('ai-modal-submit').click();
    checkQuoteState('Application Started');

    cy.get('.card .Delete-btn').click().wait('@csrAdditionalInterest')
      .workflow('notesFiles', 'additionalInterests');
    checkQuoteState('Application Started');

    cy.workflow(undefined, 'notesFiles');
    checkQuoteState('Application Sent DocuSign');
  });
});
