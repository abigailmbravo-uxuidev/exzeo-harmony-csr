/**
 *
 * @param {AdditionalInterestAnswers[]} answers
 * @returns {array|*}
 */
export function formatTopAnswers(answers) {
  if (!answers) return [];

  return answers.map(answer => ({
    ...answer,
    AIZip: String(answer.AIZip),
    id: String(answer.ID),
    label: `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`
  }));
}

export function formatMortgagees(result) {
  if (!result || !Array.isArray(result.policies)) return [];

  return result.policies.reduce((acc, p) => {
    if (!p.additionalInterests.length) return acc;
    const primaryPolicyHolder = p.policyHolders[0];

    const mortgagees = p.additionalInterests.filter(
      ai => ai.type === 'Mortgagee' && ai.active
    );
    mortgagees.forEach(m => {
      acc.push({
        ...m,
        product: p.product,
        propertyAddress: p.property.physicalAddress,
        policyNumber: p.policyNumber,
        policyHolderName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
        currentBillTo: m._id === p.billToId
      });
    });
    return acc;
  }, []);
}
