import React, { useEffect, useState } from 'react';
import {
  Select,
  MultiSelectTypeAhead,
  DateRange,
  Button,
  validation,
  emptyObject,
  emptyArray,
  Field,
  Form,
  noop
} from '@exzeo/core-ui';

import ResetButton from '../components/ResetButton';
import { STATUS_ANSWERS } from '../../../constants/diaries';
import { productAnswers } from '../constants';
import { isValidRange } from './utilities';
import { useFetchDiaryOptions, useFetchAssigneeAnswers } from '../hooks';
import { SEARCH_CONFIG, SEARCH_TYPES } from '../../../constants/search';
import Loader from '@exzeo/core-ui/src/Loader/Loader';
import { handleDiariesSearch } from '../data';
import {
  handleDiaryClick,
  handleDiaryKeyPress
} from '../../../utilities/handleNewTab';
import DiaryList from '../components/DiaryList';
import TransferButton from './TransferButton';

export const DiariesSearch = ({ userProfile }) => {
  const [searchResults, setSearchResults] = useState({ results: [] });
  const [searchAssignees, setSearchAssignees] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const { tags, reasons } = useFetchDiaryOptions();
  const { assigneeAnswers } = useFetchAssigneeAnswers(userProfile);

  const diaryInitialValues = {
    ...SEARCH_CONFIG[SEARCH_TYPES.diaries].initialValues,
    assignees:
      searchAssignees !== undefined
        ? searchAssignees
        : [
            {
              answer: userProfile?.userId,
              label: `${userProfile?.profile.given_name} ${userProfile?.profile?.family_name}`,
              type: 'user'
            }
          ]
  };

  // submit search when answers and options are loaded
  useEffect(() => {
    if (
      Array.isArray(assigneeAnswers) &&
      assigneeAnswers.length &&
      reasons.length &&
      tags.length
    ) {
      handleDiariesSearchSubmit(diaryInitialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, reasons, assigneeAnswers]);

  const resetFormResults = form => {
    setSearchResults({ results: [] });
    setSearchAssignees(undefined);
    form.reset();
  };

  const handleDiariesSearchSubmit = async data => {
    setLoading(true);
    setSearchAssignees(data.assignees || emptyArray);
    const results = await handleDiariesSearch(data);
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <Form
      initialValues={diaryInitialValues}
      subscription={{ submitting: true, values: true }}
      onSubmit={handleDiariesSearchSubmit}
    >
      {({ form, submitting, handleSubmit, values: { product } }) => (
        <>
          {loading && <Loader />}
          <div className="search">
            <div id="SearchBar">
              <form onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                  <div className="search-inputs fade-in diary">
                    <div className="input-wrapper">
                      <div className="search-input-row margin bottom full-width">
                        <div className="form-group search-context diary">
                          <Field
                            name="open"
                            dataTest="status"
                            label="Diary Status"
                            styleName="open"
                            component={Select}
                            id="status"
                            validate={validation.isRequired}
                            answers={STATUS_ANSWERS}
                            showPlaceholder={false}
                            errorHint
                          />
                        </div>
                        <div className="form-group reason">
                          <Field
                            name="reason"
                            dataTest="reason"
                            component={Select}
                            answers={reasons}
                            placeholder="Please choose"
                            label="Reason"
                            errorHint
                          />
                        </div>
                        <div className="form-group dateRange">
                          <Field
                            name="dateRange"
                            dataTest="date-range"
                            styleName="dateRange"
                            minDateProp="min"
                            maxDateProp="max"
                            component={DateRange}
                            validate={isValidRange}
                            label="Date Range"
                            errorHint
                            errorPosition="left"
                          />
                        </div>
                      </div>
                      <div className="search-input-row">
                        <div className="form-group assignees">
                          <Field
                            name="assignees"
                            dataTest="assignees"
                            styleName="assignees"
                            component={MultiSelectTypeAhead}
                            label="Assigned To"
                            answers={[...tags, ...assigneeAnswers]}
                            errorHint
                          />
                        </div>
                        <div className="fomr-group product">
                          <Field
                            name="product"
                            dataTest="product"
                            label="Product"
                            component={Select}
                            answers={productAnswers}
                            placeholder="Select..."
                            styleName="product-search"
                          />
                        </div>
                      </div>
                      <span className="count-results">
                        <strong>{searchResults.totalRecords}</strong>RESULTS
                      </span>
                      <TransferButton
                        toggleTransfer={() => setTransfer(!transfer)}
                      />
                      <ResetButton reset={() => resetFormResults(form)} />
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
                    {transfer && (
                      <div className="search-input-row">Transfer Area</div>
                    )}
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
                        <div className="quote-list">
                          <DiaryList
                            product={product}
                            handleKeyPress={handleDiaryKeyPress}
                            onItemClick={handleDiaryClick}
                            clickable
                            diaries={searchResults.results.filter(d =>
                              product ? d.resource.product === product : d
                            )}
                            diaryReasons={reasons}
                          />
                        </div>
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

DiariesSearch.defaultProps = {
  assigneeAnswers: emptyArray,
  initialValues: emptyObject,
  submitting: false,
  searchResults: emptyObject
};

export default DiariesSearch;
