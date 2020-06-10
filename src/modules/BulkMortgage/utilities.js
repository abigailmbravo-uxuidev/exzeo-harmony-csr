import { DEFAULT_COUNTRY } from '../../constants/address';
import { date } from '@exzeo/core-ui';
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

export function formatCreateJob(data, queuedMortgagees) {
  const policies = queuedMortgagees.map(m => ({
    policyNumber: m.policyNumber,
    additionalInterestId: m._id,
    newBillTo: m.newBillTo,
    referenceNumber: m.referenceNumber
  }));

  const { name1, name2, mailingAddress } = data;

  mailingAddress.zipExtension = '';
  mailingAddress.country = DEFAULT_COUNTRY;

  return {
    additionalInterest: {
      name1,
      name2,
      mailingAddress,
      type: 'Mortgagee',
      active: true
    },
    policies
  };
}

export function formatMortgagees(result, queuedMortgagees) {
  if (!result || !Array.isArray(result.policies)) return [];

  return result.policies
    .filter(p => p.status !== 8)
    .reduce((acc, p) => {
      const primaryPolicyHolder = p.policyHolders[0];

      const mortgagees = p.additionalInterests.filter(
        ai => ai.type === 'Mortgagee' && ai.active
      );

      const existingPolicy = queuedMortgagees.some(
        q => !q._id && p.policyNumber === q.policyNumber
      );

      if (mortgagees.length) {
        mortgagees.forEach(m => {
          const existingMortgagee = queuedMortgagees.some(q => m._id === q._id);
          if (!existingMortgagee) {
            acc.push({
              ...m,
              companyCode: p.companyCode,
              product: p.product,
              propertyAddress: p.property.physicalAddress,
              policyNumber: p.policyNumber,
              policyHolderName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
              currentBillTo: m._id === p.billToId
            });
          }
        });
      } else {
        if (!existingPolicy) {
          acc.push({
            noMortgagee: true,
            companyCode: p.companyCode,
            product: p.product,
            propertyAddress: p.property.physicalAddress,
            policyNumber: p.policyNumber,
            policyHolderName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
            currentBillTo: false
          });
        }
      }
      return acc;
    }, []);
}

export function setMortgageeInitialValues(results) {
  const initialValues = {};
  if (!results || !Array.isArray(results)) return initialValues;

  results.forEach(m => {
    initialValues[m._id] = m;
  });
  return initialValues;
}

export const isValidRange = value => {
  if (!value?.start && !value?.end) return undefined;

  return date.moment(value.start).isSameOrBefore(value.end)
    ? undefined
    : 'Not a valid date range';
};

export const downloadJob = job => {
  const headers = ['Policy Number', 'Mortgagee', 'New Bill To', 'Status'];

  const arr = job.policies.map(p => [
    p.policyNumber,
    `"${job.additionalInterest.name1}"`,
    p.newBillTo ? ' Yes' : 'No',
    p.status
  ]);

  arr.unshift(headers);
  const csv = arr.join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const blobUrl = window.URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = blobUrl;
  link.download = `job-${job._id}.csv`;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
};
