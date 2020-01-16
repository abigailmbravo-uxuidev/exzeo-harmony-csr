export function handleNewTab(resource, type, product) {
  // new quote
  if (type === 'address') {
    window.open(
      `/quote/new/${resource.companyCode}/${resource.physicalAddress.state}/${product}/${resource.id}`,
      '_blank'
    );
    // quote
  } else if (type === 'quote') {
    window.open(`/quote/${resource.quoteNumber}/coverage`, '_blank');
    // policy
  } else if (type === 'policy') {
    window.open(`/policy/${resource.policyNumber}/coverage`, '_blank');
    // agency
  } else if (type === 'agency') {
    window.open(`/agency/${resource.agencyCode}/0/overview`, '_blank');
  } else if (
    type === 'agent' &&
    Array.isArray(resource.agencies) &&
    resource.agencies.length > 0
  ) {
    const agency = resource.agencies[0];
    const branchCodes =
      resource.agencies &&
      resource.agencies.map(agency =>
        agency.branchCode ? agency.branchCode : 0
      );
    window.open(
      `/agency/${agency.agencyCode}/${branchCodes[0]}/overview`,
      '_blank'
    );
  }
}

export function handleDiaryClick(resourceId, type) {
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

export function handleDiaryKeyPress(event, resourceId, type) {
  if (event.charCode === 13) {
    handleDiaryClick(resourceId, type);
  }
}

export default handleNewTab;
