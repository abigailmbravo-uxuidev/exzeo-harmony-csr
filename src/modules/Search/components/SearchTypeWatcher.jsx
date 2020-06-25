import React from 'react';
import { OnChangeListener } from '@exzeo/core-ui';
import { SEARCH_TYPES } from '../../../constants/search';

const SearchTypeWatcher = ({ history }) => {
  return (
    <OnChangeListener name="searchType">
      {value => {
        if (value) {
          if (value === SEARCH_TYPES.newQuote) {
            history.replace('/address');
          } else if (value === SEARCH_TYPES.policy) {
            history.replace('/policy');
          } else if (value === SEARCH_TYPES.quote) {
            history.replace('/quote');
          }
        }
      }}
    </OnChangeListener>
  );
};

export default SearchTypeWatcher;
