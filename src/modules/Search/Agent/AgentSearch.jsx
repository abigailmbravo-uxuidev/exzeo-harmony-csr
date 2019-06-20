import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Integer, Button, Select, validation } from '@exzeo/core-ui';

const { isAlphaNumeric, isValidChar, isRequired } = validation;

const AgentSearch = ({ submitting, changeSearchType, searchTypeOptions }) => {
  return (
    <React.Fragment>
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
      <div className="search-inputs fade-in">
        <Field
          name="agentCode"
          dataTest="agentCode"
          component={Integer}
          placeholder="Agent ID Search"
          label="Agent ID"
          styleName="agency-id-search"
          thousandSeparator={false}
        />
        <Field
          name="firstName"
          dataTest="firstName"
          component={Input}
          placeholder="First Name Search"
          label="First Name"
          styleName="first-name-search"
          errorHint
          validate={isAlphaNumeric}
        />
        <Field
          name="lastName"
          dataTest="lastName"
          component={Input}
          placeholder="Last Name Search"
          label="Last Name"
          styleName="last-name-search"
          errorHint
          validate={isAlphaNumeric}
        />
        <Field
          name="address"
          dataTest="address"
          component={Input}
          placeholder="Agent Address Search"
          label="Agent Address"
          styleName="agency-address-search"
          errorHint
          validate={isValidChar}
        />
        <Field
          name="licenseNumber"
          dataTest="licenseNumber"
          component={Input}
          placeholder="Lic No Search"
          label="Lic Number"
          styleName="agency-reg-lic-fein-search"
        />

        <Button
          className={Button.constants.classNames.success}
          customClass="multi-input btn-success"
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

AgentSearch.propTypes = {
  submitting: PropTypes.bool,
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

AgentSearch.defaultProps = {};

export default AgentSearch;
