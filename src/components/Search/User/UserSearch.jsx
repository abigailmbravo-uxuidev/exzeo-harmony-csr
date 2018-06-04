import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';

const NewQuoteSearch = ({ disabled  }) => {
  return (
    <div className="search-tools">
      <div className="search-inputs fade-in">
        <Field
          name='user'
          label='User Name'
          placeholder='Search for user by name'
          component={Input}
          styleName='user-name-search'
        />

        <button
          className="btn btn-success multi-input"
          type="submit"
          form="SearchBar"
          disabled={disabled}
        >
          <i className="fa fa-search" />Search
        </button>
      </div>
      <div className="filters fade-in">FILTERS HERE</div>
    </div>
  );
};

NewQuoteSearch.propTypes = {};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
