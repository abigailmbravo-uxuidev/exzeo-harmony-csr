export const confirmPolicyOrQuote = (quoteOrPolicyArray, fields) => {
  const stringToRegex = str => new RegExp(str, 'i');
  const firstName = stringToRegex(fields.find(({ name }) => name === 'firstName').data);
  const lastName = stringToRegex(fields.find(({ name }) => name === 'lastName').data);
  const address = stringToRegex(fields.find(({ name }) => name === 'address').data);

  quoteOrPolicyArray.forEach(obj => {
    expect(obj.policyHolders[0].firstName).to.match(firstName);
    expect(obj.policyHolders[0].lastName).to.match(lastName);
    expect(obj.property.physicalAddress.address1).to.match(address);
  });
};
