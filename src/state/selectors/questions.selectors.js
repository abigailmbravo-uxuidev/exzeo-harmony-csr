import { createSelector } from 'reselect';

const getQuestions = state => state.questions;

export const getTopMortgageeAnswers = createSelector(
  [getQuestions],
  (questions) => {
    if (!questions) return [];

    const mortgagees = (questions.mortgagee || {}).answers;

    if (mortgagees) {
      return mortgagees.map(answer => ({
        ...answer,
        // api gives us the zip as a number, but requires zip to be a string when we post.
        AIZip: String(answer.AIZip),
        // needed for the TypeAhead
        displayText: `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`
      }));
    }
    return [];
  }
);
