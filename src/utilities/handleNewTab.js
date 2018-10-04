export function handleNewTab(resource, type) {
  // new quote
  if (type === 'address') {
    window.open(`/quote/new/${resource.physicalAddress.state}/${resource.id}`, '_blank');
    // quote
  } else if (type === 'quote') {
    window.open(`/quote/${resource._id}/coverage`, '_blank');
    // policy
  } else if (type === 'policy') {
    window.open(`/policy/${resource.policyNumber}/coverage`, '_blank');
    // agency
  } else if (type === 'agency' || type === 'agent') {
    window.open(`/agency/${resource.agencyCode}/staff`, '_blank');
  }
}

export default handleNewTab;
