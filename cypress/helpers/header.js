// Useful functions for checking header details

/**
 * 
 * @param {string} name 
 * @param {string} content 
 */
export const checkHeaderSection = (name, content) => cy.findDataTag(name).find('dl > div')
  .children().each(($child, i) => cy.wrap($child).should('contain', content[i]));

/**
 * 
 * @param {Object} data
 * @param {Object} options 
 * @param {boolean} quote 
 */
export const checkFullHeader = (
  data,
  { premium = true, mailingComplete = true, application = true } = {},
  quote = true
) => {
  const {
    name,
    phone,
    mAddress,
    m2Address = m2Address || '',
    mCity,
    mSt,
    mZip,
    pAddress = pAddress || mAddress || '',
    p2Address = p2Address || m2Address || '',
    pCity = pCity || mCity || '',
    pSt = pSt || mSt || '',
    pZip = pZip || mZip || '',
    county = county || mCity || pCity || '',
    territory,
    effDate,
    expDate
  } = data;

  if (quote) {
    checkHeaderSection('quoteDetails', ['HO3 Homeowners', '12-', application ? 'Application Started' : 'Quote Started']);
  } else {
    checkHeaderSection('policyDetails', ['HO3 Homeowners', '12-', 'Policy Issued']);
    checkHeaderSection('cancellationDetail', ['Expiration Date', expDate]);
    cy.findDataTag('effectiveDateDetail').find('dl div dt button').should('contain', 'Edit');
  }
  checkHeaderSection('policyHolderDetail', ['Policy Holder', name, phone]);
  checkHeaderSection('mailingAddressDetail', mailingComplete ? ['Mailing Address', mAddress, m2Address, `${mCity}, ${mSt} ${mZip}`] : ['Mailing Address']);
  checkHeaderSection('propertyAddressDetail', ['Property Address', pAddress, p2Address, `${pCity}, ${pSt} ${pZip}`]);
  checkHeaderSection('countyDetail', ['Property County', county]);
  checkHeaderSection('territoryDetail', ['Territory', territory]);
  checkHeaderSection('constructionTypeDetail', ['Construction Type', 'MASONRY']);
  checkHeaderSection('effectiveDateDetail', ['Effective Date', effDate]);
  checkHeaderSection('currentPremiumDetail', ['Premium', premium ? '$' : '--']);
};