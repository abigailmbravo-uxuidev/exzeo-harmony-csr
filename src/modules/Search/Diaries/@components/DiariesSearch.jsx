import React, { useMemo, useEffect } from 'react';
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
  Loader
} from '@exzeo/core-ui';

import { STATUS_ANSWERS } from '../../../../constants/diaries';
import { SEARCH_TYPES } from '../../../../constants/search';
import { doesUserHaveAccess } from '../../../../utilities/userResources';

import { productAnswers } from '../../constants';
import NoResults from '../../@components/NoResults';
import SearchResultsWrapper from '../../@components/SearchResultsWrapper';
import ResetButton from '../../@components/ResetButton';
import Error from '../../@components/Error';

import { isValidRange, handleDiaryClick } from '../utilities';
import { useDiariesSearch } from '../hooks';
import DiaryList from './DiaryList';
import TransferDiaries from './TransferDiaries';

export const DiariesSearch = ({ userProfile, errorHandler }) => {
  const {
    state,
    handleSearchSubmit,
    handleTransferSubmit,
    resetSearch,
    transferActive,
    toggleTransfer
  } = useDiariesSearch({
    userProfile
  });

  const canTransferDiaries = useMemo(
    () => doesUserHaveAccess(userProfile?.resources, 'Diaries', 'TRANSFER'),
    [userProfile]
  );

  useEffect(() => {
    if (state.status === 'transfer-rejected') {
      errorHandler(state.error);
    }
  }, [state.status, state.error, errorHandler]);

  return (
    <Form
      initialValues={state.initialValues}
      subscription={{ submitting: true, values: true }}
      onSubmit={handleSearchSubmit}
    >
      {({ form, submitting, handleSubmit, values: { product } }) => (
        <>
          {(state.status === 'initializing' || state.status === 'pending') && (
            <Loader />
          )}
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
                            answers={state.reasonOptions}
                            placeholder="Please choose"
                            placeholderDisabled={false}
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
                            answers={state.assigneeOptions}
                            errorHint
                          />
                        </div>
                        <div className="form-group product">
                          <Field
                            name="product"
                            dataTest="product"
                            label="Product"
                            component={Select}
                            answers={productAnswers}
                            placeholder="Select..."
                            styleName="product-search"
                            showPlaceholder={true}
                            placeholderDisabled={false}
                          />
                        </div>
                      </div>
                      <span className="count-results">
                        <strong>{state.totalRecords}</strong>
                        RESULTS
                      </span>
                      {canTransferDiaries && (
                        <Button
                          className={Button.constants.classNames.link}
                          customClass="btn-reset"
                          data-test="toggle-transfer"
                          type="button"
                          onClick={toggleTransfer}
                        >
                          <i className="fa fa-share" />
                          TRANSFER
                        </Button>
                      )}
                      <ResetButton reset={() => resetSearch(form)} />
                      <Button
                        className={Button.constants.classNames.success}
                        customClass="multi-input"
                        data-test="submit"
                        type="submit"
                        disabled={submitting}
                      >
                        <i className="fa fa-search" />
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <TransferDiaries
            active={transferActive}
            handleSubmit={handleTransferSubmit}
            reset={toggleTransfer}
            transferToOptions={state.assigneeOptions}
          >
            <SearchResultsWrapper>
              {state.status === 'rejected' && <Error error={state.error} />}

              {state.status === 'resolved' && state.noResults && (
                <NoResults searchType={SEARCH_TYPES.diaries} />
              )}

              {state.status === 'resolved' && state.results.length && (
                <DiaryList
                  product={product}
                  handleClick={handleDiaryClick}
                  diaries={state.results}
                  diaryReasons={state.reasonOptions}
                  transferActive={transferActive}
                />
              )}
            </SearchResultsWrapper>
          </TransferDiaries>
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
