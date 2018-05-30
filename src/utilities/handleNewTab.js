function handleNewTab(searchData, searchType) {
  localStorage.setItem('isNewTab', 'true');

  // new quote
  if (searchType === 'address') {
    localStorage.setItem('stateCode', searchData.physicalAddress.state);
    localStorage.setItem('igdID', searchData.id);
    window.open('/quote/coverage', '_blank');
    // quote
  } else if (searchType === 'quote') {
    localStorage.setItem('quoteId', searchData._id);
    window.open('/quote/coverage', '_blank');
    // policy
  } else if (searchType === 'policy') {
    localStorage.setItem('policyNumber', searchData.policyNumber);
    window.open('/policy/coverage', '_blank');
    // agency
  } else if (searchType === 'agency' || searchType === 'agent') {
    localStorage.setItem('agencyCode', searchData.agencyCode);
    window.open('/agency/staff', '_blank');
  }
}

export default handleNewTab
