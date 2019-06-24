import _get from 'lodash/get';
import _find from 'lodash/find';

export const getAnswers = (name, questions) => {
  if (!questions) return [];
  return questions[name] ? questions[name].answers || [] : [];
};

export const getQuestionName = (key, questions) => {
  if (!questions) return '';
  const name = questions[key] ? questions[key].question || '' : '';
  return Array.isArray(name) ? name[0] : name;
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
