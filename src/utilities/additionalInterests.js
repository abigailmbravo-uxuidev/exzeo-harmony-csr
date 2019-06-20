// import _ from "lodash";
import { getAnswers } from './forms';

export const getMortgageeOrderAnswers = (questions, additionalInterests) => {
  const orderAnswers = getAnswers('order', questions);
  if (!additionalInterests || !Array.isArray(additionalInterests))
    return orderAnswers;

  const activeMortgagees = additionalInterests.filter(
    ai => ai.type === 'Mortgagee' && ai.active
  );
  return orderAnswers.filter(
    answer => Number(answer.answer) === activeMortgagees.length
  );
};

export const getMortgageeOrderAnswersForEdit = (
  questions,
  additionalInterests
) => {
  const orderAnswers = getAnswers('order', questions);
  if (!additionalInterests || !Array.isArray(additionalInterests))
    return orderAnswers;

  const activeMortgagees = additionalInterests.filter(
    ai => ai.type === 'Mortgagee' && ai.active
  );
  return orderAnswers.filter(
    answer => Number(answer.answer) < activeMortgagees.length
  );
};

export const applyAdditionalInterestRanking = (
  additionalInterests,
  sortActive = false
) => {
  if (!Array.isArray(additionalInterests)) return;
  // add rank for sorting
  additionalInterests.forEach(value => {
    if (sortActive) {
      value.sortInactive = !value.active;
    }

    switch (value.type) {
      case 'Mortgagee':
        value.rank = 1;
        break;
      case 'Additional Insured':
        value.rank = 2;
        break;
      case 'Additional Interest':
        value.rank = 3;
        break;
      case 'Lienholder':
        value.rank = 4;
        break;
      case 'Bill Payer':
        value.rank = 5;
        break;
      default:
        break;
    }
  });
};
