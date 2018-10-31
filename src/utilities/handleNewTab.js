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
    window.open(`/agency/${resource.agencyCode}/0/overview`, '_blank');
  }
}

export function handleNewTabClick(resourceId, type) {
  const formattedType = String(type).toLowerCase();
  if (formattedType === 'quote') {
    window.open(`/quote/${resourceId}/coverage`, '_blank');
    // policy
  } else if (formattedType === 'policy') {
    window.open(`/policy/${resourceId}/coverage`, '_blank');
    // agency
  } else if (formattedType === 'agency' || formattedType === 'agent') {
    window.open(`/agency/${resourceId}/staff`, '_blank');
  }
}

export function handleKeyPress(event, resourceId, type) {
  if (event.charCode === 13) {
    handleNewTabClick(resourceId, type);
  }
}

export default handleNewTab;
