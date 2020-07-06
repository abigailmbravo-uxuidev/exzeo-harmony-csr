import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Integer,
  Phone,
  Select,
  Field,
  Button,
  validation,
  Form
} from '@exzeo/core-ui';
import {
  SEARCH_CONFIG,
  AGENCY_SEARCH_OPTIONS,
  SEARCH_TYPES,
  AGENCY_STATUS
} from '../../../constants/search';
import Loader from '@exzeo/core-ui/src/Loader/Loader';
import SearchTypeWatcher from '../components/SearchTypeWatcher';
import AgencyCard from '../components/AgencyCard';
import { NavLink } from 'react-router-dom';
import { handleAgencySearch } from '../data';
import { cspConfigForSearch } from '../utilities';
import ResetButton from '../components/ResetButton';

const { isValidChar, isRequired } = validation;

const AgencySearch = ({ history, userProfile }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = async data => {
    const { results } = await handleAgencySearch(data);
    setSearchResults(results);
  };

  const resetFormResults = form => {
    setSearchResults([]);
    form.reset();
  };

  const {
    companyCodeOptions,
    stateOptions,
    productOptionMap,
    productOptions
  } = cspConfigForSearch(userProfile, 'Agency:Agencies:*');

  return (
    <Form
      initialValues={SEARCH_CONFIG[SEARCH_TYPES.agency].initialValues}
      subscription={{ submitting: true, values: true }}
      onSubmit={handleSearchSubmit}
    >
      {({ form, submitting, handleSubmit, values: { state } }) => (
        <>
          {submitting && <Loader />}
          <div className="search">
            <div id="SearchBar">
              <SearchTypeWatcher history={history} />
              <form id="SearchBarForm" onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                  <div className="search-context-sort">
                    <div className="form-group search-context">
                      <Field
                        name="searchType"
                        dataTest="searchType"
                        label="Search Context"
                        component={Select}
                        id="searchType"
                        validate={isRequired}
                        answers={AGENCY_SEARCH_OPTIONS}
                        showPlaceholder={false}
                        errorHint
                      />
                    </div>
                  </div>
                  <div className="search-inputs fade-in">
                    <Field
                      name="agencyCode"
                      dataTest="agencyCode"
                      component={Integer}
                      placeholder="Agency ID Search"
                      label="Agency ID"
                      styleName="agency-id-search"
                      thousandSeparator={false}
                    />
                    <Field
                      name="displayName"
                      dataTest="displayName"
                      component={Input}
                      placeholder="Agency Name Search"
                      label="Agency Name"
                      styleName="agency-name-search"
                    />
                    <Field
                      name="address"
                      dataTest="address"
                      component={Input}
                      placeholder="Agency Address Search"
                      label="Agency Address"
                      styleName="agency-address-search"
                      errorHint
                      validate={isValidChar}
                    />
                    <Field
                      name="state"
                      dataTest="state"
                      label="State"
                      component={Select}
                      answers={stateOptions}
                      showPlaceholder={true}
                      placeholder={'All'}
                      placeholderDisabled={false}
                      styleName="state-search"
                    />
                    <Field
                      name="companyCode"
                      dataTest="company"
                      label="Company"
                      component={Select}
                      answers={companyCodeOptions}
                      showPlaceholder={true}
                      placeholder={'All'}
                      placeholderDisabled={false}
                      styleName="company-search"
                    />
                    <Field
                      name="product"
                      dataTest="product"
                      label="Product"
                      component={Select}
                      answers={productOptionMap[state] || productOptions}
                      styleName="product-search"
                      showPlaceholder={true}
                      placeholder={'All'}
                      placeholderDisabled={false}
                    />
                    <Field
                      name="licenseNumber"
                      dataTest="licenseNumber"
                      component={Input}
                      placeholder="Lic No Search"
                      label="Lic Number"
                      styleName="agency-reg-lic-fein-search"
                    />
                    <Field
                      name="fein"
                      dataTest="fein"
                      component={Input}
                      placeholder="FEIN No Search"
                      label="FEIN Number"
                      styleName="agency-reg-lic-fein-search"
                    />
                    <Field
                      name="phone"
                      dataTest="phone"
                      component={Phone}
                      placeholder="Phone No Search"
                      label="Agency Phone Number"
                      styleName="agency-phone-search"
                    />
                    <Field
                      name="status"
                      dataTest="status"
                      label="Status"
                      component={Select}
                      id="status"
                      answers={AGENCY_STATUS}
                      showPlaceholder={true}
                      errorHint
                    />
                    <ResetButton reset={() => resetFormResults(form)} />
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
                </div>
              </form>
            </div>
          </div>
          <main role="document">
            <div className="content-wrapper">
              <div className="dashboard" role="article">
                <div className="route">
                  <div className="search route-content">
                    <div className="survey-wrapper scroll">
                      <div className="results-wrapper">
                        <React.Fragment>
                          {Array.isArray(searchResults) &&
                            searchResults.length > 0 && (
                              <div className="user-list agency-list">
                                {searchResults.map(agency => (
                                  <AgencyCard
                                    key={agency.agencyCode}
                                    agency={agency}
                                  />
                                ))}
                              </div>
                            )}
                          <div
                            className="btn-divider-wrapper"
                            data-test="add-agency-new"
                          >
                            <NavLink
                              className="btn btn-primary"
                              to="/agency/new/0"
                              activeClassName="active"
                              target="_blank"
                              exact
                            >
                              + Agency
                            </NavLink>
                          </div>
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </Form>
  );
};

AgencySearch.propTypes = {
  history: PropTypes.object
};

AgencySearch.defaultProps = {};

export default AgencySearch;
