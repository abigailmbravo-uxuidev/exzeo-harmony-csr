import { useEffect, useReducer, useState } from 'react';

import { processChunk } from '../utilities';
import {
  formatDiaryOptions,
  formatAssigneesOptions,
  formatDiariesResults
} from './utilities';
import {
  fetchDiaryOptions,
  fetchAssigneeOptions,
  fetchDiaries,
  transferDiaries
} from './data';

const INITIAL_VALUES = {
  assignees: [],
  open: 'true',
  dateRange: {}
};

const INITIAL_STATE = {
  status: 'initializing',
  assigneeOptions: [],
  reasonOptions: [],
  results: [],
  initialValues: INITIAL_VALUES
};

function diariesSearchReducer(state, action) {
  switch (action.type) {
    case 'initialize': {
      return {
        ...state,
        status: 'idle',
        assigneeOptions: [...action.tagOptions, ...action.assigneeOptions],
        reasonOptions: action.reasonOptions,
        initialValues: {
          ...state.initialValues,
          assignees: [
            {
              answer: action.userProfile.userId,
              label: `${action.userProfile.profile?.given_name} ${action.userProfile.profile?.family_name}`,
              type: 'user'
            }
          ]
        }
      };
    }
    case 'pending': {
      return {
        ...state,
        status: 'pending'
      };
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        error: undefined,
        results: action.result,
        totalRecords: action.result.length,
        noResults: action.result.length === 0
      };
    }
    case 'transfer-success': {
      return {
        ...state,
        status: 'resolved',
        error: undefined,
        results: state.results.filter(d => !action.diaryIds.includes(d._id))
      };
    }
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
        results: []
      };
    }
    case 'transfer-error': {
      // TODO nothing in UI is currently handling this error. Should probably show some type of message!
      return {
        ...state,
        status: 'transfer-rejected',
        error: action.error
      };
    }
    case 'reset': {
      return {
        ...state,
        status: 'idle',
        error: undefined,
        results: []
      };
    }
    default: {
      throw new Error(
        `Unhandled action in DiariesSearch - type: ${action.type}`
      );
    }
  }
}

export function useDiariesSearch({ userProfile, formApi }) {
  const [state, dispatch] = useReducer(diariesSearchReducer, INITIAL_STATE);
  const [transferActive, setTransferActive] = useState(false);

  // TODO - this effect will be simplified after Auth0 refactor
  useEffect(() => {
    const initializeDiariesSearch = async () => {
      try {
        const optionsPromise = fetchDiaryOptions();
        const assigneesPromise = fetchAssigneeOptions(userProfile);

        const [diariesOptions, assigneeOptions] = await Promise.all([
          optionsPromise,
          assigneesPromise
        ]);

        const formattedDiariesOptions = formatDiaryOptions(diariesOptions);
        const formattedAssigneeOptions = formatAssigneesOptions(
          assigneeOptions
        );

        dispatch({
          type: 'initialize',
          reasonOptions: formattedDiariesOptions.reasons,
          tagOptions: formattedDiariesOptions.tags,
          assigneeOptions: formattedAssigneeOptions,
          userProfile
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (userProfile) {
      initializeDiariesSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  // TODO this effect won't be needed after Auth0 refactor - the app won't load until we have the userProfile, so we won't have to chain all these effects while waiting for that.
  useEffect(() => {
    if (state.assigneeOptions.length && state.reasonOptions.length) {
      handleSearchSubmit(state.initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.assigneeOptions, state.reasonOptions]);

  function resetSearch(form) {
    dispatch({ type: 'reset' });
    form.reset();
  }

  function toggleTransfer() {
    setTransferActive(state => !state);
  }

  async function handleSearchSubmit(values) {
    try {
      dispatch({ type: 'pending' });
      const searchQuery = {
        open: values.open === 'true',
        assignees: (values.assignees || []).map(a => a.answer),
        reason: values.reason,
        dueDateMin: values.dateRange.min,
        dueDateMax: values.dateRange.max,
        product: values.product
      };
      const response = await fetchDiaries(searchQuery);
      const result = formatDiariesResults(
        response,
        values.product,
        state.reasonOptions
      );
      dispatch({ type: 'success', result });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  }

  async function handleTransferSubmit(values) {
    try {
      dispatch({ type: 'pending' });
      const diaryIds = Object.keys(values.diaries).filter(
        id => values.diaries[id] === true
      );

      const selectedDiaries = [];
      state.results.forEach(diary => {
        if (diaryIds.includes(diary._id)) {
          selectedDiaries.push({
            _id: diary._id,
            entry: diary.latestEntry
          });
        }
      });

      const assigneeObj = state.assigneeOptions.find(
        a => a.answer === values.transferTo
      );

      const assignee = {
        id: assigneeObj.answer,
        displayName: assigneeObj.label,
        type: assigneeObj.type
      };

      const transfer = async diaries => {
        return await transferDiaries({ diaries, assignee });
      };

      await processChunk(selectedDiaries, 25, transfer);
      dispatch({ type: 'transfer-success', diaryIds });
    } catch (error) {
      dispatch({ type: 'transfer-error', error });
    }
  }

  return {
    state,
    handleSearchSubmit,
    handleTransferSubmit,
    resetSearch,
    toggleTransfer,
    transferActive
  };
}
