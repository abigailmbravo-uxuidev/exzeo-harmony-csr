import moment from 'moment';
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

export function formatMortgagees(result, queuedMortgagees) {
  if (!result || !Array.isArray(result.policies)) return [];

  return result.policies.reduce((acc, p) => {
    if (!p.additionalInterests.length) return acc;
    const primaryPolicyHolder = p.policyHolders[0];

    const mortgagees = p.additionalInterests.filter(
      ai => ai.type === 'Mortgagee' && ai.active
    );

    if (mortgagees.length) {
      mortgagees.forEach(m => {
        const existingMortgageeInQueue = queuedMortgagees.some(
          q => m._id === q._id
        );
        if (!existingMortgageeInQueue) {
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

  return moment(value.start).isSameOrBefore(value.end)
    ? undefined
    : 'Not a valid date range';
};

export const filterJobs = ({
  jobResults,
  jobNumber,
  completedBy,
  mortgageeName,
  dateRange
}) => {
  const filter = [];
  if (jobNumber) {
    filter.push(j => j._id.includes(jobNumber));
  }
  if (mortgageeName) {
    filter.push(j =>
      j.additionalInterest.name1
        .toLocaleLowerCase()
        .includes(mortgageeName.toLocaleLowerCase())
    );
  }

  if (completedBy) {
    const completedByAnsers = completedBy.map(c => c.answer);
    filter.push(j => completedByAnsers.includes(j.updatedBy.userName));
  }

  return jobResults.filter(d => {
    return filter.every(c => {
      return c(d);
    });
  });
};

export const downloadJob = job => {
  const headers = ['Policy Number', 'Mortgagee', 'New Bill To', 'Status'];

  const arr = job.policyNumbers.map(p => [
    p.policyNumber,
    job.additionalInterest.name1,
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
