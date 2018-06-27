// import _ from "lodash";
import { getAnswers } from "./forms";

export const getMortgageeOrderAnswers = (questions, additionalInterests) => {
  const orderAnswers = getAnswers('order', questions);
  if (!additionalInterests || !Array.isArray(additionalInterests)) return orderAnswers;

  const activeMortgagees = additionalInterests.filter(ai => ai.type === 'Mortgagee' && ai.active);
  return orderAnswers.filter(answer => Number(answer.answer) === activeMortgagees.length);
};

export const getMortgageeOrderAnswersForEdit = (questions, additionalInterests) => {
  const orderAnswers = getAnswers('order', questions);
  if (!additionalInterests || !Array.isArray(additionalInterests)) return orderAnswers;

  const activeMortgagees = additionalInterests.filter(ai => ai.type === 'Mortgagee' && ai.active);
  return orderAnswers.filter(answer => Number(answer.answer) < (activeMortgagees.length));
};

