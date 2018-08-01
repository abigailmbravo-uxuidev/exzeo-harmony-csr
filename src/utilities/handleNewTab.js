export function handleNewTab(searchData, searchType) {

  // new quote
  if (searchType === 'address') {
    window.open(`/quote/new/${searchData.physicalAddress.state}/${searchData.id}`, '_blank');
    // quote
  } else if (searchType === 'quote') {
    window.open(`/quote/${searchData._id}`, '_blank');
    // policy
  } else if (searchType === 'policy') {
    window.open(`/policy/${searchData.policyNumber}/coverage`, '_blank');
    // agency
  } else if (searchType === 'agency' || searchType === 'agent') {
    localStorage.setItem('agencyCode', searchData.agencyCode);
    window.open('/agency/staff', '_blank');
  }
}

export default handleNewTab
