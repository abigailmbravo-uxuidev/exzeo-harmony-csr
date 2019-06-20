import _get from 'lodash/get';
import _find from 'lodash/find';

export const getAnswers = (name, questions) => {
  if (!questions) return [];
  return questions[name] ? questions[name].answers || [] : [];
};

export const getQuestionName = (name, questions) => {
  if (!questions) return '';
  return questions[name] ? questions[name].question || '' : '';
};

// TODO remove these once underwriting questions are moved from service
export const getUnderwritingAnswers = (name, questions) =>
  _get(_find(questions, { name }), 'answers') || [];
export const getUnderwritingQuestionName = (name, questions) =>
  _get(_find(questions, { name }), 'question', '');

export default {
  getAnswers,
  getQuestionName,
  getUnderwritingAnswers,
  getUnderwritingQuestionName
};
