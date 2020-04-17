import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Common/Header';
import Footer from '../../../components/Common/Footer';
import {
  Button,
  Field,
  Form,
  Input,
  normalize,
  Select,
  validation
} from '@exzeo/core-ui';
import {
  companyAnswers,
  productAnswers,
  stateAnswers
} from '../../Search/constants';
import { getAnswers } from '../../../utilities/forms';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import { AgencyTypeAhead } from '@exzeo/core-ui/src/@Harmony';
import ResetButton from '../../../components/ResetButton';

const {
  isValidNameFormat,
  isValidChar,
  isAlphaNumeric,
  isValidDateFormat,
  isRequired
} = validation;

const isValidDate = isValidDateFormat(STANDARD_DATE_FORMAT);

const Search = ({ handleLogout }) => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Harmony - CSR Portal</title>
      </Helmet>
      <Header handleLogout={handleLogout} />
      <div className="search">
        <div id="SearchBar">
          <Form onSubmit={x => x}>
            {({ handleSubmit, values }) => (
              <form onSubmit={x => x}>
                <div className="search-input-wrapper">
                  <div className="search-context-sort">
                    <div className="form-group search-context">
                      <Field name="searchType" validate={isRequired}>
                        {({ input, meta }) => (
                          <Select
                            input={{ ...input, onChange: changeSearchType }}
                            meta={meta}
                            id="searchType"
                            dataTest="searchType"
                            label="Search Context"
                            answers={searchTypeOptions}
                            showPlaceholder={false}
                            errorHint
                          />
                        )}
                      </Field>
                    </div>
                    <div className="form-group sortBy">
                      <Field name="sortBy">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="sortBy"
                            label="Sort By"
                            answers={sortByOptions}
                            showPlaceholder={false}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="search-inputs">
                    <div className="search-input-row margin bottom full-width">
                      <Field name="policyNumber" validate={isAlphaNumeric}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="policyNumber"
                            label="Policy Number"
                            placeholder="Policy No Search"
                            styleName="policy-no-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="firstName" validate={isValidNameFormat}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="firstName"
                            label="First Name"
                            placeholder="First Name Search"
                            styleName="first-name-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="lastName" validate={isValidNameFormat}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="lastName"
                            label="Last Name"
                            placeholder="Last Name Search"
                            styleName="last-name-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="address" validate={isValidChar}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="address"
                            label="Property Street Address"
                            placeholder="Property Street Address Search"
                            styleName="property-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="state">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="state"
                            label="State"
                            answers={stateAnswers}
                            showPlaceholder={false}
                            styleName="state-search"
                          />
                        )}
                      </Field>
                    </div>
                    <div className="search-input-row">
                      <Field name="companyCode">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="company"
                            label="Company"
                            answers={companyAnswers}
                            showPlaceholder={false}
                            styleName="company-search"
                          />
                        )}
                      </Field>

                      <Field name="product">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="product"
                            label="Product"
                            answers={productAnswers}
                            placeholder="Select..."
                            styleName="product-search"
                          />
                        )}
                      </Field>

                      <div className="form-group policy-status">
                        <Field name="policyStatus">
                          {({ input, meta }) => (
                            <Select
                              input={input}
                              meta={meta}
                              dataTest="policyStatus"
                              label="Policy Status"
                              answers={getAnswers('policyStatus', questions)}
                            />
                          )}
                        </Field>
                      </div>
                      <div className="form-group effectiveDate">
                        <Field name="effectiveDate" validate={isValidDate}>
                          {({ input, meta }) => (
                            <Input
                              input={input}
                              meta={meta}
                              dataTest="effectiveDate"
                              label="Effective Date"
                              placeholder={STANDARD_DATE_FORMAT}
                              normalize={
                                normalize.date /* TODO this wont work */
                              }
                              errorHint
                            />
                          )}
                        </Field>
                      </div>
                      <Field name="agencyCode">
                        {({ input, meta }) => (
                          <AgencyTypeAhead
                            input={input}
                            meta={meta}
                            dataTest="agencyCode"
                            label="Agency Name"
                            styleName="agencyCode agencyCodeSelectField"
                          />
                        )}
                      </Field>
                    </div>
                    <ResetButton reset={reset} />
                    <Button
                      className={Button.constants.classNames.success}
                      customClass="multi-input"
                      type="submit"
                      disabled={submitting}
                      data-test="submit"
                    >
                      <i className="fa fa-search" />
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
      <main role="document">
        <div className="content-wrapper">
          <div className="dashboard" role="article">
            <div className="route">
              <div className="search route-content">
                <div className="survey-wrapper scroll">
                  {/* Search Results */}

                  <div className="basic-footer">
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
