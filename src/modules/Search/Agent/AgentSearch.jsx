import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Integer,
  Select,
  Field,
  Button,
  validation,
  Form,
  noop
} from '@exzeo/core-ui';
import {
  SEARCH_CONFIG,
  AGENCY_SEARCH_OPTIONS,
  SEARCH_TYPES
} from '../../../constants/search';
import Loader from '@exzeo/core-ui/src/Loader/Loader';
import SearchTypeWatcher from '../components/SearchTypeWatcher';
import { handleAgentSearch } from '../data';
import { isAlphaNumeric } from '@exzeo/core-ui/src/Utilities';
import AgentCard from '../components/AgentCard';
import NoResults from '../components/NoResults';

const { isValidChar, isRequired } = validation;

const AgentSearch = ({ history }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchSubmit = async data => {
    const { results } = await handleAgentSearch(data);
    setSearchResults(results);
    setHasSearched(true);
  };
  return (
    <Form
      initialValues={SEARCH_CONFIG[SEARCH_TYPES.agent].initialValues}
      subscription={{ submitting: true }}
      onSubmit={handleSearchSubmit}
    >
      {({ submitting, handleSubmit }) => (
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
                          {hasSearched && searchResults.length === 0 && (
                            <NoResults
                              searchType={SEARCH_TYPES.agency}
                              error={noop}
                            />
                          )}
                          {Array.isArray(searchResults) &&
                            searchResults.length > 0 && (
                              <div
                                className="user-list agent-list"
                                data-test="agent-list"
                              >
                                {searchResults.map(agent => (
                                  <AgentCard key={agent._id} agent={agent} />
                                ))}
                              </div>
                            )}
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

AgentSearch.propTypes = {
  history: PropTypes.object
};

AgentSearch.defaultProps = {};

export default AgentSearch;
