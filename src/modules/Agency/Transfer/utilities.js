/**
 *
 * @param {array} entities
 * @returns {{companyCode: string, state: string, product: string}[]}
 */
export const filterCSPList = (entities = []) => {
  return entities.reduce((acc, e) => {
    if (
      !acc.find(
        obj =>
          obj.companyCode === e.companyCode &&
          obj.state === e.state &&
          obj.product === e.product
      )
    ) {
      acc.push({
        companyCode: e.companyCode,
        state: e.state,
        product: e.product
      });
    }
    return acc;
  }, []);
};

/**
 *
 * @param {array} array
 * @returns {[]}
 */
export const groupPolicyByAgentCode = array => {
  const sorted = {};
  for (let i = 0, max = array.length; i < max; i++) {
    if (sorted[String(array[i].agentCode)] === undefined) {
      sorted[String(array[i].agentCode)] = [];
    }
    sorted[String(array[i].agentCode)].push(array[i]);
  }
  return sorted;
};
