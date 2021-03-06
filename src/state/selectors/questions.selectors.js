import { createSelector } from 'reselect';
import { getDiaryOptions } from './entity.selectors';

export const getQuestions = state => state.questions;

export const getLists = state => state.questions.lists;

export const getTopAnswers = name =>
  createSelector([getQuestions], questions => {
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
  });

export const getDiaryAssigneeAnswers = createSelector(
  [getQuestions, getDiaryOptions],
  (questions, getDiaryOptions) => {
    if (!questions || !Array.isArray(questions.diaryAssignees))
      return getDiaryOptions.tags;

    return [...getDiaryOptions.tags, ...questions.diaryAssignees];
  }
);

export const getListAnswers = createSelector([getLists], lists => {
  const listObject = {};
  if (!lists || Object.keys(lists).length === 0) return [];
  Object.keys(lists).forEach(key => {
    const listItem = lists[key];
    listObject[key] = listItem.map(li => ({
      answer: li.key,
      label: li.displayText
    }));
  });
  return listObject;
});

export const getListAnswersAsKey = createSelector([getLists], lists => {
  const listObject = {};
  if (!lists || Object.keys(lists).length === 0) return [];
  Object.keys(lists).forEach(key => {
    const listItem = lists[key];
    listObject[key] = listItem.map(li => ({ answer: li.key, label: li.key }));
  });
  return listObject;
});
