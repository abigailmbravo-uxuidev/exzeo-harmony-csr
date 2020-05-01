import { useState, useEffect } from 'react';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

function questionsReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {
        ...state,
        status: 'pending'
      };
    }
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error
      };
    }
    case 'success': {
      if (!Array.isArray(action.questions)) {
        return {
          ...state
        };
      }

      const updatedQuestions = action.questions.reduce(
        (questionMap, question) => {
          questionMap[question.name] = question;
          return questionMap;
        },
        { ...state }
      );
      return {
        status: 'resolved',
        ...updatedQuestions
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function useUIQuestions() {
  const [state, dispatch] = useReducer(searchReducer, {
    status: 'idle'
  });

  async function getUIQuestions(step) {
    try {
      const data = { step };
      const response = await serviceRunner.callQuestions(data);
      const questions = response && response.data ? response.data.data : [];
      dispatch({ type: 'success', questions });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  }

  return {
    state,
    getUIQuestions
  };
}
