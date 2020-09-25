import React, { useCallback, useEffect, useRef, useReducer } from 'react';
import {
  fetchDiaries,
  createDiary,
  updateDiary,
  fetchDiaryEnums
} from '../modules/Diaries/data';
import {
  POLICY_RESOURCE_TYPE,
  QUOTE_RESOURCE_TYPE
} from '../constants/diaries';

import { useUser } from './user-context';
import { date } from '@exzeo/core-ui';

function areDiariesEqual(previous, current) {
  if (previous.length !== current.length) return false;

  const sortPrev = previous.sort((a, b) =>
    a.updatedAt > b.updatedAt ? 1 : -1
  );
  const sortCurrent = previous.sort((a, b) =>
    a.updatedAt > b.updatedAt ? 1 : -1
  );

  return sortPrev.every((prev, index) => {
    const currentUpdated = sortCurrent[index].updatedAt;
    return prev.updatedAt === currentUpdated;
  });
}

export const DiariesContext = React.createContext();

const INITIAL_STATE = {
  diaries: [],
  diaryEnums: {},
  selectedDiary: undefined,
  activeDocument: {},
  showDiariesBar: false,
  showModal: false,
  error: undefined
};

function diariesReducer(state, action) {
  switch (action.type) {
    case 'getDiaries-success': {
      return {
        ...state,
        error: undefined,
        diaries: action.results
      };
    }
    case 'getDiaries-error': {
      return {
        ...state,
        error: action.error,
        diaries: []
      };
    }
    case 'getDiaryEnums-success': {
      return {
        ...state,
        error: undefined,
        diaryEnums: action.results
      };
    }
    case 'getDiaryEnums-error': {
      return {
        ...state,
        error: action.error,
        diaryEnums: {}
      };
    }
    case 'makeDiary': {
      const { document, diaryId } = action;

      const selectedDiary = state.diaries.find(diary => diary._id === diaryId);

      const activeDocument = {
        resourceType: document.sourceNumber
          ? POLICY_RESOURCE_TYPE
          : QUOTE_RESOURCE_TYPE,
        resourceId: document.sourceNumber
          ? document.policyNumber
          : document.quoteNumber,
        resourceIdForQuery: document.sourceNumber
          ? [document.policyNumber, document.sourceNumber]
          : document.quoteNumber,
        timezone: document.property.timezone,
        ...document
      };

      return {
        ...state,
        showModal: true,
        activeDocument,
        selectedDiary: selectedDiary || undefined
      };
    }
    case 'closeModal': {
      return {
        ...state,
        showModal: false
      };
    }
    case 'toggleDiariesBar': {
      return {
        ...state,
        showDiariesBar: !state.showDiariesBar
      };
    }

    default: {
      throw new Error(
        `Unhandled action in DiariesContext - type: ${action.type}`
      );
    }
  }
}

export function useDiaries() {
  const context = React.useContext(DiariesContext);
  if (context === undefined) {
    throw new Error(`useDiaries must be used within a DiariesProvider`);
  }

  return context;
}

export function DiariesProvider({ children }) {
  const [state, dispatch] = useReducer(diariesReducer, INITIAL_STATE);
  const {
    diaries,
    diaryEnums,
    selectedDiary,
    activeDocument,
    showDiariesBar,
    showModal,
    error
  } = state;
  // TODO when we upgrade react-redux, we can potentially get the document from the store instead of having to pass it up here.

  const userProfile = useUser();

  // Necessary pattern to avoid stale closure:
  // The dependency array is used to tell React when to call useEffect, be we don't want this effect called often, instead we are setting up a 'setInterval'.
  // The problem is that all of the 'current' variables get closed over and the function passed to setInterval is only updated when useEffect is called again.
  // We don't want to add 'diaries' to the deps array because it would cause the effect to reset (and cleanup) whenever diaries changes (which is caused by the effect itself!), so we would continuously call setInterval, then clearInterval on cleanup. This will get expensive, as well as re trigger the initial fetch in useEffect before we setInterval.
  // So this ensures that 'getDiaries' has the latest 'diaries' state to use as previous when comparing. (Obviously it may be better to add some logic to the backend that lets us know when nothing has changed, or use websockets :) )
  const previousDiaries = useRef(diaries);
  useEffect(() => {
    previousDiaries.current = diaries;
  }, [diaries]);

  async function getDiaries(filter, options = {}) {
    try {
      const results = await fetchDiaries(filter, options);
      if (options.checkEquality) {
        const shouldUpdate = !areDiariesEqual(previousDiaries.current, results);
        if (shouldUpdate) {
          dispatch({ type: 'getDiaries-success', results });
        }
      } else {
        dispatch({ type: 'getDiaries-success', results });
      }
    } catch (error) {
      dispatch({ type: 'getDiaries-error', error });
    }
  }

  async function submitDiary(values) {
    try {
      const { _id, due, assignee, ...entry } = values;

      const assigneeObj = diaryEnums.assigneeOptions.find(
        u => u.answer === String(assignee.id)
      );

      entry.assignee = {
        id: assigneeObj.answer,
        displayName: assigneeObj.label,
        type: assigneeObj.type
      };

      entry.due = date.formatToUTC(due, activeDocument.timezone);

      const payload = {
        entry,
        resource: {
          type: activeDocument.resourceType,
          id: activeDocument.resourceId,
          companyCode: activeDocument.companyCode,
          state: activeDocument.state,
          product: activeDocument.product
        },
        user: {
          userId: userProfile.userId,
          userName: userProfile.userName
        }
      };

      if (values._id) {
        await updateDiary(payload, { id: selectedDiary._id });
      } else {
        await createDiary(payload);
      }

      await getDiaries({
        resourceType: activeDocument.resourceType,
        resourceId: activeDocument.resourceIdForQuery
      });
    } catch (error) {
      dispatch({ type: 'getDiaries-error', error });
      throw error;
    } finally {
      dispatch({ type: 'closeModal' });
    }
  }

  const getDiaryEnums = useCallback(
    async csp => {
      try {
        const {
          formattedDiariesOptions,
          formattedAssigneeOptions
        } = await fetchDiaryEnums(userProfile, csp);

        dispatch({
          type: 'getDiaryEnums-success',
          results: {
            reasonOptions: formattedDiariesOptions.reasons,
            assigneeOptions: [
              ...formattedDiariesOptions.tags,
              ...formattedAssigneeOptions
            ]
          }
        });
      } catch (error) {
        dispatch({ type: 'getDiaryEnums-error', error });
      }
    },
    [userProfile]
  );

  return (
    <DiariesContext.Provider
      value={{
        diariesDispatch: dispatch,
        diaries,
        diaryEnums,
        getDiaryEnums,
        showDiariesBar,
        showModal,
        activeDocument,
        selectedDiary,
        error,
        getDiaries,
        submitDiary
      }}
    >
      {children}
    </DiariesContext.Provider>
  );
}
