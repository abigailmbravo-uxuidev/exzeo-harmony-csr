import _get from 'lodash/get';
import _find from 'lodash/find';

export const getAnswers = (name, questions) => _get(_find(questions, { name }), 'answers') || [];

export const getQuestionName = (name, questions) => _get(_find(questions, { name }), 'question', '');

export default {
  getAnswers,
  getQuestionName
}
