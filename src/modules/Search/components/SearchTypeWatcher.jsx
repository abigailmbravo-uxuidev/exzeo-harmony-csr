import React from 'react';
import { OnChangeListener } from '@exzeo/core-ui';
import { SEARCH_TYPES } from '../../../constants/search';

const SearchTypeWatcher = ({ history }) => {
  return (
    <OnChangeListener name="searchType">
      {value => {
        switch (value) {
          case SEARCH_TYPES.newQuote:
            history.replace('/address');
            break;
          case SEARCH_TYPES.policy:
            history.replace('/');
            break;
          case SEARCH_TYPES.quote:
            history.replace('/quote');
            break;
          case SEARCH_TYPES.agency:
            history.replace('/agency');
            break;
          case SEARCH_TYPES.agent:
            history.replace('/agent');
            break;
          case SEARCH_TYPES.diaries:
            history.replace('/diaries');
            break;
          default:
        }
      }}
    </OnChangeListener>
  );
};

export default SearchTypeWatcher;
