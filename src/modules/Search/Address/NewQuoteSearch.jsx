import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Button,
  Select,
  validation,
  Field,
  composeValidators,
  emptyArray
} from '@exzeo/core-ui';
import ResetButton from '../components/ResetButton';

import { companyAnswers, stateAnswers, productAnswers } from '../constants';
import { cspConfigForSearch } from '../utilities';

const { isValidChar, isRequired } = validation;

const NewQuoteSearch = ({
  submitting,
  changeSearchType,
  searchTypeOptions,
  resetFormResults,
  userProfile,
  formValues
}) => {
  const {
    companyCodeOptions,
    stateOptions,
    productOptionMap
  } = cspConfigForSearch(userProfile, 'QuoteData:Quotes:*');

  return (
    <React.Fragment>
      <div className="search-context-sort">
        <div className="form-group search-context">
          <Field
            name="searchType"
            dataTest="searchType"
            label="Search Context"
            component={Select}
            id="searchType"
            validate={isRequired}
            onChange={changeSearchType}
            answers={searchTypeOptions}
            showPlaceholder={false}
            errorHint
          />
        </div>
      </div>
      <div className="search-inputs fade-in">
        <div className="search-input-row">
          <Field
            name="companyCode"
            dataTest="company"
            label="Company"
            component={Select}
            validate={isRequired}
            answers={companyCodeOptions}
            styleName="company-search"
          />

          <Field
            name="product"
            dataTest="product"
            label="Product"
            component={Select}
            answers={productOptionMap[formValues.state] || emptyArray}
            placeholder="Select..."
            styleName="product-search"
            validate={isRequired}
            errorHint
          />

          <Field
            name="address"
            dataTest="address"
            label="Property Address"
            placeholder="Property Address Search"
            component={Input}
            styleName="property-search"
            validate={composeValidators([isValidChar, isRequired])}
            errorHint
          />

          <Field
            name="state"
            dataTest="state"
            label="State"
            component={Select}
            answers={stateOptions}
            showPlaceholder={false}
            styleName="state-search"
          />
        </div>
        <ResetButton reset={resetFormResults} />
        <Button
          className={Button.constants.classNames.success}
          customClass="multi-input"
          type="submit"
          disabled={submitting}
          dataTest="submit"
        >
          <i className="fa fa-search" />
          Search
        </Button>
      </div>
    </React.Fragment>
  );
};

NewQuoteSearch.propTypes = {
  submitting: PropTypes.bool.isRequired,
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
