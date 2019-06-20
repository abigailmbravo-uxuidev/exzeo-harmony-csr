import { createSelector } from 'reselect';

const getUnderwritingQuestions = state => state.service.underwritingQuestions;

export const getFormattedUWQuestions = createSelector(
  [getUnderwritingQuestions],
  underwritingQuestions => {
    if (!Array.isArray(underwritingQuestions)) return [];

    return underwritingQuestions
      .sort((a, b) => a.order - b.order)
      .map(question => {
        const defaultValue = (question.answers || []).find(
          answer => answer.default
        );
        return {
          name: question.name,
          hidden: question.hidden,
          label: question.question,
          defaultValue: defaultValue ? defaultValue.answer : '',
          validation: ['isRequired'],
          options: (question.answers || []).map(answer => ({
            answer: answer.answer,
            label: answer.answer
          }))
        };
      });
  }
);
