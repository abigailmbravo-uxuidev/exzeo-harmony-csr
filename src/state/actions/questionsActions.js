import * as serviceRunner from '../../utilities/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

export function setQuestions(questions) {
  return {
    type: types.SET_QUESTIONS,
    questions
  };
}

export function getUIQuestions(step) {
  return async (dispatch) => {
    try {
      const data = {step};
      const response = await serviceRunner.callQuestions(data);
      const questions = response && response.data ? response.data.data : [];
      dispatch(setQuestions(questions));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}
