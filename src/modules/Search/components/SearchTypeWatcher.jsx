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
          case SEARCH_TYPES.newQuote:
            history.replace('/address');
          case SEARCH_TYPES.policy:
            history.replace('/');
          case SEARCH_TYPES.quote:
            history.replace('/quote');
          case SEARCH_TYPES.agency:
            history.replace('/agency');
          case SEARCH_TYPES.agent:
            history.replace('/agent');
        }
      }}
    </OnChangeListener>
  );
};

export default SearchTypeWatcher;
