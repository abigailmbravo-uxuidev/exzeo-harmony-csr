import { createSelector } from 'reselect';

const getQuestions = state => state.questions;

export const getTopAnswers = name => createSelector(
  [getQuestions],
  (questions) => {
    if (!questions) return [];

    const topAnswers = (questions[name] || {}).answers;

    if (topAnswers) {
      return topAnswers.map(answer => ({
        ...answer,
        // api gives us the zip as a number, but requires zip to be a string when we post.
        id: String(answer.ID),
        // needed for the TypeAhead
        label: `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`
      }));
    }
    return [];
  }
);
