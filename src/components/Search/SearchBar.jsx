import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import { getAgencies } from "../../actions/serviceActions";
import { clearAppError } from '../../actions/errorActions';
import {
  setSearch,
  handleSearchSubmit,
  resetSearch,
  toggleLoading } from '../../actions/searchActions';
import Rules from '../Form/Rules';

import { Select } from '@exzeo/core-ui/lib/Input';
import { isRequired } from '@exzeo/core-ui/lib/InputLifecycle';

// TODO: reimplementing validation on a per field basis
export const validate = (values) => {
  const errors = {};
  if (values.firstName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.firstName);
    if (onlyAlphaNumeric) {
      errors.firstName = onlyAlphaNumeric;
    }
  }

  if (values.lastName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.lastName);
    if (onlyAlphaNumeric) {
      errors.lastName = onlyAlphaNumeric;
    }
  }

  if (values.agentName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.agentName);
    if (onlyAlphaNumeric) {
      errors.agentName = onlyAlphaNumeric;
    }
  }

  if (values.agentCode) {
    const numbersOnly = Rules.numbersOnly(values.agentCode);
    if (numbersOnly) {
      errors.agentCode = numbersOnly;
    }
  }

  if (values.agencyCode) {
    const numbersOnly = Rules.numbersOnly(values.agencyCode);
    if (numbersOnly) {
      errors.agencyCode = numbersOnly;
    }
  }

  if (values.quoteNumber) {
    const numberDashesOnly = Rules.numberDashesOnly(values.quoteNumber);
    if (numberDashesOnly) {
      errors.quoteNumber = numberDashesOnly;
    }
  }

  if (values.policyNumber) {
    const numberDashesOnly = Rules.numberDashesOnly(values.policyNumber);
    if (numberDashesOnly) {
      errors.policyNumber = numberDashesOnly;
    }
  }

  if (values.zip) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.zip);
    if (onlyAlphaNumeric) {
      errors.zip = onlyAlphaNumeric;
    }
  }
  if (values.address) {
    const required = Rules.required(String(values.address).trim());
    const invalidCharacters = Rules.invalidCharacters(values.address);
    if (required) {
      errors.address = required;
    } else if (invalidCharacters) {
      errors.address = invalidCharacters;
    }
  }

  if (values.effectiveDate) {
    const isDate = moment(values.effectiveDate, 'MM/DD/YYYY', true).isValid()
      ? undefined
      : 'Not a valid date';
    if (isDate) {
      errors.effectiveDate = isDate;
    }
  }

  return errors;
};

export class SearchBar extends Component {
  componentDidMount() {
    const { getAgencies, toggleLoading } = this.props;
    localStorage.removeItem('lastSearchData');
    toggleLoading(false);
    // TODO try to avoid doing this every time this component mounts. Maybe handle this higher up the component tree (which means we can then search agencies from state rather than hitting the server)
    getAgencies('TTIC', 'FL');
  }

  handleSearchFormSubmit = (data, dispatch, props) => {
    dispatch(handleSearchSubmit(data, props))
  };

  handlePagination = (isNext) => {
    const { handleSubmit } = this.props;
    return handleSubmit((data, dispatch, props) => {
      const submitData = { ...data, isNext, currentPage: props.search.currentPage };
      dispatch(handleSearchSubmit(submitData, this.props));
    })
  };

  changeSearchType = (event, newValue) => {
    const { changeSearchType, resetSearch } = this.props;
    changeSearchType(newValue);
    resetSearch();
    this.clearForm();
  };

  clearForm = () => {
    const { reset, clearAppError, advancedSearch, toggleAdvancedSearch } = this.props;
    let lastSearchData = JSON.parse(localStorage.getItem('lastSearchData')) || {};
    lastSearchData.searchType = '';
    localStorage.setItem('lastSearchData', JSON.stringify(lastSearchData));
    reset();
    clearAppError();
    toggleLoading(false);
    if (advancedSearch) {
      toggleAdvancedSearch();
    }
  };

  render() {
    const {
      handleSubmit,
      searchTypeOptions,
      submitting
    } = this.props;

    return (
      <div id="SearchBar">
        <form onSubmit={handleSubmit(this.handleSearchFormSubmit)}>
          <div className="search-input-wrapper">

            <div className="form-group search-context">
              <Field
                name="searchType"
                label="Search Context"
                component={Select}
                id="searchType"
                validate={isRequired}
                onChange={this.changeSearchType}
                answers={searchTypeOptions}
              />
            </div>

            { // render the correct search form based on searchType (declared in Search/index.js)
              this.props.render({
              submitting,
              handlePagination: this.handlePagination
            })}

          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search
});

export default connect(mapStateToProps, {
  clearAppError,
  getAgencies,
  setSearch,
  toggleLoading,
  handleSearchSubmit,
  resetSearch
})(reduxForm({ // initialValues prop is being passed in from parent component based on route/pathName
  form: 'SearchBar',
  enableReinitialize: true,
  destroyOnUnmount: false,
  validate,
})(SearchBar));
