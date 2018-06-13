export const getAnswers = (name, questions) => questions[name] ? (questions[name].answers || []) : [];

export const getQuestionName = (name, questions) => questions[name] ? (questions[name].question || '') : '';

export default {
  getAnswers,
  getQuestionName
}
