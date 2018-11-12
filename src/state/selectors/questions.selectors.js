import { createSelector } from 'reselect';

import { TAGS } from '../../constants/diaries';

export const getQuestions = state => state.questions;

export const getLists = state => state.questions.lists;

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

export const getDiaryAssigneeAnswers = createSelector(
  [getQuestions],
  (questions) => {
    if (!questions || !Array.isArray(questions.diaryAssignees)) return [];

    return [...questions.diaryAssignees, ...TAGS];
  }
);


export const getListAnswers = createSelector(
  [getLists],
  (lists) => {
    if (!lists) return [];

    const mainList = {};

    const listItems = Object.keys(lists);

    listItems.forEach((item) => {
      mainList[item] = Object.keys(lists[item].extendedProperties || {}).map((key) => {
        return { answer: key, label: lists[item].extendedProperties[key].displayText };
      }) || [];
    });
    return mainList;
  }
);
