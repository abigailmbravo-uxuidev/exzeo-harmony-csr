export const additionalInterestRank = additionalInterests => {
  // add rank to sort by a specific way
  if (!Array.isArray(additionalInterests)) return;

  additionalInterests.forEach(value => {
    switch (value.type) {
      case 'Mortgagee':
        value.rank = 1; // eslint-disable-line
        break;
      case 'Additional Insured':
        value.rank = 2; // eslint-disable-line
        break;
      case 'Additional Interest':
        value.rank = 3; // eslint-disable-line
        break;
      case 'Lienholder':
        value.rank = 4; // eslint-disable-line
        break;
      case 'Bill Payer':
        value.rank = 5; // eslint-disable-line
        break;
      default:
        break;
    }
  });
};

export default additionalInterestRank;
