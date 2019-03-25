import policy from '../../fixtures/stockData/policy.json';
import quote from '../../fixtures/stockData/quote.json';

export default (type, num = 1, currentPage = 1) => {
  const updatedResults = Array(num > 25 ? 25 : num);
  let updates
  switch (type) {
    case 'policies':
    updatedResults.fill(policy);
      cy.setFx('stubs/fetchPolicies', [
        ['policies', updatedResults],
        ['totalNumberOfRecords', num],
        ['currentPage', currentPage]
      ]);
    break;
  case 'quotes':
    updatedResults.fill(quote);
    cy.setFx('stubs/fetchQuotes', [
      ['result.quotes', updatedResults],
      ['result.totalNumberOfRecords', num],
      ['result.currentPage', currentPage]
    ])
    break;
  default:
    return;
  }
};
