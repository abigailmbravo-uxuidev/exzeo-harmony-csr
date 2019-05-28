import policy from '../../fixtures/stockData/policy.json';
import quote from '../../fixtures/stockData/quote.json';
import agency from '../../fixtures/stockData/agency.json';

export default (type, totalResults = 1, currentPage) => {
  // If we are not given a page, go to the last page
  if (!currentPage) currentPage = Math.ceil(totalResults / 25);

  // Determine if we are on the last page or not, and either give remainder or 25
  const updatedResults = Array(currentPage === Math.ceil(totalResults / 25) ? totalResults - (currentPage - 1)*25 : 25);

  switch (type) {
    case 'policies':
    updatedResults.fill(policy);
      cy.setFx('stubs/fetchPolicies', [
        ['policies', updatedResults],
        ['totalNumberOfRecords', totalResults],
        ['currentPage', currentPage]
      ]);
    break;
  case 'quotes':
    updatedResults.fill(quote);
    cy.setFx('stubs/fetchQuotes', [
      ['result.quotes', updatedResults],
      ['result.totalNumberOfRecords', totalResults],
      ['result.currentPage', currentPage]
    ]);
    break;
  case 'agencies':
    updatedResults.fill(agency);
    cy.setFx('stubs/fetchAgencies', ['result', updatedResults]);
    break;
  default:
    return;
  }
};
