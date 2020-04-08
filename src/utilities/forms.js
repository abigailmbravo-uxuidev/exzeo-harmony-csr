export const getAnswers = (name, questions) => {
  if (!questions) return [];
  return questions[name] ? questions[name].answers || [] : [];
};

export const getQuestionName = (key, questions) => {
  if (!questions) return '';
  const name = questions[key] ? questions[key].question || '' : '';
  return Array.isArray(name) ? name[0] : name;
};

export default {
  getAnswers,
  getQuestionName
};
