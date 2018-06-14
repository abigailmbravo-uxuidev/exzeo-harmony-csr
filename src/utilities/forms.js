export const getAnswers = (name, questions) => {
  if (!questions) return [];
  return questions[name] ? (questions[name].answers || []) : [];
};

export const getQuestionName = (name, questions) => {
  if (!questions) return '';
  return questions[name] ? (questions[name].question || '') : '';
};

export default {
  getAnswers,
  getQuestionName
}
