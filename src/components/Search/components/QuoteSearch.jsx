import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Select } from '@exzeo/core-ui/lib/Input';
import { getAnswers } from '../../../utilities/forms';

const NewQuoteSearch = ({ disabled, questions }) => (
    <div className="search-inputs fade-in">
      <Field
        name='firstName'
        label='First Name'
        placeholder='First Name Search'
        component={Input}
        styleName='first-name-search'
      />
      <Field
        name='lastName'
        label='Last Name'
        placeholder='Last Name Search'
        component={Input}
        styleName='last-name-search'
      />
      <Field
        name='address'
        label='Property Address'
        placeholder='Property Address Search'
        component={Input}
        styleName='property-search'
      />
      <Field
        name='quoteNumber'
        label='Quote Number'
        placeholder='Quote No Search'
        component={Input}
        styleName='quote-no-search'
      />
      <div className="form-group quote-state">
        <Field
          name="quoteState"
          label="Quote Status"
          component={Select}
          answers={getAnswers('quoteState', questions)}
        />
      </div>

      <button
        className="btn btn-success multi-input"
        type="submit"
        disabled={disabled}
      >
        <i className="fa fa-search" />Search
      </button>
    </div>
  );

NewQuoteSearch.propTypes = {};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
