import { createSelector } from "reselect";

const getQuestions = state => state.questions;

export const getTopMortgageeAnswers = createSelector(
  [getQuestions],
  (questions) => {
    const mortgagees = (questions['mortgagee'] || {}).answers;

    if (mortgagees) {
      return mortgagees.map(answer => ({
        ...answer,
        AIZip: String(answer.AIZip),
        displayText: `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`
      }));
    }
    return [];
  }
);
